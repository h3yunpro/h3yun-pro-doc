## 后端代码示例

### 如何创建带流程的表单数据

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

#### OriginateInstance方法说明：

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
