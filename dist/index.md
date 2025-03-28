
# 技术栈

氚云是一款Web端的 ```SaaS```、```aPaaS``` 平台，底层架构通过 ```.NET core```、```MySQL```、```JavaScript``` 开发实现。专业版相对于标准版，解锁了 在线编程、OpenAPI、第三方连接 模块，提供给用户进行二次开发，与第三方平台集成的能力，以满足用户个性化的需求。

因此，在氚云上进行二次开发也需遵循该技术栈。如果你已经是一名 .NET Web 方向的开发者，你可以直接上手氚云，只需要了解氚云特有的api。对于其他技术栈的开发者，氚云特有的api并不多，需学习该技术栈的基本语法后，再上手氚云。

?> PS：如果你的集成第三方需求可以只通过标准OpenApi接口或者配置第三方连接实现，因无需在氚云上写代码，则不要求技术栈。


## 氚云二开语言版本

- 后端 .NET Framework 版本：```.NET Framework 4.6.2```
- 前端 JavaScript 版本：```ECMAScript 5 / ECMAScript 2009```
- MySQL 数据库大部分已升级至8.0版本，但最好是自行执行此语句来验证版本：```SELECT VERSION()```



# 开发工具

氚云开发为在线开发，您无需安装任何开发环境与IDE，在线上编写的代码，点击保存之后，会直接生效到线上环境。

> 对于新手开发者，建议单独建一个测试应用，用于代码测试，以防影响线上应用。


## 代码编辑器

氚云一共有4个代码编辑器界面，分别是：表单设计页面的前端代码、后端代码，列表设计页面的前端代码、后端代码。前端代码中统一使用 ```JavaScript``` 语言开发，后端代码中统一使用 ```C#``` 语言开发。

不清楚代码该写哪里，就看代码执行的时机是在表单页面中，还是在列表页面中。表单设计页中编写表单页面相关的逻辑代码，列表设计页中编写列表页面相关的逻辑代码。例如：
- 表单打开时、点击表单提交按钮、点击表单删除按钮、流程事件 的代码写表单设计页里
- 列表打开时、点击列表删除按钮 的代码写列表设计页里

注意：

- 由于是在线的编辑器，会受限于网络、浏览器等因素，对于代码中关键字和语法的识别不是特别准确，此问题需要慢慢适应

- 后端代码编辑器出现误报，可以尝试先保存代码，若保存成功，说明代码语法无误，随后刷新页面语法就能被识别

- 前端代码编辑器出现误报，只能保存后，在浏览器的开发者工具中才能确认代码是否正确

### 编辑器基本功能

1. 格式化代码

在表单设计/列表设计页面，后端代码和前端代码都可以进行代码格式化，提升代码可读性

同时排除一些影响编译的字符，建议每次编写完代码后都格式化一次代码。

- 在后端代码/前端代码页面，鼠标右键，点击 ```Format Code```

- 在后端代码/前端代码页面，使用快捷键 ```Shift + Alt + F```

2. 代码搜索

- 在后端代码/前端代码页面，鼠标右键，点击 ```Find```

- 在后端代码/前端代码页面，使用快捷键 ```Ctrl + F```

3. 替换代码

- 使用快捷键 ```Ctrl + H```


## 代码调试器

### 列表、表单后端代码调试

- 列表或表单的后端代码调试，都是先在列表界面中，按F12调出代码调试工具（若一直按无反应，可以刷新页面后重试）

- 后端调试器启动完成后，会自动进入调试模式并开始执行代码

- 调试表单后端代码时，点击列表上的数据标题打开表单数据查看页，或者点击新增按钮打开表单数据新增页，此时调试器会自动由列表代码调试转换为表单代码调试

- Mac 电脑通过 fn + 相应的功能键，例如 ```fn + F12```  来打开调试工具
  
- 在调试过程中，右侧的监视窗口会自动输出相关变量值，为变量跟踪、代码调试提供支持（注意：只有显式定义变量才会出现在监视窗口）

> 注：如果后端调试器在启动时，会检验用户编写的代码，如编辑器内未编写任何代码，或者仅有默认代码，后端调试器将会不进入调试模式。

后端代码调试快捷键：

- F10 逐过程执行

- F11 逐句执行单步调试

- F9  加入/取消断点

### 列表、表单前端代码调试

氚云使用的是浏览器自带的开发者工具进行前端代码的调试，在调试之前，需要在前端代码里单独一行加入debugger标记。例：

``` js
//表单设计前端代码
$.extend($.JForm,{
    // 加载事件
    OnLoad:function(){
        //单独一行加入此标记
        debugger

        /**********以下代码为业务代码示例，此示例只需关注上面这个 debugger 这个标记如何添加**********/

        //由于会在回调函数里用到this，而回调函数内直接用this会导致指向错误，所以要在此处先用一个变量存储
        var that = this;
        //设置一个文本框控件值为 test
        that.F0000001.SetValue("test");
    },
    // 按钮事件
    OnLoadActions:function(actions){
    },
    // 提交校验
    OnValidate:function(actionControl){
        //单独一行加入此标记
        debugger

        return true;
    },
    // 提交前事件
    BeforeSubmit:function(action, postValue){
        //单独一行加入此标记
        debugger
    },
    // 提交后事件
    AfterSubmit:function(action, responseValue){
        //单独一行加入此标记
        debugger
    }
});
```

``` js
//列表设计前端代码
$.ListView.ActionPreDo = function( actionCode ) {
    if( actionCode == "按钮编码" ) {
        //单独一行加入此标记
        debugger
    }
};
```

加完 ```debugger``` 标记之后，回到列表页面 --> 刷新页面 --> 通过快捷键 ```**Ctrl + Shift + I**``` 调出开发者工具。<br/>当js引擎执行到debugger标记处，就会自动跳到代码块。

?> ```debugger``` 标记可以直接加在任意要调试的代码前一行，不是一定要加在事件首句。

?> 注：不同电脑和浏览器，打开开发者工具的快捷键会不一样，不清楚的话，可以百度一下。
<br/>未使用过浏览器开发者工具的同学，推荐阅读：[浏览器开发者工具打开与使用](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_are_browser_developer_tools) 。
<br/>前端代码调试，推荐使用Chrome浏览器（开发者调试工具比较全面）


# 常见名词

| **名词**   | **代码**                               | **常见位置** | **示例** |
|----------|--------------------------------------|----------|--------|
| 应用编码     | AppCode                              |          |        |
| 表单编码     | SchemaCode                           |          |        |
| 表单Schema  | H3.DataModel.BizObjectSchema 实例     |          |        |
| 业务对象    | H3.DataModel.BizObject 实例           |          |        |
| 业务对象数据Id / 表单数据Id | 业务对象实例ObjectId属性值，数据库中表单表的 ObjectId字段值             |          |        |
| 用户Id     | H_User表ObjectId字段值            |          |        |
| 部门Id     | H_Organizationunit表ObjectId字段值                 |          |        |
| POST请求后端 | $.SmartForm.PostForm/$.ListView.Post |          |        |

# 应用/表单/控件编码查看

## 应用编码查看

1. 查看方式一：
点击应用重命名 --> 弹出应用信息框 --> 双击选择应用编码复制即可

![](../img/check-app-code-1.png)
![](../img/check-app-code-2.png)

2. 查看方式二：
在浏览器里打开氚云 --> 打开应用内任意一个表单 --> 点击【设计表单】按钮 --> 查看当前网页URL中的appcode参数值（appcode参数值即应用编码）

![](../img/check-app-code-3.png)


## 表单编码查看

1. 查看方式一：
点击 **设计表单** 按钮 --> 点击表单属性 --> 找到表单编码 --> 双击选择表单编码复制即可 

!> 注意：若该表单是在专业版下创建的，灰色框前的D00021也属于表单编码的一部分；而原先在标准版环境下创建，或者是模板表单，灰色框前的D00021并不属于表单编码。<br/><br/>所以，更推荐使用 **方式2** 进行查看，可以无需分辨获取到准确表单编码

![](../img/check-schema-code-1.png)

2. 查看方式二：
点击 **设计表单** 按钮 --> 查看当前网页URL中的id参数值 *id参数值即表单的完整编码，无需判断是否专业版下创建*

![](../img/check-schema-code-2.png)


## 主表控件编码查看

点击 **设计表单** 按钮 --> 点击要查看的控件 --> 右边 **控件属性** 栏内，控件编码框内即为控件编码

![](../img/check-field-code-1.png)


## 子表编码查看

点击 **设计表单** 按钮 --> 在设计页面点击子表控件 --> 右边控件属性中的控件编码即子表编码（*注：编码很长，注意复制完整*）

![](../img/check-schema-code-3.png)


## 子表内控件编码查看

点击 **设计表单** 按钮 --> 子表里的控件 --> 右边 **控件属性** 栏内，控件编码框内即为控件编码（*注：编码很长，只想复制后半部分可用鼠标往右拖动*）

![](../img/check-field-code-2.png)

!> 注意：子表内的控件编码格式是 **子表控件编码.控件编码** <br/> ，但代码中使用时有不同的使用形式，在前端获取控件实例时用完整编码，但在获取数据时只需要取用后半部分，例：完整编码是 ```D154601FChildTable.F0000001``` ，只取用 ```F0000001``` 即可。








# 表单事件

表单页面中的所有操作，都需要在表单设计页面中编写代码，代码需要编写在各种事件内，当对应操作产生时，系统会自动触发事件，以执行用户的自定义代码。


## 表单前端事件

表单前端共有5个事件：
- ```OnLoad```：加载事件，在后端OnLoad事件执行完后，前端会收到响应数据并渲染表单，渲染完成后触发前端的OnLoad事件
- ```OnLoadActions```：在前端OnLoad事件执行完后，会渲染表单头部按钮，每一个按钮会触发一次前端OnLoadActions事件
- ```OnValidate```：在用户点击表单上的按钮时，会触发前端OnValidate事件，此处可以写代码来校验用户填写的数据，以及给控件赋值，```actionControl.Action``` 的值即按钮编码
- ```BeforeSubmit```：在前端OnValidate事件执行完成后，会触发前端BeforeSubmit事件
- ```AfterSubmit```：在后端OnSubmit事件执行完成后，前端会收到响应数据并触发前端AfterSubmit事件


## 表单后端事件

表单后端共有3个事件，其中初始代码中会有2个事件：```OnLoad``` 和 ```OnSubmit```，还有一个 ```OnWorkflowInstanceStateChanged``` 事件在需要时由开发者自行添加到表单类中。

### 表单后端OnLoad事件

```OnLoad``` 为表单页加载事件，打开表单页时，最开始触发的就是本事件，在触发完后才会到达前端的 ```OnLoad``` 事件。

其中 ```base.OnLoad(response);``` 为默认处理，有以下效果：
1. 内部将当前业务对象转换到 ```response``` 上，以响应给前端渲染

!> 注意：此行代码 ```base.OnLoad(response);``` 请保证触发 ```OnLoad``` 事件时都能得到执行（不要删除该行代码，尽量不要放在if判断体内），否则将失去以上列举的效果。

### 表单后端OnSubmit事件

```OnSubmit``` 在**按钮点击**或**Post请求**时触发，此事件的 ```actionName``` 参数非常重要，标识了触发来源。当按钮点击时，```actionName``` 即按钮编码；当Post请求时，```actionName``` 即前端自定义的请求活动名称。

其中 ```base.OnSubmit(actionName, postValue, response);``` 为默认处理，有以下效果：
1. ```actionName``` 为 ```Save/Submit```（即 暂存/提交/同意）时，内部执行保存当前业务对象的操作（保存至数据库）
2. ```actionName``` 为 ```Submit```（即 提交/同意）时，且导致数据生效，则内部自动触发生效的业务规则
3. ```actionName``` 为 ```Remove```（即 删除）时，且删除的是生效数据，则内部自动触发作废的业务规则
4. 内部根据不同的 ```actionName``` 构造不同的 ```response``` 数据，以响应给前端处理

!> 注意：此行代码 ```base.OnSubmit(actionName, postValue, response);``` 请保证触发 ```OnSubmit``` 事件时都能得到执行（不要删除该行代码，尽量不要放在if判断体内），否则将失去以上列举的效果。


### 表单后端OnWorkflowInstanceStateChanged事件

当流程状态发生改变时，会触发 ```OnWorkflowInstanceStateChanged``` 事件，该事件有两个传入参数：```oldState```、```newState```，所以就能用来判断当前为结束时触发，还是重新激活时触发。关于此事件的说明，请参考此文档[流程结束/重新激活 事件](/doc/workflow?id=流程结束重新激活-事件)


## 表单后端判断各种状态

以下状态判断，可用于表单后端的 ```OnLoad```、```OnSubmit``` 两个事件中。

### 判断当前表单数据的数据状态
``` cs
H3.DataModel.BizObjectStatus boStatus = this.Request.BizObject.Status;
if(boStatus == H3.DataModel.BizObjectStatus.Draft)
{
    //草稿
}
if(boStatus == H3.DataModel.BizObjectStatus.Running)
{
    //流程审批进行中（表单有流程时）
}
if(boStatus == H3.DataModel.BizObjectStatus.Effective)
{
    //生效/流程已结束
}
if(boStatus == H3.DataModel.BizObjectStatus.Canceled)
{
    //作废/取消流程后
}
```

### 判断当前流程节点编码
``` cs
string activityCode = this.Request.ActivityCode;
if(activityCode == "流程节点编码")
{
    //本事件触发于xx流程节点
}
```

### 判断表单模式（只用于OnLoad事件中）
``` cs
H3.SmartForm.SmartFormMode formMode = this.Request.FormMode;
if(formMode == H3.SmartForm.SmartFormMode.Create) 
{
    //通过点击列表页上的新增按钮打开表单时，表单处于Create状态
}
if(formMode == H3.SmartForm.SmartFormMode.Edit) 
{
    //暂存后重新打开表单，表单处于Edit状态
    //流程审批过程打开表单，表单处于Edit状态
    //数据生效后，打开本表单，并且点击了编辑按钮，表单处于Edit状态
}
if(formMode == H3.SmartForm.SmartFormMode.View)
{
    //数据生效后，通过数据标题等方式打开本表单查看数据，表单处于View状态
}
```

### 判断表单是否处于新增模式下
``` cs
if(this.Request.IsCreateMode)
{
    //通过点击列表页上的新增按钮打开表单时，IsCreateMode值为true
}
```

### 判断表单是否在移动端打开
``` cs
if(this.Request.IsMobile)
{
    //在移动端打开表单时，IsMobile值为true
}
```

### 判断当前表单是否开启了流程审批
``` cs
if(this.Request.FormDataType == H3.SmartForm.SmartFormDataType.BizObject)
{
    //表单未开启流程
}
if(this.Request.FormDataType == H3.SmartForm.SmartFormDataType.Workflow)
{
    //表单已开启流程
}
```


## 表单后端常用状态判断组合

