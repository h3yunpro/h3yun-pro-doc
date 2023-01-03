<style>
.fontColor {
    color: gray;
    float: right;
}

.imgstyle {
    max-width: 50%;
    max-height: 50%;
}
</style>

# 常见问题解答

> Q1:多选控件可以筛选(做为查询/分析条件)？<span class="fontColor" >
> 2022/11/30 </span></br>
> A1: 不可以

> Q2:怎样可以通过输入出生日期，计算出年龄？<span class="fontColor" >
> 2022/11/30 </span></br>
> A2:教程https://app2fbcrlcs8626.h5.xiaoeknow.com/p/course/video/v_625e3523e4b01a4851f3a043 </br>

> Q3:氚云中消息提醒代码里面多个执行人是使用数组吗？还是直接拼接就行？</span><span class="fontColor" >
> 2022/12/1 </span></br>
> A3:循环去提醒，不要拼接

> Q4:钉钉考勤怎么同步到氚云？<span class="fontColor" >
> 2022/12/1 </span></br>
> A4:教程，参考下https://help.h3yun.com/contents/1155/2296.html

> Q5:表单的图标颜色，可以自定义吗？<span class="fontColor" >
> 2022/12/1 </span></br>
![logo](../img/faq-1.png ':size=20%')</br>
> A5:不可以

> Q6:氚云地图合作的是高德地图还是百度地图？<span class="fontColor" >
> 2022/12/1 </span></br>
> A6:高德地图


> Q7:删错的数据有办法恢复吗?<span class="fontColor" >
> 2022/12/1 </span></br>
> A7:可以做数据恢复，客户可以联系一下渠道经理

> Q8:出现Connection must be valid and open to rollback transaction报错问题？<span class="fontColor" >
> 2022/12/1 </span></br>
> ![logo](../img/faq-2.png ':size=20%')</br>
> A8:同时对一条数据进行插入更新删除操作就容易出现这种情况

> Q9:当前表单的状态/表单模式？<span class="fontColor" >
> 2022/12/1 </span></br>
> A9:
> ~~~cs
> 表单模式
> $.SmartForm.ResponseContext.FormMode   
>0为审批/办理 1为办理完结 2为创建 4为查阅
> 表单状态
>this.Request.BizObject.Status;//获取当前表单状态（生效、草稿、进行中、作废）
> ~~~ 


> Q10:设置子流程的时候，父流程中的子表数据能否填充到子流程的主表中吗？<span class="fontColor" >
> 2022/12/1 </span></br>
> A10:不可以的 如果要实现需要用代码的方式实现

> Q11:怎么获取表单的流程状态？
> <span class="fontColor" > 2022/12/2 </span></br>
> A11:$.SmartForm.ResponseContext.BizObjectStatus

> Q12:今天图片上传一直出现这个问题,只有一个人是这样
> <span class="fontColor" > 2022/12/2 </span></br>
> A12:重启一下钉钉软件看看

> Q13:每次主表添加完数据之后，都生成到另外一个表的子表里边
> <span class="fontColor" > 2022/12/2 </span></br>
> A13:这是以前简写的例子，可以参考</br>
> ![logo](../img/faq-3.png ':size=20%')

> Q14:用Excel导入数据，要如何导入多条子表的数据?
> <span class="fontColor" > 2022/12/2 </span></br>
> A14:这是以前简写的例子，可以参考</br>
> ![logo](../img/faq-4.png ':size=20%')

> Q15:业务规则又先后顺序的吗？
> <span class="fontColor" > 2022/12/2 </span></br>
> A15:从上往下执行的

> Q16:接口创建的表单数据触发业务规则跟消息通知吗?
> <span class="fontColor" > 2022/12/5 </span></br>
> A16:会触发，如果消息通知没触发，看看人员控件的值是否给了固定值，因为在接口创建数据时是不会给人员控件默认值的，有可能没发是因为
> 人员控件的值是空的，  ```H_User```人员基础信息表

> Q17:仪表盘有sql嘛？
> <span class="fontColor" > 2022/12/5 </span></br>
> A17:仪表盘也支持sql的，需要找相关人员开通权限

> Q18:子表的序号后端可以获取到吗？
> <span class="fontColor" > 2022/12/6 </span></br>
> A18:子表的序号只是前端显示在界面上，实际没有存到数据库中的

