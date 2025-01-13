const genBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const output = document.getElementById('output');
const sqlInput = document.getElementById('sql-input');

const parser = new NodeSQLParser.Parser();

sqlInput.value = `SELECT *
FROM i_D202501xxyyzz
WHERE Status = 1
	AND F0000001 > 0
	AND F0000002 >= 100
	AND CreatedTime < '2025-01-01 15:39:20'
	AND CreatedTime <= '2025-01-31'
	AND F0000003 = '测试数据'
	AND F0000004 IN ('x1', 'x2', 'x3')
	AND F0000004 NOT IN ('x1', 'x2', 'x3')
	AND F0000005 IS NULL
	AND F0000006 IS NOT NULL
	AND F0000006 != ''
	AND (F0000007 LIKE '%JC%'
		OR F0000008 NOT LIKE '%ZC'
		OR F0000009 LIKE 'DC%')
ORDER BY CreatedTime DESC
LIMIT 0, 500`;

// 生成 API 请求 JSON
genBtn.addEventListener('click', () => {
    const sql = sqlInput.value.trim();
    if (!sql) {
        alert('请先输入要转换的SELECT语句');
        return;
    }

    try {
        const ast = parser.astify(sql); // 解析SQL为AST

        console.log(JSON.stringify(ast.where));

        const result = generateApiRequest(ast); // 生成API请求JSON
        output.textContent = JSON.stringify(result, null, 2);
        output.classList.remove('error');
    } catch (error) {
        output.textContent = '异常: ' + error.message;
        output.classList.add('error');
    }
});

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
        throw new Error('h_开头的是系统表, GetList不支持查询系统表');
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
        throw new Error('limit语句转换失败, GetList每次查询数据量范围应是[0-500]');
    }

    return {
        'FromRowNum': fromRowNum,
        'ToRowNum': fromRowNum + pageSize
    };
}

//获取order by
function getOrderBy(ast) {
    if (!ast.orderby || !ast.orderby.length) {
        return null;
    }

    const sortByCollection = [];
    for (const item of ast.orderby) {
        if (typeof item.expr.type !== 'string' || item.expr.type !== 'column_ref') {
            throw new Error('order by语句转换失败, GetList只支持按列名排序');
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
            throw new Error('查询列语句转换失败, GetList只支持按列名查询');
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
    }

    if (!ast.where) {
        return matcher;
    }

    if (typeof ast.where.type !== 'string' || ast.where.type !== 'binary_expr') {
        throw new Error('where语句转换失败, GetList只支持二元表达式')
    }
    if (typeof ast.where.operator === 'string' && ast.where.operator === 'OR') {
        matcher = {
            'Type': 'Or',
            'Matchers': []
        }
    }
    return matcher;
    // const leftMatcher = getMatcher(ast.where.left, matcher.Type, '');
    // if (leftMatcher && leftMatcher.length) {
    //     for (var i = 0; i < leftMatcher.length; i++) {
    //         matcher.Matchers.push(leftMatcher[i]);
    //     }
    // }
    // const rightMatcher = getMatcher(ast.where.right, matcher.Type, '');
    // if (rightMatcher && rightMatcher.length) {
    //     for (var i = 0; i < rightMatcher.length; i++) {
    //         matcher.Matchers.push(rightMatcher[i]);
    //     }
    // }
}

function getMatcher(item, matcherType, upLevelOperator) {
    if (!item) {
        return null;
    }
    if (typeof item.type !== 'string' || item.type.length === 0) {
        throw new Error('where语句转换失败')
    }
    if (item.type === 'binary_expr') {
        if (item.operator !== 'string' || item.operator.length === 0) {
            throw new Error('where语句转换失败')
        }
        if (item.operator !== "AND" && item.operator !== "OR") {
            throw new Error('where语句转换失败, GetList只支持AND/OR连接')
        }
        const currentMatcherType = item.operator === "AND" ? 'And' : 'Or';
        const leftMatcher = getMatcher(item.left, currentMatcherType, item.operator);
        const rightMatcher = getMatcher(item.right, currentMatcherType, item.operator);
        if (matcherType !== currentMatcherType) {
            return [{
                'Type': currentMatcherType,
                'Matchers': [leftMatcher, rightMatcher]
            }]
        } else {
            return [leftMatcher, rightMatcher];
        }
    } else if (item.type === 'column_ref') {
        var currentOperator = '';
        if (item.operator.indexOf('LIKE') >= 0) {
            var v = item.right.value + '';
            if (v.startsWith('%') && v.endsWith('%')) {
                currentMatcherType = '%LIKE%';
            } else if (v.startsWith('%') && !v.endsWith('%')) {
                currentMatcherType = '%LIKE';
            } else if (!v.startsWith('%') && v.endsWith('%')) {
                currentMatcherType = 'LIKE%';
            } else {
                currentMatcherType = '%LIKE%';
            }
        } else if (item.operator in operatorType) {
            currentOperator = item.operator;
        } else {
            throw new Error('where语句转换失败, GetList不支持“' + item.operator + '”匹配符')
        }
    } else {
        throw new Error('where语句转换失败, GetList只支持二元表达式过滤')
    }
}

function generateApiRequest(ast) {
    const tableName = getTableName(ast);
    const limit = getLimit(ast);
    const orderBy = getOrderBy(ast);
    const returnItems = getReturnItems(ast);
    const where = getWhere(ast);

    if (ast.distinct) {
        throw new Error('GetList不支持distinct查询');
    }
    if (ast.groupby) {
        throw new Error('GetList不支持group by查询');
    }
    if (ast.having) {
        throw new Error('GetList不支持having查询');
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