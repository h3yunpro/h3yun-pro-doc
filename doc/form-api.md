# 表单设计中的前端API

## this

在前端事件 ```OnLoad```、```OnLoadActions```、```OnValidate```、```BeforeSubmit```、```AfterSubmit``` 中，均可以通过 ```this``` 关键字得到当前表单实例对象。

```this``` 对象的属性包含当前表单的所有控件实例，比如下面这个控件，就可以使用 ```this.F0000017``` 获取其控件实例对象。

![](../img/form-api-1.png)

!> 由于氚云有的前端API会使用到回调函数，而在回调函数中使用 ```this``` 关键字会出现指向错误，所以建议在外层使用变量将 ```this``` 实例转存，如下：

``` js
// 加载事件
OnLoad: function() {
    var that = this;//使用that变量将this实例转存，供回调函数中使用

    that.F0000002.BindChange( $.IGuid(), function() {
        //此处回调函数中，需要将this替换为that

        var projectId = that.F0000002.GetValue();
    });
},
```


## 获取控件值

```GetValue``` 是一个控件实例上的函数，使用方式：
``` js
that.控件编码.GetValue();
```

```GetValue``` 函数用来获取控件的值，不同类型的控件，返回值的数据类型不同。


## 设置控件值

```SetValue``` 是一个控件实例上的函数，使用方式：
``` js
that.控件编码.SetValue(值);
```

```SetValue``` 函数用来设置控件的值，不同类型的控件，值的数据类型不同。


## 清空选项（下拉框/单选框/多选框）

```ClearItems``` 是一个控件实例上的函数，使用方式：
``` js
that.控件编码.ClearItems();
```

```ClearItems``` 函数只能用于单选框/复选框/下拉框，作用是将控件的选项全部清空。


## 添加选项（下拉框/单选框/多选框）

```AddItem``` 是一个控件实例上的函数，使用方式：
``` js
that.控件编码.AddItem("选项");
```

```AddItem``` 函数只能用于单选框/复选框/下拉框，作用是给控件增加一个选项，函数的传入参数必须是一个字符串。


## 给控件绑定值改变事件

```BindChange``` 是一个事件，一般写在 ```OnLoad``` 事件中，用来在表单打开时绑定上事件监听控件值的改变。

使用方式：
``` js
var that = this;
that.控件编码.BindChange( "key", function() {
    var v = that.控件编码.GetValue();
});
```

```BindChange``` 函数用于绑定一个值改变事件，但是和js的 ```onchange``` 事件不一样。```onchange``` 函数触发时机为实时的值改变，而 ```BindChange``` 在值改变时不触发，在控件焦点离开后才触发。


## Ajax前端请求后端

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


## 弹窗

``` js
$.IShowSuccess( "成功", "这是一条成功消息" );//弹出成功消息

$.IShowWarn( "警告", "这是一条警告消息" );//弹出警告消息

$.IShowError( "错误", "这是一条错误消息" );//弹出错误消息

//注意：$.IConfirm弹窗是属于回调式的，而非阻塞式，弹窗后的代码依然会被执行，所以请勿用在用户提交时
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
var objectId = "xx-xx-xx";// 表单数据Id，传 "" 时表示以新增模式打开，传具体数据Id表示打开该条数据表单详情页
var checkIsChange = true;// 关闭时是否感知变化，固定传 true
$.IShowForm(schemaCode, objectId, checkIsChange);
```


## 以弹窗模式打开表单

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


## 获取设备经纬度

用于获取用户当前定位（其精度和位置控件一致），但是仅限移动端，所以使用前，需要判断一下当前表单所处环境。

示例：
``` js
if($.SmartForm.ResponseContext.IsMobile){
    //此函数返回值为一个对象，对象格式和位置控件值一致，如下：
    //{"Address":"深圳市南山区科技南十路航天科技研究院","Point":{"lat":"21.345","lng":"114.454"}}
    var location = $.ILocation();
    
    //因为 $.ILocation 的返回值和位置控件值一致，所以可以直接赋值给位置控件
    that.位置控件的控件编码.SetValue(location);
}
```


## 关闭表单

用于关闭当前表单，示例：```$.SmartForm.ClosePage();```

不过新版表单已不适用此接口，改为了：```this.ClosePage();```