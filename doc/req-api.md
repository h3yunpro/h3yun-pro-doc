
# 氚云请求第三方Api

第三方Api要求：Http/Https协议，请求参数和响应数据必须是文本类型，且响应数据必须是json格式

步骤：

1. 在 **插件中心** 新建连接（注意：编码框内填连接的代码，不是填UTF-8这种数据编码）
![](../img/req-api-1.png)

![](../img/req-api-2.png)

2. 书写代码，代码中有一个传入参数即连接编码，用来指定使用哪个连接

以下是一个请求示例：

``` cs
//响应数据示例：{"code":200,"ID":"654028207203","msg":"查询成功，查询花费0.0002秒","data":{"Name":"阔克托干村","Province":"新疆维吾尔自治区","City":"伊犁哈萨克自治州","District":"尼勒克县","Tow":"喀拉托别乡","Villag":"阔克托干村","LevelType":"5"}}

//定义 data 属性 的结构体
H3.BizBus.BizStructureSchema dataSchema = new H3.BizBus.BizStructureSchema();
dataSchema.Add(new H3.BizBus.ItemSchema("Name", "返回内容", H3.Data.BizDataType.String, null));
dataSchema.Add(new H3.BizBus.ItemSchema("Province", "返回内容", H3.Data.BizDataType.String, null));
dataSchema.Add(new H3.BizBus.ItemSchema("City", "返回内容", H3.Data.BizDataType.String, null));
dataSchema.Add(new H3.BizBus.ItemSchema("District", "返回内容", H3.Data.BizDataType.String, null));
dataSchema.Add(new H3.BizBus.ItemSchema("Tow", "返回内容", H3.Data.BizDataType.String, null));
dataSchema.Add(new H3.BizBus.ItemSchema("Villag", "返回内容", H3.Data.BizDataType.String, null));
dataSchema.Add(new H3.BizBus.ItemSchema("LevelType", "返回内容", H3.Data.BizDataType.String, null));

//定义响应数据对应的结构体
H3.BizBus.BizStructureSchema structureSchema = new H3.BizBus.BizStructureSchema();
structureSchema.Add(new H3.BizBus.ItemSchema("code", "返回码", H3.Data.BizDataType.Int, null));
structureSchema.Add(new H3.BizBus.ItemSchema("ID", "返回内容", H3.Data.BizDataType.String, null));
structureSchema.Add(new H3.BizBus.ItemSchema("msg", "返回内容", H3.Data.BizDataType.String, null));

//将 data 属性的结构体添加进整个的响应数据结构体
structureSchema.Add(new H3.BizBus.ItemSchema("data", "返回内容", H3.Data.BizDataType.BizStructure, dataSchema));

//header 请求参数初始化
Dictionary < string, string > headers = new Dictionary<string, string>();

//query 请求参数初始化
Dictionary < string, string > querys = new Dictionary<string, string>();
querys.Add("code", "654028207203");

//body 请求数据初始化
Dictionary < string, object > bodys = new Dictionary<string, object>();

//调用Invoke接口，系统底层访问第三方WebService接口的Invoke方法
H3.BizBus.InvokeResult InResult = this.Engine.BizBus.InvokeApi(
    H3.Organization.User.SystemUserId, //固定值，无需改变
    H3.BizBus.AccessPointType.ThirdConnection, //固定值，无需改变
    "cc", //连接编码，对应 插件中心 中配置的连接的编码
    "GET", //请求方式，取值：GET / POST
    "text/html;charset=utf-8", //请求数据类型
    headers, querys, bodys, structureSchema);
if(InResult != null)
{
    int Code = InResult.Code; //调用是否成功
    if(Code == 0)
    {
        //获取返回数据，此对象对应完整的响应json
        H3.BizBus.BizStructure Obj = InResult.Data;

        //获取响应数据中的 ID 属性值
        string ID = Obj["ID"] + string.Empty;

        //获取响应数据中的 data.Name 属性值
        H3.BizBus.BizStructure d = (H3.BizBus.BizStructure) Obj["data"];
        string n = d["Name"] + string.Empty;
    }
    else
    {
        //获取错误信息
        string ErrorMessage = InResult.Message;
        throw new Exception("接口调用失败：" + ErrorMessage);
    }
} else
{
    throw new Exception("接口响应数据为空！");
}
```

!> 注意：连接URL最好使用域名方式，如果使用 IP:Port 方式，端口号可能处于氚云防火墙黑名单中。
如条件受限，只能使用 IP:Port 方式，配置上后，连接请求一直卡死无响应，可以切换到 200-300 范围内的端口试试。