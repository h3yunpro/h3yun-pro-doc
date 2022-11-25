# 后端常用实例

## H3.IEngine

```H3.IEngine``` 是各种管理器的总控引擎。

### 实例获取方式

* 表单/列表后端代码类的任意事件中，均可以通过 ```this.Engine``` 获取，或者通过 ```this.Request.Engine``` 获取

* 定时器类 ```OnWork``` 事件中，从传入参数 ```H3.IEngine engine``` 获取

* 自定义接口类 ```OnInvoke``` 事件中，可以通过 ```this.Engine``` 获取

### 属性

- BizBus：集成第三方服务，类型：```H3.BizBus.IBizBus```

- BizObjectManager：业务对象数据管理器，用于处理业务数据，类型：```H3.DataModel.IBizObjectManager```
  
- EngineSecret：企业引擎密钥，类型：```String```
  
- Notifier：通知管理器，用于发送通知，类型：```H3.Notification.INotifier```
  
- Organization：组织结构管理器，用户获取部门/人员/角色等信息，类型：```H3.Organization.IOrganization```
  
- Query：数据库查询器，用于直接连接数据库，类型：```H3.Query```

- SettingManager：（**使用有风险**）配置管理器，可以企业配置，类型：```H3.Settings.ISettingManager```

- TaskManager：任务管理器，用于给用户发送任务，类型：```H3.Task.ITaskManager```

- TransactionManager：事务管理器，目前无使用用法，类型：```H3.Transaction.ITransactionManager```

- UrgencyManager：催办管理器，用于获取催办及发送催办消息，类型：```H3.Workflow.WorkItem.IUrgencyManager```

- ViewManager：（**使用有风险**）表单设计管理器，不推荐使用，类型：```H3.Workflow.WorkItem.IUrgencyManager```

- WorkflowInstanceManager：流程实例管理器，用于流程实例创建、获取、删除，类型：```H3.Workflow.Instance.IWorkflowInstanceManager```

- WorkflowTemplateManager：流程设计模板管理器，用于获取流程设计的模板，创建流程实例时需依据此模板，类型：```H3.Workflow.Template.IWorkflowTemplateManager```

- WorkItemManager：流程项管理器，用于对具体流程项控件，使用场景较少，类型：```H3.Workflow.WorkItem.IWorkItemManager```