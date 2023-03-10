# 前端代码示例


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

## [表单]前端实现编辑页编辑后不关闭编辑页

可用位置：✔表单 / ✘列表

表单前端代码
``` js
// 提交后事件
AfterSubmit: function( action, responseValue ) {
	///编辑后不 关闭编辑页
	debugger
	var status = $.SmartForm.ResponseContext.BizObjectStatus;
	if( action == "Submit" && status == 1 ) //数据生效，数据库中对应值 1
	{
		//  schemaCode: 表单编码; objectId; 表单数据Id; checkIsChange: 关闭时，是否感知变化;
		$.IShowForm( "D001599e03c250e58644ed78696640af9fb856b", $.SmartForm.ResponseContext.BizObjectId, null);
		responseValue.ClosePage = false;
		responseValue.Refresh = true;
	}
}
```

