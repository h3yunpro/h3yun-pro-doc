# 第三方调用氚云默认接口
## 查询单条业务数据
LoadBizObject 为加载单个数据，请勿使用该接口来循环加载数据，可以使用LoadBizObjects 来批量加载数据。

请求方式：POST（HTTPS）

请求地址：https://www.h3yun.com/OpenApi/Invoke
请求包体：

~~~cs
{
    "ActionName": "LoadBizObject",
    "SchemaCode": "D0015994821985e8b434394bc0737ffb22a0584",
    "BizObjectId":"b1540570-d463-4325-8ca1-759ec3d7aa03"
}
~~~
参数说明：

| 参数                 | 参数类型                       | 必须                   | 说明        |
|--------------------|----------------------------|----------------------|-----------|
| ActionName           | ```String```               | 是                    | 调用的方法名    |
| SchemaCode            | ```String```               | 是                    | 需要查询的表单编码 |
| BizObjectId           | ```String```               | 是                    | 需要查询的数据ID，每个表单都有唯一的ObjectId        |

工具Postman请求：


![logo](../img/open-api-1.png ':size=80%')



![logo](../img/open-api-4.png ':size=80%')


返回结果：

| 参数            | 说明                   |
|---------------|----------------------|
| Successful    | 返回结果是否成功true/false   |
| ErrorMessage  | 错误信息                 |
| Logined       | 未使用，忽略               |
| ReturnData    | 返回的数据                |
| DataType      | 返回的数据类型，默认0          |


请求示例（C#）：
~~~cs
using Newtonsoft.Json;
using System.Net;
using System.Text;
SelectOneData();//查询单条业务数据-第三方调用氚云OpenApi
void SelectOneData()
{
    //请求地址
    string apiAddress = @"https://www.h3yun.com/OpenApi/Invoke";
    HttpWebRequest request = (System.Net.HttpWebRequest)WebRequest.Create(apiAddress);
    request.Method = "POST";//请求方式
    request.ContentType = "application/json";
    //身份认证参数
    request.Headers.Add("EngineCode", "系统集成中的引擎编码");
    request.Headers.Add("EngineSecret", "系统集成中EngineSecret");
    //参数
    Dictionary<string, object> dicParams = new Dictionary<string, object>();
    dicParams.Add("ActionName", "LoadBizObject");
    dicParams.Add("SchemaCode", "D0015994821985e8b434394bc0737ffb22a0584");
    dicParams.Add("BizObjectId", "b1540570-d463-4325-8ca1-759ec3d7aa03");
    string jsonData = JsonConvert.SerializeObject(dicParams);//序列化参数
    byte[] bytes;
    bytes = System.Text.Encoding.UTF8.GetBytes(jsonData);
    request.ContentLength = bytes.Length;
    using (Stream writer = request.GetRequestStream())//使用该方法 GetRequestStream 获取流，然后写入该流的数据
    {
        writer.Write(bytes, 0, bytes.Length);
        writer.Close();
    }
    string strValue = string.Empty;//返回结果
                                   //HttpWebResponse用于发送 HTTP 请求和接收 HTTP 响应
    using (System.Net.HttpWebResponse response = (System.Net.HttpWebResponse)request.GetResponse())
    {
        using (System.IO.Stream s = response.GetResponseStream())
        {
            string StrDate = string.Empty;
            using (StreamReader Reader = new StreamReader(s, Encoding.UTF8))
            {
                while ((StrDate = Reader.ReadLine()) != null)
                {
                    strValue += StrDate + "\r\n";
                }
            }
        }
        Console.WriteLine(strValue);//输出返回结果
    }
}
~~~