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


## 关联表单多选


## 日期


## 数字


## 复选框


## 是/否


## 地址


## 位置


## 附件/图片


## 子表

