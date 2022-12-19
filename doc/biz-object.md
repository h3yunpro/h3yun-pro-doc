# 业务对象

数据类型：```H3.DataModel.BizObject```

在表单设计后端代码中，获取当前表单数据的业务对象：```this.Request.BizObject```（注：前端通过Post请求后端时，当前业务对象无数据）


## 系统属性

| 属性名                | 数据类型                         | 释义                                                          | 是否必填 |
|--------------------|------------------------------|--------------------------------------------------------------------|--------|
| ObjectId           | String                       | 数据Id，用于标识表单数据的唯一值，通过GUID生成                         | 必填   |
| Name               | String                       | 数据标题，显示在列表页和关联表单控件上，方便用户浏览和选择               |      |
| OwnerId            | String                       | 拥有者，值为氚云用户Id，不管表单上是否有此控件，此值都会有               | 必填   |
| OwnerDeptId        | String                       | 所属部门，值为氚云部门Id，不管表单上是否有此控件，此值都会有             | 必填   |
| Status             | H3.DataModel.BizObjectStatus | 数据状态（草稿/流程进行中/生效/作废），不管表单上是否有此控件，此值都会有 | 必填   |
| WorkflowInstanceId | String                       | 流程实例Id                                                           |      |
| CreatedBy          | String                       | 创建人，值为氚云用户Id，不管表单上是否有此控件，此值都会有               | 必填   |
| CreatedTime        | DateTime                     | 创建时间，不管表单上是否有此控件，此值都会有                            | 必填   |
| ModifiedBy         | String                       | 数据修改者，值为氚云用户Id，不管表单上是否有此控件，此值都会有           |      |
| ModifiedTime       | DateTime                     | 修改时间，不管表单上是否有此控件，此值都会有                            |      |

?>  Status 枚举值：<br/>
    ```H3.DataModel.BizObjectStatus.Draft```：草稿，数据库中对应值 0 <br/>
    ```H3.DataModel.BizObjectStatus.Running```：流程进行中，数据库中对应值 2 <br/>
    ```H3.DataModel.BizObjectStatus.Effective```：数据生效，数据库中对应值 1 <br/>
    ```H3.DataModel.BizObjectStatus.Canceled```：数据作废，数据库中对应值 3 <br/>

?> 以上的系统属性对应的控件，不管表单中是否拖出配置这些控件，业务对象都会有这些属性，并且数据库的表中也会有对应字段


## 静态方法

### H3.DataModel.BizObject.GetList

用于批量获取业务对象实例

方法传入参数：
- ```H3.IEngine engine```：总控引擎，文档参考 [H3.IEngine](/doc/cs-instance?id=H3.IEngine)

- ```string userId```：查询人的用户Id，一般使用System用户 ```H3.Organization.User.SystemUserId```

- ```H3.DataModel.BizObjectSchema schema```：表单模型实例

- ```H3.DataModel.GetListScopeType getListScopeType```：查询范围，一般使用不限范围的全局查询 ```H3.DataModel.GetListScopeType.GlobalAll```

- ```H3.Data.Filter.Filter filter```：过滤器对象

方法返回：```H3.DataModel.BizObject[]```，业务对象实例数组

使用示例：
``` cs
H3.IEngine engine = this.Engine;
H3.DataModel.BizObjectSchema schema = engine.BizObjectManager.GetPublishedSchema("表单编码");

//构建过滤器
H3.Data.Filter.Filter filter = new H3.Data.Filter.Filter();
//构造And匹配器
H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();
//添加匹配条件，筛选生效的数据   
andMatcher.Add(new H3.Data.Filter.ItemMatcher("Status", H3.Data.ComparisonOperatorType.Equal, H3.DataModel.BizObjectStatus.Effective));
filter.Matcher = andMatcher;

//调用 H3.DataModel.BizObject.GetList，获取符合条件的数据
H3.DataModel.BizObject[] boArray = H3.DataModel.BizObject.GetList(engine, H3.Organization.User.SystemUserId, schema, H3.DataModel.GetListScopeType.GlobalAll, filter);
if(boArray == null || boArray.Length == 0)
{
    //无符合条件的数据
} else
{
    //有数据时，循环获取数组中每个元素（即每个业务对象实例）
    foreach(H3.DataModel.BizObject bo in boArray) 
    {

    }
}

base.OnLoad(response);
```

