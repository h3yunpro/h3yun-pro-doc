# 后端执行SQL
## sql转义换行

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

1. 使用@对字符串进行转义。“”双引号里里面的特殊字符不再具有转义功能，例如\n不再被转义成换行符。

2. 使用@对字符串进行转义，若字符串中包含双引号，则需要在双引号外，再加一个双引号以区分。

``` cs
string sqlString =
                 @"
                SELECT TT.NO, 
                TT.ONE, 
                TT.TWO,
                FROM TABLE_TEMP TT 
                WHERE 
                TT.NO = ""1""  
                ";
```