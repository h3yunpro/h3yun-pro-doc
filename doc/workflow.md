# 流程操作

氚云的流程操作API，很关键的一个参数是流程Id，所以开篇，先介绍一下获取流程Id的几种方式：

1. 获取当前流程表单的流程Id

!> 注意：因为只有在表单后端中才能对应上唯一的流程I的，所以以下示例代码仅用于表单后端代码中。

``` cs
protected override void OnLoad(H3.SmartForm.LoadSmartFormResponse response)
{
    string insId = this.Request.InstanceId;

    base.OnLoad(response);
}

protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    string insId = this.Request.InstanceId;

    base.OnSubmit(actionName, postValue, response);
}
```

2. 通过业务对象实例获取流程Id
   
每个业务对象实例对应一条数据，而一条数据只有一个流程，在业务对象中就有一个属性 ```WorkflowInstanceId```，对应的是该数据的流程Id。

业务对象获取可以参考 [业务对象](/doc/biz-object)，这里只做一个简单示例：
``` cs
H3.DataModel.BizObject bo = H3.DataModel.BizObject.Load(H3.Organization.User.SystemUserId, this.Engine, "表单编码", "数据Id", false);
if(bo != null)
{
    string insId = bo.WorkflowInstanceId;
}
```

3. 通过SQL查流程Id

通过表单主表查出数据对应流程Id：
``` sql
SELECT WorkflowInstanceId FROM i_D154601HolidayRecord WHERE ObjectId = '数据Id'
```

通过流程实例表查出数据对应流程Id：
``` sql
SELECT ObjectId FROM H_WorkflowInstance WHERE SchemaCode = '表单编码' AND ObjectId = '数据Id'
```

!> 注意：以下示例中，engine实例获取方式，请参考 [H3.IEngine](/doc/cs-instance?id=h3iengine)

## 重新激活流程

!> 注意：此API只针对已生效/已作废流程使用，并且只调用本API，流程会激活，但是流程不处于任何一个节点上，所以一般需要配合 激活某个活动节点 一起使用。

``` cs
H3.Workflow.Messages.ActivateInstanceMessage actInsMessage = new H3.Workflow.Messages.ActivateInstanceMessage("流程Id");
engine.WorkflowInstanceManager.SendMessage(actInsMessage);
```


## 取消流程

!> 只可对进行中数据使用。

``` cs
H3.Workflow.Messages.CancelInstanceMessage cancelMessage = new H3.Workflow.Messages.CancelInstanceMessage("流程Id", false);
engine.Request.Engine.WorkflowInstanceManager.SendMessage(cancelMessage);
```


## 激活某个活动节点

!> 激活流程节点，只是将流程节点进行了激活，效果类似于管理员手动更换处理节点，无法达到审批人审批通过的效果。一般配合 重新激活流程/取消某个活动节点 一起使用。 

``` cs
string insId = "流程Id";
string activityCode = "流程节点编码";

// 节点审批人，氚云用户Id数组，分两种情况：
// 1、传入用户Id，如：new string[]{ "用户Id 1", "用户Id 2" }，则激活节点后由定义用户审批
///2、传入new string[]{ }，则由流程引擎自动按配置分配审批人
string[] approvalIds = new string[]{ };

//参数对应描述：流程实例ID，活动节点编码，令牌ID，参与者，前驱令牌，是否检测入口条件，激活类型
H3.Workflow.Messages.ActivateActivityMessage actMessage = new H3.Workflow.Messages.ActivateActivityMessage(insId,
    activityCode, H3.Workflow.Instance.Token.UnspecifiedId, approvalIds, null, false, H3.Workflow.WorkItem.ActionEventType.Adjust);

//1.不会取消正在运行的节点。2.进行中的流程才能激活调整。
engine.WorkflowInstanceManager.SendMessage(actMessage);
```


## 取消某个活动节点

!> 注意：必须是已经处于活动中的节点，才能进行取消，在流程日志上，本API操作显示为 已取消。

``` cs
string insId = "流程Id";
string activityCode = "流程节点编码";

H3.Workflow.Messages.CancelActivityMessage cancelMessage = new H3.Workflow.Messages.CancelActivityMessage(insId, activityCode, false);
engine.WorkflowInstanceManager.SendMessage(cancelMessage);
```


## 结束流程/重新激活 事件

当流程状态发生改变时，会触发 ```OnWorkflowInstanceStateChanged``` 事件，该事件有两个传入参数：```oldState```、```newState```，所以就能用来判断当前为结束时触发，还是重新激活时触发。

### 补充条例

* 事件会在业务规则执行后触发
* 当表单配置了流程，在**导入生效数据**时，由于导入时会创建流程并结束流程，所以也会触发本事件
* 本事件无需用户进行调用，将事件写在**表单设计-后端代码**的 ```OnSubmit``` 方法之下即可。当流程状态发生改变时，流程引擎会自动调用 ```OnWorkflowInstanceStateChanged```

代码示例：
``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    base.OnSubmit(actionName, postValue, response);
}

// 放在表单设计-后端代码的 OnSubmit 事件之下，无需在其他地方调用
protected override void OnWorkflowInstanceStateChanged(H3.Workflow.Instance.WorkflowInstanceState oldState, H3.Workflow.Instance.WorkflowInstanceState newState)
{
    // 流程审批结束后
    if(oldState == H3.Workflow.Instance.WorkflowInstanceState.Running && newState == H3.Workflow.Instance.WorkflowInstanceState.Finished)
    {
        // 业务代码
        // 配置了流程，且导入生效数据，也会触发本事件

        // 获取 H3.Iengine 实例
        H3.IEngine engine = this.Engine;

        // 获取当前业务对象
        H3.DataModel.BizObject bo = this.Request.BizObject;
    }

    // 流程重新激活
    if(oldState == H3.Workflow.Instance.WorkflowInstanceState.Finished && newState == H3.Workflow.Instance.WorkflowInstanceState.Running)
    {
        // 业务代码

    }

    base.OnWorkflowInstanceStateChanged(oldState, newState);
}
```

