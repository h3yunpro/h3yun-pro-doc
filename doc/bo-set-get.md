# 业务对象之控件的取值/赋值

```H3.DataModel.BizObject``` 实现了索引器，可以使用 ```bo["控件编码"]``` 的方式指定控件

取值时由于返回的都是 ```Object``` 类型，所以需要拆箱，例：
```string str = bo["控件编码"] + string.Empty```

赋值时需要装箱，例：
```bo["控件编码"] = DateTime.Now```

下面是关于此项的详细说明


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

?> ```+ string.Empty``` 是C#的隐式转换的语法，此语法会自动处理null值和ToString()，null会自动处理成空字符串，其他值则自动ToString()

赋值：```bo["控件编码"] = "xxx";```

清空该控件值：```bo["控件编码"] = null;```


## 人员单选/部门单选/关联表单

此类控件值都是 ```String``` 类型，区别是：
- 人员单选 值是氚云用户Id
- 部门单选 值是氚云部门Id
- 关联表单 值是关联的表单数据Id

取值：```string userId = bo["控件编码"] + string.Empty;```

赋值：```bo["控件编码"] = "44358530-a4cc-4e9c-9009-2c052f71c706";```

清空该控件值：```bo["控件编码"] = null;```


## 人员多选/部门多选/关联表单多选

此类控件值都是 ```String[]``` 类型，区别是：
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

清空该控件值：```bo["控件编码"] = null;```


## 日期


## 数字


## 复选框


## 是/否


## 地址


## 位置




