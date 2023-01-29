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

| 参数                 | 参数类型                       | 必须                   | 说明        |
|--------------------|----------------------------|----------------------|-----------|
| ActionName           | ```String```               | 是                    | 调用的方法名    |
| SchemaCode            | ```String```               | 是                    | 需要查询的表单编码 |
| BizObjectId           | ```String```               | 是                    | 需要查询的数据ID，每个表单都有唯一的ObjectId        |

工具Postman请求：


![logo](../img/open-api-1.png ':size=80%')


![logo](../img/open-api-2.png ':size=80%')