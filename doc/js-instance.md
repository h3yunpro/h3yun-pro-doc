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

### 示例

1. 在表单打开时，判断是否是通过列表上的新增按钮点开的（即新增模式）：

2. 在表单打开时，判断是否是通过列表页数据标题点开的（即表单数据查阅模式）：

3. 在点击 提交/同意 按钮时，判断当前流程节点：


## this

```this``` 仅在表单前端代码的事件中可用，可以通过此实例属性获取表单的控件实例，用以操控控件。

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
    }
}
```

