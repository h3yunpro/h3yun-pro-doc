# 后端代码示例


## [通用]创建带流程的表单数据

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

``` cs
H3.IEngine engine = this.Engine;
//获取表单实例
H3.DataModel.BizObjectSchema schema = engine.BizObjectManager.GetPublishedSchema("表单编码");
//获取当前登录人
string createdBy = this.Request.UserContext.UserId;

H3.DataModel.BizObject newBo = new H3.DataModel.BizObject(engine, schema, H3.Organization.User.SystemUserId);
//将业务对象创建者设置为 当前登录人
newBo.CreatedBy = createdBy;
//将业务对象归属人设置为 当前登录人，注：流程将由归属人发起
newBo.OwnerId = createdBy;

//设置业务对象控件值
newBo["IssueReportName"] = "关于****的整改报告";

//设置业务对象流程实例Id
newBo.WorkflowInstanceId = System.Guid.NewGuid().ToString();
//创建业务对象
newBo.Create();

//启动流程
string workItemID = string.Empty;
string errorMsg = string.Empty;
//获取流程模板
H3.Workflow.Template.WorkflowTemplate wfTemp = engine.WorkflowTemplateManager.GetDefaultWorkflow(schema.SchemaCode);
//发起流程
engine.Interactor.OriginateInstance(newBo.OwnerId, schema.SchemaCode, wfTemp.WorkflowVersion, newBo.ObjectId, newBo.WorkflowInstanceId, H3.Workflow.WorkItem.AccessMethod.Web, true, string.Empty, true, out workItemID, out errorMsg);
if(!string.IsNullOrEmpty(errorMsg))
{
    throw new Exception("流程实例创建失败：" + errorMsg);
}
```

### OriginateInstance方法说明：

方法定义：
``` cs
H3.Workflow.Messages.WorkflowInstanceChangeSet OriginateInstance(
    string userId, //流程发起人，此参数请传业务对象的归属人，传其他用户Id无效
    string schemaCode, //表单编码
    int workflowVersion, //流程版本，此示例中固定从流程模板中获取
    string bizObjectId, //业务对象数据ObjectId
    string instanceId, //流程实例Id
    H3.Workflow.WorkItem.AccessMethod accessPoint, //操作终端，固定值：H3.Workflow.WorkItem.AccessMethod.Web
    bool finishStartActivity, //是否发起时自动提交，true：提交，会自动跳过发起节点，到达下一审批节点；false：仅创建流程但不提交
    string destActivityCode, //目标审批节点编码，固定值：string.Empty
    bool returnWorkItem, //是否返回流程项，固定值：true
    out string workItemId, //返回的流程项Id
    out string errorMessage //创建流程实例失败的异常信息
)
```


## [通用]正则

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

~~~ cs
string input = "1851 1999 1958 1905 2003";
string pattern = @"(?<=19)\d{2}\b";

foreach(System.Text.RegularExpressions.Match match in System.Text.RegularExpressions.Regex.Matches(input, pattern))
{
	string a = match.Value.ToString();
}
~~~


## [通用]目标已有附件保留，追加新增的附件

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

当目标表的附件控件是由多个源表复制过去的，此时只用 CopyFiles 接口的覆盖模式，会把其他源表附件覆盖。<br/>
换成 CopyFiles 接口的追加模式，本条源数据上次追加的附件又不会被清理，就无法显示更新的效果。

所以，本示例先将 本条源数据上次追加的附件 删除，后追加上 本条源数据 的所有附件，就完美解决了以上两个问题。

