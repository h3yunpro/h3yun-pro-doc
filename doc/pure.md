# 纯净代码示例

给氚专老玩家准备，无注释，方便复制粘贴，快速使用

## 定时器

``` cs
public class MyTest_Timer: H3.SmartForm.Timer
{
    public MyTest_Timer() { }

    protected override void OnWork(H3.IEngine engine)
    {
        DateTime nowTime = DateTime.Now;

    }
}
```


## 自定义接口

``` cs
public class MyApiController : H3.SmartForm.RestApiController
{
    public MyApiController(H3.SmartForm.RestApiRequest request) : base(request) { }
    protected override void OnInvoke(string actionName, H3.SmartForm.RestApiResponse response)
    {
        try
        {
            if(actionName == "TestApi")
            {
                string stringValue = this.Request.GetValue<string>("para1",   "defaultValue");
                int intValue = this.Request.GetValue<int>("para2", 0);

                response.ReturnData.Add("result",   "success");
                response.ReturnData.Add("message", string.Empty);
            } else
            {
                response.ReturnData.Add("result", "not found");
                response.ReturnData.Add("message", "无法处理actionName为“" + actionName + "”的请求！");
            }
        } catch(Exception ex)
        {
            response.ReturnData.Add("result", "error");
            response.ReturnData.Add("message", ex.Message);
        }
    }
}
```


## 表单前端PostForm

``` js
$.SmartForm.PostForm( "Test_Post", {
    "para": "123"
}, function( data ) {
    if( data.Errors && data.Errors.length ) {
        $.IShowError( "错误", JSON.stringify( data.Errors ) );
    } else {
        var result = data.ReturnData;

    }
}, function( error ) {
    $.IShowError( "错误", JSON.stringify( error ) );
}, false );
```


## 列表前端Post

``` js
$.ListView.Post( "Test_Post", {
    "para": "123"
}, function( data ) {
    if( data.Errors && data.Errors.length ) {
        $.IShowError( "错误", JSON.stringify( data.Errors ) );
    } else {
        var result = data.ReturnData;

    }
}, function( error ) {
    $.IShowError( "错误", JSON.stringify( error ) );
}, false );
```