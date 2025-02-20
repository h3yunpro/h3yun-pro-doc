const genBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const output = document.getElementById('output');
const sqlInput = document.getElementById('sql-input');

const parser = new NodeSQLParser.Parser();

sqlInput.value = `SELECT *
FROM i_D202501xxyyzz
WHERE Status = 1
	AND CreatedTime > '2025-01-01 15:39:20'
	AND CreatedTime <= '2025-01-31'
	AND F0000001 > 0
	AND F0000002 <= 100
    AND F0000003 != '测试数据'
	AND F0000004 IN ('x1', 'x2', 'x3')
	AND F0000005 NOT IN (0, 1)
	AND F0000006 IS NULL
	AND F0000007 IS NOT NULL
	AND F0000007 != ''
	AND (F0000008 LIKE '%JC%'
		OR F0000009 NOT LIKE '%ZC'
		OR F0000010 LIKE 'DC%')
ORDER BY CreatedTime DESC
LIMIT 0, 500`;

// 生成 API 请求 JSON
genBtn.addEventListener('click', () => {
    const sql = sqlInput.value.trim();

    try {
        if (!sql) {
            throw new Error('请先输入要转换的SELECT语句');
        }
        if (sql.toUpperCase().indexOf('BETWEEN') >= 0) {
            throw new Error('LoadBizObjects不支持BETWEEN查询');
        }

        const ast = parser.astify(sql); // 解析SQL为AST

        const result = generateApiRequest(ast); // 生成API请求JSON
        output.textContent = JSON.stringify(result, null, 2);
        output.classList.remove('error');
    } catch (error) {
        output.textContent = '异常: ' + error.message;
        output.classList.add('error');
    }
});

function generateApiRequest(ast) {
    const tableName = getTableName(ast);
    const limit = getLimit(ast);
    const orderBy = getOrderBy(ast);
    const returnItems = getReturnItems(ast);
    const where = getWhere(ast);

    if (ast.distinct) {
        throw new Error('LoadBizObjects不支持distinct查询');
    }
    if (ast.groupby) {
        throw new Error('LoadBizObjects不支持group by查询');
    }
    if (ast.having) {
        throw new Error('LoadBizObjects不支持having查询');
    }

    const filter = {
        'FromRowNum': limit.FromRowNum,
        'ToRowNum': limit.ToRowNum,
        'Matcher': where,
        'SortByCollection': orderBy,
        'RequireCount': true,
        'ReturnItems': returnItems
    };

    const result = {
        'ActionName': 'LoadBizObjects',
        'SchemaCode': tableName,
        'Filter': JSON.stringify(filter)
    };

    return result;
}

//获取表名
function getTableName(ast) {

    if (ast.type !== 'select') {
        throw new Error('只支持SELECT语句');
    }

    if (ast.from.length !== 1) {
        throw new Error('只支持查询一个表');
    }

    const table = ast.from[0].table;
    if (typeof table !== 'string' || table.length === 0) {
        throw new Error('表名不能为空');
    }
    //正则判断表名是否以H_或h_开头
    if (/^(H_|h_)/.test(table)) {
        throw new Error('h_开头的是系统表, LoadBizObjects不支持查询系统表');
    }
    //正则判断表名是否以I_或i_开头
    if (!/^(I_|i_)/.test(table)) {
        throw new Error('表名有误, 氚云表单数据表必须是i_开头');
    }
    return table.substring(2);
}

//获取limit
function getLimit(ast) {
    var fromRowNum = 0;
    var pageSize = 500;
    if (ast.limit && ast.limit.value && ast.limit.value.length) {
        if (ast.limit.value.length == 1) {
            pageSize = ast.limit.value[0].value;
        } else {
            fromRowNum = ast.limit.value[0].value;
            pageSize = ast.limit.value[1].value;
        }
    }

    if (fromRowNum < 0) {
        throw new Error('limit语句转换失败, 起始下标应大于0');
    }

    if (pageSize <= 0 || pageSize > 500) {
        throw new Error('limit语句转换失败, LoadBizObjects每次查询数据量范围应是[0-500]');
    }

    return {
        'FromRowNum': fromRowNum,
        'ToRowNum': fromRowNum + pageSize
    };
}

//获取order by
function getOrderBy(ast) {
    if (!ast.orderby || !ast.orderby.length) {
        return [];
    }

    const sortByCollection = [];
    for (const item of ast.orderby) {
        if (typeof item.expr.type !== 'string' || item.expr.type !== 'column_ref') {
            throw new Error('order by语句转换失败, LoadBizObjects只支持按列名排序');
        }
        const orderByType = item.type && item.type === 'DESC' ? 'Descending' : 'Ascending';
        sortByCollection.push({
            'ItemName': item.expr.column,
            'Direction': orderByType
        });
    }
    return sortByCollection;
}

//获取查询列
function getReturnItems(ast) {
    if (!ast.columns || !ast.columns.length) {
        throw new Error('查询列不能为空');
    }

    const returnItems = [];
    var isQueryAllColumns = false;
    for (const item of ast.columns) {
        if (typeof item.expr.type !== 'string' || item.expr.type !== 'column_ref') {
            throw new Error('查询列语句转换失败, LoadBizObjects只支持按列名查询');
        }
        if (item.expr.column === '*') {
            isQueryAllColumns = true;
        }
        returnItems.push(item.expr.column);
    }
    if (isQueryAllColumns && returnItems.length > 1) {
        throw new Error('查询列语句转换失败, “*”不能与其他列同时出现');
    }
    if (isQueryAllColumns) {
        return [];
    }
    return returnItems;
}