``` cs
public void AddFileToBo(H3.IEngine engine, H3.DataModel.BizObject sourBo, string sourFieldCode, string toBoSchemaCode, string toBoId, string toFieldCode)
{
    //第一步：删除 目标 中由本条数据带过去的附件
    System.Data.DataTable dt = engine.Query.QueryTable(
        "SELECT objectid FROM H_BizObjectFile WHERE fileflag = 0 AND schemacode = @toBoSchemaCode AND propertyname = @toFieldCode AND bizobjectid = @toBoId AND sourcebizobjectid = @sourBoId AND sourcepropertyname = @sourFieldCode", new H3.Data.Database.Parameter[]{
            new H3.Data.Database.Parameter("@toBoSchemaCode", System.Data.DbType.String, toBoSchemaCode),
            new H3.Data.Database.Parameter("@toFieldCode", System.Data.DbType.String, toFieldCode),
            new H3.Data.Database.Parameter("@toBoId", System.Data.DbType.String, toBoId),
            new H3.Data.Database.Parameter("@sourBoId", System.Data.DbType.String, sourBo.ObjectId),
            new H3.Data.Database.Parameter("@sourFieldCode", System.Data.DbType.String, sourFieldCode)
        });
    if(dt != null && dt.Rows.Count > 0)
    {
        foreach(System.Data.DataRow row in dt.Rows) 
        {
            string fId = row["objectid"] + string.Empty;
            if(!string.IsNullOrWhiteSpace(fId))
            {
                engine.BizObjectManager.RemoveFile(fId, true);
            }
        }
    }

    //第二步：将本条数据的附件以追加的方式赋值到 目标
    engine.BizObjectManager.CopyFiles(
        sourBo.Schema.SchemaCode, "", sourFieldCode, sourBo.ObjectId,
        toBoSchemaCode, "", toFieldCode, toBoId, false, false
    );
}
```


## [通用]通过筛选器分页获取某表单全部业务对象

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

``` cs
//分页轮询查询出所有数据
public static List < H3.DataModel.BizObject > GetAllBizObject(H3.IEngine engine, H3.DataModel.BizObjectSchema schema)
{
    List < H3.DataModel.BizObject > boList = new List<H3.DataModel.BizObject>();
    int pageIndex = 0;
    int pageSize = 1000; //由于H3.DataModel.BizObject.GetList每次最多只返回1000条，所以每页数据量最大只能设置1000
    while(true)
    {
        H3.Data.Filter.Filter filter = new H3.Data.Filter.Filter();
        H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();

        //此处演示只查询所有生效数据，如想查询其他状态，可自行调整
        andMatcher.Add(new H3.Data.Filter.ItemMatcher("Status", H3.Data.ComparisonOperatorType.Equal, H3.DataModel.BizObjectStatus.Effective));

        filter.FromRowNum = pageIndex * pageSize;
        filter.ToRowNum = (pageIndex + 1) * pageSize;

        //由于是分页查询，所以加上按创建时间排序，可以避免某些页中有重复数据
        filter.AddSortBy("CreatedTime", H3.Data.Filter.SortDirection.Ascending);

        filter.Matcher = andMatcher;
        H3.DataModel.BizObject[] boArray = H3.DataModel.BizObject.GetList(engine, H3.Organization.User.SystemUserId, schema, H3.DataModel.GetListScopeType.GlobalAll, filter);
        if(boArray == null || boArray.Length == 0)
        {
            break;
        }

        foreach(H3.DataModel.BizObject bo in boArray) 
        {
            if(bo == null)
            {
                continue;
            }
            boList.Add(bo);
        }

        // 当本次返回数据量已不足每页大小，说明已无需再查下一页了，直接终止轮询
        if(boArray.Length < pageSize)
        {
            break;
        }

        pageIndex++;
    }

    return boList;
}
```


## [通用]CopyFiles图片到目标数据，图片在移动端列表显示

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

``` cs
H3.DataModel.BizObject sourceBo = （省略）;//源数据业务对象
H3.DataModel.BizObject toBo = （省略）;//目标数据业务对象

//将源数据中某图片控件下的图片，复制到目标数据的某图片控件中，并得到复制后的图片信息数组
H3.DataModel.BizObjectFileHeader[] files = this.Engine.BizObjectManager.CopyFiles(sourceBo.Schema.SchemaCode, "", "源数据图片控件编码", sourceBo.ObjectId, toBo.Schema.SchemaCode, "", "目标数据图片控件编码", toBo.ObjectId, true, true);
//将控件中第一张图片设置为移动端列表上的数据图片
toBo.IconId = files[0].FileId;
//更新目标业务对象，提交以上设置
toBo.Update();
```


## [通用]常用的一些Helper方法

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