### H3.DataModel.BizObject.Load

用于根据数据Id获取单个业务对象实例

方法传入参数：
- ```string userId```：查询人的用户Id，一般使用System用户 ```H3.Organization.User.SystemUserId```
  
- ```H3.IEngine engine```：总控引擎，文档参考 [H3.IEngine](/doc/cs-instance?id=H3.IEngine)
  
- ```string schemaCode```：表单编码
  
- ```string objectId```：数据Id
  
- ```bool requireRelatedObjects```：是否需要相关对象，固定使用 ```false```

方法返回：```H3.DataModel.BizObject```，业务对象实例

使用示例：
``` cs
H3.IEngine engine = this.Engine;
string schemaSchema = "表单编码";
string bizObjectId = "数据Id";

//调用 H3.DataModel.BizObject.Load，获取数据Id对应业务对象实例
H3.DataModel.BizObject bo = H3.DataModel.BizObject.Load(H3.Organization.User.SystemUserId, engine, schema.SchemaCode, bizObjectId, false);
if(bo != null)
{
    /*****获取到数据*****/

    //获取数据标题
    string boName = bo["Name"] + string.Empty;

    //获取控件编码为 F0000001 的值
    string fieldValue = bo["F0000001"] + string.Empty;

    //将数据状态改为作废
    bo.Status = H3.DataModel.BizObjectStatus.Canceled;
    //将本次对业务对象实例的修改映射保存到数据库
    bo.Update();
} else
{
    /*****未获取到对应业务对象实例，可能是表单编码有误或者数据Id有误*****/
}
```


## 构造方法

用于创建新的表单数据

方法传入参数：
- ```H3.IEngine engine```：总控引擎，文档参考 [H3.IEngine](/doc/cs-instance?id=H3.IEngine)

- ```H3.DataModel.BizObjectSchema schema```：表单模型实例

- ```string userId```：业务对象创建人的用户Id

使用示例：
``` cs
H3.IEngine engine = this.Engine;
H3.DataModel.BizObjectSchema schema = engine.BizObjectManager.GetPublishedSchema("表单编码");
string userId = "氚云用户Id";

//通过构造方法，实例化一个业务对象
H3.DataModel.BizObject bo = new H3.DataModel.BizObject(engine, schema, H3.Organization.User.SystemUserId);
/*
    注：创建表单数据时，不需要设置的值有：
        ObjectId：构造方法内部会自动通过GUID生成出此值
                  如果要取此值，在 new H3.DataModel.BizObject() 之后便可以通过 bo.ObjectId 获取到
        OwnerDeptId：创建时平台会自动根据 OwnerId 带出所属部门
        CreatedTime：创建时平台会自动设置为当前时间
        Name：创建时平台会自动生成
        SeqNo：创建时平台会自动生成
*/

//设置 创建人
bo.CreatedBy = userId;

//设置 拥有者
bo.OwnerId = userId;

//设置数据状态为草稿，表示本次创建的是草稿状态的表单数据
bo.Status = H3.DataModel.BizObjectStatus.Draft;

//设置控件编码为 F0000001 的值
bo["F0000001"] = "xxx";

//将本业务对象保存到数据库
bo.Create();
```

!> 注意：
<br/>
数据状态设置为 ```H3.DataModel.BizObjectStatus.Running```，并不会自动创建出流程（创建带流程的表单数据，请参考[如何创建带流程的表单数据](/doc/cs-example?id=如何创建带流程的表单数据)）
<br/><br/>
数据状态设置为 ```H3.DataModel.BizObjectStatus.Effective```，在创建时，会自动触发该表单的生效业务规则


## 动态方法

前面两类方法用于在无业务对象实例时，获取/创建 出业务对象。

而动态方法，是在已经得到了业务对象实例，对业务对象进行操作的方法。

### Create方法

Create方法都是搭配构造方法使用，上面的构造方法文档已经做了说明，这里只展示同时创建主表/子表数据的示例

