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


## GetValue

```GetValue``` 是一个控件实例上的函数，使用方式：```控件实例.GetValue()```。

```GetValue``` 用来获取控件的值，不同类型的控件，返回值结构会略有不同。



## $.SmartForm.PostForm

利用Ajax技术，异步请求后端，触发后端OnSubmit事件。

``` js
$.SmartForm.PostForm(
    actionName, //传给后端的actionName，命名标准：功能名_Post
    data, //传给后端的数据，object类型
    callBack, //请求成功后的回调事件
    errorBack, //请求失败后的回调事件
    async //true：不阻塞，false：请求过程中阻塞后续代码执行
);
```

[使用示例](./doc/js-example?id=表单前端onload事件-bindchange-post-请求后端)