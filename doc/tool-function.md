# 工具方法合集


## [后端]获取业务对象字段值

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

``` cs
//业务对象["字段名"] 转string
//用法：string val = gStr(业务对象["控件编码"])
public static string gStr(object val)
{
    return val + string.Empty;
}

//业务对象["字段名"] 转bool
//用法：bool val = gBool(业务对象["控件编码"])
public static bool gBool(object val)
{
    string valStr = gStr(val).ToLower();
    if(valStr == "true" || valStr == "1")
    {
        return true;
    }

    return false;
}

//业务对象["字段名"] 转数值
//用法：decimal val = gNum<decimal>(业务对象["控件编码"])
public static T gNum<T>(object val) where T: struct
{
    string valStr = gStr(val);
    if(string.IsNullOrWhiteSpace(valStr))
    {
        val = 0;
    }
    return (T) Convert.ChangeType(val, typeof (T));
}

//将子表内某个控件值相加得到数值
//用法：decimal val = gSum<decimal>(业务对象["子表编码"], "子表内控件编码")
public static T gSum<T>(object objArray, string field) where T: struct
{
    object val = 0;
    if(objArray == null)
    {
        return (T) Convert.ChangeType(val, typeof (T));
    }
    H3.DataModel.BizObject[] bObjArray = (H3.DataModel.BizObject[]) objArray;
    if(bObjArray == null || bObjArray.Length == 0)
    {
        return (T) Convert.ChangeType(val, typeof (T));
    }
    decimal sVal = 0;
    foreach(H3.DataModel.BizObject bObj in bObjArray) 
    {
        decimal v = gNum<decimal>(bObj[field]);
        sVal += v;
    }
    val = sVal;
    return (T) Convert.ChangeType(val, typeof (T));
}

//业务对象["字段名"] 转DateTime，返回true代表转换成功
//用法：DateTime val = DateTime.MinValue;  if(tTime(业务对象["子表编码"], out val)){ }
public static bool tTime(object val, out DateTime time)
{
    string valStr = gStr(val);
    return DateTime.TryParse(valStr, out time);
}

//业务对象["字段名"] 转DateTime，转换成功返回日期，转换失败返回传入的默认值
//用法：DateTime val = gTime(业务对象["子表编码"], DateTime.MinValue);
public static DateTime gTime(object val, DateTime defaultTime)
{
    string valStr = gStr(val);
    if(string.IsNullOrWhiteSpace(valStr))
    {
        return defaultTime;
    }
    DateTime outTime = defaultTime;
    if(DateTime.TryParse(valStr, out outTime)) 
    {
        return outTime;
    } else
    {
        return defaultTime;
    }
}

//当字符串长度超过200，截取前200字符，适用于给单行文本控件赋值时
//用法：string val = g200Str("很长的字符串");
public static string g200Str(string str)
{
    if(!string.IsNullOrWhiteSpace(str) && str.Length > 200)
    {
        return str.Substring(0, 200);
    }
    return str;
}

//当字符串长度超过2000，截取前2000字符，适用于给多行文本控件赋值时
//用法：string val = g2000Str("很长的字符串");
public static string g2000Str(string str)
{
    if(!string.IsNullOrWhiteSpace(str) && str.Length > 2000)
    {
        return str.Substring(0, 2000);
    }
    return str;
}

//中国式四舍五入，num参数为金额，digits为需要保留的小数位
//用法：decimal val = gRound(123.456m, 2);
public static decimal gRound(decimal num, int digits)
{
    return System.Math.Round(num, digits, System.MidpointRounding.AwayFromZero);
}
```


## [后端]自动每500条批量提交一次业务对象

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

``` cs
//批量提交业务对象，mode取值：Create/Update/Remove
//注意：waitCommitBoList里只能添加同一种模式的待提交业务对象，如果待提交业务对象不是同种模式，请拆分成多个list调用本方法
public static void BatchCommitData(H3.IEngine engine, List < H3.DataModel.BizObject > waitCommitBoList, string mode)
{
    if(waitCommitBoList == null || waitCommitBoList.Count == 0)
    {
        return;
    }

    H3.DataModel.BulkCommit commit = new H3.DataModel.BulkCommit();
    string errorMsg = null;

    int count = 0;
    for(int i = 0;i < waitCommitBoList.Count; i++)
    {
        if(mode == "Create")
        {
            waitCommitBoList[i].Create(commit);
        } else if(mode == "Update")
        {
            waitCommitBoList[i].Update(commit);
        } else if(mode == "Remove")
        {
            waitCommitBoList[i].Remove(commit);
        } else
        {
            throw new Exception("mode值有误！");
        }

        count += 1;
        if(count >= 500)
        {
            commit.Commit(engine.BizObjectManager, out errorMsg);
            if(!string.IsNullOrEmpty(errorMsg))
            {
                throw new Exception("批量" + mode + "数据失败：" + errorMsg);
            }
            commit = new H3.DataModel.BulkCommit();
            count = 0;
        }
    }
    if(count > 0)
    {
        commit.Commit(engine.BizObjectManager, out errorMsg);
        if(!string.IsNullOrEmpty(errorMsg))
        {
            throw new Exception("批量" + mode + "数据失败：" + errorMsg);
        }
    }
}
```


## [后端]通过筛选器分页获取某表单全部业务对象

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

