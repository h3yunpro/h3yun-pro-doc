## 前端代码示例

### 表单前端子表按钮点击事件

可用位置：✔表单 / ✘列表

``` javascript
// 加载事件
OnLoad: function() {
	var that = this;
	that.D154601Fd2d12b143fae4419a2d3e8380d78ad1b.BindChange( $.IGuid(), function( data ) {
		if( data && data.length >= 2 ) {
			var btnCode = data[ 1 ];
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