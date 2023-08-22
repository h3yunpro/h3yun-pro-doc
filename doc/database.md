# 数据库表结构详解
 
开发者可以通过3种方式查询数据库数据：
1. [后端代码中执行SQL](/doc/exec-sql)
2. [SQL报表](/doc/sql-report?id=sql报表)
3. [SQL高级数据源](/doc/sql-report)

## [表单]主表

数据库表名：i_表单编码

!> PS：[表单编码查看方式](/doc/check-code?id=表单编码查看)

| **序号** | **字段编码**           | **字段释义**      | **备注**                                     |
|--------|--------------------|---------------|---------------------------------------------|
| 1      | ObjectId           | 数据Id          |  主键，数据的唯一标识                                 |
| 2      | Name               | 数据标题          |                                             |
| 3      | CreatedBy          | 创建人Id         | 对应H_User表ObjectId字段                         |
| 4      | OwnerId            | 归属人Id         | 对应H_User表ObjectId字段                         |
| 5      | OwnerDeptId        | 归属部门Id        | 对应H_Organizationunit表ObjectId字段             |
| 6      | CreatedTime        | 创建时间          |                                             |
| 7      | ModifiedBy         | 最后一次修改数据的人员id |                                             |
| 8      | ModifiedTime       | 最后一次修改数据的时间   |                                             |
| 9      | WorkflowInstanceId | 流程Id          | 当表单有流程，且已发起流程时有值                            |
| 10     | Status             | 数据状态          | 取值：0 草稿，1 生效/流程结束，2 流程进行中，3 作废 |
| ...    | 表单中自定义控件的编码        | 表单内自定义控件的值    | 当自定义控件值未填，数据库存储null，查询null的字段值要用“is null”   |


## [表单]子表

数据库表名：i_子表控件编码

!> PS：[子表控件编码查看方式](/doc/check-code?id=子表编码查看)

| **序号** | **字段编码**            | **字段释义**     | **备注**         |
|--------|---------------------|--------------|-----------------|
| 1      | ObjectId            | 子表数据Id       | 主键，数据的唯一标识      |
| 5      | Name                | 子表数据标题       |                 |
| 2      | ParentObjectId      | 该数据所属主表的数据Id |  对应主表ObjectId字段 |
| 3      | ParentPropertyName  | 子表编码         |                 |
| 4      | ParentIndex         | 本条数据处在子表第几行  | 从0开始，第一行下标：0    |
| ...    | 子表中控件的编码     | 子表内控件的值      | 当自定义控件值未填，数据库存储null，查询null的字段值要用“is null” |


## [系统]公司表

数据库表名：H_Company

| **序号** | **字段编码**           | **字段释义** | **备注**               |
|--------|--------------------|----------|----------------------|
| 1      | ObjectId           | 公司Id     | 主键，公司的唯一标识           |
| 2      | Name               | 公司名称     |                      |
| 3      | Description        | 描述       |                      |
| 4      | Code               | 公司编码     |                      |
| 5      | ManagerId          | 经理       | 对应H_User表ObjectId字段  |
| 6      | SortKey            | 排序值      |                      |
| 7      | ParentObjectId     | 父对象ID    | 暂未使用                 |
| 8      | ParentPropertyName | 父对象属性名称  | 暂未使用                 |
| 9      | ParentIndex        | 父对象索引    | 暂未使用                 |


## [系统]部门表

数据库表名：H_Organizationunit

| **序号** | **字段编码**             | **字段释义**    | **备注**                           |
|--------|----------------------|-------------|----------------------------------|
| 1      | ObjectId             | 部门Id        | 主键，部门的唯一标识                       |
| 2      | Name                 | 部门名称        |                                  |
| 3      | DingTalkDepartmentId | 钉钉中的部门Id    |                                  |
| 4      | WeChatDepartmentId   | 企微中的部门Id    |                                  |
| 5      | ParentId             | 父部门ObjectId | 对应H_Organizationunit表ObjectId字段  |
| 6      | Visibility           | 可见类型        |                                  |
| 7      | State                | 状态          | 取值：0：有效，1：无效                     |
| 8      | Description          | 描述          |                                  |
| 9      | Code                 | 部门编码        |                                  |
| 10     | ManagerId            | 部门经理        | 对应H_User表ObjectId字段              |
| 11     | CreatedTime          | 创建时间        |                                  |
| 12     | ModifiedTime         | 修改时间        |                                  |
| 13     | Sortkey              | 排序值         |                                  |
| 14     | ParentObjectId       | 父对象ID       | 暂未使用                             |
| 15     | ParentPropertyName   | 父对象属性名称     | 暂未使用                             |
| 16     | ParentIndex          | 父对象索引       | 暂未使用                             |


## [系统]用户表

数据库表名：H_User