``` cs
//业务对象["字段名"] 转string
//用法：string val = gStr(业务对象["控件编码"])
public static string gStr(object val)
{
    return val + string.Empty;
}

//业务对象["字段名"] 转bool
//用法：bool val = gBool(业务对象["控件编码"])
public static bool gBool(object val)
{
    string valStr = gStr(val).ToLower();
    if(valStr == "true" || valStr == "1")
    {
        return true;
    }

    return false;
}

//业务对象["字段名"] 转数值
//用法：decimal val = gNum<decimal>(业务对象["控件编码"])
public static T gNum<T>(object val) where T: struct
{
    string valStr = gStr(val);
    if(string.IsNullOrWhiteSpace(valStr))
    {
        val = 0;
    }
    return (T) Convert.ChangeType(val, typeof (T));
}

//将子表内某个控件值相加得到数值
//用法：decimal val = gSum<decimal>(业务对象["子表编码"], "子表内控件编码")
public static T gSum<T>(object objArray, string field) where T: struct
{
    object val = 0;
    if(objArray == null)
    {
        return (T) Convert.ChangeType(val, typeof (T));
    }
    H3.DataModel.BizObject[] bObjArray = (H3.DataModel.BizObject[]) objArray;
    if(bObjArray == null || bObjArray.Length == 0)
    {
        return (T) Convert.ChangeType(val, typeof (T));
    }
    decimal sVal = 0;
    foreach(H3.DataModel.BizObject bObj in bObjArray) 
    {
        decimal v = gNum<decimal>(bObj[field]);
        sVal += v;
    }
    val = sVal;
    return (T) Convert.ChangeType(val, typeof (T));
}

//业务对象["字段名"] 转DateTime，返回true代表转换成功
//用法：DateTime val = DateTime.MinValue;  if(tTime(业务对象["子表编码"], out val)){ }
public static bool tTime(object val, out DateTime time)
{
    string valStr = gStr(val);
    return DateTime.TryParse(valStr, out time);
}

//业务对象["字段名"] 转DateTime，转换成功返回日期，转换失败返回传入的默认值
//用法：DateTime val = gTime(业务对象["子表编码"], DateTime.MinValue);
public static DateTime gTime(object val, DateTime defaultTime)
{
    string valStr = gStr(val);
    if(string.IsNullOrWhiteSpace(valStr))
    {
        return defaultTime;
    }
    DateTime outTime = defaultTime;
    if(DateTime.TryParse(valStr, out outTime)) 
    {
        return outTime;
    } else
    {
        return defaultTime;
    }
}

//当字符串长度超过200，截取前200字符，适用于给单行文本控件赋值时
//用法：string val = g200Str("很长的字符串");
public static string g200Str(string str)
{
    if(!string.IsNullOrWhiteSpace(str) && str.Length > 200)
    {
        return str.Substring(0, 200);
    }
    return str;
}

//当字符串长度超过2000，截取前2000字符，适用于给多行文本控件赋值时
//用法：string val = g2000Str("很长的字符串");
public static string g2000Str(string str)
{
    if(!string.IsNullOrWhiteSpace(str) && str.Length > 2000)
    {
        return str.Substring(0, 2000);
    }
    return str;
}

//中国式四舍五入，num参数为金额，digits为需要保留的小数位
//用法：decimal val = gRound(123.456m, 2);
public static decimal gRound(decimal num, int digits)
{
    return System.Math.Round(num, digits, System.MidpointRounding.AwayFromZero);
}
```


## [表单]提交时汇总子表金额

可用位置：✔表单 / ✘列表 / ✘定时器 / ✘自定义接口

表单设计如下：

![](../img/cs-example-1.png)

