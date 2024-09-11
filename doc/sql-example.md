# 数据库操作示例


## 通过sql查询人员多选控件数据

```i_D154601test``` 为表单在数据库的表名

```F0000014``` 为人员多选控件的控件编码

查询并解析成一个字段返回：
``` sql
SELECT extractvalue(F0000014, '/ArrayOfString/string') AS userIds
FROM i_D154601test
WHERE ObjectId = '3ad22e16-0962-459d-b6ee-78b762d45416'
```

查询并解析成多行返回：
``` sql
SELECT substring_index(substring_index(a.userIds, ' ', b.help_topic_id + 1), ' ', -1) AS userId
FROM (
	SELECT extractvalue(F0000014, '/ArrayOfString/string') AS userIds
	FROM i_D154601test
	WHERE SeqNo IN ('202200000007', '202200000008')
) a
	JOIN mysql.help_topic b ON b.help_topic_id < length(a.userIds) - length(REPLACE(a.userIds, ' ', '')) + 1
```

> 注：关联 ```mysql.help_topic``` 表的目的是因为里面有一个 0 - 699 的自增字段 ```help_topic_id```。
> 
> 所以，如果有的企业```mysql.help_topic``` 表无数据，只需用户自建一个表单并导入0-999，且增量为1的数据，
> 
> 以模拟出 ```mysql.help_topic``` 表。


## 根据表单编码查询表单名称

?> 编码有可能是表单编码，也可能是子表控件编码，所以此处 ```schemacode``` 和 ```childschemas``` 两个都判断一遍。

``` sql
SELECT SchemaCode AS `主表编码`, ChildSchemas AS `子表编码`, DisplayName AS `主表名称` 
FROM H_PublishedBizObjectSchema 
WHERE SchemaCode = '表单编码' 
OR ChildSchemas LIKE '%表单编码%'
```


## 查询表单/列表中编写的前后端代码

表单设计中的自定义代码：
``` sql
SELECT Javascript AS `旧版前端代码`, NewJsCode AS `新版前端代码`, BehindCode AS `后端代码` 
FROM H_PublishedFormSetting
WHERE SchemaCode = '表单编码'
```

列表设计中的自定义代码：
``` sql
SELECT Javascript AS `前端代码`, BehindCode AS `后端代码` 
FROM H_PublishedListViewSetting
WHERE SchemaCode = '表单编码'
```


## 根据代码片段查询所在的表单

!> 此处代码片段可以是类名、方法名等，当不知道类定义在哪个表单中，可通过此方式来查询。

以表单设计中后端代码片段来查询所在表单：
``` sql
SELECT SchemaCode AS `表单编码`, BehindCode AS `后端代码` 
FROM H_PublishedFormSetting
WHERE BehindCode LIKE '%代码片段%'
```

以列表设计中后端代码片段来查询所在表单：
``` sql
SELECT SchemaCode AS `表单编码`, BehindCode AS `后端代码` 
FROM H_PublishedListViewSetting
WHERE BehindCode LIKE '%代码片段%'
```


## 获取氚云应用在钉钉中的appId

``` sql
SELECT CorpId, 
extractvalue(Agents, '/ArrayOfDingTalkISVAgent/DingTalkISVAgent/AppId') AS `appId`
FROM H_DingtalkIsv
```


## 获取氚云流程表单审批通过时间

``` sql
SELECT
    date_format(b.FinishTime, '%Y-%m-%d %H:%i:%s') AS `审批通过时间`,
    Approval `是否最终审批通过`
FROM
    i_表单编码 a
    LEFT JOIN H_WorkflowInstance b ON a.WorkflowInstanceId = b.ObjectId
WHERE
    b.Approval = 1
```
