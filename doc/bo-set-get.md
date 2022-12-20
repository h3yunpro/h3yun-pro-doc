# 业务对象之控件的取值/赋值

```H3.DataModel.BizObject``` 实现了索引器，可以使用 ```bo["控件编码"]``` 的方式指定控件

取值时由于返回的都是 ```Object``` 类型，所以需要拆箱，例：
```string str = bo["控件编码"] + string.Empty```

赋值时装箱，例：
```bo["控件编码"] = DateTime.Now```

!> 注：本文档中的```bo```变量，指一个```H3.DataModel.BizObject```类型的实例，此实例获取方式可通过以下几种方式获取（具体获取方式文档，请参考[业务对象](/doc/biz-object)）
1. ```H3.DataModel.BizObject bo = this.Request.BizObject;```
2. ```H3.DataModel.BizObject bo = new H3.DataModel.BizObject(engine, schema, H3.Organization.User.SystemUserId);```
3. ```H3.DataModel.BizObject bo = H3.DataModel.BizObject.Load(H3.Organization.User.SystemUserId, engine, schema.SchemaCode, bizObjectId, false);```
4. ```H3.DataModel.BizObject[] boArray = H3.DataModel.BizObject.GetList(engine, H3.Organization.User.SystemUserId, schema, H3.DataModel.GetListScopeType.GlobalAll, filter);  H3.DataModel.BizObject bo = boArray[0];```


下面是控件的取值/赋值详细说明


## 单行文本/多行文本/单选框/下拉框/流水号

此类控件值都是 ```String``` 类型

取值：
``` cs
string str = bo["控件编码"] + string.Empty;
if(string.IsNullOrEmpty(str))
{
    //此控件值为 null 或 空字符串
}
if(string.IsNullOrWhiteSpace(str))
{
    //此控件值为 null 或 空字符串 或 空格
}
```

?> ```+ string.Empty``` 是C#的隐式转换语法，此语法会将null自动处理成空字符串，其他值则自动ToString()

赋值：```bo["控件编码"] = "xxx";```

清空控件值：```bo["控件编码"] = null;```


## 人员单选/部门单选/关联表单

此类控件值都是 ```string``` 类型，区别是：
- 人员单选 值是氚云用户Id
- 部门单选 值是氚云部门Id
- 关联表单 值是关联的表单数据Id

取值：```string userId = bo["控件编码"] + string.Empty;```

赋值：```bo["控件编码"] = "44358530-a4cc-4e9c-9009-2c052f71c706";```

清空控件值：```bo["控件编码"] = null;```


## 人员多选/部门多选/关联表单多选

此类控件值都是 ```string[]``` 类型，区别是：
- 人员多选 值是氚云用户Id数组
- 部门多选 值是氚云部门Id数组
- 关联表单多选 值是关联的表单数据Id数组

取值：
``` cs
string[] userIdArray = (string[]) bo["控件编码"];
if(userIdArray == null || userIdArray.Length)
{
    //此控件值为null 或 无任何元素
} else
{
    //有值时循环获取每个Id
    foreach(string userId in userIdArray) 
    {

    }
}
```

赋值：```bo["控件编码"] = new string[]{ "44358530-a4cc-4e9c-9009-2c052f71c706", "c9afbea4-1800-4708-bb6a-90dd5a46e538" };```

清空控件值：```bo["控件编码"] = null;```


## 日期

此控件值是 ```DateTime``` 类型

取值：
``` cs
string timeStr = bo["控件编码"] + string.Empty;
if(string.IsNullOrWhiteSpace(timeStr))
{
    //此控件值为null
} else
{
    //有值时转换成 DateTime 类型
    DateTime time = DateTime.Parse(timeStr);
}
```

赋值：```bo["控件编码"] = DateTime.Now;```

清空控件值：```bo["控件编码"] = null;```


## 数字

此控件值是 ```decimal``` 类型，

取值：
``` cs
string numStr = bo["控件编码"] + string.Empty;
if(string.IsNullOrWhiteSpace(numStr))
{
    //此控件值为null
} else
{
    //有值时转换成 decimal 类型
    //因为氚云数字控件可配置最多16位小数，所以转成decimal类型（不管配置里小数位数多少，精度都足够）
    decimal num = decimal.Parse(numStr);
}
```

赋值：
1. 赋值一个整数
``` cs
int num = 999;
bo["控件编码"] = num;
```

2. 赋值一个小数
``` cs
//赋值小数时不用double类型，是因为氚云数字控件可配置最多16位小数，而double类型精度不够
//100.22后面有个“m”，是C#的decimal值语法，因为直接写100.22表示的是double类型，而100.22m就能表示是一个decimal类型
decimal num = 100.22m;
bo["控件编码"] = num;
```

清空控件值：```bo["控件编码"] = null;```


## 复选框


## 是/否


## 地址


## 位置




