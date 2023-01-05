# 后端常用实例


## H3.IEngine

```H3.IEngine``` 是各种管理器的总控引擎类。

### 实例获取方式

* 表单/列表后端代码类的任意事件中，均可以通过 ```this.Engine``` 获取，或者通过 ```this.Request.Engine``` 获取
  
* 定时器类 ```OnWork``` 事件中，从传入参数 ```H3.IEngine engine``` 获取
  
* 自定义接口类 ```OnInvoke``` 事件中，可以通过 ```this.Engine``` 获取

### 实例属性

| **属性名**                 | **数据类型**                                      | **说明**                              | **可用性** |
|-------------------------|-----------------------------------------------|-------------------------------------|---------|
| BizBus                  | `H3.BizBus.IBizBus`                             | 集成第三方服务                             | ✔       |
| BizObjectManager        | `H3.DataModel.IBizObjectManager`                | 业务对象数据管理器，用于处理表单数据                  | ✔       |
| EngineSecret            | `String`                                        | 企业引擎密钥                              | ✔       |
| Notifier                | `H3.Notification.INotifier`                     | 通知管理器，用于发送通知                        | ✔       |
| Organization            | `H3.Organization.IOrganization`                 | 组织结构管理器，用户获取部门/人员/角色等信息             | ✔       |
| Query                   | `H3.Query`                                      | 数据库查询器，用于执行SQL                      | ✔       |
| SettingManager          | `H3.Settings.ISettingManager`                   | 配置管理器，可以企业配置                        | ✘       |
| TaskManager             | `H3.Task.ITaskManager`                          | 任务管理器，用于给用户发送任务                     | ✔       |
| TransactionManager      | `H3.Transaction.ITransactionManager`            | 事务管理器，目前无使用用法                       | ✘       |
| UrgencyManager          | `H3.Workflow.WorkItem.IUrgencyManager`          | 催办管理器，用于获取催办及发送催办消息                 | ✔       |
| ViewManager             | `H3.Workflow.WorkItem.IUrgencyManager`          | 表单设计管理器，不推荐使用                       | ✘       |
| WorkflowInstanceManager | `H3.Workflow.Instance.IWorkflowInstanceManager` | 流程实例管理器，用于流程实例创建、获取、删除              | ✔       |
| WorkflowTemplateManager | `H3.Workflow.Template.IWorkflowTemplateManager` | 流程设计模板管理器，用于获取流程设计的模板，创建流程实例时需依据此模板 | ✔       |
| WorkItemManager         | `H3.Workflow.WorkItem.IWorkItemManager`         | 流程项管理器，用于对具体流程项控件，使用场景较少            | ✔       |


## H3.DataModel.BizObjectSchema

```H3.DataModel.BizObjectSchema``` 是表单结构类，实例属性是关于表单的配置信息（如表单中的控件信息，表单名称等）。

### 实例获取方式

* 表单/列表后端代码类的任意事件中，均可以通过 ```this.Request.Schema``` 获取（即获取到的是当前表单结构实例）

* 其他位置，或者获取其他表单结构实例，则指定表单编码获取
``` cs
H3.DataModel.BizObjectSchema schema = engine.BizObjectManager.GetPublishedSchema("表单编码");
``` 



