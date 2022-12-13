# 前端代码示例

## 表单前端子表按钮点击事件

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


## 表单前端设置子表某些字段不可写

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

		//当子表点击新增时，设置新增行的子表控件不可写，实现方案是给子表绑定BindChange事件，并监听子表新增按钮的点击
		that[ childTableCode ].BindChange( $.IGuid(), function( data ) {
			if( data && data.length >= 2 ) {
				var btnCode = data[ 1 ];//取得子表按钮代码

				//判断用户点击了子表的新增按钮或者复制按钮
				if( btnCode == "add" || btnCode == "copy" ) {
					//获取此时的子表全部数据
					var rowDatas = that[ childTableCode ].GetValue();
					if( rowDatas && rowDatas.length ) {
						//循环子表数据
						for( var i = 0;i < rowDatas.length;i++ ) {
							var rowId = rowDatas[ i ][ "ObjectId" ];

							//循环readonlyFieldCodes，将里面每个子表字段编码对应的字段，设置为不可写
							for( var j = 0;j < readonlyFieldCodes.length;j++ ) {
								//此处不能直接用子表字段编码，而需要通过此格式拼接出一个完整路径编码，格式为：子表编码.子表内控件编码
								var fullCode = childTableCode + "." + readonlyFieldCodes[ j ];

								//根据子表行数据Id和字段编码，获取该行的子表控件
								var con = that[ childTableCode ].GetCellManager( rowId, fullCode );
								if( con ) {
									con.SetReadonly( true );
								}
							}
						}
					}
				}
			}
		});
	}
},
```


## 表单前端OnLoad事件 BindChange + Post 请求后端

可用位置：✔表单 / ✘列表

表单前端代码
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

				false //true：不阻塞，false：请求过程中阻塞后续代码执行
			);
		} else {
			//若 文本框F0000001 无值，则将 人员单选框F0000003 置空
			that.F0000003.SetValue( "" );
		}
	});
},
```

表单后端代码
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
			string sql = "select ObjectId from h_user where Name='" + userName + "'";
			System.Data.DataTable dt = engine.Query.QueryTable(sql, null);

			//当 h_user 表查无此用户名时
			if(dt == null || dt.Rows.Count == 0)
			{
				throw new Exception("企业内无“" + userName + "”用户！");
			}

			//取出userId
			string userId = dt.Rows[0]["ObjectId"] + string.Empty;

			//初始化响应数据实例（因为response.ReturnData默认值是null，所以后续要添加响应数据，必须先实例化）
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


## 表单前端子表控件值改变时 Post 请求后端

可用位置：✔表单 / ✘列表

表单前端代码
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
				}, false );
			}else{
				//当订单控件值为空时，设置当前子表行的销售数量值为 0
				quanCon.SetValue( 0 );
			}
		}
	});
},
```

?> 表单后端代码参考上面的 BindChange + Post 请求后端例子


## 表单按钮控件点击时 Post 请求后端

可用位置：✔表单 / ✘列表

表单前端代码
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

?> 表单后端代码参考上面的 BindChange + Post 请求后端例子