### 后端OnSubmit事件中判断点击暂存按钮
``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    try
    {
        if(actionName == "Save")
        {
            // 业务代码
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

### 后端OnSubmit事件中判断流程发起时提交
``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    try
    {
        //点提交按钮，有三种情况会发起流程，所以三种情况都需判断
        //三种情况分别是：新增提交、先暂存后提交，流程回到发起节点重新提交
        //一般在做销售出库冻结库存时，经常会在流程发起时冻结库存，所以会用到此示例
        if(
            (actionName == "Submit" && this.Request.IsCreateMode) ||
            (actionName == "Submit" && this.Request.BizObject.Status == H3.DataModel.BizObjectStatus.Draft) ||
            (actionName == "Submit" && this.Request.ActivityCode == "Activity2")
        )
        {
            // 业务代码
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

### 后端OnSubmit事件中判断某个流程节点下点击同意
``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    try
    {
        //由于提交和同意按钮的actionName都是Submit，所以判断同意按钮时，需要联合当前流程节点编码进行判断
        if(actionName == "Submit" && this.Request.ActivityCode == "Activity??")
        {
            // 业务代码
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

### 后端OnSubmit事件中判断流程进行中点击撤回/不同意
``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    try
    {
        //一般在做销售出库冻结库存时，经常会在流程发起时冻结库存，而撤回/不同意时回滚库存，所以会用到此示例
        if(this.Request.BizObject.Status == H3.DataModel.BizObjectStatus.Running &&
            (actionName == "RetrieveInstance" || actionName == "Reject")
        )
        {
            // 业务代码
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

### 后端OnSubmit事件中判断无流程表单的初始提交
``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    try
    {
        //由于提交和同意按钮的actionName都是Submit，所以判断提交时需要联合当前表单状态进行判断
        //并且加上表单为无流程表单的判断
        if(actionName == "Submit"
            && this.Request.FormDataType == H3.SmartForm.SmartFormDataType.BizObject 
            && (this.Request.IsCreateMode || this.Request.BizObject.Status == H3.DataModel.BizObjectStatus.Draft))
        {
            // 业务代码
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

### 后端OnSubmit事件中判断编辑提交
``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    try
    {
        //由于提交和同意按钮的actionName都是Submit，所以判断编辑提交时需要联合当前业务对象数据状态进行判断
        if(actionName == "Submit" && this.Request.BizObject.Status == H3.DataModel.BizObjectStatus.Effective)
        {
            // 业务代码
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

### 后端OnSubmit事件中判断删除生效数据
``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    try
    {
        if(actionName == "Remove" && this.Request.BizObject.Status == H3.DataModel.BizObjectStatus.Effective)
        {
            /*
                注意：
                删除时this.Request.BizObject只有系统字段数据，所以一般来说这里需要先通过Load加载完整的表单数据，
                否则通过this.Request.BizObject["控件编码"]取不到值
            */
            this.Request.BizObject.Load();

            // 业务代码

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

### 后端OnLoad事件中判断当前用户非管理员时，设置控件隐藏/只读
``` cs
protected override void OnLoad(H3.SmartForm.LoadSmartFormResponse response)
{
    base.OnLoad(response);

    if(this.Request.UserContext.IsAdministrator) 
    {
        //IsAdministrator为true时，表示打开本表单的用户是管理员
    } else
    {
        //非管理员时，将某控件隐藏/只读
        response.ReturnData["控件编码"].Visible = false;//隐藏该控件
        response.ReturnData["控件编码"].Editable = false;//设置该控件只读
    }
}
```

### 后端OnLoad事件中判断当前用户所属部门为某部门时，不允许查看数据
``` cs
protected override void OnLoad(H3.SmartForm.LoadSmartFormResponse response)
{
    //判断当前表单模式为数据查看模式下
    if(this.Request.FormMode == H3.SmartForm.SmartFormMode.View)
    {
        //获取当前用户的部门实例
        H3.Organization.Unit dep = this.Request.Engine.Organization.GetParentUnit(this.Request.UserContext.UserId);
        if(dep.Name == "运营部门")
        {
            throw new Exception("运营部门不允许查看本数据！");
        }
    }

    base.OnLoad(response);
}
```


## 表单页加载时的事件触发顺序图

![表单页加载时的事件触发顺序图](../img/form-events-1.png)


## 表单按钮点击时的事件触发顺序图

![表单按钮点击时的事件触发顺序图](../img/form-events-2.png)

# 列表事件

列表页面中的所有操作，都需要在列表设计页面中编写代码，代码需要编写在各种事件内，当对应操作产生时，系统会自动触发事件，以执行用户的自定义代码。


## 列表前端事件

列表前端只有一个事件：```$.ListView.ActionPreDo```，在点击列表按钮时触发该事件，```actionCode``` 参数为按钮编码。

### 平台默认按钮

- Create：新增
- Import：导入
- Export：导出
- Remove：删除
- PrintQrCode：打印二维码

### 配置自定义按钮：
![](../img/list-events-1.png)
![](../img/list-events-2.png)

> 注：**统计分析** 按钮点击不经过该事件

### ActionPreDo事件代码示例：
``` js
//此处为列表按钮点击事件
$.ListView.ActionPreDo = function( actionCode ) {
    debugger

    //通过actionCode判断用户点击的是自定义按钮 MyBtn
    if( actionCode == "MyBtn" ) {
        //获取列表选中数据
        var datas = $.ListView.GetSelected();
        if( datas && datas.length ) {
            //当有选中数据时，取出选中数据的ObjectId值
            for( var i = 0;i < datas.length;i++ ) {
                alert( datas[ i ][ "ObjectId" ] );
            }
        }
    }

    //通过actionCode判断用户点击删除按钮
    if( actionCode == "Remove" ) {
        //弹出成功状态消息
        $.IShowSuccess( "成功", "点击了删除按钮！" );
    }
};
```


## 列表后端事件

列表后端共有3个事件，其中初始代码中会有2个事件：```OnLoad``` 和 ```OnSubmit```，还有一个 ```OnInit``` 事件在需要时由开发者自行添加到列表类中。

### 列表后端OnLoad事件

```OnLoad``` 为列表页数据加载事件，每次在加载列表数据时会触发 ```OnLoad``` 事件，比如：列表页初始打开、筛选条件变化、切换分页、按某列排序等，都会触发本事件。

其中 ```base.OnLoad(response);``` 为默认处理，有以下效果：
1. 根据请求中的筛选条件，查询数据并设置到 ```response``` 上，以响应给前端渲染

!> 注意：此行代码 ```base.OnLoad(response);``` 请保证触发 ```OnLoad``` 事件时都能得到执行（不要删除该行代码，尽量不要放在if判断体内），否则将失去以上列举的效果。

### 列表后端OnSubmit事件

```OnSubmit``` 在**按钮点击**或**Post请求**时触发，此事件的 ```actionName``` 参数非常重要，标识了触发来源。当按钮点击时，```actionName``` 即按钮编码；当Post请求时，```actionName``` 即前端自定义的请求活动名称。

其中 ```base.OnSubmit(actionName, postValue, response);``` 为默认处理，有以下效果：
1. ```actionName``` 为 ```Remove```（即 删除）时，会根据请求中传递的用户选中数据Id，查询并删除对应数据，若删除的是生效数据，则内部自动触发作废的业务规则

!> 注意：此行代码 ```base.OnSubmit(actionName, postValue, response);``` 请保证触发 ```OnSubmit``` 事件时都能得到执行（不要删除该行代码，尽量不要放在if判断体内），否则将失去以上列举的效果。

### 列表后端OnInit事件

当列表页初始打开时，会触发 ```OnInit``` 事件，并且执行时机上比 ```OnLoad``` 更早一步（先加载列表页面再加载列表数据）。

这个事件主要用于设置列表初始按钮显示/隐藏、初始筛选条件、初始排序字段、初始分页设置等，这些操作都会在 ```base.OnInit(response);``` 中完成，所以如果要二次开发调整这些设置，也应该在 ```base.OnInit(response);``` 之后写代码。


## 列表页加载时的事件触发顺序图

> 制作中...


## 列表按钮点击时的事件触发顺序图

> 制作中...

# 表单前端API

## this

在表单前端事件 ```OnLoad```、```OnLoadActions```、```OnValidate```、```BeforeSubmit```、```AfterSubmit``` 中，均可以通过 ```this``` 关键字得到当前表单实例对象。

```this``` 对象的属性包含当前表单的所有控件实例，比如下面这个控件，就可以使用 ```this.F0000017``` 获取其控件实例对象。

![](../img/form-api-1.png)

!> 由于氚云有的前端API会使用到回调函数，而在回调函数中使用 ```this``` 关键字会出现指向错误，所以建议在外层使用变量将 ```this``` 实例转存，如下：

``` js
// 加载事件
OnLoad: function() {
    var that = this;//使用that变量将this实例转存，供回调函数中使用

    //在BindChange的回调函数中，需将this替换为that
    that.F0000002.BindChange( $.IGuid(), function() {

        //此处将this替换为that
        var projectId = that.F0000002.GetValue();
    });

    //在PostForm的回调函数中，需将this替换为that
    $.SmartForm.PostForm( "GetLatestProjectId_Post", {
        "xx": 11
    }, function( data ) {
        if( data.Errors && data.Errors.length ) {
            $.IShowError( "错误", JSON.stringify( data.Errors ) );
        } else {
            var result = data.ReturnData;

            //此处将this替换为that
            that.F0000002.SetValue(result["projectId"]);
        }
    }, function( error ) {
        $.IShowError( "错误", JSON.stringify( error ) );
    }, false );
},
```


## $.SmartForm.ResponseContext

在表单前端代码中，有一个全局变量 ```$.SmartForm.ResponseContext```，该变量是一个对象，可用于获取到表单的相关信息，包含表单的基本信息（如：表单数据Id、表单数据状态、表单模式、是否移动端等）。

此处只做常用属性介绍，完整说明请移步：[前端实例详解：$.SmartForm.ResponseContext](/doc/js-instance?id=smartformresponsecontext)

**示例**

1. 在表单打开时，判断是否处于新增模式（即通过新增按钮点开的）：

``` js
// 加载事件
OnLoad: function() {

    var that = this;
    if( $.SmartForm.ResponseContext.IsCreateMode ) {
        
    }
},
```

2. 在表单打开时，判断是否处于数据查看模式（即通过列表页数据标题点开的）：

``` js
// 加载事件
OnLoad: function() {

    var that = this;
    if( $.SmartForm.ResponseContext.FormMode == 4 ) {
        
    }
},
```

3. 判断表单所有编辑情况

``` js
// 加载事件
OnLoad: function() {

    var that = this;
    if(
        $.SmartForm.ResponseContext.IsCreateMode || //新增
        $.SmartForm.ResponseContext.BizObjectStatus == 0 || //打开草稿数据
        ( $.SmartForm.ResponseContext.BizObjectStatus == 2 && $.SmartForm.ResponseContext.FormMode == 0 ) || //流程审批中打开
        ( $.SmartForm.ResponseContext.BizObjectStatus == 1 && $.SmartForm.ResponseContext.FormMode == 0 ) //编辑生效数据
    ) {

    }
},
```

4. 在点击 提交/同意 按钮时，判断是否是在某个审批节点点击的：

``` js
// 提交校验
OnValidate: function( actionControl ) {

    var that = this;
    if( actionControl.Action == "Submit" && $.SmartForm.ResponseContext.ActivityCode == "流程节点编码" ) {
         
    }

    return true;
},
```


## 获取控件值

```GetValue``` 是一个控件实例上的函数，使用方式：
``` js
var conValue = that.控件编码.GetValue();
```

不同类型控件，```GetValue``` 返回的值数据结构不同，具体请移步：[表单前端控件GetValue/SetValue](/doc/form-js-set-get)


## 设置控件值

```SetValue``` 是一个控件实例上的函数，使用方式：
``` js
that.控件编码.SetValue(控件值);
```

不同类型控件，```SetValue``` 要求传入的值不同，具体请移步：[表单前端控件GetValue/SetValue](/doc/form-js-set-get)


## 设置控件显示/隐藏

```SetVisible``` 是一个控件实例上的函数，使用方式：
``` js
that.控件编码.SetVisible(true);//显示控件
that.控件编码.SetVisible(false);//隐藏控件
```

```SetVisible``` 可用来 显示/隐藏 子表控件（即整个子表），但如果是设置子表内的控件，请先获取子表内的控件的实例


## 设置控件只读/可写

```SetReadonly``` 是一个控件实例上的函数，使用方式：
``` js
that.控件编码.SetReadonly(true);//设置控件只读
that.控件编码.SetReadonly(false);//设置控件可写
```

```SetReadonly``` 可用来设置 只读/可写 子表控件（即控制子表是否有新增、删除按钮），但如果是设置子表内的控件，请先获取子表内的控件的实例


## 清空选项（下拉框/单选框/多选框）

支持的控件类型：下拉框/单选框/多选框

```ClearItems``` 是一个控件实例上的函数，使用方式：
``` js
that.控件编码.ClearItems();
```

```ClearItems``` 函数只能用于单选框/复选框/下拉框，作用是将控件的选项全部清空。


## 添加选项（下拉框/单选框/多选框）

支持的控件类型：下拉框/单选框/多选框

```AddItem``` 是一个控件实例上的函数，使用方式：
``` js
that.控件编码.AddItem("选项");
```

```AddItem``` 函数只能用于单选框/复选框/下拉框，作用是给控件增加一个选项，函数的传入参数必须是一个字符串。


## 给控件绑定值改变事件

```BindChange``` 是一个事件，一般写在 ```OnLoad``` 事件中，用来在表单打开时绑定上事件监听控件值的改变。

!> 注意，函数的第一个参数 ```key``` 是自定义的一个事件标识，但是不可重复。

使用方式：
``` js
that.控件编码.BindChange( "key", function() {
    var v = that.控件编码.GetValue();
});

//如果不想命名key，可以使用 $.IGuid() 来保证key的唯一
that.控件编码.BindChange( $.IGuid(), function() {
    var v = that.控件编码.GetValue();
});
```

```BindChange``` 函数用于绑定一个值改变事件，但是和js的 ```onchange``` 事件不一样。```onchange``` 函数触发时机为实时的值改变，而 ```BindChange``` 在值改变时不触发，在控件焦点离开后才触发。


## 取消绑定值改变事件

```UnbindChange``` 专门用来取消 ```BindChange``` 事件，在 ```BindChange``` 时指定的 ```key``` 在这里就有用处了。

使用方式：
``` js
that.控件编码.UnbindChange("key");
```


## 绑定控件值变化事件

支持的控件类型：单行文本、多行文本、数值

当控件值发生改变后，会立即触发本事件，而 ```BindChange``` 需要在焦点离开控件后才会触发

``` js
that.控件编码.OnTempChange(function(){

});
```


## 绑定控件内键盘按下事件

支持的控件类型：单行文本、多行文本、数值

``` js
that.控件编码.OnKeyDown(function(event){

    //可通过判断 event.keyCode 的值来确定用户按下哪个按键，如 event.keyCode == "enter" 为回车键

    //可先通过console输出按下的按键，来确定需要监听的按键对应的编码
    console.log(event.keyCode);
});
```


## 添加一行子表数据

支持的控件类型：子表

``` js
// 注：此处的子表内控件编码是完整的控件编码，格式：子表编码.控件编码
that.子表编码.AddRow($.IGuid(), {
    "子表内控件编码": "控件值"
});
```


## 清空子表数据

支持的控件类型：子表

``` js
that.子表编码.ClearRows();
```


## 更新子表某行数据

支持的控件类型：子表

``` js
// 注：此处的子表内控件编码是完整的控件编码，格式：子表编码.控件编码
that.子表编码.UpdateRow(子表数据Id, {
    "子表编码.控件编码": "控件值"
});
```


## 获取子表内控件

支持的控件类型：子表

``` js
// 注：此处的子表内控件编码是完整的控件编码，格式：子表编码.控件编码
var cellManager = that.子表编码.GetCellManager(子表数据Id, "子表编码.控件编码");
```


## 获取子表数据条数

支持的控件类型：子表

``` js
var rowCount = that.子表编码.GetRowsCount();
```


## 前端Ajax请求后端

利用Ajax技术，异步请求后端，触发表单后端OnSubmit事件，[使用示例](/doc/js-example?id=表单前端onload事件-bindchange-post-请求后端)。

``` js
$.SmartForm.PostForm(
    actionName, //传给后端的actionName，命名标准：功能名_Post
    data, //传给后端的数据，object类型
    callBack, //请求成功后的回调事件
    errorBack, //请求失败后的回调事件
    async //true：不阻塞，false：请求过程中阻塞后续代码执行
);
```


## 消息弹窗

``` js
$.IShowSuccess( "成功", "这是一条成功消息" );//弹出成功消息

$.IShowWarn( "警告", "这是一条警告消息" );//弹出警告消息

$.IShowError( "错误", "这是一条错误消息" );//弹出错误消息

/*
    注意：
        * $.IConfirm弹窗是属于回调式的，而非阻塞式，调用完此函数，会立马执行后续代码，
        而不会等待用户点击按钮后再执行，所以请勿用在用户提交时

        * 需要阻塞提交动作，请使用js自带的confirm：
        var r=confirm("弹窗内容");
        if (r==true)
        {
            //点击了确认按钮
        }
        else
        {
            //点击了取消按钮
        }
*/
$.IConfirm( "提示", "是否确认？", function( data ) {
    if( data ) {
        //点击确认按钮
    } else {
        //点击取消按钮
    }
});
```


## 以全屏模式打开表单

``` js
var schemaCode = "xxx";// 表单编码
var objectId = "";// 表单数据Id，传 "" 时表示以新增模式打开，传具体数据Id表示打开该条数据表单详情查看页
var checkIsChange = true;// 关闭时是否感知变化，固定传 true
$.IShowForm(schemaCode, objectId, checkIsChange);
```


## 以弹窗模式打开表单

``` js
var schemaCode = "xxx";// 表单编码
var objectId = ""; // 表单数据Id，传 "" 时表示以新增模式打开，传具体数据Id表示打开该条数据表单详情查看页
var params = { "param1": "参数值1", "param2": 200 };// 传递到表单的参数，JSON对象格式（如果要将本表单数据传给弹窗，需先使用GetValue函数获取控件值，再放入params中）
var checkIsChange = false;// 是否检查修改
var showlist = false;// 兼容移动端是否显示列表
var showInModal = true;// 是否弹出框中显示，如果为false，title height width OnShowCallback OnHiddenCallback 等属性不起作用
$.IShowForm(schemaCode, objectId, params, checkIsChange, showlist, {
  showInModal: showInModal, title: "表单页标题", height: 500, width: 800,
  OnShowCallback: function( da ) { },// OnShowCallback 表单打开时事件
  onHiddenCallback: function( data ) {// onHiddenCallback 表单关闭时事件
        //当用户关闭表单后，会触发此事件，并且可以从data参数中获取用户在弹窗中输入的值
        //比如，弹窗表单中有一个控件编码为F0000001的单行文本控件，则获取值方式如下：
        var inputValue = data.Data["F0000001"];
        if(inputValue){
            //用户输入了值
        }else{
            //用户没输入值，进行提示
            $.IShowError( "错误", "请输入xxx的值！" );
        }
  }
});
```


## 获取弹窗调用方传递的参数

如果本表单是通过$.IShowForm打开的，并且有传递params，则可以通过 `$.IGetParams` 函数获取params中指定属性名对应的属性值。

``` js
var param1 = $.IGetParams("param1");
```


## 获取设备经纬度

1、用于获取用户当前定位（其精度和位置控件一致），但是仅限钉钉移动端，所以使用前，需要判断一下当前表单所处环境。

示例：
``` js
if ($.SmartForm.ResponseContext.IsMobile) {
    //这里是回调的，data是个对象，属性如下：lat,lng,address，分别表示：纬度，经度，地址信息
    $.ILocation(true, function (data) {
        if (data) {
            alert(data.lat + "," + data.lng + "," + data.address);
        }
        else {
            alert("获取位置错误");
        }
    });
}
```

2、其他客户端（浏览器、钉钉工作台等），可以使用原生JS代码实现（需注意考虑兼容性）。
示例：
``` js
if ($.SmartForm.ResponseContext.IsMobile) {
    if (navigator && "geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
                alert("纬度:" + position.coords.latitude);
                alert("经度:" + position.coords.longitude);
            }, function (error) {
                alert("经纬度获取失败：" + error.code + " - " + error.message);
            }
        );
    } else {
        alert("本设备不支持获取经纬度"); 
    };
};
```


## 关闭表单

旧版表单：```$.SmartForm.ClosePage();```

新版表单：```this.ClosePage();```


## 设置控件内容的字体颜色

支持的控件类型：单行文本、多行文本、日期、数值

``` js
that.控件编码.SetColor(Color.Blue);

/*
支持的颜色
Color.Default 默认颜色
Color.Blue    蓝色
Color.Green   绿色
Color.Yellow  黄色
Color.Red     红色
Color.Cyan    青色
Color.Purple  紫色
*/
```


## 设置控件内容的背景颜色

支持的控件类型：单行文本、多行文本、日期、数值

``` js
that.控件编码.SetBgColor(BgColor.Success);

/*
支持的颜色
BgColor.Success   成功消息（绿色）
BgColor.Info      普通消息（）
BgColor.Warning   警告消息（）
BgColor.Error     异常消息（）
*/
```


## 设置控件内容的字体大小

支持的控件类型：单行文本、多行文本、日期、数值

``` js
that.控件编码.SetFontSize(FontSize.Large);

/*
支持的字体大小
FontSize.Small   小号
FontSize.Medium  中等
FontSize.Large   大号
*/
```


## 设置控件内容的字重

支持的控件类型：单行文本、多行文本、日期、数值

``` js
that.控件编码.SetFontWeight(FontWeight.Bold);

/*
支持的字重
FontWeight.Light    对应font-weight 300
FontWeight.Medium   对应font-weight 500
FontWeight.Bold     对应font-weight 700
*/
```


## 设置控件内容的线类型

支持的控件类型：单行文本、多行文本、日期、数值

``` js
that.控件编码.SetLine(LineType.Underline);

/*
支持的字重
LineType.Underline    下划线
LineType.Strikeline   删除线
*/
```


## 表单页面聚焦到指定控件处

支持的控件类型：单行文本、多行文本、数值

``` js
that.控件编码.SetFocus(true);//聚焦并自动滚动到指定控件处
that.控件编码.SetFocus(false);//只聚焦，不自动滚动到指定控件处
```


## 绑定控件聚焦事件

支持的控件类型：单行文本、多行文本、数值

只支持编辑态控件，可以配合 ```SetFocus``` 一起使用，先定义 ```OnFocus``` 监听，后执行 ```SetFocus```

``` js
that.控件编码.OnFocus(function(){

});
```


# 表单前端控件GetValue/SetValue

由于不同控件类型，在赋值和取值（即：SetValue/GetValue）时数据结构有一定差别，所以本篇做一个特别说明。

!> 注意：本文中的 ```that``` 指代的是 ```this```，不直接使用this是因为在回调事件中this的指向是错的（具体原因请移步：[表单前端API this](/doc/form-js-api?id=this)），所以为了避免误用，本文统一用 ```that```。


## 单行文本/多行文本/单选框/下拉框/流水号

此类控件值都是 ```string``` 类型

取值：
``` js
var str = that.控件编码.GetValue();

//判断控件有值
if( str ) {
    //符合这个条件的值为非空字符串，undefined、null、"" 都不会符合这个条件
}

//判断控件值为空
if( str === undefined || str === null || str === "" ) {

}
```

赋值：
``` js
that.控件编码.SetValue("控件值");
```

清空控件值：
``` js
that.控件编码.SetValue("");
```


## 人员单选/部门单选

此类控件取值和赋值不一样，取值时返回的是字符串数组，而赋值时传入字符串即可。

- 人员单选控件的值是用户Id，这个Id可以通过SQL查询 [系统-用户表 H_User](/doc/database?id=系统-用户表-h_user) 表来获取

- 人员单选控件的值是部门Id，这个Id可以通过SQL查询 [系统-部门表 H_Organizationunit](/doc/database?id=系统-部门表-h_organizationunit) 表来获取

取值：
``` js
var idArray = that.控件编码.GetValue();

//虽然返回的是字符串数组，但因为是单选，所以数组只会有一个元素，所以取下标为0的就是 用户Id/部门Id
var unitId = "";
if( idArray && idArray.length > 0 ) {
    unitId = idArray[ 0 ];
}

//判断控件值为空
if( idArray === null || idArray.length === 0 ) {

}
```

赋值：
``` js
that.控件编码.SetValue("人员Id/部门Id");
```

清空控件值：
``` js
that.控件编码.SetValue("");
```


## 人员多选/部门多选

此类控件取值和赋值都是字符串数组。

- 人员多选控件的值是用户Id的字符串数组，这个Id可以通过SQL查询 [系统-用户表 H_User](/doc/database?id=系统-用户表-h_user) 表来获取

- 人员多选控件的值是部门Id的字符串数组，这个Id可以通过SQL查询 [系统-部门表 H_Organizationunit](/doc/database?id=系统-部门表-h_organizationunit) 表来获取

取值：
``` js
var idArray = that.控件编码.GetValue();

//循环数组
if( idArray && idArray.length > 0 ) {
    for( var i = 0; i < idArray.length; i++ ) {
        var unitId = idArray[ i ];
    }
}

//取用户选择的第一个人员Id/部门Id
if( idArray && idArray.length > 0 ) {
    var firstUnitId = idArray[ 0 ];
}

//判断控件值为空
if( idArray === null || idArray.length === 0 ) {

}
```

赋值：
``` js
that.控件编码.SetValue(["id1", "id2"]);
```

清空控件值：
``` js
that.控件编码.SetValue(null);
```


## 关联表单

此类控件值都是 ```string``` 类型，但是值是被关联表单的数据Id，即数据表中的ObjectId字段。

取值：
``` js
var boId = that.控件编码.GetValue();

//判断控件有值
if( boId ) {
    //符合这个条件的值就是非空字符串，而 undefined、null、"" 都不会符合这个条件
}

//判断控件值为空
if( boId === undefined || boId === null || boId === "" ) {

}
```

赋值：
``` js
that.控件编码.SetValue("xxx-xxx-xxx-xxx");
```

清空控件值：
``` js
that.控件编码.SetValue("");
```


## 关联表单多选

此类控件取值和赋值都是字符串数组，但是数组里每一个元素都是被关联表单的数据Id，即数据表中的ObjectId字段。

取值：
``` js
var boIdArray = that.控件编码.GetValue();

//循环用户选择的每个数据Id
if( boIdArray && boIdArray.length > 0 ) {
    for( var i = 0; i < boIdArray.length; i++ ) {
        var boId = boIdArray[ i ];
    }
}

//取用户选择的第一个数据Id
if( boIdArray && boIdArray.length > 0 ) {
    var firstBoId = boIdArray[ 0 ];
}

//判断控件值为空
if( idArray === null || idArray.length === 0 ) {

}
```

赋值：
``` js
that.控件编码.SetValue(["数据Id-1", "数据Id-2"]);
```

清空控件值：
``` js
that.控件编码.SetValue(null);
```


## 日期

日期控件取值和赋值都是 ```string``` 类型，取值时字符串格式会和配置的格式一致，但是赋值时只支持2种格式：```yyyy-MM-dd``` 或 ```yyyy-MM-dd HH:mm:ss```。

取值：
``` js
var dateStr = that.控件编码.GetValue();

//判断控件有值
if( dateStr ) {
    //如果有值，将它转成Date类型
    var dateObj = new Date(dateStr);
}

//判断控件值为空
if( dateStr === undefined || dateStr === null || dateStr === "" ) {

}
```

赋值：
``` js
that.控件编码.SetValue("2024-05-17");//无时间部分时
that.控件编码.SetValue("2024-05-17 06:24:49");//有时间部分时
```

> 如果是把当前时间赋值给日期控件，请参考：[前端Date Format](/doc/tool-function?id=前端date-format)

清空控件值：
``` js
that.控件编码.SetValue(null);
```


## 数字

数字控件取值时返回 ```string``` 类型，但赋值时是 ```number``` 类型。

取值：
``` js
var numStr = that.控件编码.GetValue();

//判断控件有值
if( numStr ) {
    //转成number类型
    var num = parseFloat(numStr);
}

//判断控件值为空
if( numStr === undefined || numStr === null || numStr === "" ) {

}
```

赋值：
``` js
that.控件编码.SetValue(123.45);
```

清空控件值：
``` js
that.控件编码.SetValue(null);
```


## 复选框

复选框取值赋值都是 ```string``` 类型，每个选项间用;分割。

取值：
``` js
var checkboxStr = that.控件编码.GetValue();

//判断控件有值
if( checkboxStr ) {
    //分割出每一个选项
    var checkboxArray = checkboxStr.split(";");
    for( var i = 0; i < checkboxArray.length; i++ ) {
        var item = checkboxArray[ i ];
    }
}

//判断是否包含某个选项
if( checkboxStr && checkboxStr.indexOf("选项1") >= 0 ) {

}

//判断控件值为空
if( checkboxStr === undefined || checkboxStr === null || checkboxStr === "" ) {

}
```

赋值：
``` js
that.控件编码.SetValue("选项1;选项2");
```

清空控件值：
``` js
that.控件编码.SetValue("");
```


## 是/否

是/否控件取值赋值都是 ```boolean``` 类型。

取值：
``` js
var isChecked = that.控件编码.GetValue();
if( isChecked ) {
    //选择了“是”
}

if(!isChecked){
    //选择了“否”
}
```

赋值：
``` js
that.控件编码.SetValue(true);
that.控件编码.SetValue(false);
```

清空控件值：不支持


## 地址

地址控件取值赋值都是 ```string``` 类型，但格式是一个对象JSON。

> JSON里的adcode是中国行政区划代码，可访问：[2022年中华人民共和国县以上行政区划代码](https://blog.csdn.net/m0_58016522/article/details/135306117)。
>
> **注意：这个区划代码国家会修订，氚云的地址控件也会随之更新，所以使用时请百度查询最新版的区划代码。**

取值：
``` js
var address = that.控件编码.GetValue();

/*
未填写地址时：
{"adcode":"","adname":"","Detail":""}

已填写地址时：
{"adcode":"440305","adname":"广东省 深圳市 南山区","Detail":"粤海街道科兴科学园A2单元1505室"}
*/

//因为地址控件特殊，判断用户是否填写了地址，就直接跟JSON进行判断了
if( address !== undefined && address !== null && address !== "" && address !== '{"adcode":"","adname":"","Detail":""}' ) {
    //用户填写了地址
}

if( address === undefined || address === null || address === "" || address === '{"adcode":"","adname":"","Detail":""}' ) {
    //用户没有填写地址
}
```

赋值：
``` js
that.控件编码.SetValue('{"adcode":"440305","adname":"广东省 深圳市 南山区","Detail":"粤海街道科兴科学园A2单元1505室"}');
```

清空控件值：
``` js
that.控件编码.SetValue(null);
```


## 位置

位置控件取值赋值都是 ```string``` 类型，但格式是一个对象JSON。

取值：
``` js
var location = that.控件编码.GetValue();

/*
未录入位置时：
{"Address":"","Point":{"lat":0,"lng":0}}

已录入位置时：
{"Address":"广东省深圳市南山区粤海街道科兴科学园A2单元南山科兴科学园","Point":{"lat":22.54907,"lng":113.942346}}
*/

//因为位置控件特殊，判断用户是否录入，就直接跟JSON进行判断了
if( location !== undefined && location !== null && location !== "" && location !== '{"Address":"","Point":{"lat":0,"lng":0}}' ) {
    //用户录入了位置
}

if( location === undefined || location === null || location === "" || location === '{"Address":"","Point":{"lat":0,"lng":0}}' ) {
    //用户没有录入位置
}
```

赋值：
``` js
that.控件编码.SetValue('{"Address":"广东省深圳市南山区粤海街道科兴科学园A2单元南山科兴科学园","Point":{"lat":22.54907,"lng":113.942346}}');
```

清空控件值：
``` js
that.控件编码.SetValue(null);
```


## 附件/图片

此类控件在前端可取值、清空控件值，但由于附件和图片的特殊性，所以前端不可对附件/图片赋值。

取值：
``` js
var fileData = that.控件编码.GetValue();

/*
取值出来是一个对象，格式如下：
{"AttachmentIds":"bc83a20b-2882-4d34-816c-8a938971ab66;1bacf027-0a2d-4358-bab7-7b8a8fb05e88;","Attachments":"[{\\"AttachmentId\\":\\"bc83a20b-2882-4d34-816c-8a938971ab66\\"},{\\"AttachmentId\\":\\"1bacf027-0a2d-4358-bab7-7b8a8fb05e88\\"}]","DelAttachmentIds":""}
*/

//一般为了拿附件Id，取AttachmentIds字段值比较方便，这个字段的值是把所有附件Id用;分割
if( fileData && fileData.AttachmentIds ) {
    //拆分附件Id
    var attachmentIdArray = fileData.AttachmentIds.split(";");
    //由于AttachmentIds的值是以;结尾，所以split会多出来一个空字符串，此处要pop掉
    attachmentIdArray.pop();
    //循环每个附件Id
    for( var i = 0; i < attachmentIdArray.length; i++ ) {
        var attachmentId = attachmentIdArray[ i ];
    }
    //取第一个附件Id
    var firstAttachmentId = attachmentIdArray[ 0 ];
}

//判断控件值为空
if( fileData === null || fileData.AttachmentIds === null || fileData.AttachmentIds === "" ) {

}
```

赋值：不支持

清空控件值：
``` js
that.控件编码.SetValue(null);
```


## 子表

子表控件提供了比较多的函数来操作数据，这里只演示 ```GetValue```、```ClearRows``` 函数，其他的函数请查阅：[表单前端API](/doc/form-js-api)。

取值：
``` js
var ctData = that.控件编码.GetValue();

/*
取值出来是一个对象数组，格式如下：
[
    {"ctSingleText":"我是子表内-单行文本","ctDate":"2024-07-17 19:39","ctNumber":"123.55","ctBooleanBox":false,"ObjectId":"cdd4e1e3-a82f-4563-bcc0-7e173b284073"},
    {"ctSingleText":"我是子表内-单行文本","ctDate":"2024-07-26 19:39","ctNumber":"8565.22","ctBooleanBox":true,"ObjectId":"6db047aa-6886-4a03-9285-3355f7613538"}
]

可以发现：
1. 子表控件的值是一个对象数组，每个对象代表一行数据
2. 对象里的字段名并不是表单设计里的 子表编码.控件编码 格式，而直接是控件编码，也就是“.”后面的部分
3. 每个对象里都有一个 ObjectId 字段，这个字段的值就是子表数据Id
4. 里面的控件值格式就和主表控件里一样，所以不懂取值赋值时的数据格式，可以参照主表控件的说明文档
*/

if( ctData && ctData.length > 0 ) {
    //循环子表每行数据
    for( var i = 0; i < ctData.length; i++ ) {
        var ctRow = ctData[ i ];

        //取出本行子表的数据Id
        var ctBoId = ctRow["ObjectId"];

        //取出子表内控件的值
        var txt = ctRow["ctSingleText"];
    }
}

//取子表第一行数据
if( ctData && ctData.length > 0 ) {
    var firstRow = ctData[ 0 ];
    var ctBoId = firstRow["ObjectId"];
}

//取子表最后一行数据
if( ctData && ctData.length > 0 ) {
    var lastRow = ctData[ ctData.length - 1 ];
    var ctBoId = lastRow["ObjectId"];
}

//判断子表控件值为空
if( ctData === null || ctData.length === 0 ) {

}
```

清空控件值：
``` js
that.控件编码.ClearRows();
```


# 列表前端API

列表前端只有一个列表按钮点击事件：```$.ListView.ActionPreDo```，所以本篇的API都是用在按钮点击时的处理上。


## 列表前端获取选中的数据
``` js
var selectedDatas = $.ListView.GetSelected();
```


## 列表前端Post请求后端

利用Ajax技术，异步请求后端，触发列表后端OnSubmit事件，[使用示例](/doc/pure-example?id=列表post)。

``` js
$.ListView.Post(
    actionName, //传给后端的actionName，命名标准：功能名_Post
    data, //传给后端的数据，object类型
    callBack, //请求成功后的回调事件
    errorBack, //请求失败后的回调事件
    async //true：不阻塞，false：请求过程中阻塞后续代码执行
);
```


## 列表前端刷新数据

``` js
$.ListView.RefreshView();
```


## 列表前端初始化筛选条件

``` js
$.ListView.InitQueryItems();
```


## 列表前端消息弹窗
``` js
$.IShowSuccess( "成功", "这是一条成功消息" );//弹出成功消息

$.IShowWarn( "警告", "这是一条警告消息" );//弹出警告消息

$.IShowError( "错误", "这是一条错误消息" );//弹出错误消息

//注意：$.IConfirm弹窗是属于回调式的，而非阻塞式，所以弹窗后的代码依然会被执行
$.IConfirm( "提示", "是否确认？", function( data ) {
    if( data ) {
        //点击确认按钮
    } else {
        //点击取消按钮
    }
});
```


## 列表前端以全屏模式打开表单
``` js
var schemaCode = "xxx";// 表单编码
var objectId = "xx-xx-xx";// 表单数据Id，传 "" 时表示以新增模式打开，传具体数据Id表示打开该条数据表单详情页
var checkIsChange = true;// 关闭时是否感知变化，固定传 true
$.IShowForm(schemaCode, objectId, checkIsChange);
```


## 列表前端以弹窗模式打开表单
``` js
var schemaCode = "xxx";// 表单编码
var objectId = ""; // 表单数据Id，传 "" 时表示以新增模式打开，传具体数据Id表示打开该条数据表单详情页
var params = { "param1": "参数值1", "param2": 200 };// 传递到表单的参数，JSON对象格式
var checkIsChange = false;// 是否检查修改
var showlist = false;// 兼容移动端是否显示列表
var showInModal = true;// 是否弹出框中显示，如果为false，title height width OnShowCallback OnHiddenCallback 等属性不起作用
$.IShowForm(schemaCode, objectId, params, checkIsChange, showlist, {
  showInModal: showInModal, title: "表单页标题", height: 500, width: 800,
  OnShowCallback: function( da ) { },// OnShowCallback 表单打开时事件
  onHiddenCallback: function( data ) {// onHiddenCallback 表单关闭时事件
        //当用户关闭表单后，会触发此事件，并且可以从data参数中获取用户在弹窗中输入的值
        //比如，弹窗表单中有一个控件编码为F0000001的单行文本控件，则获取值方式如下：
        var inputValue = data.Data["F0000001"];
        if(inputValue){
            //用户输入了值
        }else{
            //用户没输入值，进行提示
            $.IShowError( "错误", "请输入xxx的值！" );
        }
  }
});
```

# 前端常用实例

## $.SmartForm.ResponseContext

```$.SmartForm.ResponseContext``` 仅在表单前端代码中可用，可以通过此实例属性获取表单的当前状态。

### 属性

| **属性名**            | **数据类型** | **说明**                                                       | **示例** |
|--------------------|----------|--------------------------------------------------------------|--------|
| ActivityCode       |  string        | 流程节点编码                                                       |        |
| DisplayName        |  string        | 表单名称                                                         |        |
| FormDataType       |  number        | 表单数据类型                                                       |        |
| FormMode           |  number        | 表单模式，0为审批/办理 ，1为办理完结 ，2为创建 ，4为查阅                        |        |
| InstanceId         |  string        | 当前表单数据的流程实例                                            |        |
| IsCreateMode       |  boolean       | 是否创建模式，true：创建模式                                       |        |
| BizObjectId        |  string        | 当前对象ID                                                       |        |
| BizObjectStatus    |  number        | 当前对象状态，取值及释义：0 草稿；1 生效/流程结束；2 流程进行中；3 作废|        |
| SchemaCode         |  string        | 当前表单的SchemaCode                                                 |        |
| IsMobile           |  boolean       | 是否移动端，true：移动端                                           |        |
| Originator         |  string        | 发起人用户ID                                                      |        |
| OriginatorCode     |  string        | 发起人用户名                                                       |        |
| OriginatorParentId |  string        | 发起人所在部门ID                                                    |        |


## this

```this``` 仅在表单前端代码的事件中可用，它是表单实例，实例属性是表单上的控件实例，所以用 ```that.控件编码``` 就能拿到控件。

!> 建议：事件内第一句代码，用一个变量转存 ```this```，以防指向错误的BUG。

正确指向示例：
``` js
// 加载事件
OnLoad: function() {
    var that = this;
    that.F0000001.BindChange( $.IGuid(), function() {
        var val = that.F0000001.GetValue();
    });
},
```

错误指向示例：
``` js
// 加载事件
OnLoad: function() {
    this.F0000001.BindChange( $.IGuid(), function() {
        //此处直接用this，将指向的是匿名函数，而不是指向到OnLoad，所以 this.F0000001 的值会是 undefined
        var val = this.F0000001.GetValue();
    });
},
```


## 控件实例获取

氚云的表单前端只允许用户 取值/赋值/显示/隐藏/只读/可写 控件数据，不允许设置控件的样式。

而想要做到以上的操作，就需要通过控件实例，下面是获取控件实例的一些示例：

### 主表控件实例获取：
``` js
//that 即事件内的 this 转存
//F0000001 是主表控件编码
var con = that.F0000001;
```

### 子表控件实例获取方式：
``` js
//that 即事件内的 this 转存
//D000726F0001 是子表控件编码
var ctCon = that.D000726F0001;
```

### 子表内控件实例获取方式：
``` js
//that 即事件内的 this 转存
//D000726F0001 是子表控件编码
//D000726F0001.F0000002 是子表内控件的编码

//获取子表所有行的数据集合
var rows = that.D000726F0001.GetValue();

//判断子表数据集合是否有值
if( rows && rows.length ) {
    //获取子表第一行数据的ObjectId
    var firstRowId = rows[ 0 ].ObjectId;

    //获取子表第一行数据 D000726F0001.F0000002 控件的实例
    var cellCon = that.D000726F0001.GetCellManager( firstRowId, "D000726F0001.F0000002" );

    //循环子表每行的数据
    for( var i = 0;i < rows.length;i++ ) {
        var currRowData = rows[ i ];

        //获取子表当前行的ObjectId
        var currRowId = currRowData.ObjectId;

        //获取子表当前行的数据 D000726F0001.F0000002 控件的实例
        var currCellCon = that.D000726F0001.GetCellManager( currRowId, "D000726F0001.F0000002" );
    }
}
```



# 业务对象

数据类型：```H3.DataModel.BizObject```

其本质是一个数据映射类，并且在类中封装了操作数据（增删改查）的方法。一个类的实例对应数据库中一条数据，用来方便处理数据。

由于氚云的表单控件是不固定，用户可自定义的，所以除了系统控件，其他控件的值都存放在类中的键值对属性中，获取时需要通过索引器的方式获取。


## 当前表单业务对象

在 **表单设计** 后端代码中的事件中，当前表单数据的业务对象即 ```this.Request.BizObject```，这个业务对象对应的就是当前这个表单的数据。

获取方式如下：
``` cs
public class Dxxx: H3.SmartForm.SmartFormController
{
    public Dxxx(H3.SmartForm.SmartFormRequest request): base(request)
    {
    }

    protected override void OnLoad(H3.SmartForm.LoadSmartFormResponse response)
    {
        if(this.Request.IsCreateMode) 
        {
            //在表单数据初始创建模式下（即点击 新增 按钮的时候），获取当前表单业务对象
            H3.DataModel.BizObject bo = this.Request.BizObject;
            //获取当前数据Id
            string boId = bo.ObjectId;
        }

        base.OnLoad(response);
    }

    protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
    {
        //写在base.OnSubmit上面
        if(actionName == "Save" || actionName == "Submit")
        {
            //当用户点击暂存/提交/同意按钮时，获取当前表单业务对象
            H3.DataModel.BizObject bo = this.Request.BizObject;
            //获取当前数据单行文本控件的值
            string val = bo["控件编码"] + string.Empty;
            //设置当前数据单行文本控件的值
            bo["控件编码"] = "testValue";

            //注意：actionName == "Save" || actionName == "Submit"，且修改当前业务对象的代码写在base.OnSubmit之上，此处无需写 bo.Update() ，base.OnSubmit内部会自动将当前业务对象保存到数据库
        }

        base.OnSubmit(actionName, postValue, response);

        //写在base.OnSubmit下面
        if(actionName == "Save" || actionName == "Submit")
        {
            //当用户点击暂存/提交/同意按钮时，获取当前表单业务对象
            H3.DataModel.BizObject bo = this.Request.BizObject;
            //写在base.OnSubmit之下，最好重新加载一次当前业务对象，因为base.OnSubmit中对当前业务对象进行了保存，可能会引发系统字段的变化
            bo.Load();

            //获取当前数据单行文本控件的值
            string val = bo["控件编码"] + string.Empty;
            //设置当前数据单行文本控件的值
            bo["控件编码"] = "testValue";

            //注意：写在base.OnSubmit下面，并修改了当前业务对象，此处需要写 bo.Update() 来将修改数据保存到数据库
            bo.Update();
        }
    }

    protected override void OnWorkflowInstanceStateChanged(H3.Workflow.Instance.WorkflowInstanceState oldState, H3.Workflow.Instance.WorkflowInstanceState newState)
    {
        if(oldState == H3.Workflow.Instance.WorkflowInstanceState.Running && newState == H3.Workflow.Instance.WorkflowInstanceState.Finished)
        {
            // 流程数据生效时获取当前业务对象
            H3.DataModel.BizObject bo = this.Request.BizObject;

            //修改当前业务对象的值
            bo["控件编码"] = "testValue";
            //提交修改数据，更到到数据库
            bo.Update();
        }

        if(oldState == H3.Workflow.Instance.WorkflowInstanceState.Finished && newState == H3.Workflow.Instance.WorkflowInstanceState.Running)
        {
            // 流程数据重新激活时获取当前业务对象
            H3.DataModel.BizObject bo = this.Request.BizObject;

            //修改当前业务对象的值
            bo["控件编码"] = "testValue";
            //提交修改数据，更到到数据库
            bo.Update();
        }

        base.OnWorkflowInstanceStateChanged(oldState, newState);
    }
}
```

!> 注：前端通过Post请求后端时，后端虽然可以使用 ```this.Request.BizObject```，但数据不全，正确做法应该是通过前端传参，后端获取请求参数。


## 系统属性

!> 系统属性对应的控件，不管表单中是否拖出配置这些控件，业务对象都会有这些属性，并且数据库的表中也会有对应字段

使用系统属性，可以直接使用 ```bo.属性名``` 的方式，而不是 ```bo["属性名"]```，例：
``` cs
//获取业务对象的数据状态
H3.DataModel.BizObjectStatus boStatus = bo.Status;
//判断数据是否是生效状态
if ( boStatus == H3.DataModel.BizObjectStatus.Effective ) 
{

}

//将拥有者更改为 System 用户
bo.OwnerId = H3.Organization.User.SystemUserId;

//获取数据的Id
string boId = bo.ObjectId;
```

### 主表业务对象系统属性

| 属性名                | 数据类型                         | 释义                                                          | 是否必填 |
|--------------------|------------------------------|--------------------------------------------------------------------|--------|
| ObjectId           | ```String```                 | 数据Id，表单数据唯一值，在new H3.DataModel.BizObject()时系统自动通过GUID生成                         | 必填   |
| Name               | ```String```                 | 数据标题，显示在列表页和关联表单控件上，方便用户浏览和选择               |      |
| OwnerId            | ```String```                 | 拥有者，值为氚云用户Id                                               | 必填   |
| OwnerDeptId        | ```String```                 | 所属部门，值为氚云部门Id                                              | 必填   |
| Status             | ```H3.DataModel.BizObjectStatus``` | 数据状态（草稿/流程进行中/生效/作废）                            | 必填   |
| WorkflowInstanceId | ```String```                 | 流程实例Id                                                           |      |
| CreatedBy          | ```String```                 | 创建人，值为氚云用户Id                                                | 必填   |
| CreatedTime        | ```DateTime```               | 创建时间                                                            | 必填   |
| ModifiedBy         | ```String```                 | 最后一次数据修改人，值为氚云用户Id                                    |      |
| ModifiedTime       | ```DateTime```               | 最后一次数据修改时间                                                 |      |

?>  Status 枚举值：<br/>
    ```H3.DataModel.BizObjectStatus.Draft```：草稿，数据库中对应值 0 <br/>
    ```H3.DataModel.BizObjectStatus.Running```：流程进行中，数据库中对应值 2 <br/>
    ```H3.DataModel.BizObjectStatus.Effective```：数据生效，数据库中对应值 1 <br/>
    ```H3.DataModel.BizObjectStatus.Canceled```：数据作废，数据库中对应值 3 <br/>

### 子表业务对象系统属性

| 属性名             | 数据类型                      | 释义                                                               | 是否必填|
|--------------------|------------------------------|--------------------------------------------------------------------|--------|
| ObjectId           | ```String```                 | 子表数据Id，用于标识子表数据的唯一值，通过GUID生成                    | 必填   |
| Name               | ```String```                 | 子表数据标题                                                        |        |
| Parent             | ```H3.DataModel.BizObject``` | 该数据所属主表业务对象                                               | 必填   |


## 静态方法-GetList

```H3.DataModel.BizObject.GetList``` 方法用于批量获取业务对象实例。

方法传入参数：
- ```H3.IEngine engine```：总控引擎，文档参考 [H3.IEngine](/doc/cs-instance?id=H3IEngine)

- ```string userId```：查询人的用户Id，一般使用System用户 ```H3.Organization.User.SystemUserId```

- ```H3.DataModel.BizObjectSchema schema```：表单结构实例，文档参考 [H3.DataModel.BizObjectSchema](/doc/cs-instance?id=H3DataModelBizObjectSchema)

- ```H3.DataModel.GetListScopeType getListScopeType```：查询范围，一般使用不限范围的全局查询 ```H3.DataModel.GetListScopeType.GlobalAll```

- ```H3.Data.Filter.Filter filter```：过滤器对象，文档参考 [H3.Data.Filter.Filter](/doc/cs-instance?id=H3DataFilterFilter)

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

//设置查询结果数据起始、终止下标（平台限制范围最多1000条，设置更多也保持1000条）
filter.FromRowNum = 0;
filter.ToRowNum = 1000;

//设置查询结果按CreatedTime字段正序排序
filter.AddSortBy("CreatedTime", H3.Data.Filter.SortDirection.Ascending);

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
```


## 静态方法-Load

```H3.DataModel.BizObject.Load``` 方法用于根据数据Id获取单个业务对象实例。

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
string schemaCode = "表单编码";
string bizObjectId = "数据Id";

//调用 H3.DataModel.BizObject.Load，获取数据Id对应业务对象实例
H3.DataModel.BizObject bo = H3.DataModel.BizObject.Load(H3.Organization.User.SystemUserId, engine, schemaCode, bizObjectId, false);
if(bo != null)
{
    /*****Load业务对象成功*****/

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
        OwnerDeptId：创建时平台会自动根据 OwnerId 带出所属部门，所以 OwnerId 一定要设置
        CreatedTime：创建时平台会自动设置为当前时间
        Name：创建后平台会自动生成
        SeqNo：创建后平台会自动生成
*/

//设置 创建人
bo.CreatedBy = userId;

//设置 拥有者
bo.OwnerId = userId;

//设置数据状态为草稿，表示本次创建的是草稿状态的表单数据
bo.Status = H3.DataModel.BizObjectStatus.Draft;

//设置控件编码为 F0000001 的值
bo["F0000001"] = "xxx";

//创建本业务对象，调用完此方法后，数据才会存到数据库，否则只是在内存中
bo.Create();
```

!> 注意：
<br/>
数据状态设置为 ```H3.DataModel.BizObjectStatus.Running```，并不会自动创建出流程（创建带流程的表单数据，请参考[如何创建带流程的表单数据](/doc/cs-example?id=如何创建带流程的表单数据)）
<br/><br/>
数据状态设置为 ```H3.DataModel.BizObjectStatus.Effective```，在创建时，会自动触发该表单的生效业务规则


## 动态方法-Create

```Create``` 方法都是搭配构造方法使用，上面的构造方法文档已经做了说明，这里只展示同时创建主表/子表数据的示例

使用示例：
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


//子表每一行都是一个业务对象，所以这里需要定义一个List集合变量
List < H3.DataModel.BizObject > chiBoList = new List<H3.DataModel.BizObject>();

/*****Start 下面开始演示定义一个子表业务对象*****/
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


/*****Start 下面开始演示通过H3.DataModel.BizObject.GetList查询出另一个表单的数据，通过该表数据循环创建出子表业务对象*****/
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


/*****Start 下面开始演示通过SQL查询出另一个表单的数据，通过该表数据循环创建出子表业务对象*****/
//此处为了节省篇幅，就不做注释了
string sql = "SELECT ObjectId, SeqNo FROM i_D00001ABC WHERE Status=1; ";
System.Data.DataTable dtAccount = engine.Query.QueryTable(sql, null);
if(dt != null && dt.Rows.Count > 0)
{
    foreach(System.Data.DataRow row in dt.Rows)
    {
        H3.DataModel.BizObject newChiBo = new H3.DataModel.BizObject(engine, chiSchema, H3.Organization.User.SystemUserId);
        //将i_D00001ABC表的 SeqNo 字段值，赋值给 newChiBo 的 F0000002 控件
        newChiBo["F0000002"] = row["SeqNo"] + string.Empty;
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


## 动态方法-Update

```Update``` 方法用于在已得到业务对象实例后，对其属性或控件值修改，然后更新并保存。

使用示例：
``` cs
H3.IEngine engine = this.Engine;
H3.DataModel.BizObjectSchema schema = engine.BizObjectManager.GetPublishedSchema("表单编码");
string seqNo = "HT20220101001";

//构建过滤器
H3.Data.Filter.Filter filter = new H3.Data.Filter.Filter();
//构造And匹配器
H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();
//添加匹配条件，筛选生效的数据，此处通过流水号进行筛选
andMatcher.Add(new H3.Data.Filter.ItemMatcher("SeqNo", H3.Data.ComparisonOperatorType.Equal, seqNo));
filter.Matcher = andMatcher;

//调用 H3.DataModel.BizObject.GetList，获取符合条件的数据
H3.DataModel.BizObject[] boArray = H3.DataModel.BizObject.GetList(engine, H3.Organization.User.SystemUserId, schema, H3.DataModel.GetListScopeType.GlobalAll, filter);
if(boArray != null && boArray.Length > 0)
{
    //由于是通过流水号进行筛选的，所以查询结果最多只有一条数据，这里直接取下标 0 的即可
    H3.DataModel.BizObject bo = boArray[0];

    //更新 最后一次数据修改时间 为当前时间
    bo.ModifiedTime = DateTime.Now;

    //清空 F0000001 控件值
    bo["F0000001"] = null;

    //执行更新操作，此方法执行完成，本次更新的数据才会保存到数据库
    bo.Update();
} else
{
    //根据流水号未查找到数据，这里演示下抛出自定义异常
    throw new Exception("未找到流水号为“" + seqNo + "”对应数据！");
}
```


## 动态方法-Remove

```Remove``` 方法用于在已得到业务对象实例后，将数据删除。

单条删除使用示例：
``` cs
H3.IEngine engine = this.Engine;
string schemaCode = "表单编码";
string bizObjectId = "数据Id";

H3.DataModel.BizObject bo = H3.DataModel.BizObject.Load(H3.Organization.User.SystemUserId, engine, schemaCode, bizObjectId, false);
if(bo != null)
{
    //当根据 数据Id 查找到业务对象后，调用 Remove 方法，将删除操作直接发送给数据库进行数据删除
    bo.Remove();
}
```

批量删除使用示例：
``` cs
H3.IEngine engine = this.Engine;
H3.DataModel.BizObjectSchema schema = engine.BizObjectManager.GetPublishedSchema("表单编码");
DateTime time = DateTime.Parse("2022-01-01");

//定义一个批量提交实例
H3.DataModel.BulkCommit commit = new H3.DataModel.BulkCommit();

//构建过滤器
H3.Data.Filter.Filter filter = new H3.Data.Filter.Filter();
//构造And匹配器
H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();
//添加匹配条件，筛选生效的数据，此处筛选出 创建时间 <= 2022-01-01 的数据
andMatcher.Add(new H3.Data.Filter.ItemMatcher("CreatedTime", H3.Data.ComparisonOperatorType.NotAbove, time));
filter.Matcher = andMatcher;

//调用 H3.DataModel.BizObject.GetList，获取符合条件的数据
H3.DataModel.BizObject[] boArray = H3.DataModel.BizObject.GetList(engine, H3.Organization.User.SystemUserId, schema, H3.DataModel.GetListScopeType.GlobalAll, filter);
if(boArray != null && boArray.Length > 0)
{
    //将H3.DataModel.BizObject.GetList查询出的结果，循环添加到 H3.DataModel.BulkCommit 实例中
    foreach(H3.DataModel.BizObject bo in boArray) 
    {
        //将本业务对象，以删除的方式，添加到 批量提交实例
        //跟直接 bo.Remove() 不同，此方式不会立马将操作发送给数据库，而是先将操作记录起来，等待下面的 commit.Commit() 操作
        bo.Remove(commit);
    }

    //将 批量提交实例 进行提交，此操作完成，会将上面代码添加到 commit 的业务对象操作，一起发送给数据库进行执行
    string errorMsg = null;
    commit.Commit(engine.BizObjectManager, out errorMsg);

    //判断批量提交结果，如果 errorMsg 变量有值，说明删除失败
    if(!string.IsNullOrEmpty(errorMsg))
    {
        throw new Exception("批量删除数据失败，原因：" + errorMsg);
    }
}
```

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
4. ```H3.DataModel.BizObject[] boArray = H3.DataModel.BizObject.GetList(engine, H3.Organization.User.SystemUserId, schema, H3.DataModel.GetListScopeType.GlobalAll, filter);```<br/>```H3.DataModel.BizObject bo = boArray[0];```

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
- 人员单选 值是氚云用户Id，可通过SQL查询 [系统-用户表 H_User](/doc/database?id=系统-用户表-h_user) 获得
- 部门单选 值是氚云部门Id，可通过SQL查询 [系统-部门表 H_Organizationunit](/doc/database?id=系统-部门表-h_organizationunit) 获得
- 关联表单 值是关联的表单数据Id，可通过关联表单控件的值，或者通过业务对象或SQL查询表单数据获得

取值：```string userId = bo["控件编码"] + string.Empty;```

赋值：```bo["控件编码"] = "44358530-a4cc-4e9c-9009-2c052f71c706";```

清空控件值：```bo["控件编码"] = null;```


## 人员多选/部门多选/关联表单多选

此类控件值都是 ```string[]``` 类型，区别是：
- 人员多选 值是氚云用户Id数组，可通过SQL查询 [系统-用户表 H_User](/doc/database?id=系统-用户表-h_user) 获得
- 部门多选 值是氚云部门Id数组，可通过SQL查询 [系统-部门表 H_Organizationunit](/doc/database?id=系统-部门表-h_organizationunit) 获得
- 关联表单多选 值是关联的表单数据Id数组，可通过关联表单控件的值，或者通过业务对象或SQL查询表单数据获得

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
//此处本应通过查询方式获得Id数组，篇幅原因此处不贴代码
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

取值示例一：
``` cs
string numStr = bo["控件编码"] + string.Empty;
if(string.IsNullOrWhiteSpace(numStr))
{
    //此控件值为null，此处可以写相关处理逻辑或抛异常处理
} else
{
    //有值时转换成 decimal 类型
    //因为氚云数字控件可配置最多16位小数，所以为了不丢失精度，转成decimal类型较好
    decimal num = decimal.Parse(numStr);
}
```

取值示例二：
``` cs
//此示例跟一的区别在于，本示例不处理数字控件值为空的情况，为空时默认结果值为0
string numStr = bo["控件编码"] + string.Empty;
decimal num = 0m;
if(!string.IsNullOrWhiteSpace(numStr))
{
    //有值时转换成 decimal 类型
    //因为氚云数字控件可配置最多16位小数，所以为了不丢失精度，转成decimal类型较好
    num = decimal.Parse(numStr);
}

//上面已经获取到了数字控件的值，在此继续写对该值操作的业务代码
//但是注意num值可能为0，所以把num作为除数前（0作为除数会抛异常），需要判断一下num值是否为0
decimal result = 0m;
if(num != 0m)
{
    result = 100 / num;
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
    //未选择选项
} else
{
    //有选择选择，则循环获取每个选项值
    foreach(string item in value) 
    {

    }
}
```

判断是否选择了某个选项：
``` cs
//如果需要判断是否选择了某个选项，可以用Contains方法判断
string str = bo["控件编码"] + string.Empty;
if(str.Contains("选项1"))
{
    //选择了选项1
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
//由于控件值可能为null，直接转bool类型有风险，先转成string类型判断一下是否是null
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
``` json
{"adcode":"440305","adname":"广东省 深圳市 南山区","Detail":"科兴科学园B1栋"}
```

> JSON里的adcode是中国行政区划代码，可访问：[2022年中华人民共和国县以上行政区划代码](https://blog.csdn.net/m0_58016522/article/details/135306117)。
>
> **注意：这个区划代码国家会修订，氚云的地址控件也会随之更新，所以使用时请百度查询最新版的区划代码。**

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
``` json
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
<br/>附件/图片 控件，无法通过业务对象直接赋值，只可以通过复制其他已有数据的附件，进行赋值。

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


## 子表

此控件值是 ```H3.DataModel.BizObject[]``` 类型

由于子表的类型是业务对象数组，跟业务对象操作有关，都要用上 ```H3.IEngine``` 实例，下面的示例中 ```engine``` 变量即 ```H3.IEngine``` 实例，参考 [H3.IEngine](/doc/cs-instance?id=H3IEngine)

虽然子表在数据库中是另一张表，但是业务对象对其进行了抽象。子表数据集合被当做了主表数据的一个字段，所以操作子表数据，大部分情况下都要通过主表的业务对象进行取值/赋值。

取值：
``` cs
H3.DataModel.BizObject[] chiBoArray = (H3.DataModel.BizObject[]) bo["子表控件编码"];
if(chiBoArray == null || chiBoArray.Length == 0)
{
    //子表无数据
} else
{
    //子表有数据

    //获取子表第一行的业务对象
    H3.DataModel.BizObject firstChiBo = chiBoArray[0];

    //循环子表所有行的业务对象
    foreach(H3.DataModel.BizObject chiBo in chiBoArray) 
    {

    }
}
```

新增子表行数据：
``` cs
//通过主表的Schema实例，获取子表的Schema实例
H3.DataModel.BizObjectSchema chiSchema = bo.Schema.GetChildSchema("子表控件编码");

//子表每一行都是一个业务对象，所以这里需要定义一个List集合变量
List < H3.DataModel.BizObject > chiBoList = new List<H3.DataModel.BizObject>();

//如果原本子表已有数据，那需要先将它们加入到chiBoList
//注：如果是同时新增主子表数据，那无需本操作，本操作主要是考虑到更新操作
H3.DataModel.BizObject[] chiBoArray = (H3.DataModel.BizObject[]) bo[chiSchema.SchemaCode];
if(chiBoArray != null && chiBoArray.Length > 0)
{
    chiBoList.AddRange(chiBoArray);
}

/*
    注：创建子表业务对象时，由于系统字段只有 ObjectId、Name、ParentObjectId，
        而这些字段通过业务对象创建数据都会自动生成，所以设置子表业务对象时，
        可以只用设置子表内的控件值，系统属性一个都无需设置
*/

/*****Start 下面开始演示new一个简易的子表业务对象*****/
//通过构造函数，new一个子表业务对象
H3.DataModel.BizObject aNewchiBo = new H3.DataModel.BizObject(engine, chiSchema, H3.Organization.User.SystemUserId);
//设置子表内控件编码为 F0000001 的值，此控件为日期控件，此处将当前系统时间赋值给它
aNewchiBo["F0000001"] = DateTime.Now;
//将这个子表业务对象，添加到List集合里
chiBoList.Add(aNewchiBo);
/*****End*****/


/*****Start 下面开始演示通过H3.DataModel.BizObject.GetList查询出另一个表单的数据，通过该表数据循环创建出子表业务对象*****/
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
        //将otherBo的 F0000001 控件值，赋值给 newChiBo 的 F0000001 控件
        newChiBo["F0000001"] = otherBo["F0000001"];
        //将newChiBo添加到List集合里
        chiBoList.Add(newChiBo);
    }
}
/*****End*****/


/*****Start 下面开始演示通过SQL查询出另一个表单的数据，通过该表数据循环创建出子表业务对象*****/
//此处为了节省篇幅，就不做注释了
string sql = "SELECT ObjectId, SeqNo FROM i_D00001ABC WHERE Status=1; ";
System.Data.DataTable dtAccount = engine.Query.QueryTable(sql, null);
if(dt != null && dt.Rows.Count > 0)
{
    foreach(System.Data.DataRow row in dt.Rows)
    {
        H3.DataModel.BizObject newChiBo = new H3.DataModel.BizObject(engine, chiSchema, H3.Organization.User.SystemUserId);
        //将i_D00001ABC表的 SeqNo 字段值，赋值给 newChiBo 的 F0000001 控件
        newChiBo["F0000001"] = row["SeqNo"] + string.Empty;
        //将newChiBo添加到List集合里
        chiBoList.Add(newChiBo);
    }
}
/*****End*****/

//现在子表业务对象都定义好了，但是只是在List集合里，并未绑定到主表业务对象上，这里就通过给 子表控件赋值 绑定上去
bo[chiSchema.SchemaCode] = chiBoList.ToArray();
```

编辑子表行数据：
``` cs
//获取子表数据
H3.DataModel.BizObject[] chiBoArray = (H3.DataModel.BizObject[]) bo["子表控件编码"];
if(chiBoArray != null && chiBoArray.Length > 0)
{
    //编辑子表第一行的数据
    chiBoArray[0]["子表内的控件编码"] = "Hello World!";

    //循环编辑子表所有行的数据
    foreach(H3.DataModel.BizObject chiBo in chiBoArray) 
    {
        //此处按照控件类型不一样，赋值格式也不一样，但是可以参照主表业务对象控件的赋值
        chiBo["子表内的控件编码"] = "Hello World!";
    }
}
```

删除子表行数据：
``` cs
//删除子表行，相当于给子表赋值一个新的H3.DataModel.BizObject[]值，所以这里先定义一个集合
List < H3.DataModel.BizObject > chiBoList = new List<H3.DataModel.BizObject>();

//获取子表数据
H3.DataModel.BizObject[] chiBoArray = (H3.DataModel.BizObject[]) bo["子表控件编码"];
if(chiBoArray != null && chiBoArray.Length > 0)
{

    for(int i = 0;i < chiBoArray.Length; i++)
    {
        //删除子表第一行的数据，就相当于不把第一行数据加入到集合
        if(i == 0)
        {
            //当i为0时，代表子表第一行，所以这里跳过，不添加进集合
            continue;
        }

        //删除子表中 F0000001 控件值为空的子表行数据
        string val = chiBoArray[i]["F0000001"] + string.Empty;
        if(string.IsNullOrWhiteSpace(val))
        {
            continue;
        }

        //其他的子表数据加入集合
        chiBoList.Add(chiBoArray[i]);
    }
}

//最后别忘了要把新的子表数据绑定到主表上
bo["子表控件编码"] = chiBoList.ToArray();
```

清空控件值：
``` cs
bo["子表控件编码"] = new H3.DataModel.BizObject[]{ };
```




# 部门/人员/角色

在氚云的后端，可以两种方式（SQL、API）获取 部门/人员/权限 三类的信息，本篇文档演示在后端通过API的方式获取。

## 部门

### 部门类属性

| 属性名                | 数据类型                         | 释义            |
|--------------------|------------------------------|-----------------------|
| ObjectId           | ```String```                 | 部门Id                |
| Name               | ```String```                 | 部门名称               |
| ManagerId          | ```String```                 | 部门经理的人员Id       |
| ParentId           | ```String```                 | 父部门Id              |

### 部门实例方法

1. 获取用户所在部门

``` cs
H3.Organization.Unit unit = this.Engine.Organization.GetParentUnit("用户Id");   
```

2. 根据人员Id查询其所有的部门Id

``` cs
//先获取到人员信息
H3.Organization.User user = (H3.Organization.User) this.Engine.Organization.GetUnit("用户Id");
//通过人员信息获取其所有部门的Id
string[] pIds = user.ParentIds;
```

3. 根据人员id第N级父部门

``` cs
int level = 1;//0是第一级，1是第二级，以此类推
H3.Organization.Unit unit = this.Engine.Organization.GetParentUnitByLevel("用户Id", level);
```

4. 根据部门Id获取其第N级父部门

``` cs
int level = 1;//0是第一级，1是第二级，以此类推
H3.Organization.Unit unit = this.Engine.Organization.GetParentUnitByLevel("部门Id", level);
```

5. 判断一个部门是否是另一个部门的祖先部门

``` cs
//isAncestor：结果为true表示是祖先部门
bool isAncestor = this.Engine.Organization.IsAncestor("子孙部门Id", "祖先部门Id");
```

6. 根据部门Id获取部门名称

``` cs
/*
    H3.Organization.NameType：枚举，有以下选项
        H3.Organization.NameType.Name       名称
        H3.Organization.NameType.Path       组织路径，/Company/OU1/OU2 格式
        H3.Organization.NameType.FullName   完整名称，/Company/OU1/OU2 格式
*/
H3.Organization.NameType type = H3.Organization.NameType.Name;
string name = this.Engine.Organization.GetName("部门Id", type);
```

7. 根据父部门Id获取子孙部门

``` cs
string[] parentUnitIds = new string[]{ "父部门Id" };

/*
    GetChildUnits方法参数说明：
        System.String[] ids：父部门Id数组
        H3.Organization.UnitType childUnitType：获取的子节点类型，H3.Organization.UnitType.OrganizationUnit 为获取部门节点
        bool recursive：是否递归获取，传true递归获取子孙部门，传false只获取子部门
        H3.Organization.State state：部门状态，H3.Organization.State.Active 为生效状态
*/
H3.Organization.Unit[] childUnits = this.Engine.Organization.GetChildUnits(parentUnitIds, H3.Organization.UnitType.OrganizationUnit, true, H3.Organization.State.Active);
if(childUnits == null || childUnits.Length == 0)
{
    throw new Exception("未找到子部门！");
}
foreach(H3.Organization.Unit unit in childUnits) 
{
    string unitId = unit.ObjectId;//子部门Id
    string unitName = unit.Name;//子部门名称
    string unitManagerId = unit.ManagerId;//子部门主管人员Id
}
```

# 流程操作

!> 注意：以下示例中，engine实例获取方式，请参考 [H3.IEngine](/doc/cs-instance?id=h3iengine)

## 获取流程Id

氚云的流程操作API，很关键的一个参数是流程Id，所以开篇，先介绍一下获取流程Id的几种方式：

1. 获取当前流程表单的流程Id

!> 注意：因为只有在表单后端中才能对应上唯一的流程Id，所以以下示例代码仅用于表单后端代码中。

``` cs
protected override void OnLoad(H3.SmartForm.LoadSmartFormResponse response)
{
    string insId = this.Request.InstanceId;

    base.OnLoad(response);
}

protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    string insId = this.Request.InstanceId;

    base.OnSubmit(actionName, postValue, response);
}
```

2. 通过业务对象实例获取流程Id
   
每个业务对象实例对应一条数据，而一条数据只有一个流程，在业务对象中就有一个属性 ```WorkflowInstanceId```，对应的是该数据的流程Id。

业务对象获取可以参考 [业务对象](/doc/biz-object)，这里只做一个简单示例：
``` cs
H3.DataModel.BizObject bo = H3.DataModel.BizObject.Load(H3.Organization.User.SystemUserId, this.Engine, "表单编码", "数据Id", false);
if(bo != null)
{
    string insId = bo.WorkflowInstanceId;
}
```

3. 通过SQL查流程Id

通过表单主表查出数据对应流程Id：
``` sql
SELECT WorkflowInstanceId FROM i_D154601HolidayRecord WHERE ObjectId = '数据Id'
```

通过流程实例表查出数据对应流程Id：
``` sql
SELECT ObjectId FROM H_WorkflowInstance WHERE SchemaCode = '表单编码' AND ObjectId = '数据Id'
```


## 重新激活流程

!> 注意：此API只针对已生效/已作废流程使用，并且只调用本API，流程会激活，但是流程不处于任何一个节点上，所以一般需要配合 激活某个活动节点 一起使用。

``` cs
H3.Workflow.Messages.ActivateInstanceMessage actInsMessage = new H3.Workflow.Messages.ActivateInstanceMessage("流程Id");
engine.WorkflowInstanceManager.SendMessage(actInsMessage);
```


## 结束流程

!> 注意：此API只针对进行中流程使用。

``` cs
H3.Workflow.Instance.WorkflowInstance instance = engine.WorkflowInstanceManager.GetWorkflowInstance("流程Id");
H3.Workflow.Messages.FinishInstanceMessage finishMessage = new H3.Workflow.Messages.FinishInstanceMessage("流程Id",(int)instance.FinalTokenId);
engine.WorkflowInstanceManager.SendMessage(finishMessage);
```


## 取消流程

!> 只可对进行中数据使用。

``` cs
H3.Workflow.Messages.CancelInstanceMessage cancelMessage = new H3.Workflow.Messages.CancelInstanceMessage("流程Id", false);
engine.WorkflowInstanceManager.SendMessage(cancelMessage);
```


## 激活某个活动节点

!> 激活流程节点，只是将流程节点进行了激活，效果类似于管理员手动更换处理节点，无法达到审批人审批通过的效果。一般配合 重新激活流程/取消某个活动节点 一起使用。 

``` cs
string insId = "流程Id";
string activityCode = "流程节点编码";

// 节点审批人，氚云用户Id数组，分两种情况：
// 1、传入用户Id，如：new string[]{ "用户Id 1", "用户Id 2" }，则激活节点后由定义用户审批
///2、传入new string[]{ }，则由流程引擎自动按配置分配审批人
string[] approvalIds = new string[]{ };

//参数对应描述：流程实例ID，活动节点编码，令牌ID，参与者，前驱令牌，是否检测入口条件，激活类型
H3.Workflow.Messages.ActivateActivityMessage actMessage = new H3.Workflow.Messages.ActivateActivityMessage(insId,
    activityCode, H3.Workflow.Instance.Token.UnspecifiedId, approvalIds, null, false, H3.Workflow.WorkItem.ActionEventType.Adjust);

//1.不会取消正在运行的节点。2.进行中的流程才能激活调整。
engine.WorkflowInstanceManager.SendMessage(actMessage);
```


## 取消某个活动节点

!> 注意：必须是已经处于活动中的节点，才能进行取消，在流程日志上，本API操作显示为 已取消。

``` cs
string insId = "流程Id";
string activityCode = "流程节点编码";

H3.Workflow.Messages.CancelActivityMessage cancelMessage = new H3.Workflow.Messages.CancelActivityMessage(insId, activityCode, false);
engine.WorkflowInstanceManager.SendMessage(cancelMessage);
```


## 创建表单数据并发起流程

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
//发起流程（注意：第1个参数是流程发起人，此参数必须传真实用户Id，不可以是H3.Organization.User.SystemUserId，否则系统会随机选取一名用户作为发起人）
engine.WorkflowInstanceManager.OriginateInstance(newBo.OwnerId, schema.SchemaCode, wfTemp.WorkflowVersion, newBo.ObjectId, newBo.WorkflowInstanceId, H3.Workflow.WorkItem.AccessMethod.Web, true, string.Empty, true, out workItemID, out errorMsg);
if(!string.IsNullOrEmpty(errorMsg))
{
    throw new Exception("流程实例创建失败：" + errorMsg);
}
```

OriginateInstance方法说明：

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


## 流程结束/重新激活 事件

当流程状态发生改变时，会触发 ```OnWorkflowInstanceStateChanged``` 事件，该事件有两个传入参数：```oldState```、```newState```，所以就能用来判断当前为结束时触发，还是重新激活时触发。

注意事项：

* 事件会在业务规则执行后触发
* 当表单配置了流程，在**导入生效数据**时，由于导入时会创建流程并结束流程，所以也会触发 ```OnWorkflowInstanceStateChanged``` 事件
* 这里只是提醒开发者在用这个事件时要考虑导入触发的情况，但是并不推荐开发者利用这个事件去做导入执行代码的需求，具体原因请看：[为何不推荐利用OnWorkflowInstanceStateChanged事件做导入触发代码的需求](/doc/faq?id=为何不推荐利用OnWorkflowInstanceStateChanged事件做导入触发代码的需求)
* 本事件无需用户进行调用，将事件写在**表单设计-后端代码**的 ```OnSubmit``` 方法之下即可。当流程状态发生改变时，流程引擎会自动调用 ```OnWorkflowInstanceStateChanged```

代码示例：
``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    base.OnSubmit(actionName, postValue, response);
}

// 放在表单设计-后端代码的 OnSubmit 事件之下，无需在其他地方调用
protected override void OnWorkflowInstanceStateChanged(H3.Workflow.Instance.WorkflowInstanceState oldState, H3.Workflow.Instance.WorkflowInstanceState newState)
{
    // 流程审批结束后
    if(oldState == H3.Workflow.Instance.WorkflowInstanceState.Running && newState == H3.Workflow.Instance.WorkflowInstanceState.Finished)
    {
        // 业务代码
        // 配置了流程，且导入生效数据，也会触发本事件

        // 获取 H3.Iengine 实例
        H3.IEngine engine = this.Engine;

        // 获取当前业务对象
        H3.DataModel.BizObject bo = this.Request.BizObject;

        // 因为OnWorkflowInstanceStateChanged事件没有OnSubmit事件的base.OnSubmit调用
        // 所以，如果要在本事件里修改当前业务对象的控件值，需要在修改完后，要自行调用Update来生效修改
        this.Request.BizObject["F00000001"] = "我在流程结束时变更了";
        this.Request.BizObject.Update();
    }

    // 流程重新激活
    if(oldState == H3.Workflow.Instance.WorkflowInstanceState.Finished && newState == H3.Workflow.Instance.WorkflowInstanceState.Running)
    {
        // 业务代码

    }

    base.OnWorkflowInstanceStateChanged(oldState, newState);
}
```


## 获取当前流程运行节点

由于 ```this.Request.ActivityCode``` 方法，获取的只是当前登录人所在的流程节点，会导致审批流节点的错乱，故使用：```this.Request.WorkflowInstance.RunningActivties```，获取当前流程的活动节点。

补充条例：

* this.Request.WorkflowInstance.RunningActivties，获取到的值是一个[]数组，取值需做循环或者是通过索引获取。

代码示例：
``` cs
 protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    string[] workCode = this.Request.WorkflowInstance.RunningActivties;
    if(actionName == "Submit" && workCode[0] == "Activity1")
    {
        this.Request.BizObject["F0000001"] = "当前流程为:"+ workCode[0];
    }
}
```





# 消息通知/提醒


## 后端代码发送短信

代码发送短信和配置发送短信效果一样，不支持自定义签名，并且消耗短信条数余量。

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口
``` cs
//在表单提交时发送短信
H3.IEngine engine = ... /* 此处省略引擎获取方式 */

//定义一个待发送消息的集合
List < H3.Notification.UserMessage > umList = new List<H3.Notification.UserMessage>();

string sendUserId = H3.Organization.User.SystemUserId;//消息发送人氚云用户Id，固定为系统用户
string receivePhone = "12345678901";//接收短信的手机号
string sign = "氚云";//短信签名（由于运营商管控，目前已不支持自定义短信签名，统一签名为“氚云”）
string sendContent = "短信内容";

//将本次发送的消息添加到集合
umList.Add(new H3.Notification.UserMessage(sendUserId, receivePhone, sign, sendContent));

//通过消息通知引擎发送
engine.Notifier.Send(umList.ToArray());
```



# 定时器

氚云中想要定时执行一段代码去处理数据，可以利用定时器。

氚云有一个定时器引擎，此引擎会每隔4小时（**此间隔时间为平台底层设定，不支持用户自定义，解决方案请参照下方代码示例**），检测用户编写的代码。<br/>
当检测到代码中有继承 ```H3.SmartForm.Timer``` 类的子类，将会动态实例化此子类，并且自动调用子类中的 ```OnWork``` 方法。

如果应用内定义了多个 ```H3.SmartForm.Timer``` 类的子类，并不是同时执行，而是会按定义的顺序逐个执行。<br/>
利用这个特性，我们只需要，定义一个类，并且继承 ```H3.SmartForm.Timer```，那我们的代码就可以每隔4小时执行一次了。


## 注意事项

?> 一般而言，会把定时器类定义在表单设计后端代码，默认的表单类之下。
<br/>定义的定时器，无需在任意地方调用，只需定义即可，等待定时器引擎自动去触发。
<br/>由于不确定定时器引擎何时去调用自定义代码，又是固定4小时一次，所以可以根据触发时的时间范围（范围时间差为4小时）去确定，下面的代码示例有做示范。

!> 注：为了不给服务器造成过大负担，每个应用，定时器引擎只会耗费**20分钟**时间去执行用户的代码。
<br/>从触发用户第一个定时器开始计时，到达**20分钟**时，不管当前代码是否执行完成，都会立马中止，并且不再执行其他未执行的定时器。

!> 在定时器代码书写前，请阅读以下注意点：
<br/>**定时器类**，不是**表单控制器类**，没有 ```this.Request```，所以跟 ```this.Request``` 相关的参数请勿在定时器中使用。
<br/><br/>下面举例一些定时器类中不可使用的参数：
<br/>1. 不能使用 ```this.Request.BizObject```，请另行查询出需要的业务对象（参考此文档：[业务对象-GetList](/doc/biz-object?id=静态方法-getlist)）
<br/>2. 将 ```this.Request.Engine``` 替换为方法传入参数的 ```engine```
<br/>3. 将 ```this.Request.UserContext.UserId``` 替换为指定的人员id或系统默认用户Id（即：```H3.Organization.User.SystemUserId```）
<br/>4. 请勿使用 ```this.Request.InstanceId```


## 代码示例

``` cs
//定义一个定时器类(类名格式：自定义名称 + _Timer)，且继承H3.SmartForm.Timer类
public class MyTest_Timer: H3.SmartForm.Timer
{
    //构造方法，跟类名保持一致，里面不必书写代码，但是必须存在
    public MyTest_Timer() { }

    /*
        重写父类的OnWork方法，此步必做，否则会报错
        定时器引擎实例化MyTest_Timer后，会自动调用本方法
        此方法每隔4小时被定时器引擎调用一次
    */
    protected override void OnWork(H3.IEngine engine)
    {
        /*
            1. 此处无当前表单业务对象，所以不能使用this.Request.BizObject，请另行查询出需要的业务对象
            2. 此处无请求对象，所以请将this.Request.Engine替换为方法传入参数的engine
            3. 此处无当前登录人，所以请将this.Request.UserContext.UserId替换为指定的人员id或系统默认用户Id（即：H3.Organization.User.SystemUserId）
        */

        DateTime nowTime = DateTime.Now;//获取当前时间

        /*--------------示例一---------------*/
        DateTime sTime = DateTime.Parse(nowTime.ToString("yyyy-MM-dd 10:00:00"));//获取今天的10点
        DateTime eTime = DateTime.Parse(nowTime.ToString("yyyy-MM-dd 14:00:00"));//获取今天的14点
        //判断当前时间是否处于10点-14点间
        if(sTime <= nowTime && eTime >= nowTime)
        {
            //在每天 10点-14点 间要执行的代码
            //时间间隔范围必须至少为 4小时，来匹配上定时器引擎的触发间隔
        }

        /*--------------示例二---------------*/
        //判断当前时间小时数范围为 8点-16点
        if(nowTime.Hour >= 8 && nowTime.Hour <= 16)
        {
            //在每天 8点-16点 间要执行的代码
            //这个时间范围相差 8小时，理论上，此处代码一天会被执行 2次
        }

        /*--------------示例三---------------*/
        //判断当前时间月份为12月，日期为1号，小时为12点-16点
        if(nowTime.Month == 12 && nowTime.Day == 1 && nowTime.Hour >= 12 && nowTime.Hour <= 16)
        {
            //在每年 12月1号 12点-16点 间触发执行一次
        }

        /*--------------示例四---------------*/
        //调用定时器类中封装的方法
        DoSomething(engine, nowTime);
    }

    //业务代码封装成方法
    public static void DoSomething(H3.IEngine engine, DateTime time)
    {

    }
}
```


## 常见问题

1. 执行结果如何知晓？

    可以搭建一个日志表单，定时器中将执行结果写入到该表单（即创建表单数据，将执行时间、结果等赋值到表单中的控件内）

    示例：

``` cs
public class MyTest_Timer: H3.SmartForm.Timer
{
    public MyTest_Timer() { }

    protected override void OnWork(H3.IEngine engine)
    {
        /*
        需要新建一个表单，表单名字为日志表，里面拖入4个控件：
        ExeTime：日志记录时间        日期控件
        Title：日志记录标题          单行文本
        Result：执行结果             单行文本
        Message：日志记录详细信息     多行文本
        */

        H3.DataModel.BizObjectSchema exeSchema = engine.BizObjectManager.GetPublishedSchema("日志表单编码");
        H3.DataModel.BizObject exeBo = new H3.DataModel.BizObject(engine, exeSchema, H3.Organization.User.SystemUserId);
        exeBo.Status = H3.DataModel.BizObjectStatus.Effective;
        exeBo["ExeTime"] = DateTime.Now;
        exeBo["Title"] = "MyTest_Timer的执行日志";

        try 
        {
            //这里编写定时处理的业务代码


            //当业务代码执行无异常，则记录下执行成功时的结果和信息
            exeBo["Result"] = "成功";
            exeBo["Message"] = string.Format("完成执行时间：{0}", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff"));
        } catch(Exception ex) 
        {
            //当业务代码执行出现异常，则记录下执行失败时的结果和异常原因
            exeBo["Result"] = "失败";
            exeBo["Message"] = g2000Str(ex.ToString());
        }

        exeBo.Create();//创建一条日志记录数据
    }

    //由于多行文本最多存放2000字的内容，所以这个方法对字符串做一个截取处理
    //当传入字符串不超过2000字则原样返回，当超过则返回前2000字
    private string g2000Str(string str)
    {
        if(!string.IsNullOrWhiteSpace(str) && str.Length > 2000)
        {
            return str.Substring(0, 2000);
        }
        return str;
    }
}
```

2. 如何调试定时器里的代码？
   
    定时器毕竟是由引擎主动调用的，所以我们没法模拟引擎调用的情况，只能通过其他方式来验证代码是否正确，做法如下：

    ① 在 **定时器类** 中，把业务代码封装成一个 ```public static``` 方法（*参考上面示例代码中的 ```DoSomething``` 方法*）

    ② 在 **表单类** 的 ```OnLoad``` 事件中，调用定时器类里的业务代码方法（*调试时记得点下新增按钮哦( • ̀ω•́ )✧*）

    ③ 调试完成后，在 **表单类** 的 ```OnLoad``` 事件中，去掉调用

    示例：

``` cs
//表单类
public class Dxxx: H3.SmartForm.SmartFormController
{
    public Dxxx(H3.SmartForm.SmartFormRequest request): base(request)
    {
    }

    protected override void OnLoad(H3.SmartForm.LoadSmartFormResponse response)
    {
        //在创建模式下（即点击 新增 按钮时），调用 MyTest_Timer 类的 DoSomething 方法
        if(this.Request.IsCreateMode) 
        {
            //此代码只用作调试，调试完成后，请去掉本行代码，后续由定时器引擎自动去触发代码即可
            MyTest_Timer.DoSomething(this.Engine, DateTime.Now);
        }

        base.OnLoad(response);
    }

    protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
    {
        base.OnSubmit(actionName, postValue, response);
    }
}
```

# 后端执行SQL

氚云数据库采用MySQL，不同企业MYSQL版本可能不同，您可以通过执行此语句进行MySQL版本查询：

``` sql
SELECT VERSION()
```

后端代码执行增删改查SQL语句，均通过 ```engine.Query.QueryTable``` 接口进行执行，并获取结果。

氚云不提供DDL语句的执行，更改表结构，直接在表单设计更改配置即可。

?> engine实例获取，可参考此文档：[H3.IEngine](/doc/cs-instance?id=H3.IEngine)
<br/>
表单对应的数据库表名：```i_表单编码```，表单编码查看方式：[表单编码查看](/doc/check-code?id=表单编码查看)
<br/>
子表对应的数据库表名：```i_子表控件编码```，子表控件编码查看方式：[子表编码查看](/doc/check-code?id=子表编码查看)
<br/>
表单与系统表的表结构文档，请参考此文档：[数据库表结构详解](/doc/database)

!> 由于该接口会直接影响数据表，请谨慎执行 **增删改** 三类SQL语句，有 **增删改** 的需求请尽量通过操作业务对象实现。
<br/>
若因用户执行 **增删改** 三类SQL语句，造成表单数据异常而无法查询，或者因修改系统表数据导致氚云无法使用，解决办法只能找运维恢复数据（收费）。

!> 为了防止用户滥用或执行低效SQL，从而对系统性能造成过大影响， ```engine.Query.QueryTable``` 接口有执行超时机制，耗时超过 **30秒** ，则SQL语句执行失败，并抛出异常，异常消息示例：
<br/>```Timeout in IO operation``` 或者 ```Connection must be valid and open to rollback transaction```
<br/>一旦出现此类情况，请优化SQL，提升效率，或者将执行逻辑拆分，分批多次执行。

以下是接口使用示例：


## 调用执行SELECT语句

``` cs
string sql = "SELECT ObjectId, Status FROM i_D00001ABC WHERE Status=1; ";
System.Data.DataTable dt = engine.Query.QueryTable(sql, null);
if(dt == null || dt.Rows.Count == 0)
{
    //未查询到数据

} else {
    //循环查询结果
    foreach(System.Data.DataRow row in dt.Rows) 
    {
        string boId = row["ObjectId"] + string.Empty;
        string boStatus = row["Status"] + string.Empty;

    }
}
```


## 调用执行UPDATE语句
``` cs
try
{
    string upSql = "UPDATE i_D00001ABC SET F0000001 = '是' WHERE Status = 3; ";
    engine.Query.QueryTable(sql, null);
} catch(Exception ex)
{
    //更新语句执行异常（可能是sql语句有误，或执行超时等）
    
}
```


## 参数化SQL语句执行

参数化执行SQL的好处：防SQL注入攻击、无需考虑字符串值在SQL拼接时引发的格式错误

``` cs
//本sql中@name即参数名，与H3.Data.Database.Parameter参数对象一一对应
string sql = "SELECT ObjectId FROM H_User WHERE Name = @name; ";

//定义参数集合
List < H3.Data.Database.Parameter > parameters = new List<H3.Data.Database.Parameter>();

//创建一个参数
H3.Data.Database.Parameter param = new H3.Data.Database.Parameter(
    "@name", //参数名
    System.Data.DbType.String, //参数值类型
    "张三" //参数值    
);

//将参数添加到参数集合
parameters.Add(param);

//传入sql和参数查询结果
System.Data.DataTable dt = engine.Query.QueryTable(sql, parameters.ToArray());

/*
常用参数值类型：
System.Data.DbType.String：字符串，对应string
System.Data.DbType.Int32：整数，对应int
System.Data.DbType.Int64：整数，对应long
System.Data.DbType.Double：双精度浮点数，对应double
System.Data.DbType.Decimal：高精度浮点数，对应decimal
System.Data.DbType.DateTime：日期，对应DateTime
System.Data.DbType.Boolean：布尔，对应bool
*/
```


## SQL转义换行

1. 使用@对字符串进行转义，SQL字符串里面的特殊字符不再具有转义功能，例如 ```\n``` 不再被转义成换行符。

2. 使用@对字符串进行转义，若字符串中要使用双引号，则需要在双引号外，再加一个双引号以区分，或者换成单引号。

``` cs
string sql = @"
            SELECT TT.NO, 
            TT.ONE, 
            TT.TWO,
            FROM TABLE_TEMP TT 
            WHERE 
            TT.NO = ""1""
            OR TT.NO = '2'
            ";
System.Data.DataTable dtAccount = engine.Query.QueryTable(sql, null);
```

# 后端常用实例


## H3.IEngine

```H3.IEngine``` 是各种管理器的总控引擎类。

### 实例获取方式

* 表单/列表后端代码类的任意事件中，均可以通过 ```this.Engine``` 获取，或者通过 ```this.Request.Engine``` 获取
  
* 定时器类 ```OnWork``` 事件中，从传入参数 ```H3.IEngine engine``` 获取
  
* 自定义接口类 ```OnInvoke``` 事件中，可以通过 ```this.Engine``` 获取

### 实例属性

| **属性名**                 | **数据类型**                                      | **说明**                              | **是否开放使用** |
|-------------------------|-----------------------------------------------|-------------------------------------|---------|
| BizBus                  | `H3.BizBus.IBizBus`                             | 集成第三方服务                             | ✔       |
| BizObjectManager        | `H3.DataModel.IBizObjectManager`                | 业务对象数据管理器，用于处理表单数据                  | ✔       |
| EngineSecret            | `String`                                        | 企业引擎密钥，                              | ✔       |
| Notifier                | `H3.Notification.INotifier`                     | 通知管理器，用于发送通知                        | ✔       |
| Organization            | `H3.Organization.IOrganization`                 | 组织结构管理器，用于获取部门/人员/角色等信息             | ✔       |
| Query                   | `H3.Query`                                      | 数据库查询器，用于执行SQL                      | ✔       |
| SettingManager          | `H3.Settings.ISettingManager`                   | 配置管理器，用于获取企业配置信息                        | ✘       |
| TaskManager             | `H3.Task.ITaskManager`                          | 任务管理器，用于给用户发送任务                     | ✔       |
| TransactionManager      | `H3.Transaction.ITransactionManager`            | 事务管理器，目前无使用用法                       | ✘       |
| UrgencyManager          | `H3.Workflow.WorkItem.IUrgencyManager`          | 催办管理器，用于获取催办及发送催办消息                 | ✔       |
| ViewManager             | `H3.SmartForm.IViewManager`          | 表单设计管理器，不推荐使用                       | ✘       |
| WorkflowInstanceManager | `H3.Workflow.Instance.IWorkflowInstanceManager` | 流程实例管理器，用于流程实例创建、获取、删除              | ✔       |
| WorkflowTemplateManager | `H3.Workflow.Template.IWorkflowTemplateManager` | 流程设计模板管理器，用于获取流程设计的模板，创建流程实例时需依据此模板 | ✔       |
| WorkItemManager         | `H3.Workflow.WorkItem.IWorkItemManager`         | 流程项管理器，用于管理具体流程项，使用场景较少            | ✔       |


## H3.DataModel.BizObjectSchema

```H3.DataModel.BizObjectSchema``` 是表单结构类，实例属性/方法是关于表单的配置信息（如表单中的控件信息，表单名称等）。

!> 注意：本实例只能用于获取配置信息，不可用于更新与删除表单配置，更新与删除表单应在表单设计页面配置。

### 实例获取方式

* 表单/列表后端代码类的任意事件中，均可以通过 ```this.Request.Schema``` 获取（即获取到的是当前表单结构实例）

* 其他位置，或者获取其他表单结构实例，则指定表单编码获取
``` cs
H3.DataModel.BizObjectSchema schema = engine.BizObjectManager.GetPublishedSchema("表单编码");
``` 

### 实例属性

| **属性名**      | **数据类型**                       | **释义**                    |
|--------------|--------------------------------|---------------------------|
| DisplayName  | String                         | 表单名称                      |
| FullName     | String                         | 表单名称+表单编码                 |
| SchemaCode   | String                         | 表单编码                      |
| TableName    | String                         | 对应数据库中的表名                 |
| ChildSchemas | H3.DataModel.BizObjectSchema[] | 若本实例是主表，则此属性有值，为所有的子表结构实例 |
| Properties   | H3.DataModel.PropertySchema[]  | 表单内所有字段的结构实例              |

### 常用方法

- ```GetChildSchema```：获取子表结构实例，使用示例：```H3.DataModel.BizObjectSchema childSchema = schema.GetChildSchema("子表编码");```

- ```PropertyExist```：判断某控件是否在该表单内，使用示例：```bool ex = schema.PropertyExist("控件编码");//true: 存在```

- ```GetProperty```：获取表单内控件结构实例，使用示例：```H3.DataModel.PropertySchema pro = schema.GetProperty("控件编码");```


## H3.DataModel.PropertySchema

```H3.DataModel.PropertySchema``` 是控件结构类，实例属性/方法是关于控件的配置信息（如控件的名称、类型等）。

!> 注意：本实例只能用于获取配置信息，不可用于更新与删除控件配置，更新与删除控件应在表单设计页面配置。

### 实例获取方式

获取控件结构之前，一定要获取到表单结构实例，如何获取表单结构实例请参考 [H3.DataModel.BizObjectSchema](/doc/cs-instance?id=h3datamodelbizobjectschema)

获取指定控件结构实例：
``` cs
H3.DataModel.BizObjectSchema schema = engine.BizObjectManager.GetPublishedSchema("表单编码");
H3.DataModel.PropertySchema pro = schema.GetProperty("控件编码");
```

循环获取表单下所有控件结构实例：
``` cs
H3.DataModel.BizObjectSchema schema = engine.BizObjectManager.GetPublishedSchema("表单编码");
foreach(H3.DataModel.PropertySchema pro in schema.Properties) 
{

}
```

### 实例属性

| **属性名**           | **数据类型**                     | **释义**                             |
|-------------------|------------------------------|------------------------------------|
| DisplayName       | String                       | 控件名称                               |
| Name              | String                       | 控件编码                               |
| DataType          | H3.Data.BizDataType          | 控件类型，该属性数据类型为枚举                    |
| IsCustom          | Boolean                      | 此属性已废弃，请勿使用                   |
| IsMappingProperty | Boolean                      | 该控件是否是关联属性控件，true: 关联属性控件          |
| StorageByteCount  | Int32                        | 该控件占用空间大小                          |
| MaxLength         | Int32                        | 该控件内容最大长度                          |
| HideRule          | String                       | 该控件配置的隐藏规则                         |
| ComputationRule   | String                       | 该控件配置的计算公式                         |
| ChildSchema       | H3.DataModel.BizObjectSchema | 如果该控件为子表，则该属性值为子表结构实例              |

```H3.Data.BizDataType``` 枚举值：

- ```H3.Data.BizDataType.ShortString```：表示该控件的值为文本类型
- ```H3.Data.BizDataType.String```：表示该控件的值为文本类型
- ```H3.Data.BizDataType.Int```：表示该控件的值为32位整数类型
- ```H3.Data.BizDataType.Long```：表示该控件的值为64位整数类型
- ```H3.Data.BizDataType.Double```：表示该控件的值为浮点数类型
- ```H3.Data.BizDataType.Bool```：表示该控件的值为布尔类型，即该控件为 是/否 控件
- ```H3.Data.BizDataType.Image```：表示该控件为 图片 控件
- ```H3.Data.BizDataType.File```：表示该控件为 附件 控件
- ```H3.Data.BizDataType.DateTime```：表示该控件为 日期 控件
- 其他类型略，有需要的可以在后端编辑器中靠代码提示获得


## H3.Data.Filter.Filter

```H3.Data.Filter.Filter``` 是筛选器类，用于在批量查询表单数据时进行数据的筛选、分页、排序。

!> 默认情况下，```H3.DataModel.BizObject.GetList``` 查询接口每次返回前 1000 条数据，且底层限定每次不会超过1000条（即使设定了超过1000条的范围）。

### 排序

通过 ```AddSortBy``` 实现查询结果排序后返回（相当于SQL的 ```ORDER BY``` 效果）。

该方法需传入两个参数，第一个参数为排序的控件编码，第二个参数为枚举值：
- ```H3.Data.Filter.SortDirection.Ascending``` 正序排序
- ```H3.Data.Filter.SortDirection.Descending``` 倒序排序

使用示例：
``` cs
H3.Data.Filter.Filter filter = new H3.Data.Filter.Filter();
H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();
filter.AddSortBy("CreatedTime", H3.Data.Filter.SortDirection.Ascending);
filter.Matcher = andMatcher;
```

### 分页筛选

当我们想一次性查询返回指定条数数据，或者想查询超过 1000 条数据时，就需要通过分页筛选进行实现了（相当于SQL的 ```LIMIT``` 效果）。
通过使用 ```FromRowNum``` 和 ```ToRowNum``` 指定起始下标与结束下标实现分页查询：
- ```FromRowNum```：起始下标，从 0 开始，结果中包含该下标对应数据
- ```ToRowNum```：结束下标，结果中不包含该下标对应数据

``` cs
//查询数据下标 0-99 的数据（共100条）
//如需查第二页 100-199 的数据，则 FromRowNum = 100，ToRowNum = 200
H3.Data.Filter.Filter filter = new H3.Data.Filter.Filter();
H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();
filter.FromRowNum = 0;
filter.ToRowNum = 100;
//由于是分页查询，所以加上按创建时间排序，可以避免某些页中有重复数据
filter.AddSortBy("CreatedTime", H3.Data.Filter.SortDirection.Descending);
filter.Matcher = andMatcher;
```

?> [分页查询所有数据示例](/doc/cs-example?id=通用通过筛选器分页获取某表单全部业务对象)

### And/Or 组合示例

实现SQL中的 ```WHERE Status = 1``` 的筛选效果：
``` cs
H3.Data.Filter.Filter filter = new H3.Data.Filter.Filter();
H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();
andMatcher.Add(new H3.Data.Filter.ItemMatcher("Status", H3.Data.ComparisonOperatorType.StartWith, H3.DataModel.BizObjectStatus.Effective));
filter.Matcher = andMatcher;
```

实现SQL中的 ```WHERE Status = 1 AND CreatedTime >= '2023-02-01'``` 的筛选效果：
``` cs
H3.Data.Filter.Filter filter = new H3.Data.Filter.Filter();
H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();
andMatcher.Add(new H3.Data.Filter.ItemMatcher("Status", H3.Data.ComparisonOperatorType.Equal, H3.DataModel.BizObjectStatus.Effective));
andMatcher.Add(new H3.Data.Filter.ItemMatcher("CreatedTime", H3.Data.ComparisonOperatorType.NotBelow, DateTime.Parse("2023-02-01")));
filter.Matcher = andMatcher;
```

实现SQL中的 ```WHERE Status = 3 Or F0000001 = '作废'``` 的筛选效果：
``` cs
H3.Data.Filter.Filter filter = new H3.Data.Filter.Filter();
H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();

H3.Data.Filter.Or orMatcher = new H3.Data.Filter.Or();
orMatcher.Add(new H3.Data.Filter.ItemMatcher("Status", H3.Data.ComparisonOperatorType.Equal, H3.DataModel.BizObjectStatus.Canceled));
orMatcher.Add(new H3.Data.Filter.ItemMatcher("F0000001", H3.Data.ComparisonOperatorType.Equal, "作废"));

andMatcher.Add(orMatcher);
filter.Matcher = andMatcher;
```

实现SQL中的 ```WHERE CreatedTime >= '2023-02-01' AND ( Status = 3 Or F0000001 = '作废' )``` 的筛选效果：
``` cs
H3.Data.Filter.Filter filter = new H3.Data.Filter.Filter();
H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();
andMatcher.Add(new H3.Data.Filter.ItemMatcher("CreatedTime", H3.Data.ComparisonOperatorType.NotBelow, DateTime.Parse("2023-02-01")));

H3.Data.Filter.Or orMatcher = new H3.Data.Filter.Or();
orMatcher.Add(new H3.Data.Filter.ItemMatcher("Status", H3.Data.ComparisonOperatorType.Equal, H3.DataModel.BizObjectStatus.Canceled));
orMatcher.Add(new H3.Data.Filter.ItemMatcher("F0000001", H3.Data.ComparisonOperatorType.Equal, "作废"));

andMatcher.Add(orMatcher);
filter.Matcher = andMatcher;
```

### H3.Data.ComparisonOperatorType比较器枚举值

| **后端枚举值**                                   | **对应OpenApi LoadBizObjects接口Operator值** | **对应SQL（A为字段，?为筛选值）**     | **释义**                             |
|---------------------------------------------|-----------------------------------------|---------------------------|------------------------------------|
| H3.Data.ComparisonOperatorType.Above        | 0                                       | A > ?                     | 大于，用于数值、日期时间类型控件值的比较               |
| H3.Data.ComparisonOperatorType.NotBelow     | 1                                       | A >= ?                    | 大于等于，用于数值、日期时间类型控件值的比较             |
| H3.Data.ComparisonOperatorType.Equal        | 2                                       | A = ?                     | 等于，用于文本、数值、日期时间类型控件值的比较            |
| H3.Data.ComparisonOperatorType.NotAbove     | 3                                       | A <= ?                    | 小于等于，用于数值、日期时间类型控件值的比较             |
| H3.Data.ComparisonOperatorType.Below        | 4                                       | A < ?                     | 小于，用于数值、日期时间类型控件值的比较               |
| H3.Data.ComparisonOperatorType.NotEqual     | 5                                       | A != ?                    | 不等于，用于文本、数值、日期时间类型控件值的比较           |
| H3.Data.ComparisonOperatorType.In           | 6                                       | A in (?, ?)               | 和列表中任意值匹配，用于文本、数值、日期时间类型控件值的比较     |
| H3.Data.ComparisonOperatorType.NotIn        | 7                                       | A not in (?, ?)           | 不和列表中任意值匹配，用于文本、数值、日期时间类型控件值的比较    |
| H3.Data.ComparisonOperatorType.Contains     | 8                                       | A like '%?%'              | 文本包含指定字符串，用于文本类型控件值的比较             |
| H3.Data.ComparisonOperatorType.StartWith    | 13                                      | A like '?%'               | 文本以?开始，用于文本类型控件值的比较                |
| H3.Data.ComparisonOperatorType.EndWith      | 14                                      | A like '%?'               | 文本以?为结尾，用于文本类型控件值的比较               |
| H3.Data.ComparisonOperatorType.IsNull       | 18                                      | A is null                 | 判断值为null，可用于任意类型控件值的比较             |
| H3.Data.ComparisonOperatorType.NotNull      | 19                                      | A is not null             | 判断值不为null，可用于任意类型控件值的比较            |
| H3.Data.ComparisonOperatorType.IsNone       | 20                                      | A is null or A = ''       | 判断值为null 或者 为空字符串，用于文本、数值类型控件值的比较  |
| H3.Data.ComparisonOperatorType.NotNone      | 21                                      | A is not null and A != '' | 判断值不为null 且 不为空字符串，用于文本、数值类型控件值的比较 |
| H3.Data.ComparisonOperatorType.NotStartWith | 22                                      | A not like '?%'           | 文本不以?开始，用于文本类型控件值的比较               |
| H3.Data.ComparisonOperatorType.NotEndWith   | 23                                      | A not like '%?'           | 文本不以?结尾，用于文本类型控件值的比较               |
| H3.Data.ComparisonOperatorType.NotContains  | 24                                      | A not like '%?%'          | 文本不包含指定字符串，用于文本类型控件值的比较            |




# 数据库表结构详解
 
开发者可以通过3种方式查询数据库数据：
1. [后端代码中执行SQL](/doc/exec-sql)
2. [SQL报表](/doc/sql-report)
3. [SQL高级数据源](/doc/sql-dashboard)


## [表单]主表

数据库表名：i_表单编码

!> PS：[表单编码查看方式](/doc/check-code?id=表单编码查看)

| **序号** | **字段编码**           | **字段释义**      | **备注**                                     |
|--------|--------------------|---------------|---------------------------------------------|
| 1      | ObjectId           | 数据Id          |  主键，数据的唯一标识                                 |
| 2      | Name               | 数据标题          |                                             |
| 3      | CreatedBy          | 创建人Id         | 对应H_User表ObjectId字段                         |
| 4      | OwnerId            | 归属人Id         | 对应H_User表ObjectId字段                         |
| 5      | OwnerDeptId        | 归属部门Id        | 对应H_Organizationunit表ObjectId字段             |
| 6      | CreatedTime        | 创建时间          |                                             |
| 7      | ModifiedBy         | 最后一次修改数据的人员id | 对应H_User表ObjectId字段                     |
| 8      | ModifiedTime       | 最后一次修改数据的时间   |                                             |
| 9      | WorkflowInstanceId | 流程Id          | 当表单有流程，且已发起流程时有值。对应H_WorkflowInstance表ObjectId字段              |
| 10     | Status             | 数据状态          | 取值：0 草稿，1 生效/流程结束，2 流程进行中，3 作废 |
| ...    | 表单中自定义控件的编码        | 表单内自定义控件的值    | 当自定义控件值未填，数据库存储null，查询null的字段值要用“is null”   |


## [表单]子表

数据库表名：i_子表控件编码

!> PS：[子表控件编码查看方式](/doc/check-code?id=子表编码查看)

| **序号** | **字段编码**            | **字段释义**     | **备注**         |
|--------|---------------------|--------------|-----------------|
| 1      | ObjectId            | 子表数据Id       | 主键，数据的唯一标识      |
| 5      | Name                | 子表数据标题       |                 |
| 2      | ParentObjectId      | 该数据所属主表的数据Id |  对应主表ObjectId字段 |
| 3      | ParentPropertyName  | 子表编码         |                 |
| 4      | ParentIndex         | 本条数据处在子表第几行  | 从0开始，第一行下标：0    |
| ...    | 子表中自定义控件的编码     | 子表内自定义控件的值      | 当自定义控件值未填，数据库存储null，查询null的字段值要用“is null” |


## [表单]关联表单多选中间表

数据库表名：
- 控件在主表：i_表单编码_关联表单多选控件编码
- 控件在子表：i_子表控件编码_关联表单多选控件编码

| **序号** | **字段编码**           | **字段释义** | **备注**               |
|--------|--------------------|----------|----------------------|
| 1      | ObjectId           | 主表数据Id/子表数据Id     |    对应控件所在的主表ObjectId字段/子表ObjectId字段        |
| 2      | ValueIndex         | 本选项是第几个，从0开始     |                      |
| 3      | PropertyValue      | 描述表单多选控件的其中1个选项值（若此关联表单控件有多个值，会在此表有多行数据）     |  对应所关联的表单数据的ObjectId字段       |


## [系统-公司表] H_Company

数据库表名：H_Company

| **序号** | **字段编码**           | **字段释义** | **备注**               |
|--------|--------------------|----------|----------------------|
| 1      | ObjectId           | 公司Id     | 主键，公司的唯一标识           |
| 2      | Name               | 公司名称     |                      |
| 3      | Description        | 描述       |                      |
| 4      | Code               | 公司编码     |                      |
| 5      | ManagerId          | 经理       | 对应H_User表ObjectId字段  |
| 6      | SortKey            | 排序值      |                      |
| 7      | ParentObjectId     | 父对象Id    | 暂未使用                 |
| 8      | ParentPropertyName | 父对象属性名称  | 暂未使用                 |
| 9      | ParentIndex        | 父对象索引    | 暂未使用                 |


## [系统-部门表] H_Organizationunit

数据库表名：H_Organizationunit

| **序号** | **字段编码**             | **字段释义**    | **备注**                           |
|--------|----------------------|-------------|----------------------------------|
| 1      | ObjectId             | 部门Id        | 主键，部门的唯一标识                       |
| 2      | Name                 | 部门名称        |                                  |
| 3      | DingTalkDepartmentId | 钉钉中的部门Id    |                                  |
| 4      | WeChatDepartmentId   | 企微中的部门Id    |                                  |
| 5      | ParentId             | 父部门ObjectId | 对应H_Organizationunit表ObjectId字段  |
| 6      | Visibility           | 可见类型        |                                  |
| 7      | State                | 状态          | 取值：0：有效，1：无效                     |
| 8      | Description          | 描述          |                                  |
| 9      | Code                 | 部门编码        |                                  |
| 10     | ManagerId            | 部门经理        | 对应H_User表ObjectId字段              |
| 11     | CreatedTime          | 创建时间        |                                  |
| 12     | ModifiedTime         | 修改时间        |                                  |
| 13     | Sortkey              | 排序值         |                                  |
| 14     | ParentObjectId       | 父对象Id       | 暂未使用                             |
| 15     | ParentPropertyName   | 父对象属性名称     | 暂未使用                             |
| 16     | ParentIndex          | 父对象索引       | 暂未使用                             |


## [系统-用户表] H_User

数据库表名：H_User

| **序号** | **字段编码**       | **字段释义**       | **备注**                           |
|--------|---------------------|----------------|----------------------------------|
| 1      | ObjectId            | 氚云用户Id         | 主键，用户的唯一标识                       |
| 2      | State               | 状态               | 取值：0：在职，1：离职                     |
| 3      | Name                | 用户姓名           |                                  |
| 4      | ParentId            | 主部门Id           | 对应H_Organizationunit表ObjectId字段  |
| 5      | ManagerId           | 部门经理用户Id     | 对应H_User表ObjectId字段              |
| 6      | DingTalkAccount     | 对应钉钉用户Id     | 跟钉钉对接时可用，字段值格式：```钉钉userId.钉钉corpId```（注意：使用时需截取出点号之前的钉钉userId）   |
| 7      | WechatUserId        | 对应企微用户Id     |                                  |
| 8      | Position            | 职位             |                                  |
| 9      | Mobile              | 手机号            |                                  |
| 10     | Email               | 邮箱             |                                  |
| 11     | EmployeeNumber      | 工号             |                                  |
| 12     | Title               | 用户的职务       |                                  |
| 13     | Birthday            | 生日             |                                  |
| 14     | Gender              | 性别             |                                  |
| 15     | EntryDate           | 入职日期           |                                  |
| 16     | DepartureDate       | 离职日期           |                                  |
| 17     | HomePhone           | 家庭电话           |                                  |
| 18     | OfficePhone         | 办公电话           |                                  |
| 19     | QQ                  | QQ             |                                  |
| 20     | IdNumber            | 身份证号码          |                                  |
| 21     | EmployeeRank        | 员工职级           |                                  |
| 22     | ProfilePhotoUrl     | 头像             |                                  |
| 23     | DepartmentName      | 部门名称           |                                  |
| 24     | Password            | 密码             |                                  |
| 25     | DingId              | 用户DingId       |                                  |
| 26     | ExtAttr             | 扩展属性           |                                  |
| 27     | Visibility          | 可见类型           |                                  |
| 28     | Description         | 描述             |                                  |
| 29     | CreatedTime         | 创建时间           |                                  |
| 30     | ModifiedTime        | 修改时间           |                                  |
| 31     | SortKey             | 排序值            |                                  |
| 32     | ParentObjectId      | 父对象Id          | 暂未使用                             |
| 33     | ParentPropertyName  | 父对象属性名称        | 暂未使用                             |
| 34     | ParentIndex         | 父对象索引          | 暂未使用                             |


## [系统-用户&部门关系表] H_User_ViceparentIds

数据库表名：H_User_ViceparentIds

| **序号** | **字段编码**             | **字段释义**    | **备注**                           |
|--------|----------------------|-------------|----------------------------------|
| 1      | ObjectId             | 用户Id        | 对应H_User表ObjectId字段             |
| 2      | ValueIndex           | 第几个，从0开始 |                                  |
| 3      | PropertyValue        | 部门Id          | 对应H_Organizationunit表ObjectId字段    |


## [系统-角色分组表] H_OrgRoleGroup

数据库表名：H_OrgRoleGroup

| **序号** | **字段编码**            | **字段释义** | **备注**                  |
|--------|---------------------|----------|-------------------------|
| 1      | ObjectId            | 角色分组Id   | 主键，角色分组的唯一标识       |
| 2      | Name                | 角色分组名称   |                         |
| 3      | EntryroleGroupId    | 来源Id     | 暂未使用                    |
| 4      | ParentId            | 公司Id     | 对应H_Company表ObjectId字段  |
| 5      | Visibility          | 可见类型     |                         |
| 6      | State               | 状态       | 取值：0：有效，1：无效       |
| 7      | Description         | 描述       | 暂未使用                    |
| 8      | Code                | 分组代码     | 暂未使用                    |
| 9      | ManagerId           | 主管人      | 暂未使用                    |
| 10     | CreatedTime         | 创建时间     |                         |
| 11     | ModifiedTime        | 最后修改时间   |                         |
| 12     | SortKey             | 排序值      |                         |
| 13     | ParentObjectId      | 父对象Id    | 暂未使用                    |
| 14     | ParentPropertyName  | 父对象属性名称  | 暂未使用                    |
| 15     | ParentIndex         | 父对象索引    | 暂未使用                    |


## [系统-角色表] H_OrgRole

数据库表名：H_OrgRole

| **序号** | **字段编码**           | **字段释义** | **备注**                  |
|--------|--------------------|----------|-------------------------|
| 1      | ObjectId           | 角色Id     | 主键，角色的唯一标识              |
| 2      | Name               | 角色名称     |                         |
| 3      | EntryRoleId        | 来源Id     | 暂未使用                    |
| 4      | GroupId            | 分组Id     | 对应H_OrgRoleGroup表ObjectId字段  |
| 5      | ParentId           | 公司Id     | 对应H_Company表ObjectId字段  |
| 6      | CompanyId          | 公司Id     | 对应H_Company表ObjectId字段  |
| 7      | Visibility         | 可见类型     | 暂未使用                    |
| 8      | State              | 状态       | 取值：0：有效，1：无效            |
| 9      | Description        | 描述       | 暂未使用                    |
| 10     | Code               | 角色编码     | 暂未使用                    |
| 11     | ManagerId          | 主管人      | 暂未使用                    |
| 12     | CreatedTime        | 创建时间     |                         |
| 13     | ModifiedTime       | 修改时间     |                         |
| 14     | Sortkey            | 排序值      |                         |
| 15     | ParentObjectId     | 父对象Id    | 暂未使用                    |
| 16     | ParentPropertyName | 父对象属性名称  | 暂未使用                    |
| 17     | ParentIndex        | 父对象索引    | 暂未使用                    |


## [系统-角色&用户关系表] H_Orgpost

数据库表名：H_Orgpost

| **序号** | **字段编码**           | **字段释义**     | **备注**                 |
|--------|--------------------|--------------|------------------------|
| 1      | ObjectId           | 角色和用户对应关系Id  | 主键，角色用户关系的唯一标识         |
| 2      | UserId             | 角色对应的用户Id    | 对应H_User表ObjectId字段    |
| 3      | ParentId           | 角色Id         | 对应H_OrgRole表ObjectId字段 |
| 4      | CompanyId          | 公司Id         | 对应H_Company表ObjectId字段 |
| 5      | Depts              | 服务部门Id       |                        |
| 6      | Visibility         | 可见类型         | 暂未使用                   |
| 7      | State              | 状态       | 取值：0：有效，1：无效            |
| 8      | Name               | 名称           | 暂未使用                   |
| 9      | Description        | 描述           |                        |
| 10     | Code               | 编码           |                        |
| 11     | ManagerId          | 主管人          | 暂未使用                   |
| 12     | CreatedTime        | 创建时间         |                        |
| 13     | ModifiedTime       | 修改时间         |                        |
| 14     | Sortkey            | 排序值          |                        |
| 15     | ParentObjectId     | 父对象Id        | 暂未使用                   |
| 16     | ParentPropertyName | 父对象属性名称      | 暂未使用                   |
| 17     | ParentIndex        | 父对象索引        | 暂未使用                   |


## [系统-流程实例表] H_WorkflowInstance

数据库表名：H_WorkflowInstance

> 每条审批数据对应此表一条数据

| **序号** | **字段编码**              | **字段释义**             | **备注**                                                       |
|--------|-----------------------|----------------------|--------------------------------------------------------------|
| 1      | ObjectId              | 流程Id                 | 主键，流程的唯一标识                                                   |
| 2      | WorkflowDisplayName   | 流程展示名称               |                                                              |
| 3      | InstanceName          | 流程实例名称               |                                                              |
| 4      | Originator            | 发起人Id                | 对应H_User表ObjectId字段                                          |
| 5      | OriginatorParent      | 发起人所属组织Id            | 对应H_Organizationunit表ObjectId字段                              |
| 6      | IsChildInstance       | 是否子流程                | true：子流程                                                     |
| 7      | ParentInstanceId      | 父流程Id                | 当IsChildInstance为true时，此字段有值。对应H_WorkflowInstance表ObjectId字段 |
| 8      | ParentActivityCode    | 创建该子流程的父流程活动编码       | 当IsChildInstance为true时，此字段有值  |
| 9      | NotifyParentFinished  | 完成结束时是否通知它的父实例已完成    | 当IsChildInstance为true时，此字段有值      |
| 10     | ParentActivityTokenId | 创建该子流程的父流程活动的TokenId | 当IsChildInstance为true时，此字段有值      |
| 11     | WorkflowVersion       | 流程模板的版本              |                                                              |
| 12     | AppCode               | 应用的编码                |                                                              |
| 13     | SchemaCode            | 业务对象模式编码             |                                                              |
| 14     | BizObjectId           | 业务对象对应的Id            | 对应表单表ObjectId字段                                              |
| 15     | State                 | 流程实例状态        | 0：初始化完成，1：正在启动，2：正在运行，3：正在结束，4：已完成，5：已取消     |
| 16     | InitiativeTokenId     | 初始的TokenId           | 如果State为1，此字段有值                                              |
| 17     | FinalTokenId          | 最后一个令牌的Id            | 如果State为3，此字段有值                                              |
| 18     | NextTokenId           | 下一个新的Token的Id，       |                                                              |
| 19     | CreatedTime           | 创建时间                 |                                                              |
| 20     | StartTime             | 启动时间                 |                                                              |
| 21     | FinishTime            | 完成时间                 |                                                              |
| 22     | UsedTime              | 使用的时间                | 使用 UsedTime/10000000 得到秒                                     |
| 23     | PlanFinishTime        | 计划完成时间               |                                                              |
| 24     | UsedTimeRate          | 未使用                  |                                                              |
| 25     | Approval              | 是否最终审批通过             | 1：同意，0：不同意，-1：审批人还未处理/取消节点                 |
| 26     | Remind                | 流程结束后通知给发起人          |                                                              |
| 27     | Notify                | 流程是否发送消息提醒           |                                                              |


## [系统-流程工作项表] H_WorkItem

数据库表名：H_WorkItem

> 流程每激活一个流程节点，节点上每个审批人，对应此表一条数据，若要查询流程日志，查询本表即可。

| **序号** | **字段编码**            | **字段释义**            | **备注**                          |
|--------|---------------------|---------------------|---------------------------------|
| 1      | ObjectId            | 任务Id                | 主键，流程工作项的唯一标识                   |
| 2      | Participant         | 任务参与者（审批人）          | 对应H_User表ObjectId字段             |
| 3      | OriginatorParent    | 发起人部门               | 对应H_Organizationunit表ObjectId字段 |
| 4      | Finisher            | 实际完成者               | 对应H_User表ObjectId字段             |
| 5      | FinishAccessMethod  | 完成接入方式              |                                 |
| 6      | WorkflowVersion     | 流程版本号               |                                 |
| 7      | InstanceId          | 流程实例Id              | 对应H_WorkflowInstance表ObjectId字段 |
| 8      | AppCode             | 应用编码                |                                 |
| 9      | SchemaCode          | 业务对象模式编码            |                                 |
| 10     | BizObjectId         | 业务对象Id              | 对应表单表ObjectId字段                 |
| 11     | TokenId             | 流程中的步骤Id         | 该节点激活序号，同一个流程下此字段最大值就代表是最新的节点，可用于查询流程当前节点  |
| 12     | ActivityCode        | 活动编码                | 即流程设计中节点的编码                     |
| 13     | ActivityDisplayName | 活动名称                | 即流程设计中节点的名称                     |
| 14     | DisplayName         | 显示名称（包含流程数据项的组合字符串） |                                 |
| 15     | ItemSummary         | 摘要                  |                                 |
| 16     | State               | 任务状态                | 0：等待中，1：进行中，2：已完成，3：已取消，6：已转交   |
| 17     | ReceiveTime         | 接收时间                |                                 |
| 18     | StartTime           | 任务开始的时间             |                                 |
| 19     | WaitTime            | 等待时长                |                                 |
| 20     | FinishTime          | 任务完成时间              |                                 |
| 21     | UsedTime            | 使用的时间               | 使用 UsedTime/10000000 得到秒        |
| 22     | Delegant            | 委托人                 |                                 |
| 23     | Urged               | 是否催办过               |                                 |
| 24     | ItemType            | 工作项的类型              | 0：发起节点/经办节点，2：审批节点，3：抄送节点     |
| 25     | Originator          | 流程发起人               |                                 |
| 26     | Approval            | 是否同意                | 1：同意，0：不同意，-1：审批人还未处理/取消节点      |
| 27     | ItemComment         | 审批意见内容              | 已废弃                             |
| 28     | Receiptor           | 转交工作的接收人            |                                 |
| 29     | ActionName          | 用户操作名称              |                                 |
| 30     | PreActionEventType  | 上一个操作的时间类型          |                                 |
| 31     | ActionEventType     | 操作事件类型              |                                 |
| 32     | AllowedTime         | 许可完成时间，到期自动审批       |                                 |


## [系统-流程步骤表] H_Token

数据库表名：H_Token

> 流程每激活一个流程节点，对应此表一条数据

| **序号** | **字段编码**           | **字段释义**    | **备注**                            |
|--------|--------------------|-------------|-----------------------------------|
| 1      | ObjectId           | 流程步骤Id      | 主键，流程步骤的唯一标识                      |
| 2      | TokenId            | 令牌Id        |  该节点激活序号，同一个流程下此字段最大值就代表是最新的节点，可用于查询流程当前节点  |
| 3      | Activity           | 令牌对应的活动编码   | 即流程设计中的节点编码                       |
| 4      | Approval           | 审批结果        | 1：同意，0：不同意，-1：审批人还未处理/取消节点        |
| 5      | SkippedExecution   | 是否跳过的       |                                   |
| 6      | Exceptional        | 是否出现了异常     |                                   |
| 7      | Retrievable        | 是否可以被撤回     |                                   |
| 8      | CreatedTime        | 创建时间        |                                   |
| 9      | PreTokens          | 前驱的令牌Id     |                                   |
| 10     | FinishedTime       | 完成时间        |                                   |
| 11     | State              | 状态          | 0：等待中，1：进行中，2：已完成，3：已取消，6：已转交     |
| 12     | Participants       | 当前的审批人      | 由于一个节点可以由多个人审批，所以此字段是xml格式的用户Id数组 |
| 13     | UsedTime           | 使用的时间       | 可通过 UsedTime/10000000 得到秒级单位的时间   |
| 14     | ParentObjectId     | 流程实例Id      | 对应H_WorkflowInstance表ObjectId字段   |
| 15     | ParentPropertyName | 属性名称        |                                   |
| 16     | ParentIndex        | 对应流程实例中的排序值 |                                   |


## [系统-审批意见记录表] H_Comment

数据库表名：H_Comment

| **序号** | **字段编码**      | **字段释义**      | **备注**                          |
|--------|--------------------|---------------|---------------------------------|
| 1      | ObjectId           | 审批意见Id        | 主键，审批意见的唯一标识                    |
| 2      | SchemaCode         | 表单编码          |                                 |
| 3      | BizObjectId        | 表单数据Id        | 对应表单表ObjectId字段                 |
| 4      | InstanceId         | 流程实例Id        | 对应H_WorkflowInstance表ObjectId字段 |
| 5      | Activity           | 活动节点编码        | 即流程设计中的节点编码                     |
| 6      | UserId             | 用户Id          | 对应H_User表ObjectId字段             |
| 7      | Delegant           | 委托人           | 暂未使用                            |
| 8      | UserParentName     | 评论用户部门名称      |                                 |
| 9      | TokenId            | 令牌Id          |                                 |
| 10     | Text               | 审批意见          |                                 |
| 11     | Approval           | 是否审批通过        | 1：同意，0：不同意                      |
| 12     | CreatedTime        | 评论时间          |                                 |
| 13     | ModifiedTime       | 最后一次修改意见的时间   |                                 |
| 14     | ModifiedBy         | 最后一次修改意见的人员id | 对应H_User表ObjectId字段             |
| 15     | Signature          | 签名            | 暂未使用                            |
| 16     | AttachmentIds      | 附件Id          | 此字段是xml格式的附件Id数组                |
| 17     | WorkItemId         | 任务Id          | 对应H_WorkItem表ObjectId字段         |
| 18     | ParentObjectId     | 父对象Id         | 暂未使用                            |
| 19     | ParentPropertyName | 父对象属性名称       | 暂未使用                            |
| 20     | ParentIndex        | 父对象索引         | 暂未使用                            |


## [系统-附件/图片记录表] H_BizObjectFile

数据库表名：H_BizObjectFile

| **序号** | **字段编码**           | **字段释义**           | **备注**          |
|--------|--------------------|--------------------------------------|--------------------------------------|
| 1      | ObjectId           | 附件/图片Id                           | 主键，附件/图片的唯一标识              |
| 2      | LastVersion        | 版本                                  |                   |
| 3      | SchemaCode         | 附件/图片所在主表的表单编码            |                |
| 4      | ChildSchemaCode    | 如附件/图片控件在子表中，则有子表控件编码                |                |
| 5      | PropertyName       | 所在表单的附件/图片控件编码，若是子表中的附件/图片，则是子表内控件编码 |               |
| 6      | BizObjectId        | 所在表单数据Id，若是子表中的附件/图片，则是子表数据Id        |                   |
| 7      | SourcePropertyName | 源表字段                                 |                                |
| 8      | SourceBizObjectId  | 源表数据Id                               |                       |
| 9      | SourceFileId       | 源表附件Id                               |                         |
| 10     | CreatedBy          | 上传人员Id                               | 对应H_User表ObjectId字段                        |
| 11     | ModifiedBy         | 最后修改人员Id                             | 对应H_User表ObjectId字段                                |
| 12     | ContentType        | 附件/图片类型              | MIME 类型，[MIME类型列表](https://www.w3school.com.cn/media/media_mimeref.asp) |
| 13     | ContentLength      | 附件/图片大小                              | 单位：B，除1024得到KB，除1048576得到MB                      |
| 14     | FileName           | 附件/图片文件名                             | 带文件后缀                                     |
| 15     | Description        | 对附件/图片的描述                            | 暂未使用                                   |
| 16     | CreatedTime        | 附件/图片上传时间                            |                                    |
| 17     | ModifiedTime       | 附件/图片最后修改时间                          |                                            |
| 18     | FileFlag           | 是否逻辑删除                              |                              |
| 19     | SortKey            | 排序值                                  | 是附件/图片控件中第几个，从0开始               |
| 20     | ParentObjectId     | 父对象Id                                | 暂未使用             |
| 21     | ParentPropertyName | 父对象属性名称                              | 暂未使用                         |
| 22     | ParentIndex        | 父对象索引                                | 暂未使用                        |


## [系统-表单信息表] H_PublishedBizObjectSchema

数据库表名：H_PublishedBizObjectSchema

| **序号** | **字段编码**           | **字段释义** | **备注**                             |
|--------|--------------------|----------|------------------------------------|
| 1      | ObjectId           | 表单信息Id   | 主键，表单信息的唯一标识                       |
| 2      | SchemaCode         | 表单编码     |                                    |
| 3      | DisplayName        | 表单展示名称   | 该字段新版已废弃，后续表单名称需从 `Content` 字段中解析获取             |
| 4      | ChildSchemas       | 子表编码     | 一个表单内可能会有多个子表，所以此字段为xml格式的子表编码数组   |
| 5      | ReferenceSchemas   | 关联表单编码   | 一个表单内可能会有关联表单，所以此字段为xml格式的关联表单编码数组 |
| 6      | Content            | 表单结构文档   | 表单结构XML字符串                          |
| 7      | CreatedTime        | 表单创建时间   |                                    |
| 8      | ModifiedTime       | 表单最后修改时间 |                                    |
| 9      | ParentObjectId     | 父对象Id    | 暂未使用                               |
| 10     | ParentPropertyName | 父对象属性名称  | 暂未使用                               |
| 11     | ParentIndex        | 父对象索引    | 暂未使用                               |


## [系统-表单配置表] H_PublishedFormSetting

数据库表名：H_PublishedFormSetting

| **序号** | **字段编码**                 | **字段释义**   | **备注**       |
|--------|--------------------------|------------|--------------|
| 1      | ObjectId                 | 表单配置Id     | 主键，表单配置的唯一标识 |
| 2      | SchemaCode               | 表单编码       |              |
| 3      | DisplayName              | 表单展示名称     |   该字段新版已废弃，请勿使用           |
| 4      | JavaScript               | 表单设计旧版前端代码  |  目前旧版表单基本已完成升级，后续勿再使用此字段     |
| 5      | NewJsCode                | 表单设计新版前端代码 | 目前企业基本都处于新版表单了，所以后续用此字段             |
| 6      | BehindCode               | 表单设计后端代码   |              |
| 7      | ModifiedTime             | 表单配置最后修改时间 |              |
| 8      | DesignModeContent        |            |              |
| 9      | RuntimeContent           |            |              |
| 10     | FormContent              |            |              |
| 11     | FormConfigContent        |            |              |
| 12     | EnableFormSns            |            |              |
| 13     | EnableTask               |            |              |
| 14     | EnableLog                |            |              |
| 15     | PcLayout                 |            |              |
| 16     | ConfigedExternalForm     |            |              |
| 17     | EnableExternalForm       |            |              |
| 18     | EnableReviewExternalForm |            |              |
| 19     | EnableExternalShare      |            |              |
| 20     | ExtAttr                  |            |              |
| 21     | AssociationCodes         |            |              |
| 22     | FunctionsinBehindCode    |            |              |
| 23     | Actions                  |            |              |
| 24     | ParentObjectId           | 父对象Id      | 暂未使用         |
| 25     | ParentPropertyName       | 父对象属性名称    | 暂未使用         |
| 26     | ParentIndex              | 父对象索引      | 暂未使用         |


## [系统-列表配置表] H_PublishedListViewSetting

数据库表名：H_PublishedListViewSetting

| **序号** | **字段编码**                 | **字段释义**   | **备注**       |
|--------|--------------------------|------------|--------------|
| 1      | ObjectId                 | 列表配置Id     | 主键，列表配置的唯一标识 |
| 2      | SchemaCode               | 表单编码       |              |
| 3      | JavaScript               | 列表设计前端代码   | 目前列表前端代码并没有新旧版之分，所以用此字段      |
| 4      | NewJsCode                | 列表设计新版前端代码 | 暂未使用         |
| 5      | BehindCode               | 列表设计后端代码   |              |
| 6      | ModifiedTime             | 列表配置最后修改时间 |              |
| 7      | IconProperty             | 移动端图标字段    |              |
| 8      | SortBy                   | 列表排序字段     |              |
| 9      | SortDirection            | 列表排序方式     |              |
| 10     | OptionalDisplayMode      |            |              |
| 11     | WebDefaultDisplayMode    |            |              |
| 12     | MobileDefaultDisplayMode |            |              |
| 13     | Selectable               |            |              |
| 14     | StartTimePropertyName    |            |              |
| 15     | EndTimePropertyName      |            |              |
| 16     | DefaultDisplayDimension  |            |              |
| 17     | DefaultDisplayChildCode  |            |              |
| 18     | TimeLineaxis             |            |              |
| 19     | TimeLineSortDirection    |            |              |
| 20     | FunctionsinBehindCode    |            |              |
| 21     | Actions                  |            |              |
| 22     | ParentObjectId           | 父对象Id      | 暂未使用         |
| 23     | ParentPropertyName       | 父对象属性名称    | 暂未使用         |
| 24     | ParentIndex              | 父对象索引      | 暂未使用         |



# 前端代码示例

## [表单]前端实现编辑页编辑后不关闭编辑页

可用位置：✔表单 / ✘列表

表单前端代码
``` js
// 提交后事件
AfterSubmit: function( action, responseValue ) {
	///编辑后不 关闭编辑页
	if( action == "Submit" && $.SmartForm.ResponseContext.BizObjectStatus == 1 ) //数据生效，BizObjectStatus值为 1
	{
		$.IShowForm( "D00000xxxx", $.SmartForm.ResponseContext.BizObjectId, null);
		responseValue.ClosePage = false;
		responseValue.Refresh = true;
	}
}
```


## [表单]前端获取/设置控件的只读/隐藏状态

可用位置：✔表单 / ✘列表

表单前端代码：
``` js
// 加载事件
OnLoad: function() {
	var that = this;

	var isEdit = that.控件编码.Editable;//获取控件可写状态，true：可写，false：只读

	var isVis = that.控件编码.Visible;//获取控件隐藏状态，true：显示，false：隐藏

	that.控件编码.SetReadonly(true);//设置控件只读
	that.控件编码.SetReadonly(false);//设置控件可写

	that.控件编码.SetVisible(false);//设置控件隐藏
	that.控件编码.SetVisible(true);//设置控件显示
},
```


## [表单]前端绑定单行文本控件值改变事件

可用位置：✔表单 / ✘列表

表单前端代码：
``` js
// 加载事件
OnLoad: function() {
	/*
		由于BindChange事件的触发时机是焦点离开再触发，在某些需求中及时度不够，此时可以使用OnTempChange事件。
		注意：OnTempChange事件只限用于 单行文本、多行文本 两类控件。

		本示例实现效果：
			在单行文本中，输入任意字符，能立马触发事件，而不是等输入完成焦点离开再触发（示例中 F0000001 为单行文本控件的控件编码）。
	*/
    var that = this;
    that.F0000001.OnTempChange( function() {
        var v = that.F0000001.GetValue();
    });
},
```


## [表单]提交前弹出确认框二次确认

可用位置：✔表单 / ✘列表

!> 由于氚云的 `$.IConfirm` 非阻塞函数，所以不能用来作为提交前的二次确认，若确实需要做二次确认功能，需使用js自带的 `confirm` 函数。

表单前端代码：
``` js
// 提交校验
OnValidate: function( actionControl ) {

    var that = this;

    //判断用户是否点击的是“提交”按钮
    if( actionControl.Action == "Submit" ) {

        //弹出确认弹窗，让用户再次确认提交动作
        if( confirm( "这里是弹窗的内容，确认提交？" ) ) {
            //用户点击了“确认”，则不做处理，正常执行后续代码

        } else {
            //用户点击了“取消”，则使用return false中止提交动作
            return false;
        }
    }

    return true;//注意：此句代码勿删，放在OnValidate事件最后，若删除会导致点击提交按钮无反应
},
```


## [表单]前端新增页面去除子表默认空白行

可用位置：✔表单 / ✘列表

``` js
// 加载事件
OnLoad: function() {
	var that = this;

	if( $.SmartForm.ResponseContext.IsCreateMode ) {
		that.子表控件编码.ClearRows();
	}
},
```


## [表单]前端监听子表内某列控件值变更

``` js
// 加载事件
OnLoad: function() {
	var that = this;

	//定义一个前端字符串转数值的函数，以供后续获取数字控件值用
	function convertNumber( v ) {
		if( typeof v === "string" ) {
			if( v && v.length ) {
				try {
					return parseFloat( v );
				} catch( e ) {
					return 0;
				}
			}
		} else if( typeof v === "number" ) {
			return v;
		}

		return 0;
	}

	//给子表控件绑定BindChange事件（子表内新增行、删除行、编辑控件数据都会触发子表控件的BindChange事件）
	that.Dxxxxx.BindChange( $.IGuid(), function( data ) {
		//获取触发本事件的子表数据行
		var row = data[ 0 ];

		//判断触发本事件的来源是否是 Dxxxxx.F0000003 控件
		if( row && row.DataField == "Dxxxxx.F0000003" ) {
			//获取触发本事件的子表数据行ObjectId
			var currentRowId = row.ObjectId;

			//获取本行数据的 Dxxxxx.F0000003 控件实例（子表内控件在每一行中都有，所以获取时，需要指定 子表数据行ObjectId 和 子表内控件编码）
			var quantityCon = that.Dxxxxx.GetCellManager( currentRowId, "Dxxxxx.F0000003" );

			//获取到了控件实例，那接下来就可以用控件实例相关的函数了（比如：GetValue、SetValue、ClearItems、AddItem）
			//获取本行中 Dxxxxx.F0000003 控件的值
			var quantity = quantityCon.GetValue();
			//转成Number类型
			quantity = convertNumber( quantity );

			//获取本行 Dxxxxx.F0000004 控件的值
			var unitPriceCon = that.Dxxxxx.GetCellManager( currentRowId, "Dxxxxx.F0000004" );
			var unitPrice = unitPriceCon.GetValue();
			//转成Number类型
			unitPrice = convertNumber( unitPrice );

			var amount = quantity * unitPrice;

			//1、通过UpdateRow给本行 Dxxxxx.F0000005、Dxxxxx.F0000006 控件赋值
			//注意：代码更新子表数据同样会触发子表BindChange事件，请注意循环触发的可能，请不要监听 Dxxxxx.F0000005、Dxxxxx.F0000006 控件
			that.Dxxxxx.UpdateRow( currentRowId, {
				"Dxxxxx.F0000005": amount,
				"Dxxxxx.F0000006": amount
			});

			//2、也可以用控件SetValue的方式
			//注意：代码更新子表数据同样会触发子表BindChange事件，请注意循环触发的可能，请不要监听 Dxxxxx.F0000005、Dxxxxx.F0000006 控件
			var amountCon = that.Dxxxxx.GetCellManager( currentRowId, "Dxxxxx.F0000005" );
			amountCon.SetValue(amount);
		}


		//判断触发本事件的来源是否是 Dxxxxx.F0000004 控件
		if( row && row.DataField == "Dxxxxx.F0000004" ) {
			//业务代码
		}
	});
},
```


## [表单]前端子表按钮点击事件

可用位置：✔表单 / ✘列表

``` js
// 加载事件
OnLoad: function() {
	/*
		本示例实现效果：
			子表D154601Fd2d12b143fae4419a2d3e8380d78ad1b 新增、删除等按钮的事件绑定
		注：行数据的类型和值请自行通过debugger调试查看，本处不列出
	*/

	//由于会在回调函数里用到this，而回调函数内直接用this会导致指向错误，所以要在此处先用一个变量存储
	var that = this;

	//给 子表D154601Fd2d12b143fae4419a2d3e8380d78ad1b 绑定 值变化BindChange 函数
	that.D154601Fd2d12b143fae4419a2d3e8380d78ad1b.BindChange( $.IGuid(), function( data ) {
		if( data && data.length >= 2 ) {
			var btnCode = data[ 1 ];//取得子表按钮代码

			debugger

			if( btnCode == "add" ) {//点击 新增/在上面添加行/在下面添加行 按钮
				var rowData = data[ 0 ];//所添加的行数据
			}

			if( btnCode == "delete" ) {//点击 删除 按钮
				var rowId = data[ 0 ][ "rowId" ];//被删除行的行id，即子表ObjectId
				var rowData = data[ 2 ];//被删除行的行数据
			}

			if( btnCode == "copy" ) {//点击 复制 按钮
				var rowData = data[ 0 ];//通过复制添加的新行数据
			}

			if( btnCode == "clear" ) {//点击 清空行数据 按钮
				//空行数据
			}
		}
	});
},
```


## [表单]前端设置子表某些字段不可写

可用位置：✔表单 / ✘列表

表单前端代码
``` js
// 加载事件
OnLoad: function() {
	/*
		本示例实现效果：
			表单详情页打开时和用户点击新增按钮新增子表数据时，F0000031 和 F0000033 两个子表内的控件不可写
	*/

	//由于会在回调函数里用到this，而回调函数内直接用this会导致指向错误，所以要在此处先用一个变量存储
	var that = this;

	//子表编码
	var childTableCode = "D278609xxx";
	//要设置为不可写的子表字段编码集合
	var readonlyFieldCodes = [ "F0000031", "F0000033" ];

	//定义函数，本函数会获取到子表所有行，并按照readonlyFieldCodes集合，将对应子表字段都设置为不可写
	function setReadonlyToAllRowData() {
		if( readonlyFieldCodes && readonlyFieldCodes.length ) {
			//获取子表当前已有的所有数据
			var rowDatas = that[ childTableCode ].GetValue();
			if( rowDatas && rowDatas.length ) {
				//循环子表数据
				for( var i = 0;i < rowDatas.length;i++ ) {
					//取出子表行数据Id
					var rowId = rowDatas[ i ][ "ObjectId" ];

					//循环readonlyFieldCodes，将里面每个子表字段编码对应的字段，设置为不可写
					for( var j = 0;j < readonlyFieldCodes.length;j++ ) {
						//此处不能直接用子表字段编码，而需要通过此格式拼接出一个完整路径编码，格式为：子表编码.子表内控件编码
						//此示例中，该编码结果为：D278609xxx.F0000031  和  D278609xxx.F0000033
						var fullCode = childTableCode + "." + readonlyFieldCodes[ j ];

						//根据子表行数据Id和字段编码，获取该行的子表控件
						var con = that[ childTableCode ].GetCellManager( rowId, fullCode );
						if( con ) {
							//若控件存在，则调用SetReadonly设置该控件不可写
							con.SetReadonly( true );
						}
					}
				}
			}
		}
	}

	//执行不可写设置
	setReadonlyToAllRowData();

	//当子表点击新增时，设置新增行的子表控件不可写，实现方案是给子表绑定BindChange事件，并监听子表新增按钮的点击
	that[ childTableCode ].BindChange( $.IGuid(), function( data ) {
		if( data && data.length >= 2 ) {
			var btnCode = data[ 1 ];//取得子表按钮代码

			//判断用户点击了子表的新增按钮或者复制按钮
			if( btnCode == "add" || btnCode == "copy" ) {
				//执行不可写设置
				setReadonlyToAllRowData();
			}
		}
	});
},
```


## [通用]附件批量下载

可用位置：✔表单 / ✔列表

``` js
//此函数是在表单/列表前端调用
$.IDownloadAttachments( ["附件Id_1", "附件Id_2" ] );
```

!> 注意：此函数仅支持浏览器中使用，钉钉工作台、企微工作台不支持。调用后会下载一个zip压缩包，里面包含所有附件。

# 后端代码示例


## [通用]批量创建/更新/删除业务对象

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

!> 下面这个示例只演示批量创建，批量更新用```bo.Update(commit);```，批量删除用```bo.Remove(commit);```。

``` cs
H3.IEngine engine = this.Engine;
H3.DataModel.BizObjectSchema schema = engine.BizObjectManager.GetPublishedSchema("表单编码");//获取表单实例

H3.DataModel.BulkCommit commit = new H3.DataModel.BulkCommit();
for(int i = 0;i < 500; i++)
{
    H3.DataModel.BizObject bo = new H3.DataModel.BizObject(engine, schema, H3.Organization.User.SystemUserId);
    bo.CreatedBy = H3.Organization.User.SystemUserId;
    bo.OwnerId = H3.Organization.User.SystemUserId;
    bo.Status = H3.DataModel.BizObjectStatus.Effective;
    bo["F000001"] = 1;
    bo["F000002"] = "xxx";

    //注意：这里不能直接用 bo.Create()，而是将批量提交实例传入
    bo.Create(commit);
}
//注意：虽然是批量提交，但是建议一次Commit最多500条数据，否则还是很容易造成超时
string errorMsg = null;
commit.Commit(engine.BizObjectManager, out errorMsg);
if(!string.IsNullOrEmpty(errorMsg)) 
{
    throw new Exception("批量操作失败：" + errorMsg);
}
```


## [通用]正则

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

~~~ cs
string input = "1851 1999 1958 1905 2003";
string pattern = @"(?<=19)\d{2}\b";

// 遍历所有匹配到的结果，并对每个匹配项进行处理
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


## [通用]CopyFiles图片到目标数据，图片在移动端列表中显示

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


## [通用]获取控件的H3.DataModel.PropertySchema实例

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口

```H3.DataModel.PropertySchema``` 的具体说明请查看：[H3.DataModel.PropertySchema](/doc/cs-instance?id=h3datamodelpropertyschema)

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


## [表单]OnLoad事件中获取控件名和设置控件不可见不可写

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

可用位置：✔表单 / ✘列表 / ✘定时器 / ✘自定义接口

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


## [表单]提交时校验当天是否已提交

可用位置：✔表单 / ✘列表 / ✘定时器 / ✘自定义接口

``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    try
    {
        //点提交按钮，有三种情况会发起流程，所以三种情况都需判断
        //三种情况分别是：新增提交、先暂存后提交，流程回到发起节点重新提交
        //一般在做销售出库冻结库存时，经常会在流程发起时冻结库存，所以会用到此示例
        if(
            (actionName == "Submit" && this.Request.IsCreateMode) ||
            (actionName == "Submit" && this.Request.BizObject.Status == H3.DataModel.BizObjectStatus.Draft) ||
            (actionName == "Submit" && this.Request.ActivityCode == "Activity2")
        )
        {
            H3.IEngine engine = this.Engine;
            H3.DataModel.BizObject thisBo = this.Request.BizObject;
            DateTime todayTime = DateTime.Now;//获取今天日期

            DateTime startTime = todayTime.Date;//获取今天 0点0分0秒
            DateTime endTime = DateTime.Parse(todayTime.ToString("yyyy-MM-dd 23:59:59"));//获取今天 23点59分59秒

            //通过SQL查询今天是否有提交数据
            System.Data.DataTable dt = engine.Query.QueryTable("SELECT ObjectId, Name, Status, CreatedTime FROM i_当前表单编码 WHERE Status IN (1, 2) AND CreatedTime >= @startTime AND CreatedTime <= @endTime AND ObjectId != @thisId", new H3.Data.Database.Parameter[]{
                new H3.Data.Database.Parameter("@startTime", System.Data.DbType.DateTime, startTime),
                new H3.Data.Database.Parameter("@endTime", System.Data.DbType.DateTime, endTime),
                new H3.Data.Database.Parameter("@thisId", System.Data.DbType.String, thisBo.ObjectId)//加上当前提交的数据Id，是为了避免先暂存后提交的情况导致也提示不允许提交
            });

            //若有查出数据，则代表今天已提交数据
            if(dt != null && dt.Rows.Count > 0) 
            {
                throw new Exception("今天已提交数据，请勿再次提交！");//抛出异常，此异常信息将被catch块捕获并响应给前端进行弹窗展示
            }
        }
    } catch(Exception ex)
    {
        response.Errors.Add(ex.Message);//将异常信息响应到前端，弹窗提示
        base.OnSubmit(actionName, postValue, response);//此句代码有系统的默认处理动作，所以有异常时也不可少
        return;
    }

    base.OnSubmit(actionName, postValue, response);//此句代码有系统的默认处理动作，所以通过上面的校验时，也要执行此句代码
}
```


## [列表]增加筛选条件

可用位置：✘表单 / ✔列表 / ✘定时器 / ✘自定义接口

!> 注意：这里的代码是写在【列表设计】页面的后端代码中。

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

!> 注意：这里的代码是写在【列表设计】页面的后端代码中。

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
                int maxCount = 100;
                if(selectedIds.Length > maxCount)
                {
                    throw new Exception("单次最多处理" + maxCount + "条数据！");
                }

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


# 前后端交互示例

## [表单]前端OnLoad事件 BindChange + Post 请求后端

可用位置：✔表单 / ✘列表

<!-- tabs:start -->

#### **前端代码**

``` js
// 加载事件
OnLoad: function() {
	/*
		本示例实现效果：
			文本框F0000001 填入员工姓名，自动带出对应的 人员Id 并填充到 人员单选框F0000003 
		文本框F0000001 是 员工姓名 字段
		人员单选框F0000003 是 员工 字段
	*/

	//由于会在回调函数里用到this，而回调函数内直接用this会导致指向错误，所以要在此处先用一个变量存储
	var that = this;

	//给 文本框F0000001 绑定 值变化BindChange 函数
	that.F0000001.BindChange( $.IGuid(), function() {
		//获取 文本框F0000001 的值
		var userName = that.F0000001.GetValue();

		if( userName ) {
			//若 文本框F0000001 有值，则把值 异步请求 传给后端查找对应人员Id
			$.SmartForm.PostForm(
				"GetUserIdByName_Post",//传给后端的actionName，命名标准：功能名_Post

				//传给后端的数据
				{
					"userName": userName
				},

				//请求成功后，触发本事件
				function( data ) {
					if( data.Errors && data.Errors.length ) {//后端通过 response.Errors.Add("异常信息") 或者 异常抛出，在此处接收
						$.IShowError( "错误", JSON.stringify( data.Errors ) );
					} else {//后端代码执行无误，在此处接收后端的响应值
						var result = data.ReturnData;//此值对应后端的 response.ReturnData

						//判断后端是否正确返回了 userId 字段，并且 userId 字段有值
						if( result && result[ "userId" ] ) {
							//将 userId 填充到 人员单选框F0000003，至此示例效果实现完成
							that.F0000003.SetValue( result[ "userId" ] );
						} else {
							$.IShowError( "错误", "未匹配到人员Id" );
							that.F0000003.SetValue( "" );
						}
					}
				},

				//平台底层报错时，触发本事件
				function( error ) {
					$.IShowError( "错误", JSON.stringify( error ) );
				},

				true //true：不阻塞，false：请求过程中阻塞后续代码执行
			);
		} else {
			//若 文本框F0000001 无值，则将 人员单选框F0000003 置空
			that.F0000003.SetValue( "" );
		}
	});
},
```

#### **后端代码**

``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
	//判断前端传来的actionName
	if(actionName == "GetUserIdByName_Post")
	{
		try 
		{
			H3.SmartForm.SmartFormRequest request = this.Request;//取出当前请求对象
			H3.IEngine engine = request.Engine;//取出引擎实例

			string userName = request["userName"] + string.Empty;//取出前端传来的 userName 参数值
			if(string.IsNullOrWhiteSpace(userName))//判断 userName 参数值是否为空
			{
				//当 userName 参数值为空时，抛出异常
				throw new Exception("userName参数值异常！");
			}

			//根据 userName 参数值查询对应的 userId
			string sql = "SELECT ObjectId FROM H_User WHERE Name = @name; ";
			List < H3.Data.Database.Parameter > parameters = new List<H3.Data.Database.Parameter>();
			H3.Data.Database.Parameter param = new H3.Data.Database.Parameter(
				"@name", //参数名
				System.Data.DbType.String, //参数值类型
				userName //参数值    
			);
			parameters.Add(param);
			System.Data.DataTable dt = engine.Query.QueryTable(sql, parameters.ToArray());

			//当 h_user 表查无此用户名时
			if(dt == null || dt.Rows.Count == 0)
			{
				throw new Exception("企业内无“" + userName + "”用户！");
			}

			//取出userId
			string userId = dt.Rows[0]["ObjectId"] + string.Empty;

			//初始化响应数据实例（因为response.ReturnData默认值是null，后续要添加响应数据，必须先实例化）
			response.ReturnData = new Dictionary<string, object>();
			//将 userId 添加到响应数据实例中
			response.ReturnData.Add("userId", userId);
		} catch(Exception ex)
		{
			//将 try 中抛出的异常捕获，转换成 response.Errors 响应给前端
			response.Errors.Add(ex.Message);
		}
	}

	//表头按钮与按钮控件点击 都会进入OnSubmit事件，此句代码为默认处理，请勿删除
	base.OnSubmit(actionName, postValue, response);
}
```

<!-- tabs:end -->


## [表单]前端子表控件值改变时 Post 请求后端

可用位置：✔表单 / ✘列表

<!-- tabs:start -->

#### **前端代码**

``` js
// 加载事件
OnLoad: function() {
	/*
		本示例实现效果：
			子表订单控件值改变时，将此值（即订单表的ObjectId）发送给后端，获取该订单的销售数量
			D278609Fxxx：子表控件编码
			D278609Fxxx.F0000045：子表内订单控件的编码
			D278609Fxxx.F0000031：子表内销售数量控件的编码
	*/

	//由于会在回调函数里用到this，而回调函数内直接用this会导致指向错误，所以要在此处先用一个变量存储
	var that = this;

	//给子表D278609Fxxx绑定BindChange事件
	that.D278609Fxxx.BindChange( $.IGuid(), function( data ) {
		var row = data[ 0 ];

		//由于子表内任何控件值改变都会触发子表的BindChange事件，所以此处需要判断触发本事件的来源是 F0000045 字段（即订单控件）
		if( row != null && row.DataField == "D278609Fxxx.F0000045" ) {
			//获取该控件所在的子表行数据Id，通过行和控件编码即可定位到该控件
			var currentRowId = row.ObjectId;

			//获取订单控件的值
			var orderId = that.D278609Fxxx.GetCellManager( currentRowId, "D278609Fxxx.F0000045" ).GetValue();

			//获取销售数量控件实例
			var quanCon = that.D278609Fxxx.GetCellManager( currentRowId, "D278609Fxxx.F0000031" );

			//判断订单控件是否有值
			if( orderId ) {
				//通过 $.SmartForm.PostForm 请求后端，并将 orderId 传给后端
				$.SmartForm.PostForm( "GetDZQuanByOrderId_Post", {
					"orderId": orderId
				}, function( data ) {
					if( data.Errors && data.Errors.length ) {
						$.IShowError( "错误", JSON.stringify( data.Errors ) );
					} else {
						var result = data.ReturnData;

						if( result && result.Quantity ) {
							//当后端返回了 Quantity 字段数据，则赋值给当前子表行的销售数量控件
							quanCon.SetValue( result.Quantity );
						} else {
							//若后端未返回了 Quantity 字段数据，则设置当前子表行的销售数量值为 0
							quanCon.SetValue( 0 );
						}
					}
				}, function( error ) {
					$.IShowError( "错误", JSON.stringify( error ) );
				}, 
				true //true：不阻塞，false：请求过程中阻塞后续代码执行
				);
			}else{
				//当订单控件值为空时，设置当前子表行的销售数量值为 0
				quanCon.SetValue( 0 );
			}
		}
	});
},
```

#### **后端代码**

参考上面的 BindChange + Post 请求后端例子

<!-- tabs:end -->


## [表单]前端按钮控件点击时 Post 请求后端

可用位置：✔表单 / ✘列表

<!-- tabs:start -->

#### **前端代码**

``` js
// 提交校验
OnValidate: function( actionControl ) {
	var that = this;

	//判断按钮编码（即按钮控件编码）
	if( actionControl.Action == "F0000005" ) {
		//获取 文本框F0000002 的值，此值为用户填写的用户姓名
		var userName = that.F0000002.GetValue();

		//将用户姓名传给后端OnSubmit事件，获取对应的UserId
		$.SmartForm.PostForm(
			"GetUserIdByName_Post",//传给后端的actionName，命名标准：功能名_Post

			//传给后端的数据
			{
				"userName": userName
			},

			//请求成功后，触发本事件
			function( data ) {
				if( data.Errors && data.Errors.length ) {//后端通过 response.Errors.Add("异常信息") 或者 异常抛出，在此处接收
					$.IShowError( "错误", JSON.stringify( data.Errors ) );
				} else {//后端代码执行无误，在此处接收后端的响应值
					var result = data.ReturnData;//此值对应后端的 response.ReturnData

					//判断后端是否正确返回了 userId 字段，并且 userId 字段有值
					if( result && result[ "userId" ] ) {
						//将 userId 填充到 人员单选框F0000003，至此示例效果实现完成
						that.F0000003.SetValue( result[ "userId" ] );
					} else {
						$.IShowError( "错误", "未匹配到人员Id" );
						that.F0000003.SetValue( "" );
					}
				}
			},

			//平台底层报错时，触发本事件
			function( error ) {
				$.IShowError( "错误", JSON.stringify( error ) );
			},

			false //true：不阻塞，false：请求过程中阻塞后续代码执行
		);

		//阻止按钮的默认请求后端处理
		return false;
	}

	return true;
},
```

#### **后端代码**

参考上面的 BindChange + Post 请求后端例子

<!-- tabs:end -->


## [表单]前端Post请求，后端响应多条数据

可用位置：✔表单 / ✘列表

<!-- tabs:start -->

#### **前端代码**

``` js
// 加载事件
OnLoad: function() {
    /*
		本示例实现效果：
			在表单数据新增时，将所有产品信息填充到子表
		D278209Fct 是 产品信息 子表控件
	*/

	//由于会在回调函数里用到this，而回调函数内直接用this会导致指向错误，所以要在此处先用一个变量存储
    var that = this;

    //判断当前是否处于表单新增模式下
    if( $.SmartForm.ResponseContext.IsCreateMode ) {
        //获取D278209Fct子表控件实例
        var proCon = that.D278209Fct;

        //先调用ClearRows函数，清空子表所有行
        proCon.ClearRows();
        
        //Post请求后端，因为是查全部数据，所以无需传参数到后端
        $.SmartForm.PostForm( "GetAllProductData_Post", { }, function( data ) {
            if( data.Errors && data.Errors.length ) {
                $.IShowError( "错误", JSON.stringify( data.Errors ) );
            } else {
                var result = data.ReturnData;

                //此处先判断后端是否有返回 proDataList 集合，以及 proDataList 集合内元素个数是否 > 0
                if( result && result[ "proDataList" ] && result[ "proDataList" ].length ) {
                    //循环list结果
                    for( var i = 0;i < result[ "proDataList" ].length;i++ ) {
                        //拿出本条数据
                        var proData = result[ "proDataList" ][ i ];

                        //将 产品信息 填充到子表
                        proCon.AddRow( $.IGuid(), {
                            "D278209Fct.F0000003": proData[ "proId" ],//产品
                            "D278209Fct.F0000011": proData[ "proSeqNo" ],//产品号
                            "D278209Fct.F0000007": proData[ "proUnit" ],//计量单位
                            "D278209Fct.F0000006": proData[ "proSpec" ]//包装规格
                        });
                    }
                }
            }
        }, function( error ) {
            $.IShowError( "错误", JSON.stringify( error ) );
        }, 
		true //true：不阻塞，false：请求过程中阻塞后续代码执行
		);
    }
},
```

#### **后端代码**

``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
	//判断前端传来的actionName
	if(actionName == "GetAllProductData_Post")
	{
		try 
		{
			H3.SmartForm.SmartFormRequest request = this.Request;//取出当前请求对象
			H3.IEngine engine = request.Engine;//取出引擎实例

            //定义要响应给前端的产品数据集合
            List < Dictionary < string, object >> proDataList = new List<Dictionary<string, object>>();

            //使用sql查询所有生效状态的 产品 表单数据
			System.Data.DataTable dt = engine.Query.QueryTable("select * from i_D278209Product where Status=1", null);
            if(dt != null && dt.Rows.Count > 0)
            {
                //循环查询结果
                foreach(System.Data.DataRow row in dt.Rows) 
                {
                    //将每一条产品数据 转换成一个 Dictionary < string, object > 类型实例
                    //Dictionary < string, object >是个字典，可以自定义Key，所以这里将F000000X这种无意义的控件编码，转换成了更方便前端使用的 proId、proName 等名称
                    Dictionary < string, object > proData = new Dictionary<string, object>();
                    proData["proId"] = row["ObjectId"] + string.Empty;//产品Id
                    proData["proName"] = row["F0000001"] + string.Empty;//产品名称
                    proData["proSeqNo"] = row["SeqNo"] + string.Empty;//产品号
                    proData["proUnit"] = row["F0000003"] + string.Empty;//计量单位
                    proData["proSpec"] = row["F0000005"] + string.Empty;//包装规格

                    //将本条产品数据添加到list集合中
                    proDataList.Add(proData);
                }
            }

			//初始化响应数据实例（因为response.ReturnData默认值是null，后续要添加响应数据，必须先实例化）
			response.ReturnData = new Dictionary<string, object>();
			//将 所有产品数据的list集合 添加到响应数据实例中
			response.ReturnData.Add("proDataList", proDataList);
		} catch(Exception ex)
		{
			//将 try 中抛出的异常捕获，转换成 response.Errors 响应给前端
			response.Errors.Add(ex.Message);
		}
	}

	//表头按钮与按钮控件点击 都会进入OnSubmit事件，此句代码为默认处理，请勿删除
	base.OnSubmit(actionName, postValue, response);
}
```

<!-- tabs:end -->



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


# 纯净代码示例

为快速开发准备，无注释，方便复制后直接粘贴使用。


## 定时器

``` cs
public class MyTest_Timer: H3.SmartForm.Timer
{
    public MyTest_Timer() { }

    protected override void OnWork(H3.IEngine engine)
    {
        DateTime nowTime = DateTime.Now;

    }
}
```


## 自定义接口

``` cs
public class MyApiController: H3.SmartForm.RestApiController
{
    public MyApiController(H3.SmartForm.RestApiRequest request): base(request) { }
    protected override void OnInvoke(string actionName, H3.SmartForm.RestApiResponse response)
    {
        try
        {
            Dictionary < string, object > resData = null;

            MyApiHelper apiHelper = new MyApiHelper();

            if(actionName == "Test")
            {
                string stringValue = this.Request.GetValue<string>("para1", "defaultValue");
                int intValue = this.Request.GetValue<int>("para2", 0);

                resData = apiHelper.Test(this.Engine, stringValue, intValue);
            }

            if(resData != null && resData.Count > 0)
            {
                foreach(KeyValuePair < string, object > resItem in resData)
                {
                    response.ReturnData[resItem.Key] = resItem.Value;
                }
            }
        } catch(Exception ex)
        {
            response.Errors.Add(ex.ToString());
        }
    }
}

//此处定义Helper类，是为了方便调试，MyApiController没办法在其他地方调用
//此处继承H3.SmartForm.Timer，是为了可以使用到JSON序列化与反序列化两个API
public class MyApiHelper: H3.SmartForm.Timer
{
    public MyApiHelper() { }
    protected override void OnWork(H3.IEngine engine) { }

    public Dictionary < string, object > Test(H3.IEngine engine, string stringValue, int intValue)
    {
        Dictionary < string, object > resData = new Dictionary<string, object>();
        resData["stringValue"] = stringValue;
        resData["intValue"] = intValue;
        resData["merge"] = stringValue + intValue;
        return resData;
    }
}
```


## [表单][后端]去掉弹窗的无用按钮

``` cs
protected override void OnLoad(H3.SmartForm.LoadSmartFormResponse response)
{
    base.OnLoad(response);

    if(response.Actions != null)
    {
        string[] rmBtnCodes = new string[]{ "Save", "Remove", "Print", "ViewQrCode", "FullScreen", "Close", "SubmitAndAdd"};
        foreach(string btnCode in rmBtnCodes)
        {
            if(response.Actions.ContainsKey(btnCode)) 
            {
                response.Actions.Remove(btnCode);
            }
        }
    }
}
```


## [表单]PostForm

<!-- tabs:start -->

#### **前端代码**

``` js
$.SmartForm.PostForm( "Test_Post", {
    "orderDate": "2023-01-11"
}, function( data ) {
    if( data.Errors && data.Errors.length ) {
        $.IShowError( "错误", JSON.stringify( data.Errors ) );
    } else {
        var result = data.ReturnData;

    }
}, function( error ) {
    $.IShowError( "错误", JSON.stringify( error ) );
}, false );
```

#### **后端代码**

``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    Test_Post(actionName, this.Request, response);
    base.OnSubmit(actionName, postValue, response);
}

public void Test_Post(string actionName, H3.SmartForm.SmartFormRequest request, H3.SmartForm.SubmitSmartFormResponse response)
{
    if(actionName != "Test_Post")
    {
        return;
    }

    try
    {
        H3.IEngine engine = request.Engine;
        string currUserId = request.UserContext.UserId;

        string orderDate_Str = request["orderDate"] + string.Empty;
        if(string.IsNullOrWhiteSpace(orderDate_Str))
        {
            throw new Exception("orderDate参数值为空！");
        }
        DateTime orderDate = DateTime.Parse(orderDate_Str);


        response.ReturnData = new Dictionary<string, object>();
        response.ReturnData["data"] = "";
    } catch(Exception ex)
    {
        response.Errors.Add(ex.Message);
    }
}
```

<!-- tabs:end -->


## [列表]Post

<!-- tabs:start -->

#### **前端代码**

``` js
$.ListView.ActionPreDo = function( actionCode ) {

    if( actionCode == "TestBtn" ) {
        var maxSelectedCount = 10;//最大选择数量

        var seDatas = $.ListView.GetSelected();
        if( !seDatas || !seDatas.length ) {
            $.IShowWarn( "警告", "没有选中任何行" );
            return false;
        }
        if( seDatas.length > maxSelectedCount ) {
            $.IShowWarn( "警告", "一次批量处理最多" + maxSelectedCount + "条！" );
            return false;
        }

        var seIds = [];
        for( var i = 0;i < seDatas.length;i++ ) {
            seIds.push( seDatas[ i ][ "ObjectId" ] );
        }

        $.IShowSuccess( "成功", "系统处理中，请稍候..." );
        var seIdsJson = JSON.stringify( seIds );
        $.ListView.Post( actionCode + "_Post", {
            "seIds": seIdsJson
        }, function( data ) {
            if( data.Errors && data.Errors.length ) {
                $.IShowError( "错误", JSON.stringify( data.Errors ) );
            } else {
                $.IShowSuccess( "成功", "系统处理完成！" );
                $.ListView.RefreshView();
            }
        }, function( error ) {
            $.IShowError( "错误", JSON.stringify( error ) );
        }, false );

        return false;
    }
    
};
```

#### **后端代码**

``` cs
protected override void OnSubmit(string actionName, H3.SmartForm.ListViewPostValue postValue, H3.SmartForm.SubmitListViewResponse response)
{
    TestBtn_Post(actionName, this.Request, response);
    base.OnSubmit(actionName, postValue, response);
}

public void TestBtn_Post(string actionName, H3.SmartForm.ListViewRequest request, H3.SmartForm.SubmitListViewResponse response)
{
    if(actionName != "TestBtn_Post")
    {
        return;
    }

    try
    {
        H3.IEngine engine = request.Engine;
        H3.DataModel.BizObjectSchema schema = request.Schema;
        string currUserId = request.UserContext.UserId;

        string seIds_Str = request["seIds"] + string.Empty;
        if(string.IsNullOrWhiteSpace(seIds_Str))
        {
            throw new Exception("没有选中任何行");
        }
        string[] seIds = this.Deserialize<string[]>(seIds_Str);
        if(seIds == null || seIds.Length == 0)
        {
            throw new Exception("没有选中任何行");
        }

        H3.Data.Filter.Filter filter = new H3.Data.Filter.Filter();
        H3.Data.Filter.And andMatcher = new H3.Data.Filter.And();
        andMatcher.Add(new H3.Data.Filter.ItemMatcher("ObjectId", H3.Data.ComparisonOperatorType.In, seIds));
        filter.Matcher = andMatcher;
        filter.FromRowNum = 0;
        filter.ToRowNum = 1000;
        H3.DataModel.BizObject[] boArray = H3.DataModel.BizObject.GetList(engine, H3.Organization.User.SystemUserId, schema, H3.DataModel.GetListScopeType.GlobalAll, filter);
        if(boArray == null || boArray.Length != seIds.Length)
        {
            throw new Exception("数据加载失败！");
        }

        response.ReturnData = new Dictionary<string, object>();
        response.ReturnData["data"] = "";
    } catch(Exception ex)
    {
        response.Errors.Add(ex.Message);
    }
}
```

<!-- tabs:end -->





# 氚云调用WebService

由于氚云能配置连接上的 ```WebService``` 必须按照规定格式进行定义，且只对 ```.NET``` 框架下开发的 ```WebService``` 兼容性友好，对于 ```JAVA```、```Python``` 等语言兼容性差，并且配置不上时开发者个人无法排查解决，体验感不佳。

所以氚云推出了 **第三方连接** 插件，用于氚云调用第三方 ```Web API``` 服务，也是目前推荐开发者使用的方式，[第三方连接插件文档](/doc/req-api)。

但考虑到有些开发者更熟悉 ```WebService``` 的对接方式，所以这里也提供了一个 ```.NET``` 的 ```WebService Demo``` 以供参考：[.NET WebService Demo](https://gitee.com/h3yun-pro-public/h3yun-demo/tree/main/WebServiceDemo)

!> PS：本文档将不会对氚云调用 ```WebService``` 做出详细说明，如有需要，请前往[官方文档](https://help.h3yun.com/contents/1126/2234.html)。

# 氚云调用WebAPI

第三方连接支持调用的Api要求：
1. 协议：`http` / `https`
2. 请求方式：`GET` / `POST`
3. 请求参数和响应数据不能是传输/接收文件，且响应数据必须是JSON对象格式。

!> PS：第三方Api的URL最好使用域名方式，如果条件受限只能使用 IP:Port 方式，端口号可能处于氚云防火墙黑名单中，若配置上后，连接请求一直卡死无响应，可以切换到 200-300 范围内的端口再试试。

**若你是第一次使用氚云的第三方连接，建议你按照以下步骤进行↓↓↓**


## 1、通过非代码的连接调试接口

通过非代码的连接调试一下接口，可以确定接口连通性、响应数据的结构，也可以大概判断一下氚云支不支持直接连接该服务（若不支持可以通过在外部服务器开发并部署一个中间服务来做转接）

![](../img/req-api-3.png)


## 2、新建一个第三方连接（代码）

在 **插件中心** 新建连接（注意：编码框内自定义一个该连接的Code，不是填UTF-8、ASCII等数据编码）

![](../img/req-api-1.png)

![](../img/req-api-2.png)


## 3、代码调用第三方连接示例

<!-- tabs:start -->

#### **第三方接口响应数据格式示例**

氚云的接口请求，响应数据一定要为JSON对象格式，下面是调用代码示例中对应响应数据：

``` json
{
  "code": 200,
  "ID": "654028207203",
  "msg": "查询成功，查询花费0.0002秒",
  "data": {
    "Name": "阔克托干村",
    "Longitude": 82.640110,
    "Latitude": 43.755200,
    "Province": "新疆维吾尔自治区",
    "City": "伊犁哈萨克自治州",
    "District": "尼勒克县",
    "Tow": "喀拉托别乡",
    "Villag": "阔克托干村",
    "LevelType": 5,
    "neighbors": [
      {
        "ID": "654028208000",
        "Villag": "胡吉尔台乡",
        "LevelType": 5
      },
      {
        "ID": "654028202000",
        "Villag": "加哈乌拉斯台乡",
        "LevelType": 5
      }
    ],
    "infos": [
      "新疆维吾尔自治区",
      "伊犁哈萨克自治州",
      "尼勒克县",
      "喀拉托别乡",
      "阔克托干村"
    ]
  }
}
```

下面是一些氚云不支持第三方连接响应数据：

1. 非JSON格式的纯文本信息（氚云要求响应数据为JSON格式）
```
请求成功！
```

2. 最外层为数组格式（氚云要求响应数据最外层为对象格式）

``` json
[
  {
    "a": 1
  },
  {
    "a": 2
  }
]
```

3. 文件格式（氚云二次代码开发层面已禁止IO操作相关功能，响应文件给氚云没有意义，若需要传文件给氚云请通过氚云OpenApi上传附件）


#### **氚云调用第三方接口代码示例**

``` cs
/*
    参照 “第三方接口响应数据格式示例” 中的JSON结构，会发现响应的JSON有多层（$层、$.data参数层、$.data.neighbors参数层），所以这里需要定义3个H3.BizBus.BizStructureSchema
*/

//定义响应数据最外层的结构体，后续以 $ 表示该层
H3.BizBus.BizStructureSchema structureSchema = new H3.BizBus.BizStructureSchema();
structureSchema.Add(new H3.BizBus.ItemSchema("code", "结果状态码", H3.Data.BizDataType.Int, null));
structureSchema.Add(new H3.BizBus.ItemSchema("ID", "行政区划代码", H3.Data.BizDataType.String, null));
structureSchema.Add(new H3.BizBus.ItemSchema("msg", "描述", H3.Data.BizDataType.String, null));

//定义响应数据的 $.data 属性的结构体
H3.BizBus.BizStructureSchema dataSchema = new H3.BizBus.BizStructureSchema();
dataSchema.Add(new H3.BizBus.ItemSchema("Name", "名称", H3.Data.BizDataType.String, null));
dataSchema.Add(new H3.BizBus.ItemSchema("Longitude", "经度", H3.Data.BizDataType.Double, null));
dataSchema.Add(new H3.BizBus.ItemSchema("Latitude", "纬度", H3.Data.BizDataType.Double, null));
dataSchema.Add(new H3.BizBus.ItemSchema("Province", "省级名称", H3.Data.BizDataType.String, null));
dataSchema.Add(new H3.BizBus.ItemSchema("City", "市级名称", H3.Data.BizDataType.String, null));
dataSchema.Add(new H3.BizBus.ItemSchema("District", "区县名称", H3.Data.BizDataType.String, null));
dataSchema.Add(new H3.BizBus.ItemSchema("Tow", "镇级名称", H3.Data.BizDataType.String, null));
dataSchema.Add(new H3.BizBus.ItemSchema("Villag", "村级名称", H3.Data.BizDataType.String, null));
dataSchema.Add(new H3.BizBus.ItemSchema("LevelType", "层级类型", H3.Data.BizDataType.Int, null));

//定义响应数据的 $.data.neighbors 属性的结构体
H3.BizBus.BizStructureSchema neighborsSchema = new H3.BizBus.BizStructureSchema();
neighborsSchema.Add(new H3.BizBus.ItemSchema("ID", "行政区划代码", H3.Data.BizDataType.String, null));
neighborsSchema.Add(new H3.BizBus.ItemSchema("Villag", "村级名称", H3.Data.BizDataType.String, null));
neighborsSchema.Add(new H3.BizBus.ItemSchema("LevelType", "层级类型", H3.Data.BizDataType.Int, null));
//将 $.data.neighbors 属性的结构体添加进 $.data 的响应数据结构体（注意：neighbors 属性是对象数组格式，类型是H3.Data.BizDataType.BizStructureArray）
dataSchema.Add(new H3.BizBus.ItemSchema("neighbors", "邻村信息数组", H3.Data.BizDataType.BizStructureArray, neighborsSchema));

//将 $.data.infos 属性添加进 $.data 的响应数据结构体（注意：infos 是个字符串数组，但氚云没有对应接收的类型，所以用string类型来接收，这样会接收到一个字符串数组JSON）
dataSchema.Add(new H3.BizBus.ItemSchema("infos", "重要信息数组", H3.Data.BizDataType.String, null));

//将 $.data 属性的结构体添加进最外层的响应数据结构体（注意：data 属性是对象格式，类型是H3.Data.BizDataType.BizStructure）
structureSchema.Add(new H3.BizBus.ItemSchema("data", "地区数据", H3.Data.BizDataType.BizStructure, dataSchema));


//本示例是在表单后端事件中调用，所以H3.IEngine实例可以用this.Engine获取
H3.IEngine engine = this.Engine;

//header 请求参数初始化，此实例会添加到请求的 Headers 中
//注意：请勿给headers设置Content-Type属性，否则可能导致接口调用失败
Dictionary < string, string > headers = new Dictionary<string, string>();

//query 请求参数初始化，此处添加的参数会附加在请求Url后（例：?code=654028207203）
Dictionary < string, string > querys = new Dictionary<string, string>();
querys.Add("code", "654028207203");

//body 请求数据初始化，此键值对数据会转换为JSON对象格式传给第三方接口
Dictionary < string, object > bodys = new Dictionary<string, object>();

//调用Invoke接口，系统底层访问第三方接口的Invoke方法
H3.BizBus.InvokeResult res = engine.BizBus.InvokeApi(
    H3.Organization.User.SystemUserId, //固定值，无需改变
    H3.BizBus.AccessPointType.ThirdConnection, //固定值，无需改变
    "ConnectCode", //连接编码，对应 插件中心 中配置的连接的编码（注意：大小写敏感，必须和第三方连接配置的一样）
    "GET", //请求Method，取值：GET | POST (注意：字母必须全大写，不可大小写混合，仅支持GET | POST两种请求方式)
    "application/x-www-form-urlencoded", //请求Content-Type (注意：传递json数据这里用“application/json”)
    headers, querys, bodys, structureSchema);
if(res == null)
{
    throw new Exception("接口响应数据为空！");
}

if(res.Code != 0) //判断调用是否成功，0代表成功，其他为失败
{
    //调用失败，抛出失败原因
    string resMessage = res.Message;
    throw new Exception("接口调用失败：" + resMessage);
}

//获取返回数据，此实例对应响应JSON的最外层，后续以 $ 表示
H3.BizBus.BizStructure resData = res.Data;

//获取响应数据中的 $.ID 属性值
string ID = resData["ID"] + string.Empty;

//获取响应数据中的 $.data 属性值
H3.BizBus.BizStructure data = (H3.BizBus.BizStructure) resData["data"];
if(data != null)
{
    //获取响应数据中的 $.data.Name 属性值
    string dataName = data["Name"] + string.Empty;
    //获取响应数据中的 $.data.Province 属性值
    string dataProvince = data["Province"] + string.Empty;

    //获取响应数据中的 $.data.neighbors 属性值
    H3.BizBus.BizStructure[] neighbors = (H3.BizBus.BizStructure[]) data["neighbors"];
    if(neighbors != null && neighbors.Length > 0) 
    {
        //获取响应数据中的 $.data.neighbors[0].Villag 属性值
        string firstNeighborVillag = neighbors[0]["Villag"] + string.Empty;

        //循环获取响应数据中的 $.data.neighbors[?].ID 属性值
        foreach(H3.BizBus.BizStructure n in neighbors) 
        {
            string nID = n["ID"] + string.Empty;
        }
    }

    //获取响应数据中的 $.data.infos 属性值
    //由于 $.data.infos 用string类型来接收的，所以这里会得到infos的JSON字符串，只要做下反序列化即可得到字符串数组
    string infos_Str = data["infos"] + string.Empty;
    if(!string.IsNullOrWhiteSpace(infos_Str)) 
    {
        //将JSON字符串反序列化得到字符串数组
        string[] infos = this.Deserialize<string[]>(infos_Str);
        if(infos != null && infos.Length > 0)
        {
            //获取响应数据中的 $.data.infos[0] 的值
            string firstInfoValue = infos[0];

            //循环获取  $.data.infos[?] 的值
            for(int i = 0;i < infos.Length; i++)
            {
                string infoValue = infos[i];
            }
        }
    }

}
```

<!-- tabs:end -->

# 代码跟自动化混用

本篇文档对代码和自动化混用可能会产生的疑问做个解答。

!> PS：由于自动化还不是最终版本，所以本结论是依据现下的情况，等新版自动化正式上线后，可能会有调整。所以要保证未来新版自动化上线后，不会产生问题，在表单提交时，代码和自动化建议不要混用（要么全代码实现，要么全自动化实现）。


## OnSubmit中代码和自动化执行顺序

1. 代码写在 ```base.OnSubmit``` 上面，则代码先执行，然后 ```base.OnSubmit``` 中执行自动化
2. 代码写在 ```base.OnSubmit``` 下面，则 ```base.OnSubmit``` 中先执行自动化，然后再执行代码


## OnWorkflowInstanceStateChanged中代码和自动化执行顺序

由于 ```OnSubmit``` 事件先会比 ```OnWorkflowInstanceStateChanged``` 触发，所以自动化会先执行


## 代码创建、更新、删除数据是否会触发自动化

会的，前提是满足自动化触发的条件


## 自动化创建、更新、删除数据是否会触发代码

不会，因为代码所在的事件（比如:```OnSubmit```）是需要用户动作才会触发

# 编程规范

# 常见问题解答


## 后端使用业务对象Create/Update/Remove时，会触发自动化吗？
会触发


## 新版列表后端调试器BUG如何处理？
目前新版列表的后端调试器可能会出现 调试器窗口空白、调试器大小不能拖动调整、表单控件空值 等问题，该BUG已反馈给研发进行修复，临时的解决方案是切到旧版列表页面（注：不会导致整个企业环境切换回旧版）：

在浏览器上登录氚云，地址栏切换到此地址（**注意：不要复制Url直接打开，表单编码、应用编码需要替换成想调试的表单的编码和应用编码**）：
```
https://www.h3yun.com/home.html#/app?id=表单编码&code=应用编码
```


## 非调试模式不报错，调试模式弹窗报错
当应用下的后端代码中存在声明变量，但未赋默认值时，就会导致非调试模式下不报错，调试模式下弹出以下错误：
> 系统异常：DoAction 失败 无法将类型为“H3.SmartForm.ResponseContext”的对象强制转换为类型“H3.SmartForm.LoadListViewResponse”

示例：
``` cs
// 会导致异常的变量声明：
string a;
int b;

// 正确的变量声明：
string a = "字符串";
int b = 0;
```

!> 另外，如果声明了重名的类，或者复制完表单就报错，也会导致这个报错。

解决方案：
1. 应用下的表单个数少时，可以一个个表单点进去排查。

2. 若代码量多时，则先打开前端调试器，再打开后端调试器，待报错弹出后，<br/>
在前端调试器的network工具下，从上往下查看所有OnAction请求，会在某个请求的响应数据中，有具体的报错信息，以及异常代码所在表单。


## 氚云的页面在钉钉工作台中字体模糊/重影/错位

![氚云的页面在钉钉工作台中字体模糊/重影/错位-1](/img/faq-9.png)

目前的解决方案：在钉钉中点头像->设置与隐私->高级->开启钉钉容器WebGL特性。

此方式无法解决时，请在浏览器中使用氚云，等待后续研发与钉钉协同解决该问题。


## 为何不推荐利用OnWorkflowInstanceStateChanged事件做导入触发代码的需求
风险点：
1. 导入时，```OnWorkflowInstanceStateChanged``` 事件中代码执行异常不会有任何错误提示及日志记录（注意：正常审批使流程结束时会触发```OnWorkflowInstanceStateChanged``` 事件，并且代码执行异常会弹窗提示）
2. ```OnWorkflowInstanceStateChanged``` 事件完全由流程引擎控制触发，没有设置流程，流程配置有误，或者不是导入生效数据，都不会触发事件。这样对流程设计人员和导入人员都不友好
3. 根据已使用该方案的用户反馈，导入时有小概率未触发 ```OnWorkflowInstanceStateChanged``` 事件，或者导入的一批数据里一部分数据触发了，所以该方案稳定性不够
4. 当导入大量数据时，由于每条数据都会触发 ```OnWorkflowInstanceStateChanged``` 事件，就会导致运行效率很差，易造成超时，这个问题也是导致第3点稳定性差的一个诱因

替代的推荐方案：
1. 在表单中增加2个字段：**执行状态**、**执行结果**
2. 在列表上增加一个【导入数据处理】按钮，并书写列表后端代码，代码中批量查询出 **执行状态** 为“待处理”的数据
3. 执行好业务逻辑后，批量将 **执行状态** 改为“已处理”（注意：最好每次按钮点击只处理一部分数据，推荐限定每次处理前100条待处理数据，以防用户等待时间过久，导致执行超时和按钮的点击请求超时）；若数据有误或者有提示信息，可以将提示信息更新至 **执行结果** 控件中
4. 用户导入数据后，先通过列表筛选出“待处理”的数据，然后点击【导入数据处理】按钮触发代码，直至所有数据处理完成


## 怎样可以通过输入出生日期，计算出年龄？
[教程](https://app2fbcrlcs8626.h5.xiaoeknow.com/p/course/video/v_625e3523e4b01a4851f3a043)


## 氚云中消息提醒代码里面多个执行人是使用数组吗？还是直接拼接就行？
循环去提醒，不要拼接


## 钉钉考勤怎么同步到氚云？ 
教程，参考下https://help.h3yun.com/contents/1155/2296.html


## 表单的图标颜色，可以自定义吗？
![logo](../img/faq-1.png ':size=10%')
不可以


## 氚云地图合作的是高德地图还是百度地图？
高德地图


## 删错的数据有办法恢复吗?
可以做数据恢复，可以联系一下客服


## 出现Connection must be valid and open to rollback transaction报错问题？
 ![logo](../img/faq-2.png ':size=20%')</br>
同时对一条数据进行插入更新删除操作就容易出现这种情况


## 当前表单的状态/表单模式？
``` js
//前端获取表单模式：0为审批/办理 1为办理完结 2为创建 4为查阅
$.SmartForm.ResponseContext.FormMode
```

``` cs
//后端获取表单数据状态
this.Request.BizObject.Status;
``` 


## 设置子流程的时候，父流程中的子表数据能否填充到子流程的主表中吗？
不可以的 如果要实现需要用代码的方式实现


## 怎么获取表单的流程状态？
``` cs
$.SmartForm.ResponseContext.BizObjectStatus 
```


## 今天图片上传一直出现这个问题,doUploadFile fail
![logo](../img/faq-7.png ':size=20%')

重启一下钉钉软件看看


## 用Excel导入数据，要如何导入多条子表的数据?
例如：</br>
![logo](../img/faq-4.png ':size=20%')


## 业务规则又先后顺序的吗？
数据生效时从上往下执行，删除/重新激活流程从下往上执行


## 接口创建的表单数据触发业务规则跟消息通知吗?
会触发，如果消息通知没触发，看看人员控件的值是否给了固定值，因为在接口创建数据时是不会给人员控件默认值的，有可能没发是因为
人员控件的值是空的，  ```H_User``` 人员基础信息表


## 仪表盘有sql嘛？
仪表盘也支持sql，需要找氚云工作人员开通高级数据源（SQL）的权限。


## 子表的序号可以获取到吗？
表单前端没有子表序号字段，但是子表数组的 ```下标+1``` 即序号。后端可以通过业务对象或数据表中的 ```ParentIndex``` 获取（注：```ParentIndex``` 从0开始，0代表第一行）。


## 新增子表里面的数据的时候可以设置数据行的颜色吗？
不可以的


## 前端自定义代码编写错误，请联系管理员修改
函数名:AfterSubmit;错误信息:SyntaxError:undefined" is not valid JSoN
检查 返回的值是否有为null的或undefined的 只有有值才转成json


## 位置控件限定范围支持多少米以内的定位？
位置控件是调用的钉钉接口，表单设计内设置“限定附近范围”后可限定为只能选择以定位点为中心大概周围 ```500m ```
内的位置，单根据设备本身定位的准确性，会有所偏差。
![logo](../img/faq-5.png ':size=20%')


## 有什么办法获取当前表单数据的流程节点吗？
``` cs
H3.Workflow.Instance.IToken tok = this.Request.Engine.WorkflowInstanceManager.GetWorkflowInstance("流程id").GetLastToken();
```


## 氚云有英文版本吗？
氚云系统设计是提供的中文版编写环境，暂时没有英文的表单设计页面版本。 可由懂中文的氚云系统管理员搭建系统，
设置控件名称为英文的，这样可以提供给国外同事来提交表单和查看数据。 


## 一个表单支持多少个控件?
不能超过2万个字符  例如 多行文本控件的最大字符是2000  那么最多只能10个多行文本
##关于业务规则执行
对于 ```表单有流程``` 的审批通过之后会执行业务规则,审批不通过不会执行业务规则,
如果 ```表单没有流程``` 数据发生改变(比如新增/删除设置了业务规则) 执行业务规则,```抄送节点```是不会执行业务规则的，
用 ```代码激活``` 的流程节点也是遵循这个
```设置了审批自动通过``` 相当于审批通过


## 复制表单失败
复制表单失败，一般是别的表单删除控件等导致当前表单引用该删除控件的计算公式、业务规则等报错等引起 可以到当前表单的表单设计-重新保存下表单，保存会有提示具体的错误，可以根据错误去更改，错误一般是下述情况 ：</br>
1、业务规则写法错误；</br>
2、子流程流转规则错误 ；</br>
3、子流程是自动发起，发起的子流程表单业务规则错误；</br>
4、计算公式缺少引用的控件。


## 导入氚云的数据，消息提醒不会触发吗？
 导入不会触发消息提醒，流程的会</br>
 ![logo](../img/faq-6.png ':size=20%')


## 通过子流程触发的数据 也是不会有消息提醒的吗？
会有的


## 企微定位部分手机不支持问题
我们定位在企微调用的是高德的接口，其对部分手机确实存在兼容性问题，目前无法解决。
目前定位无法保证100%准确，如果用户业务中需要保证100%定位正确，请用户重新考虑业务场景的使用，目前企微的氚云中还做不到。请用户知悉。
我们目前将问题反馈给企微共同优化。 


## 提示：获取signature失败，请与服务商联系!
1.试用期到期了，被禁用了 
2.钉钉订单到期，所以在钉钉中无法使用
3.重新将应用发布快捷方式到工作台使用
4.如以上不行提供企业名称和引擎编码反馈


## 表单控件上限是多少个？
不能超过2万个字符  例如 多行文本控件的最大字符是2000  那么最多只能10个多行文本,目前大概是80/90个控件> 


## 表单如何只能创建人编辑？
``` cs
protected override void OnLoad(H3.SmartForm.LoadSmartFormResponse response)
{
    base.OnLoad(response);
    if(this.Request.BizObject.CreatedBy != this.Request.UserContext.UserId && response.Actions.ContainsKey("Edit"))
    {
        response.Actions.Remove("Edit");
    }
}
```


## 导入数据导不进去，错误原因下载不下来，是什么原因？点了就变灰了，实际也没下载出来下载未导入数据
 ![logo](../img/faq-8.png ':size=20%')</br>
 在系统管理》全局设置》列表版本 改为新版列表
 

## 可以发布多少个表单到钉钉工作台？
从氚云发布到钉钉工作台的图标上限为50，包括：发布应用，列表，和表单三种图标的总和


## 氚云待办不同步到钉钉待办
1，先确认流程表单有没有超过200个，第201个表单发起的待办则不显示，删除过的也算，需要手动删除无用的表单，控制在200个以内；</br>
2，再确定是所有人没同步（检查氚云在钉钉的可见范围是否为全部）还是个别人没同步，个别人没同步需要提供没同步的人员名称并反馈给对应的成功经理去处理。</br>
3、钉钉的授权到期了，调不了钉钉接口。


## 报表中计算字段显示数值不正确？
数字控件没有赋值时，默认值时null，null与其他数字运算后依然是null。</br>
1、可以对参与运算的字段给默认值，比如0；</br>
2、如果修改数据源不方便，可以改计算字段的公式请参照如下写法，兼容null值。</br>
比如原计算公式为：入库-出库，改为：IF(入库,入库,0) - IF(出库,出库,0)</br>
注意：左侧计算字段要修改，汇总表中也要编辑修改


## 氚云预览的文件如何进行打印？
预览的文件不支持打印


## 正在进行中还没有结束的流程是怎么通过业务规则更新？
业务规则只会在数据生效后才触发，如果是流程中的数据要触发，要么用自动化功能，要么做一个辅助表，通过子流程在流程过程中生成一个有效的辅助表数据，通过这个辅助表数据触发业务规则


## 现在氚云发布到钉钉工作台的表单或者列表能改名字么？同一个表单，以表单形式和列表形式都发到了钉钉工作台，怎么能做个区分？
改不了


## 用代码Create生成了另外一个表单的数据，那  那个表单里的代码和业务规则会不会执行？
代码不会执行。如果创建的是生效数据，则业务规则会执行


## 如果填充子流程有些字段有值有些字段没有值
存在可能情况：</br> 
1.检查下子流程表单有没有设置不允许重复录入</br>
2.检查流程设计填充子流程的配置字段有没有被反写


## 表单前端中如何获取表单中子表序号？
前端：
``` js 
var ctData = this.子表编码.GetValue();//ctData是一个对象数组，数组的下标+1及子表序号
```


## 业务规则生成的数据会生成流程吗？
业务规则新增的数据不会开启流程</br>


## 关于导入常见问题？
1.报错-导入报错-调用的目标发生了异常</br>
去掉关联表单的数据范围再导入（临时解决方案-后续会优化预计是6.13左右）</br>
2.导入关联表单报不存在</br>
（1）导入如果提示不存在，导入的时候可将关联表单暂时去掉数据范围先（临时解决方案预计6.14左右更新）</br>
（2）导入提示不存在，关联表单组成的数据标题如果是多个字段组成的 暂时先用四个空格隔开原来是用&符号 （临时解决方案预计6.14左右更新）</br>
（3）列表关联表单筛选不显示，但是表单中显示，关联筛选配置条件类似“关联表单字段==当前表单字段”和CONTAINS函数的 都不行，暂时列表中用关联表单右边的小图标筛选下（临时解决方案预计6.14左右更新）</br>
（4）导入提示关联表单不存在，检查看看关联表单的数据标题是否为空


## 关于postValue
1.提交的请求参数都是放在postValue.Data这个字段中</br>
2.改变postValue.Data的值不会影响表单实际提交到数据库的值


## 导入显示成功，但是实际数据没变
新增是发起节点、更新是结束节点设置字段可写权限，需要检查下是否开放了可写权限


## 企微没有同步组织架构或人员
有可能是存在以下情况</br>
1.企微管理后台（管理员）>>应用管理，找到氚云的图标，可见范围设置的是看看是不是根节点的（最上面的一个节点）


## 导入报调用目标异常？
1.可检查导入的文件内容是有存在‘ 这个符号，目前是不支持这个符号导入的。</br>
2.数据联动有设置字段作为条件但是导入的文件中没有这个字段


## 审批发起后转交另一个处理人，转交后未同意，显示已同意
这个状态是钉钉那边的，那边的状态就 ：已同意 ， 已拒绝 ， 已撤销 ， 待审批 ，待处理，所以目前转交显示已同意更合适


## 业务规则新增的数据会开启流程吗？
业务规则新增的数据不会开启流程


## 仪表盘明细表目前能够支持显示的列？
25列


