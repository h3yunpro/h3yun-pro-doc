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


## 表单后端处理PostForm

``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    Test_Post(actionName, this.Request, response);
    base.OnSubmit(actionName, postValue, response);
}

public void Test_Post(string actionName, H3.SmartForm.SmartFormRequest request, H3.SmartForm.SubmitSmartFormResponse response)
{
    if(actionName != "Test_Post")
    {
        return;
    }

    try
    {
        H3.IEngine engine = request.Engine;
        string currUserId = request.UserContext.UserId;

        string orderDate_Str = request["orderDate"] + string.Empty;
        if(string.IsNullOrWhiteSpace(orderDate_Str))
        {
            throw new Exception("orderDate参数值为空！");
        }
        DateTime orderDate = DateTime.Parse(orderDate_Str);


        response.ReturnData = new Dictionary<string, object>();
        response.ReturnData["data"] = "";
    } catch(Exception ex)
    {
        response.Errors.Add(ex.Message);
    }
}
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

## 列表后端处理Post

``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.ListViewPostValue postValue, H3.SmartForm.SubmitListViewResponse response)
{
    Test_Post(actionName, this.Request, response);
    base.OnSubmit(actionName, postValue, response);
}

public void Test_Post(string actionName, H3.SmartForm.ListViewRequest request, H3.SmartForm.SubmitListViewResponse response)
{
    if(actionName != "Test_Post")
    {
        return;
    }

    try
    {
        H3.IEngine engine = request.Engine;
        string currUserId = request.UserContext.UserId;

        string orderDate_Str = request["orderDate"] + string.Empty;
        if(string.IsNullOrWhiteSpace(orderDate_Str))
        {
            throw new Exception("orderDate参数值为空！");
        }
        DateTime orderDate = DateTime.Parse(orderDate_Str);


        response.ReturnData = new Dictionary<string, object>();
        response.ReturnData["data"] = "";
    } catch(Exception ex)
    {
        response.Errors.Add(ex.Message);
    }
}
```