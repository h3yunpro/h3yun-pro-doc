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


## 表单按钮控件点击 Post 请求后端

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

表单后端代码参考上面的 BindChange + Post 请求后端例子