//获取where
function getWhere(ast) {
    var matcher = {
        'Type': 'And',
        'Matchers': []
    };
    if (!ast.where) {
        return matcher;
    }
    if (typeof ast.where.type !== 'string' || ast.where.type !== 'binary_expr') {
        throw new Error('where语句转换失败, LoadBizObjects只支持二元表达式');
    }
    convertToMatcher(ast.where, matcher);
    return matcher;
}

function convertToMatcher(item, matcher) {
    if (typeof item.type !== 'string' || item.type.length === 0) {
        throw new Error('where语句转换失败');
    }

    if (typeof item.operator === 'string') {
        if (item.type !== 'binary_expr') {
            throw new Error('where语句转换失败, LoadBizObjects只支持二元表达式');
        }

        //条件连接
        if (item.operator === 'AND' || item.operator === 'OR') {
            var currMatcher = matcher;
            if (item.operator === 'AND' && matcher.Type === 'Or') {
                currMatcher = {
                    'Type': 'And',
                    'Matchers': []
                };
                matcher.Matchers.push(currMatcher);
            } else if (item.operator === 'OR' && matcher.Type === 'And') {
                currMatcher = {
                    'Type': 'Or',
                    'Matchers': []
                };
                matcher.Matchers.push(currMatcher);
            }

            convertToMatcher(item.left, currMatcher);
            convertToMatcher(item.right, currMatcher);
            return;
        }

        //条件
        var operator = item.operator;
        operator = convertToLikeOperator(operator, item);
        operator = convertToInOperator(operator, item);
        if (operator in operatorType) {
            if (item.left.type !== 'column_ref' || item.right.type === 'function') {
                throw new Error('where语句转换失败, LoadBizObjects筛选条件不支持函数和子查询');
            }
            if (typeof item.right.value === 'undefined') {
                throw new Error('where语句转换失败, LoadBizObjects筛选条件值不能为空');
            }
            matcher.Matchers.push({
                'Type': 'Item',
                'Name': item.left.column,
                'Operator': operatorType[operator],
                'Value': item.right.value
            });
            return;
        } else {
            throw new Error('where语句转换失败, LoadBizObjects不支持该操作符:' + operator);
        }
    }

    throw new Error('where语句转换失败');
}

function convertToLikeOperator(operator, item) {
    if (operator !== 'LIKE' && operator !== 'NOT LIKE') {
        return operator;
    }
    if (!item.right || !item.right.type || item.right.type !== 'single_quote_string') {
        throw new Error('where语句转换失败, LoadBizObjects要求' + operator + '操作符右边必须是字符串');
    }
    const v = item.right.value;
    if (v.startsWith('%') && v.endsWith('%')) {
        operator = '%' + operator + '%';
    } else if (v.startsWith('%') && !v.endsWith('%')) {
        operator = '%' + operator;
    } else if (!v.startsWith('%') && v.endsWith('%')) {
        operator = operator + '%';
    } else {
        operator = '%' + operator + '%';
    }
    item.right.value = trimSymbol(v, '%');
    return operator;
}

function convertToInOperator(operator, item) {
    if (operator !== 'IN' && operator !== 'NOT IN') {
        return operator;
    }

    if (item.right.type !== 'expr_list' || typeof item.right.value !== 'object' || !Array.isArray(item.right.value)) {
        throw new Error('where语句转换失败, ' + operator + '语法有误');
    }

    for (var i = 0; i < item.right.value.length; i++) {
        const v = item.right.value[i];
        if (typeof v.type !== 'string') {
            throw new Error('where语句转换失败, ' + operator + '语法有误');
        }
        if (item.right.value[i].type !== 'single_quote_string' && item.right.value[i].type !== 'number') {
            throw new Error('where语句转换失败, ' + operator + '操作符右边只支持字符串和数字');
        }
        item.right.value[i] = v.value;
    }
    return operator;
}

// 复制到剪贴板
copyBtn.addEventListener('click', () => {
    const output = document.getElementById('output').textContent;
    if (!output) {
        alert('无可复制的内容');
        return;
    }

    navigator.clipboard.writeText(output)
        .then(() => {
            alert('复制成功!');
        })
        .catch(() => {
            alert('复制失败，请重试!');
        });
});

const operatorType = {
    '>': 0,
    '>=': 1,
    '=': 2,
    '<=': 3,
    '<': 4,
    '!=': 5,
    '<>': 5,
    'IN': 6,
    'NOT IN': 7,
    '%LIKE%': 8,
    'LIKE%': 13,
    '%LIKE': 14,
    'IS': 18,
    'IS NOT': 19,
    'NOT LIKE%': 22,
    '%NOT LIKE': 23,
    '%NOT LIKE%': 24
}

function trimSymbol(str, symbol) {
    if (!str) return str;
    const pattern = new RegExp('^[\\' + symbol + ']+|[\\' + symbol + ']+$', 'g');
    return str.replace(pattern, '');
}
