# 前端常用实例

## $.SmartForm.ResponseContext

```$.SmartForm.ResponseContext``` 仅在表单前端中可用，可以通过此实例属性获取表单的当前状态。

**属性**

| **属性名**            | **数据类型** | **说明**                                                       | **示例** |
|--------------------|----------|--------------------------------------------------------------|--------|
| ActivityCode       |          | 流程节点编码                                                       |        |
| DisplayName        |          | 表单名称                                                         |        |
| FormDataType       |          | 表单数据类型                                                       |        |
| FormMode           |          |  表单模式，0为审批/办理 ，1为办理完结 ，2为创建 ，4为查阅                        |        |
| InstanceId         |          | 当前表单数据的流程实例|        |
| IsCreateMode       |          |  是否创建模式，true：是创建模式|        |
| BizObjectId        |          | 当前对象ID                                                       |        |
| BizObjectStatus    |          | 当前对象状态，值为0表示 草稿；值为1表示 生效/流程结束；值为2表示 流程进行中；值为3表示 作废。|        |
| SchemaCode         |          | 当前SchemaCode                                                 |        |
| IsMobile           |          | 是否移动端，true：是在移动端打开 |        |
| Originator         |          | 发起人用户ID                                                      |        |
| OriginatorCode     |          | 发起人用户名                                                       |        |
| OriginatorParentId |          | 发起人所在部门ID                                                    |        |

**示例**