> Q19:新增子表里面的数据的时候可以设置数据行的颜色吗？
> <span class="fontColor" > 2022/12/7 </span></br>
> A19:不可以的

> Q20:前端自定义代码编写错误，请联系管理员修改
> 函数名:AfterSubmit;错误信息:SyntaxError:undefined" is not valid JSoN
> <span class="fontColor" > 2022/12/7 </span></br>
> A20: 检查 返回的值是否有为null的或undefined的 只有有值才转成json

> Q21:位置控件限定范围支持多少米以内的定位？
> <span class="fontColor" > 2022/12/8 </span></br>
> A21:位置控件是调用的钉钉接口，表单设计内设置“限定附近范围”后可限定为只能选择以定位点为中心大概周围 ```500m ```
> 内的位置，单根据设备本身定位的准确性，会有所偏差。

> ![logo](../img/faq-5.png ':size=20%')


> Q22:有什么办法获取当前表单数据的流程节点吗？<span class="fontColor" >
> 2022/12/8 </span></br>
> A22:
> ~~~ cs
> H3.Workflow.Instance.IToken tok = this.Request.Engine.WorkflowInstanceManager.GetWorkflowInstance("流程id").GetLastToken();
> ~~~ 



> Q23:氚云有英文版本吗？
> <span class="fontColor" >
> 2022/12/8 </span></br>
> A23:氚云系统设计是提供的中文版编写环境，暂时没有英文的表单设计页面版本。 可由懂中文的氚云系统管理员搭建系统，
> 设置控件名称为英文的，这样可以提供给国外同事来提交表单和查看数据。

> Q24:一个表单支持多少个控件?<span class="fontColor" >
> 2022/12/8</span></br>
> A24:不能超过2万个字符  例如 多行文本控件的最大字符是2000  那么最多只能10个多行文本

> Q25:关于业务规则执行
> <span class="fontColor" >
> 2022/12/9</span></br>
> A25:对于```表单有流程```的审批通过之后会执行业务规则,审批不通过不会执行业务规则,
> 如果```表单没有流程``` 数据发生改变(比如新增/删除设置了业务规则) 执行业务规则,```抄送节点```是不会执行业务规则的，
> 用```代码激活```的流程节点也是遵循这个
> ```设置了审批自动通过```相当于审批通过

> Q26:复制表单失败
 > <span class="fontColor" >
> 2022/12/9</span></br>
> 复制表单失败，一般是别的表单删除控件等导致当前表单引用该删除控件的计算公式、业务规则等报错等引起 可以到当前表单的表单设计-重新保存下表单，保存会有提示具体的错误，可以根据错误去更改，错误一般是下述情况 ：</br>
1、业务规则写法错误；</br>
2、子流程流转规则错误 ；</br>
3、子流程是自动发起，发起的子流程表单业务规则错误；</br>
4、计算公式缺少引用的控件。

> Q27:导入氚云的数据，消息提醒不会触发吗？
> <span class="fontColor" >
> 2022/12/13 </span></br>
> A:27导入不会触发消息提醒，流程的会</br>
> ![logo](../img/faq-6.png ':size=20%')

> Q28:通过子流程触发的数据 也是不会有消息提醒的吗？
> <span class="fontColor" >
> 2022/12/13 </span></br>
> A28:会有的


>Q29:企微定位部分手机不支持问题.
> <span class="fontColor" >
> 2022/12/13 </span></br>
>A29: 我们定位在企微调用的是高德的接口，其对部分手机确实存在兼容性问题，目前无法解决。
目前定位无法保证100%准确，如果用户业务中需要保证100%定位正确，请用户重新考虑业务场景的使用，目前企微的氛云中还做不到。请用户知悉。
我们目前将问题反馈给企微共同优化。

>Q30:提示：获取signature失败，请与服务商联系!
> <span class="fontColor" >
> 2022/12/13 </span></br>
> A30:试用期到期了，被禁用了

> Q31:表单控件上限是多少个？
> <span class="fontColor" >
> 2022/12/30 </span></br>
> A31:不能超过2万个字符  例如 多行文本控件的最大字符是2000  那么最多只能10个多行文本,目前大概是80/90个控件