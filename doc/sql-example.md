## 数据库操作示例

### 人员多选控件sql解析成多行

注：关联 ```mysql.help_topic``` 表的目的是因为里面有一个 0 - 699 的自增字段 ```help_topic_id```。

所以，如果有的企业```mysql.help_topic``` 表无数据，只需用户自建表单去实现一个自增的 ```help_topic``` 字段数据。

``` sql
SELECT substring_index(substring_index(a.userIds, ' ', b.help_topic_id + 1), ' ', -1) AS userId
FROM (
	SELECT extractvalue(F0000014, '/ArrayOfString/string') AS userIds
	FROM i_D154601test
	WHERE SeqNo IN ('202200000007', '202200000008')
) a
	JOIN mysql.help_topic b ON b.help_topic_id < length(a.userIds) - length(REPLACE(a.userIds, ' ', '')) + 1
```