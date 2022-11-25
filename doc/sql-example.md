# 数据库操作示例

## 通过sql查询人员多选控件数据

```i_D154601test``` 为表单在数据库的表名

```F0000014``` 为人员多选控件的控件编码

单查询不解析成多行方法：

``` sql
SELECT extractvalue(F0000014, '/ArrayOfString/string') AS userIds
FROM i_D154601test
WHERE ObjectId = '3ad22e16-0962-459d-b6ee-78b762d45416'
```

查询并解析成多行的方法：

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
> 所以，如果有的企业```mysql.help_topic``` 表无数据，只需用户自建一个表单并导入0-999的数据，
> 
> 以模拟出 ```mysql.help_topic``` 表。