``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    //判断本次请求来源为 用户点击 提交/同意 按钮
    if(actionName == "Submit")
    {
        //取出当前表单业务对象
        H3.DataModel.BizObject thisBo = this.Request.BizObject;
        //定义一个 总金额 变量
        decimal sumAmount = 0m;

        //取出 当前表单业务对象 里的 子表业务对象 集合
        H3.DataModel.BizObject[] childTableBoArray = (H3.DataModel.BizObject[]) thisBo["D154601Fefba31462e2945208286b4b34b943bad"];
        //判断子表有数据
        if(childTableBoArray != null && childTableBoArray.Length > 0)
        {
            //循环子表每一行的业务对象
            foreach(H3.DataModel.BizObject childTableBo in childTableBoArray) 
            {
                decimal amount = 0m;
                //取出子表行的金额字段值
                string amount_Str = childTableBo["F0000016"] + string.Empty;
                //判断该字段有填写金额
                if(!string.IsNullOrWhiteSpace(amount_Str))
                {
                    amount = decimal.Parse(amount_Str);
                }

                //将当前行的金额字段汇总到 总金额 变量
                sumAmount = sumAmount + amount;
            }
        }

        //将总金额赋值到主表字段（由于本次为提交操作，只需赋值，数据会在base.OnSubmit方法中自动保存到数据库，无需另外做Update操作）
        thisBo["F0000017"] = sumAmount;
    }

    base.OnSubmit(actionName, postValue, response);
}
```


## [表单]OnLoad事件中获取控件名或设置不可见不可写

可用位置：✔表单 / ✘列表 / ✘定时器 / ✘自定义接口

``` cs
protected override void OnLoad(H3.SmartForm.LoadSmartFormResponse response)
{
    //base.OnLoad 中将 this.Request.BizObject 转换处理为 response.ReturnData
    base.OnLoad(response);

    //对 response.ReturnData 进行处理前，先判断字段是否存在
    if(response.ReturnData != null && response.ReturnData.ContainsKey("F0000004"))
    {
        //获取 F0000004 控件对应的响应数据实例
        H3.SmartForm.SmartFormResponseDataItem item = response.ReturnData["F0000004"];

        //获取 F0000004 控件的标题名
        string fieldLabelName = item.DisplayName;

        //设置 F0000004 控件的标题名
        item.DisplayName = "这是F0000004控件";

        //设置 F0000004 控件不可编辑
        item.Editable = false;

        //设置 F0000004 控件不可见
        item.Visible = false;
    }
}
```


## [表单]获取控件的H3.DataModel.PropertySchema实例

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

``` cs
//总控实例
H3.IEngine engine = this.Engine;

//表单结构实例
H3.DataModel.BizObjectSchema schema = engine.BizObjectManager.GetPublishedSchema("表单编码");

//获取 F0000004 控件实例
H3.DataModel.PropertySchema property = schema.GetProperty("F0000004");

//获取 F0000004 控件的标题名
string fieldLabelName = property.DisplayName;
```


## [表单]提交时获取系统生成的流水号控件值

可用位置：✔表单 / ✘列表 / ✘定时器 / ✘自定义接口

``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    //由于 this.Request.BizObject 在经过 base.OnSubmit 方法后，Status 会发生改变，所以这里先暂存备用
    H3.DataModel.BizObjectStatus beforeStatus = this.Request.BizObject.Status;

    //base.OnSubmit 方法会将本次提交数据保存到数据库，并生成 流水号，所以在提交后立马获取流水号，需要写在 base.OnSubmit 方法之后
    base.OnSubmit(actionName, postValue, response);

    //由于表单头部按钮以及按钮控件都会进入OnSubmit事件，所以写在OnSubmit事件中的代码，都需要判断执行时机，以防误执行
    //判断当前是否是 表单发起提交
    if(
        (actionName == "Submit" && this.Request.IsCreateMode) ||
        (actionName == "Submit" && beforeStatus == H3.DataModel.BizObjectStatus.Draft) ||
        (actionName == "Submit" && this.Request.ActivityCode == "Activity2")
    )
    {
        //将当前业务对象数据重新加载一次，更新业务对象中的 SeqNo 字段值
        this.Request.BizObject.Load();

        //获取系统生成出的流水号控件值
        string seqNo = this.Request.BizObject["SeqNo"] + string.Empty;
    }
}
```


## [表单]用户提交之后，不关闭表单页面

可用位置：✔表单 / ✘列表 / ✘定时器 / ✘自定义接口

!> 注意：由于产品底层设计原因，表单页面头部上的按钮无法隐藏，用户可以继续点击，所以并不推荐使用本功能。

