# 后端代码示例


## 如何创建带流程的表单数据

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

``` cs
H3.IEngine engine = this.Engine;
//获取表单实例
H3.DataModel.BizObjectSchema schema = engine.BizObjectManager.GetPublishedSchema("表单编码");
//获取当前登录人
string createdBy = this.Request.UserContext.UserId;

H3.DataModel.BizObject newBo = new H3.DataModel.BizObject(engine, schema, H3.Organization.User.SystemUserId);
//将业务对象创建者设置为 当前登录人
newBo.CreatedBy = createdBy;
//将业务对象归属人设置为 当前登录人，注：流程将由归属人发起
newBo.OwnerId = createdBy;

//设置业务对象控件值
newBo["IssueReportName"] = "关于****的整改报告";

//设置业务对象流程实例Id
newBo.WorkflowInstanceId = System.Guid.NewGuid().ToString();
//创建业务对象
newBo.Create();

//启动流程
string workItemID = string.Empty;
string errorMsg = string.Empty;
//获取流程模板
H3.Workflow.Template.WorkflowTemplate wfTemp = engine.WorkflowTemplateManager.GetDefaultWorkflow(schema.SchemaCode);
//发起流程
engine.Interactor.OriginateInstance(newBo.OwnerId, schema.SchemaCode, wfTemp.WorkflowVersion, newBo.ObjectId, newBo.WorkflowInstanceId, H3.Workflow.WorkItem.AccessMethod.Web, true, string.Empty, true, out workItemID, out errorMsg);
if(!string.IsNullOrEmpty(errorMsg))
{
    throw new Exception("流程实例创建失败：" + errorMsg);
}
```

### OriginateInstance方法说明：

方法定义：
``` cs
H3.Workflow.Messages.WorkflowInstanceChangeSet OriginateInstance(
    string userId, //流程发起人，此参数请传业务对象的归属人，传其他用户Id无效
    string schemaCode, //表单编码
    int workflowVersion, //流程版本，此示例中固定从流程模板中获取
    string bizObjectId, //业务对象数据ObjectId
    string instanceId, //流程实例Id
    H3.Workflow.WorkItem.AccessMethod accessPoint, //操作终端，固定值：H3.Workflow.WorkItem.AccessMethod.Web
    bool finishStartActivity, //是否发起时自动提交，true：提交，会自动跳过发起节点，到达下一审批节点；false：仅创建流程但不提交
    string destActivityCode, //目标审批节点编码，固定值：string.Empty
    bool returnWorkItem, //是否返回流程项，固定值：true
    out string workItemId, //返回的流程项Id
    out string errorMessage //创建流程实例失败的异常信息
)
```


## 正则

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

~~~ cs
string input = "1851 1999 1958 1905 2003";
string pattern = @"(?<=19)\d{2}\b";

foreach(System.Text.RegularExpressions.Match match in System.Text.RegularExpressions.Regex.Matches(input, pattern))
{
	string a = match.Value.ToString();
}
~~~


## 目标已有附件保留，新增附件追加

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

``` cs
public void AddFileToBo(H3.IEngine engine, H3.DataModel.BizObject sourBo, string sourFieldCode, string toBoSchemaCode, string toBoId, string toFieldCode)
{
    //删除 对方 指定字段由源数据带过去的附件
    System.Data.DataTable dt = engine.Query.QueryTable(
        "SELECT objectid FROM H_BizObjectFile WHERE fileflag = 0 AND schemacode = @toBoSchemaCode AND propertyname = @toFieldCode AND bizobjectid = @toBoId AND sourcebizobjectid = @sourBoId AND sourcepropertyname = @sourFieldCode", new H3.Data.Database.Parameter[]{
            new H3.Data.Database.Parameter("@toBoSchemaCode", System.Data.DbType.String, toBoSchemaCode),
            new H3.Data.Database.Parameter("@toFieldCode", System.Data.DbType.String, toFieldCode),
            new H3.Data.Database.Parameter("@toBoId", System.Data.DbType.String, toBoId),
            new H3.Data.Database.Parameter("@sourBoId", System.Data.DbType.String, sourBo.ObjectId),
            new H3.Data.Database.Parameter("@sourFieldCode", System.Data.DbType.String, sourFieldCode)
        });
    if(dt != null && dt.Rows.Count > 0)
    {
        foreach(System.Data.DataRow row in dt.Rows) 
        {
            string fId = row["objectid"] + string.Empty;
            if(!string.IsNullOrWhiteSpace(fId))
            {
                engine.BizObjectManager.RemoveFile(fId, true);
            }
        }
    }

    //追加本次附件
    engine.BizObjectManager.CopyFiles(
        sourBo.Schema.SchemaCode, "", sourFieldCode, sourBo.ObjectId,
        toBoSchemaCode, "", toFieldCode, toBoId, false, false
    );
}
```