``` cs
H3.IEngine engine = this.Engine;
H3.DataModel.BizObjectSchema parSchema = engine.BizObjectManager.GetPublishedSchema("主表表单编码");
H3.DataModel.BizObjectSchema chiSchema = parSchema.GetChildSchema("子表表单编码");

//在表单设计后端代码的 OnLoad、OnSubmit 事件里，可以通过 this.Request.UserContext.UserId 从请求实例中获取当前操作表单的用户Id（即当前登录人）
string userId = this.Request.UserContext.UserId;

//通过构造方法，实例化一个主表业务对象
H3.DataModel.BizObject parBo = new H3.DataModel.BizObject(engine, parSchema, H3.Organization.User.SystemUserId);
/*
    注：创建主表表单数据时，不需要设置的值有：
        ObjectId：构造方法内部会自动通过GUID生成出此值
                    如果要取此值，在 new H3.DataModel.BizObject() 之后便可以通过 parBo.ObjectId 获取到
        OwnerDeptId：创建时平台会自动根据 OwnerId 带出所属部门
        CreatedTime：创建时平台会自动设置为当前时间
        Name：创建时平台会自动生成
        SeqNo：创建时平台会自动生成
*/

//设置 创建人 为当前登录人
parBo.CreatedBy = userId;

//设置 拥有者 为当前登录人
parBo.OwnerId = userId;

//设置数据状态为草稿，表示本次创建的是草稿状态的表单数据
parBo.Status = H3.DataModel.BizObjectStatus.Draft;

//设置控件编码为 F0000001 的值
parBo["F0000001"] = "xxx";


/*****Start 下面开始演示定义一个子表业务对象*****/

//子表每一行都是一个业务对象，所以这里需要定义一个List集合变量
List < H3.DataModel.BizObject > chiBoList = new List<H3.DataModel.BizObject>();

//通过构造函数，new一个子表业务对象
H3.DataModel.BizObject chiBo = new H3.DataModel.BizObject(engine, chiSchema, H3.Organization.User.SystemUserId);
/*
    注：创建子表业务对象时，由于系统字段只有 ObjectId、Name，而这两个字段都是会自动生成的。
        所以设置子表业务对象时，可以只用设置子表内的控件值
*/

//设置子表内控件编码为 F0000002 的值，此控件为日期控件，此处将当前系统时间赋值给它
chiBo["F0000002"] = DateTime.Now;

//将这个子表业务对象，添加到List集合里
chiBoList.Add(chiBo);
/*****End*****/


/*****Start 下面开始演示通过查询出另一个表单的数据，通过该表数据循环创建出子表业务对象*****/
//此处为了节省篇幅，就不做注释了
H3.DataModel.BizObjectSchema otherSchema = engine.BizObjectManager.GetPublishedSchema("另一个表单的表单编码");
H3.Data.Filter.Filter filter = new H3.Data.Filter.Filter();
H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();
andMatcher.Add(new H3.Data.Filter.ItemMatcher("Status", H3.Data.ComparisonOperatorType.Equal, H3.DataModel.BizObjectStatus.Effective));
filter.Matcher = andMatcher;
H3.DataModel.BizObject[] otherBoArray = H3.DataModel.BizObject.GetList(engine, H3.Organization.User.SystemUserId, otherSchema, H3.DataModel.GetListScopeType.GlobalAll, filter);
if(otherBoArray != null && otherBoArray.Length > 0)
{
    foreach(H3.DataModel.BizObject otherBo in otherBoArray) 
    {
        H3.DataModel.BizObject newChiBo = new H3.DataModel.BizObject(engine, chiSchema, H3.Organization.User.SystemUserId);
        //将otherBo的 F0000002 控件值，赋值给 newChiBo 的 F0000002 控件
        newChiBo["F0000002"] = otherBo["F0000002"];
        //将newChiBo添加到List集合里
        chiBoList.Add(newChiBo);
    }
}
/*****End*****/


//现在子表业务对象都定义好了，但是只是在List集合里，并未绑定到主表业务对象上，这里就通过给 子表控件赋值 绑定上去
parBo[chiSchema.SchemaCode] = chiBoList.ToArray();

//主表和子表数据都定义好了，这里只用调用创建主表业务对象的 Create，主表和子表数据就可以一起创建出来
parBo.Create();
```