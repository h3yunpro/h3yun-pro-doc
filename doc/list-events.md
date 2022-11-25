
# 列表事件

## 前端事件

列表前端只有一个事件：```$.ListView.ActionPreDo```，在点击列表按钮时触发该事件，```actionCode``` 参数为按钮编码。

### 平台默认按钮

* Create：新增

* Import：导入

* Export：导出

* Remove：删除

* PrintQrCode：打印二维码

### 配置自定义按钮：
![](../img/list-events-1.png)
![](../img/list-events-2.png)

> 注：**统计分析** 按钮点击不经过该事件

### ActionPreDo事件代码示例：
``` js
//此处为列表按钮点击事件
$.ListView.ActionPreDo = function( actionCode ) {
    debugger

    //获取列表选中数据
    var datas = $.ListView.GetSelected();
    if( datas && datas.length ) {
        //当有选中数据时，取出选中数据的ObjectId值
        for( var i = 0;i < datas.length;i++ ) {
            alert( datas[ i ][ "ObjectId" ] );
        }
    }

    //通过actionCode判断用户点击删除按钮
    if( actionCode == "Remove" ) {
        //弹出成功状态消息
        $.IShowSuccess( "成功", "点击了删除按钮！" );
    }
};
```


## 后端事件

### 列表页加载时的事件触发顺序图


### 列表按钮点击时的事件触发顺序图