## 表单提交时汇总子表金额

可用位置：✔表单 / ✘列表 / ✘定时器 / ✘自定义接口

表单设计如下：

![](../img/cs-example-1.png)

``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    //判断本次请求来源为 用户点击 提交/同意 按钮
    if(actionName == "Submit")
    {
        //取出当前表单业务对象
        H3.DataModel.BizObject thisBo = this.Request.BizObject;
        //定义一个 总金额 变量
        decimal sumAmount = 0m;

        //取出 当前表单业务对象 里的 子表业务对象 集合
        H3.DataModel.BizObject[] childTableBoArray = (H3.DataModel.BizObject[]) thisBo["D154601Fefba31462e2945208286b4b34b943bad"];
        //判断子表有数据
        if(childTableBoArray != null && childTableBoArray.Length > 0)
        {
            //循环子表每一行的业务对象
            foreach(H3.DataModel.BizObject childTableBo in childTableBoArray) 
            {
                decimal amount = 0m;
                //取出子表行的金额字段值
                string amount_Str = childTableBo["F0000016"] + string.Empty;
                //判断该字段有填写金额
                if(!string.IsNullOrWhiteSpace(amount_Str))
                {
                    amount = decimal.Parse(amount_Str);
                }

                //将当前行的金额字段汇总到 总金额 变量
                sumAmount = sumAmount + amount;
            }
        }

        //将总金额赋值到主表字段（由于本次为提交操作，只需赋值，数据会在base.OnSubmit方法中自动保存到数据库，无需另外做Update操作）
        thisBo["F0000017"] = sumAmount;
    }

    base.OnSubmit(actionName, postValue, response);
}
```


## 给列表增加筛选条件

可用位置：✘表单 / ✔列表 / ✘定时器 / ✘自定义接口

``` cs
protected override void OnInit(H3.SmartForm.LoadListViewResponse response)
{
    H3.SmartForm.ListViewRequest request = this.Request;
    //判断当前模式为列表页面加载模式，且当前登录人不是管理员
    if(request.ListScene == H3.SmartForm.ListScene.NormalList && !request.UserContext.IsAdministrator)
    {
        //判断当前模式为列表页面加载模式
        string isFormControl = request["isFormControl"] == null ? "" : request["isFormControl"].ToString();
        if(isFormControl != "1" && isFormControl != "true")
        {
            H3.IEngine engine = request.Engine;
            
            H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();
            //如果列表没有过滤条件，则request.Filter为null，所以这里需要初始化
            if(request.Filter == null)
            {
                request.Filter = new H3.Data.Filter.Filter();
            }
            //如果列表有其他过滤条件，则把已有过滤条件加入本次筛选对象
            if(request.Filter.Matcher != null)
            {
                andMatcher = (H3.Data.Filter.And) request.Filter.Matcher;
            }

            //添加筛选条件，让用户只能查看草稿数据
            andMatcher.Add(new H3.Data.Filter.ItemMatcher("Status", H3.Data.ComparisonOperatorType.Equal, H3.DataModel.BizObjectStatus.Draft));

            //改变当前列表请求筛选条件
            request.Filter.Matcher = andMatcher;
        }
    }
    
    base.OnInit(response);
}
```