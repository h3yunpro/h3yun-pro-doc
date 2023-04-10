# 业务对象之控件的取值/赋值

```H3.DataModel.BizObject``` 实现了索引器，可以使用 ```bo["控件编码"]``` 的方式指定控件

取值时由于返回的都是 ```Object``` 类型，所以需要拆箱，例：
```string str = bo["控件编码"] + string.Empty;```

赋值时装箱，例：
```bo["控件编码"] = DateTime.Now;```

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

?> ```+ string.Empty``` 是 C# 的隐式转换语法，可以不用判断 ```bo["控件编码"]``` 的值是否为 ```null```，会将 null 自动处理成空字符串。

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
if(userIdArray == null || userIdArray.Length == 0)
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

赋值：
``` cs
//此处本应通过查询方式获得Id数组，篇幅原因此处隐去
string[] userIdArray = new string[]{ "44358530-a4cc-4e9c-9009-2c052f71c706", "c9afbea4-1800-4708-bb6a-90dd5a46e538" };
bo["控件编码"] = userIdArray;
```

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
//100.22 后面有个“m”，是C#的decimal值语法，因为直接写 100.22 表示的是double类型，而 100.22m 表示是一个decimal类型
decimal num = 100.22m;
bo["控件编码"] = num;
```

清空控件值：```bo["控件编码"] = null;```


## 复选框

此控件值是 ```string``` 类型，但是值的格式是：```选项值1;选项值2;选项值3```。
<br/>所以，取值时，把值通过 ```;``` 分割，即可得到每个选项值。

取值：
``` cs
//获取复选框控件的值
string str = bo["控件编码"] + string.Empty;

//先定义一个结果数组
string[] value = null;
//判断控件值不为空
if(!string.IsNullOrWhiteSpace(str)) 
{
    //把值通过 ; 符号分割，即可得到所有选项值的数组
    value = str.Split(new char[]{ ';'});
}

if(value == null || value.Length == 0)
{
    //结果无值
} else
{
    //结果有值
    //循环获取每个选项值
    foreach(string item in value) 
    {

    }
}
```

赋值：
``` cs
bo["控件编码"] = "选项1;选项2";
```

清空控件值：```bo["控件编码"] = null;```


## 是/否

此控件值是 ```bool``` 类型

取值：
``` cs
//由于控件值可能为null，直接转bool类型有风险，先转成string类型判断一下是否是空值，比较保险
string str = bo["控件编码"] + string.Empty;

//定义一个bool类型的结果
bool value = false;
if(!string.IsNullOrWhiteSpace(str))
{
    //当控件值不为空，则将string转成bool类型
    value = bool.Parse(str);
}

//判断 是/否 控件值
if(value)
{
    //选择了 是
} else
{
    //选择了 否
}
```

赋值：```bo["控件编码"] = true;```

清空控件值：
``` cs
//由于此控件按设计来说，取值只有两种，所以若要清空控件值，设置为 false 即可。
bo["控件编码"] = false;
```


## 地址

此控件值是 ```string``` 类型的JSON字符串，格式如：
``` js
{"adcode":"440305","adname":"广东省 深圳市 南山区","Detail":"科兴科学园B1栋"}
```

取值：
``` cs
string str = bo["控件编码"] + string.Empty;
if(string.IsNullOrWhiteSpace(str))
{
    //此控件值为 null 或 空字符串 或 空格
} else
{
    //此控件有值
}
```

赋值：
``` cs
bo["控件编码"] = "{\"adcode\":\"440305\",\"adname\":\"广东省 深圳市 南山区\",\"Detail\":\"科兴科学园B1栋\"}";
```

清空控件值：```bo["控件编码"] = null;```


## 位置

此控件值是 ```string``` 类型的JSON字符串，格式如：
``` js
{"Address":"深圳市南山区科技南十路航天科技研究院","Point":{"lat":"21.345","lng":"114.454"}}
```

取值：
``` cs
string str = bo["控件编码"] + string.Empty;
if(string.IsNullOrWhiteSpace(str))
{
    //此控件值为 null 或 空字符串 或 空格
} else
{
    //此控件有值
}
```

赋值：
``` cs
bo["控件编码"] = "{\"Address\":\"深圳市南山区科技南十路航天科技研究院\",\"Point\":{\"lat\":\"21.345\",\"lng\":\"114.454\"}}";
```

清空控件值：```bo["控件编码"] = null;```


## 附件/图片

!> 此控件取值赋值，不能在表单数据未保存之前，比如在 ```base.OnSubmit(actionName, postValue, response);``` 代码之前获取当前表单的附件/图片，或者复制当前表单的附件/图片到另外表单。
<br/>正确做法应该是在 ```base.OnSubmit(actionName, postValue, response);``` 之后对当前表单的附件/图片进行操作。

取值：
<br/>附件/图片 控件，无法通过业务对象取值，若要获取附件Id，使用SQL查询 ```H_BizObjectFile``` 表。

赋值：
<br/>附件/图片 控件，无法通过业务对象赋值，只可以采用复制附件的方式，进行赋值。

复制 附件/图片 示例：

```engine``` 实例获取方式参考 [H3.IEngine](/doc/cs-instance?id=H3IEngine)

``` cs
//主表 复制到 主表 上
engine.BizObjectManager.CopyFiles("来源-主表编码", "", "来源-主表内附件控件编码", "来源-主表数据ObjectId", "目标-主表编码", "", "目标-主表内附件控件编码", "目标-主表数据ObjectId", true, true);

//主表 复制到 子表 上
engine.BizObjectManager.CopyFiles("来源-主表编码", "", "来源-主表内附件控件编码", "来源-主表数据ObjectId", "目标-主表编码", "目标-子表编码", "目标-子表内附件控件编码", "目标-子表数据ObjectId", true, true);

//子表 复制到 主表 上
engine.BizObjectManager.CopyFiles("来源-主表编码", "来源-子表编码", "来源-子表内附件控件编码", "来源-子表数据ObjectId", "目标-主表编码", "", "目标-主表内附件控件编码", "目标-主表数据ObjectId", true, true);

//子表 复制到 子表 上
engine.BizObjectManager.CopyFiles("来源-主表编码", "来源-子表编码", "来源-子表内附件控件编码", "来源-子表数据ObjectId", "目标-主表编码", "目标-子表编码", "目标-子表内附件控件编码", "目标-子表数据ObjectId", true, true);
```

**CopyFiles方法最后两个true的释义：**
<br/>倒数第二个 ```true```：本次复制附件到目标控件是覆盖还是添加（```true```：覆盖，```false```：追加）
<br/>最后一个 ```true```：若本次是覆盖模式，目标控件原先附件是否进行物理删除（```true```：物理删除，```false```：只删除记录）

清空控件值：

```engine``` 实例获取方式参考 [H3.IEngine](/doc/cs-instance?id=H3IEngine)

``` cs
//第一个参数：附件Id，即数据表 H_BizObjectFile 的 ObjectId 字段值
//第二个参数：true（物理删除附件），false（逻辑删除附件，实际附件还保存着，只是无法查到）
engine.BizObjectManager.RemoveFile("附件Id", true);
```