``` cs
//分页轮询查询出所有数据
public static List < H3.DataModel.BizObject > GetAllBizObject(H3.IEngine engine, H3.DataModel.BizObjectSchema schema)
{
    List < H3.DataModel.BizObject > boList = new List<H3.DataModel.BizObject>();
    int pageIndex = 0;
    int pageSize = 1000; //由于H3.DataModel.BizObject.GetList每次最多只返回1000条，所以每页数据量最大只能设置1000
    while(true)
    {
        H3.Data.Filter.Filter filter = new H3.Data.Filter.Filter();
        H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();

        //此处演示只查询所有生效数据，如想查询其他状态，可自行调整
        andMatcher.Add(new H3.Data.Filter.ItemMatcher("Status", H3.Data.ComparisonOperatorType.Equal, H3.DataModel.BizObjectStatus.Effective));

        filter.FromRowNum = pageIndex * pageSize;
        filter.ToRowNum = (pageIndex + 1) * pageSize;

        //由于是分页查询，所以要加上按创建时间排序，可以避免查出重复数据
        filter.AddSortBy("CreatedTime", H3.Data.Filter.SortDirection.Ascending);

        filter.Matcher = andMatcher;
        H3.DataModel.BizObject[] boArray = H3.DataModel.BizObject.GetList(engine, H3.Organization.User.SystemUserId, schema, H3.DataModel.GetListScopeType.GlobalAll, filter);
        if(boArray == null || boArray.Length == 0)
        {
            break;
        }

        foreach(H3.DataModel.BizObject bo in boArray) 
        {
            if(bo == null)
            {
                continue;
            }
            boList.Add(bo);
        }

        // 当本次返回数据量已不足每页大小，说明已无需再查下一页了，直接终止轮询
        if(boArray.Length < pageSize)
        {
            break;
        }

        pageIndex++;
    }

    return boList;
}
```


## [后端]将对象数组JSON转成List<Dictionary<string,object>>

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

``` cs
//json转List，json格式必须是：[{ "k1": "v1", "k2": "v2" }, { "k1": "v3", "k2": "v4" }]
public List < Dictionary < string, object >> JsonToObjectList(string jsonStr)
{
    if(string.IsNullOrWhiteSpace(jsonStr)) 
    {
        return null;
    }

    object[] objArray = this.Deserialize<object[]>(jsonStr);
    if(objArray == null || objArray.Length == 0) 
    {
        return null;
    }

    List < Dictionary < string, object >> dataList = new List<Dictionary<string, object>>();
    foreach(object obj in objArray) 
    {
        string dataStr = obj + string.Empty;
        if(string.IsNullOrWhiteSpace(dataStr))
        {
            continue;
        }
        Dictionary < string, object > data = this.Deserialize<Dictionary<string, object>>(dataStr);
        if(data == null || data.Count == 0) 
        {
            continue;
        }

        dataList.Add(data);
    }

    return dataList;
}
```


## [前端]控件值转数值类型

``` js
//前端转数值，传入GetValue函数返回的值，本函数会返回number类型
//如果转换失败，返回0
function convertToNumber( v ) {
    if( typeof v === "string" ) {
        if( v && v.length ) {
            try {
                return parseFloat( v );
            } catch( e ) {
                return 0;
            }
        }
    } else if( typeof v === "number" ) {
        return v;
    }

    return 0;
}
```


## [前端]控件值转字符串

``` js
//转字符串，传入GetValue函数返回的值，本函数会返回string类型
//如果传入值不是string或number类型，则返回空字符串
//方便处理0、""、undefined、null等特殊值
function convertToString( v ) {
    if( typeof v === "string" ) {
        return v;
    } else if( typeof v === "number" ) {
        return v + "";
    }
    return "";
}
```


## [前端]Date Format

氚云前端要给日期控件赋值时，SetValue函数只接收 `yyyy-MM-dd` 和 `yyyy-MM-dd HH:mm:ss` 两种格式的字符串，所以要把当前时间赋值给日期控件，就需要用到这个函数，将当前时间转换为符合要求的格式字符串。

``` js
/**
/* 对Date的扩展，将 Date 转化为指定格式的String
/* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
/* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
/* 使用例子：
/* that.F0000001.SetValue((new Date()).Format("yyyy-MM-dd"));
/* that.F0000001.SetValue((new Date()).Format("yyyy-MM-dd HH:mm:ss"));
*/
Date.prototype.Format = function( fmt ) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor(( this.getMonth() + 3 ) / 3 ), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if( /(y+)/.test( fmt ) ) fmt = fmt.replace( RegExp.$1, ( this.getFullYear() + "" ).substr( 4 - RegExp.$1.length ) );
    for( var k in o )
        if( new RegExp( "(" + k + ")" ).test( fmt ) ) fmt = fmt.replace( RegExp.$1, ( RegExp.$1.length == 1 ) ? ( o[ k ] ) : ( ( "00" + o[ k ] ).substr(( "" + o[ k ] ).length ) ) );
    return fmt;
}
```

此代码定义在前端代码最上面，例：
``` js
//把此函数定义在表单默认代码之上
Date.prototype.Format = function( fmt ) {
    ......省略
}

// 这里是表单默认代码
$.extend($.JForm,{
    // 加载事件
    OnLoad:function(){
        var that = this;

        //注意：在OnLoad里给控件赋值，一定要记得判断当前是新增模式
        if( $.SmartForm.ResponseContext.IsCreateMode ) {
            that.F0000001.SetValue((new Date()).Format("yyyy-MM-dd"));
            that.F0000001.SetValue((new Date()).Format("yyyy-MM-dd HH:mm:ss"));
        }
    },

    ......省略
});
```