| **序号** | **字段编码**       | **字段释义**       | **备注**                           |
|--------|---------------------|----------------|----------------------------------|
| 1      | ObjectId            | 氚云用户Id         | 主键，用户的唯一标识                       |
| 2      | State               | 状态               | 取值：0：在职，1：离职                     |
| 3      | Name                | 用户姓名           |                                  |
| 4      | ParentId            | 主部门Id           | 对应H_Organizationunit表ObjectId字段  |
| 5      | ManagerId           | 部门经理用户Id     | 对应H_User表ObjectId字段              |
| 6      | DingTalkAccount     | 对应钉钉用户Id      | 跟钉钉对接时可用，字段值格式：钉钉corpId.钉钉userId    |
| 7      | WechatUserId        | 对应企微用户Id     |                                  |
| 8      | Position            | 职位             |                                  |
| 9      | Mobile              | 手机号            |                                  |
| 10     | Email               | 邮箱             |                                  |
| 11     | EmployeeNumber      | 工号             |                                  |
| 12     | Title               | 用户的职务          |                                  |
| 13     | Birthday            | 生日             |                                  |
| 14     | Gender              | 性别             |                                  |
| 15     | EntryDate           | 入职日期           |                                  |
| 16     | DepartureDate       | 离职日期           |                                  |
| 17     | HomePhone           | 家庭电话           |                                  |
| 18     | OfficePhone         | 办公电话           |                                  |
| 19     | QQ                  | QQ             |                                  |
| 20     | IdNumber            | 身份证号码          |                                  |
| 21     | EmployeeRank        | 员工职级           |                                  |
| 22     | ProfilePhotoUrl     | 头像             |                                  |
| 23     | DepartmentName      | 部门名称           |                                  |
| 24     | Password            | 密码             |                                  |
| 25     | DingId              | 用户DingId       |                                  |
| 26     | ExtAttr             | 扩展属性           |                                  |
| 27     | Visibility          | 可见类型           |                                  |
| 28     | Description         | 描述             |                                  |
| 29     | CreatedTime         | 创建时间           |                                  |
| 30     | ModifiedTime        | 修改时间           |                                  |
| 31     | SortKey             | 排序值            |                                  |
| 32     | ParentObjectId      | 父对象ID          | 暂未使用                             |
| 33     | ParentPropertyName  | 父对象属性名称        | 暂未使用                             |
| 34     | ParentIndex         | 父对象索引          | 暂未使用                             |


## [系统]角色分组表

数据库表名：H_OrgRoleGroup

| **序号** | **字段编码**            | **字段释义** | **备注**                  |
|--------|---------------------|----------|-------------------------|
| 1      | ObjectId            | 角色分组Id   | 主键，角色分组的唯一标识       |
| 6      | Name                | 角色分组名称   |                         |
| 2      | EntryroleGroupId    | 来源Id     | 暂未使用                    |
| 3      | ParentId            | 公司Id     | 对应H_Company表ObjectId字段  |
| 4      | Visibility          | 可见类型     |                         |
| 5      | State               | 状态       | 取值：0：有效，1：无效       |
| 7      | Description         | 描述       | 暂未使用                    |
| 8      | Code                | 分组代码     | 暂未使用                    |
| 9      | ManagerId           | 主管人      | 暂未使用                    |
| 10     | CreatedTime         | 创建时间     |                         |
| 11     | ModifiedTime        | 最后修改时间   |                         |
| 12     | SortKey             | 排序值      |                         |
| 13     | ParentObjectId      | 父对象ID    | 暂未使用                    |
| 14     | ParentPropertyName  | 父对象属性名称  | 暂未使用                    |
| 15     | ParentIndex         | 父对象索引    | 暂未使用                    |


## [系统]角色表

数据库表名：H_OrgRole

| **序号** | **字段编码**           | **字段释义** | **备注**                  |
|--------|--------------------|----------|-------------------------|
| 1      | ObjectId           | 角色Id     | 主键，角色的唯一标识              |
| 2      | Name               | 角色名称     |                         |
| 3      | EntryRoleId        | 来源Id     | 暂未使用                    |
| 4      | GroupId            | 分组Id     | 对应H_OrgRoleGroup表ObjectId字段  |
| 5      | ParentId           | 公司Id     | 对应H_Company表ObjectId字段  |
| 6      | CompanyId          | 公司Id     | 对应H_Company表ObjectId字段  |
| 7      | Visibility         | 可见类型     | 暂未使用                    |
| 8      | State              | 状态       | 取值：0：有效，1：无效            |
| 9      | Description        | 描述       | 暂未使用                    |
| 10     | Code               | 角色编码     | 暂未使用                    |
| 11     | ManagerId          | 主管人      | 暂未使用                    |
| 12     | CreatedTime        | 创建时间     |                         |
| 13     | ModifiedTime       | 修改时间     |                         |
| 14     | Sortkey            | 排序值      |                         |
| 15     | ParentObjectId     | 父对象ID    | 暂未使用                    |
| 16     | ParentPropertyName | 父对象属性名称  | 暂未使用                    |
| 17     | ParentIndex        | 父对象索引    | 暂未使用                    |


## [系统]角色用户关系表

数据库表名：H_Orgpost


## [系统]流程实例表

数据库表名：H_WorkflowInstance


## [系统]流程工作项表

数据库表名：H_WorkItem


## [系统]流程步骤表

数据库表名：H_Token


## [系统]附件信息记录表

数据库表名：H_BizObjectFile


## [系统]审批意见记录表

数据库表名：H_Comment


## [系统]表单信息表

数据库表名：H_PublishedBizObjectSchema


## [系统]表单配置表

数据库表名：H_PublishedFormSetting


## [系统]列表配置表

数据库表名：H_PublishedListViewSetting