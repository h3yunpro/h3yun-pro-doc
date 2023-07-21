# 数据库表结构详解
 
开发者可以通过3种方式查询数据库数据：
1. [后端代码中执行SQL](/doc/exec-sql)
2. [SQL报表](/doc/sql-report?id=sql报表)
3. [SQL高级数据源](/doc/sql-report)

## [表单]主表

数据库表名：i_表单编码

!> PS：[表单编码查看方式](/doc/check-code?id=表单编码查看)

| **序号** | **字段中文名**        | **字段英文名**          | **特别值说明**       |
|--------|------------------|--------------------|-----------------|
| 1      | 数据Id             | ObjectId           |                 |
| 2      | 数据标题           | Name               |                 |
| 3      | 创建人Id          | CreatedBy          |                 |
| 4      | 归属人Id          | OwnerId            |                 |
| 5      | 归属部门Id         | OwnerDeptId        |                 |
| 6      | 创建时间           | CreatedTime        |                 |
| 7      | 最后一次修改数据的人员id | ModifiedBy         |                 |
| 8      | 最后一次修改数据的时间   | ModifiedTime       |                 |
| 9      | 流程Id           | WorkflowInstanceId | 当表单有流程，且已发起流程时有值     |
| 10     | 数据状态             | Status             | 值为0表示 草稿； 值为1表示 生效/流程结束； 值为2表示 流程进行中；  值为3表示 作废。       |
| ...    | “表单内自定义控件的值”        | 表单中自定义控件的编码           | 当自定义控件值未填，数据库存储null |


## [表单]子表

数据库表名：i_子表控件编码

!> PS：[子表控件编码查看方式](/doc/check-code?id=子表编码查看)

| **序号** | **字段中文名**                  | **字段英文名**           | **特别值说明**       |
|--------|----------------------------|---------------------|-----------------|
| 1      | 子表数据Id                     | ObjectId            |                 |
| 2      | 该数据所属主表的数据Id（根据此字段值关联主表数据） | ParentObjectId      |                 |
| 3      | 子表编码                       | ParentPropertyName  |                 |
| 4      | 本条数据处在子表第几行                | ParentIndex         | 第一行下标：0 第二行下标：1 |
| 5      | 子表数据标题                     | Name                |                 |
| ...    | “子表内控件的值”                  | 子表中控件的编码（除去子表编码的部分） | 控件值未填，数据库存储null |


## [系统]公司表

数据库表名：H_Company

| **序号** | **字段中文名** | **字段英文名**          |
|--------|-----------|--------------------|
| 1      | 公司唯一标识Id  | ObjectId           |
| 2      | 公司名称      | Name               |
| 3      | 描述        | Description        |
| 4      | 公司编码      | Code               |
| 5      | 经理        | ManagerId          |
| 6      | 排序值       | SortKey            |
| 7      | 父对象ID     | ParentObjectId     |
| 8      | 父对象属性名称   | ParentPropertyName |
| 9      | 父对象索引     | ParentIndex        |


## [系统]部门表

数据库表名：H_Organizationunit

| **序号** | **字段中文名**      | **字段英文名**            |
|--------|----------------|----------------------|
| 1      | 部门唯一标识Id       | ObjectId             |
| 2      | 钉钉中的部门Id     | DingTalkDepartmentId |
| 3      | 企微中的部门Id     | WeChatDepartmentId   |
| 4      | 父部门ObjectId    | ParentId             |
| 5      | 可见类型           | Visibility           |
| 6      | 状态（0：有效，1：无效） | State          |
| 7      | 部门名称           | Name                 |
| 8      | 描述             | Description          |
| 9      | 部门编码           | Code                 |
| 10     | 部门经理           | ManagerId            |
| 11     | 创建时间           | CreatedTime          |
| 12     | 修改时间           | ModifiedTime         |
| 13     | 排序值            | Sortkey              |
| 14     | 父对象ID          | ParentObjectId       |
| 15     | 父对象属性名称        | ParentPropertyName   |
| 16     | 父对象索引          | ParentIndex          |


## [系统]用户表

数据库表名：H_User

| **序号** | **字段中文名**      | **字段英文名**          |
|--------|----------------|--------------------|
| 1      | 用户氚云唯一标识Id     | ObjectId           |
| 2      | 状态（0：在职，1：离职） | State              |
| 3      | 姓名             | Name               |
| 4      | 归属部门ObjectId   | ParentId           |
| 5      | 部门经理用户ObjectId | ManagerId          |
| 6      | 钉钉中用户Id        | DingTalkAccount    |
| 7      | 企微中用户Id        | WechatUserId       |
| 8      | 职位             | Position           |
| 9      | 手机号            | Mobile             |
| 10     | 邮件             | Email              |
| 11     | 工号             | EmployeeNumber     |
| 12     | 用户的职务          | Title              |
| 13     | 生日             | Birthday           |
| 14     | 性别             | Gender             |
| 15     | 入职日期           | EntryDate          |
| 16     | 离职日期           | DepartureDate      |
| 17     | 家庭电话           | HomePhone          |
| 18     | 办公电话           | OfficePhone        |
| 19     | QQ             | QQ                 |
| 20     | 身份证号码          | IdNumber           |
| 21     | 员工职级           | EmployeeRank       |
| 22     | 头像             | ProfilePhotoUrl    |
| 23     | 部门名称           | DepartmentName     |
| 24     | 密码(未使用)        | Password           |
| 25     | 用户DingId中唯一标识  | DingId             |
| 26     | 扩展用属性          | ExtAttr            |
| 27     | 可见类型           | Visibility         |
| 28     | 描述             | Description        |
| 29     | 创建时间           | CreatedTime        |
| 30     | 修改时间           | ModifiedTime       |
| 31     | 排序值            | SortKey            |
| 32     | 未使用            | ParentObjectId     |
| 33     | 未使用            | ParentPropertyName |
| 34     | 未使用            | ParentIndex        |


## [系统]角色分组表

数据库表名：H_OrgRoleGroup

| **序号** | **字段中文名**                      | **字段英文名**          |
|--------|--------------------------------|--------------------|
| 1      | 角色分组Id                         | ObjectId           |
| 2      | 角色分组Id                         | EntryroleGroupId   |
| 3      | 公司数据Id（H_Company数据表ObjectId字段） | ParentId           |
| 4      | （未启用）                          | Visibility         |
| 5      | （未启用）                          | State              |
| 6      | 角色分组名称                         | Name               |
| 7      | （未启用）                          | Description        |
| 8      | （未启用）                          | Code               |
| 9      | （未启用）                          | ManagerId          |
| 10     | 创建时间                           | CreatedTime        |
| 11     | 最后修改时间                         | ModifiedTime       |
| 12     | 在权限管理页面顺序下标（从0开始）     | SortKey            |
| 13     | （未启用）                          | ParentObjectId     |
| 14     | （未启用）                          | ParentPropertyName |
| 15     | （未启用）                          | ParentIndex        |


## [系统]角色表

数据库表名：H_OrgRole


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