``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    base.OnSubmit(actionName, postValue, response);

    // 判断用户点击的是 提交 按钮
    if(actionName == "Submit")
    {
        response.Message = "提交成功！";// 弹出提示信息
        response.ClosePage = false;// 不允许关闭表单
    }
}
```


## [表单]一张表单提交的手写签名给另一张表单手写签名赋值

可用位置：✔表单 / ✘列表 / ✔定时器 / ✔自定义接口

其他附件复制方法请参考此文档：[附件图片复制](/doc/bo-set-get?id=附件图片)

``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
   
    //base.OnSubmit 方法会将本次提交数据保存到数据库，并生成 手写签名，所以在提交后立马获取手写签名，需要写在 base.OnSubmit 方法之后
    base.OnSubmit(actionName, postValue, response);

    if(actionName == "Submit")
    {
        //主表内手写签名控件 复制到 主表内手写签名控件 上
        this.Request.Engine.BizObjectManager.CopyFiles("原-主表编码", "", "原-主表内手写签名控件编码", "原-主表数据ObjectId", "新-主表编码","", "新-主表内手写签名控件编码", "新-主表数据ObjectId", true, true);
    }
}
```


## [列表]增加筛选条件

可用位置：✘表单 / ✔列表 / ✘定时器 / ✘自定义接口

``` cs
protected override void OnInit(H3.SmartForm.LoadListViewResponse response)
{
    H3.SmartForm.ListViewRequest request = this.Request;
    //判断当前模式为列表页面加载模式，且当前登录人不是管理员
    if(request.ListScene == H3.SmartForm.ListScene.NormalList && !request.UserContext.IsAdministrator)
    {
        //判断当前模式为列表页面加载模式
        string isFormControl = request["isFormControl"] == null ? "" : request["isFormControl"].ToString();
        if(isFormControl != "1" && isFormControl != "true")
        {
            H3.IEngine engine = request.Engine;
            
            H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();
            //如果列表没有过滤条件，则request.Filter为null，所以这里需要初始化
            if(request.Filter == null)
            {
                request.Filter = new H3.Data.Filter.Filter();
            }
            //如果列表有其他过滤条件，则把已有过滤条件加入本次筛选对象
            if(request.Filter.Matcher != null)
            {
                andMatcher = (H3.Data.Filter.And) request.Filter.Matcher;
            }

            //添加筛选条件，让用户只能查看草稿数据
            andMatcher.Add(new H3.Data.Filter.ItemMatcher("Status", H3.Data.ComparisonOperatorType.Equal, H3.DataModel.BizObjectStatus.Draft));

            //改变当前列表请求筛选条件
            request.Filter.Matcher = andMatcher;
        }
    }
    
    base.OnInit(response);
}
```


## [列表]删除时获得用户选择的数据

可用位置：✘表单 / ✔列表 / ✘定时器 / ✘自定义接口

``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.ListViewPostValue postValue, H3.SmartForm.SubmitListViewResponse response)
{
    try
    {
        // 判断用户点击的是删除按钮
        if(actionName == "Remove")
        {
            // 获取用户选择数据的 ObjectId 数组
            string[] selectedIds = (string[]) postValue.Data["ObjectIds"];
            if(selectedIds != null && selectedIds.Length > 0)
            {
                H3.IEngine engine = this.Engine;
                H3.DataModel.BizObjectSchema schema = this.Request.Schema;
                H3.Data.Filter.Filter filter = new H3.Data.Filter.Filter();
                H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();
                andMatcher.Add(new H3.Data.Filter.ItemMatcher("ObjectId", H3.Data.ComparisonOperatorType.In, selectedIds));
                filter.Matcher = andMatcher;
                filter.FromRowNum = 0;
                filter.ToRowNum = 1000;
                H3.DataModel.BizObject[] boArray = H3.DataModel.BizObject.GetList(engine, H3.Organization.User.SystemUserId,
                    schema, H3.DataModel.GetListScopeType.GlobalAll, filter);
                if(boArray != null && boArray.Length > 0)
                {
                    if(boArray.Length != selectedIds.Length)
                    {
                        throw new Exception(schema.DisplayName + "数据查询失败！");
                    }
                    int maxCount = 100;
                    if(boArray.Length > maxCount)
                    {
                        throw new Exception("单次最多处理" + maxCount + "条数据！");
                    }
                    foreach(H3.DataModel.BizObject bo in boArray)
                    {
                        //对选中数据循环处理

                    }
                }
            }
        }
    } catch(Exception ex)
    {
        response.Errors.Add(ex.Message);
        base.OnSubmit(actionName, postValue, response);
        return;
    }

    base.OnSubmit(actionName, postValue, response);
}
```
