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


## 1.多选控件可以筛选(做为查询/分析条件)？
不可以<span class="fontColor" >
2022/11/30 </span></br>


## 2.怎样可以通过输入出生日期，计算出年龄？
教程https://app2fbcrlcs8626.h5.xiaoeknow.com/p/course/video/v_625e3523e4b01a4851f3a043 <span class="fontColor" >
2022/11/30 </span></br>


## 3.氚云中消息提醒代码里面多个执行人是使用数组吗？还是直接拼接就行？
循环去提醒，不要拼接<span class="fontColor" > 2022/12/1 </span>


## 4.钉钉考勤怎么同步到氚云？ 
教程，参考下https://help.h3yun.com/contents/1155/2296.html<span class="fontColor" >
 2022/12/1 </span>


## 5.表单的图标颜色，可以自定义吗？
![logo](../img/faq-1.png ':size=10%')<span class="fontColor" >
2022/12/1 </span></br></br>
不可以


## 6.氚云地图合作的是高德地图还是百度地图？
高德地图<span class="fontColor" >
2022/12/1 </span></br>


## 7.删错的数据有办法恢复吗?
可以做数据恢复，可以联系一下渠道经理<span class="fontColor" >
2022/12/1 </span>


## 8.出现Connection must be valid and open to rollback transaction报错问题？
 ![logo](../img/faq-2.png ':size=20%')</br>
同时对一条数据进行插入更新删除操作就容易出现这种情况<span class="fontColor" >
2022/12/1 </span>


## 9.当前表单的状态/表单模式？
``` cs
表单模式
 $.SmartForm.ResponseContext.FormMode   
0为审批/办理 1为办理完结 2为创建 4为查阅
 表单状态
this.Request.BizObject.Status;//获取当前表单状态（生效、草稿、进行中、作废）
``` 
<span class="fontColor" >2022/12/1</span>


## 10.设置子流程的时候，父流程中的子表数据能否填充到子流程的主表中吗？
不可以的 如果要实现需要用代码的方式实现<span class="fontColor" >
2022/12/1 </span>


## 11.怎么获取表单的流程状态？
``` cs
$.SmartForm.ResponseContext.BizObjectStatus 
```
<span class="fontColor" > 2022/12/2 </span>

## 12.今天图片上传一直出现这个问题,doUploadFile fail
![logo](../img/faq-7.png ':size=20%')

重启一下钉钉软件看看

<span class="fontColor" > 2022/12/2 </span>


## 13.每次主表添加完数据之后，都生成到另外一个表的子表里边
 ![logo](../img/faq-3.png ':size=20%')

 这是以前简写的例子，可以参考
 
 <span class="fontColor" > 2022/12/2 </span></br>


## 14.用Excel导入数据，要如何导入多条子表的数据?
例如：</br>
![logo](../img/faq-4.png ':size=20%')

<span class="fontColor" > 2022/12/2 </span>


## 15.业务规则又先后顺序的吗？
从上往下执行的

<span class="fontColor" > 2022/12/2 </span>


## 16.接口创建的表单数据触发业务规则跟消息通知吗?
会触发，如果消息通知没触发，看看人员控件的值是否给了固定值，因为在接口创建数据时是不会给人员控件默认值的，有可能没发是因为
人员控件的值是空的，  ```H_User```人员基础信息表
<span class="fontColor" > 2022/12/5 </span>


## 17.仪表盘有sql嘛？
仪表盘也支持sql的，需要找相关人员开通权限<span class="fontColor" > 2022/12/5 </span>


## 18.子表的序号后端可以获取到吗？
子表的序号只是前端显示在界面上，实际没有存到数据库中的<span class="fontColor" > 2022/12/6 </span>


## 19.新增子表里面的数据的时候可以设置数据行的颜色吗？
不可以的<span class="fontColor" > 2022/12/7 </span>


## 20.前端自定义代码编写错误，请联系管理员修改
函数名:AfterSubmit;错误信息:SyntaxError:undefined" is not valid JSoN
检查 返回的值是否有为null的或undefined的 只有有值才转成json> <span class="fontColor" > 2022/12/7 </span>


## 21.位置控件限定范围支持多少米以内的定位？
位置控件是调用的钉钉接口，表单设计内设置“限定附近范围”后可限定为只能选择以定位点为中心大概周围 ```500m ```
内的位置，单根据设备本身定位的准确性，会有所偏差。
![logo](../img/faq-5.png ':size=20%')
<span class="fontColor" > 2022/12/8 </span>


## 22.有什么办法获取当前表单数据的流程节点吗？

 ~~~ cs
 H3.Workflow.Instance.IToken tok = this.Request.Engine.WorkflowInstanceManager.GetWorkflowInstance("流程id").GetLastToken();
 ~~~ 

<span class="fontColor" >2022/12/8 </span>


## 23.氚云有英文版本吗？
氚云系统设计是提供的中文版编写环境，暂时没有英文的表单设计页面版本。 可由懂中文的氚云系统管理员搭建系统，
设置控件名称为英文的，这样可以提供给国外同事来提交表单和查看数据。 

<span class="fontColor" >2022/12/8 </span>


## 24.一个表单支持多少个控件?
不能超过2万个字符  例如 多行文本控件的最大字符是2000  那么最多只能10个多行文本
<span class="fontColor" >
2022/12/8</span>
##关于业务规则执行
对于```表单有流程```的审批通过之后会执行业务规则,审批不通过不会执行业务规则,
如果```表单没有流程``` 数据发生改变(比如新增/删除设置了业务规则) 执行业务规则,```抄送节点```是不会执行业务规则的，
用```代码激活```的流程节点也是遵循这个
```设置了审批自动通过```相当于审批通过
<span class="fontColor" >2022/12/9</span>


## 25.复制表单失败
复制表单失败，一般是别的表单删除控件等导致当前表单引用该删除控件的计算公式、业务规则等报错等引起 可以到当前表单的表单设计-重新保存下表单，保存会有提示具体的错误，可以根据错误去更改，错误一般是下述情况 ：</br>
1、业务规则写法错误；</br>
2、子流程流转规则错误 ；</br>
3、子流程是自动发起，发起的子流程表单业务规则错误；</br>
4、计算公式缺少引用的控件。
<span class="fontColor" >2022/12/9</span>


## 26.导入氚云的数据，消息提醒不会触发吗？
 导入不会触发消息提醒，流程的会</br>
 ![logo](../img/faq-6.png ':size=20%')
 <span class="fontColor" >2022/12/13 </span>


## 27.通过子流程触发的数据 也是不会有消息提醒的吗？
会有的
<span class="fontColor" >2022/12/13 </span>


## 28.企微定位部分手机不支持问题.
我们定位在企微调用的是高德的接口，其对部分手机确实存在兼容性问题，目前无法解决。
目前定位无法保证100%准确，如果用户业务中需要保证100%定位正确，请用户重新考虑业务场景的使用，目前企微的氛云中还做不到。请用户知悉。
我们目前将问题反馈给企微共同优化。 
<span class="fontColor"> 2022/12/13 </span>

## 29.提示：获取signature失败，请与服务商联系!
1.试用期到期了，被禁用了 
2.钉钉订单到期，所以在钉钉中无法使用
3.重新将应用发布快捷方式到工作台使用
4.如以上不行提供企业名称和引擎编码反馈

<span class="fontColor" >2022/12/13 </span>


## 30.表单控件上限是多少个？
不能超过2万个字符  例如 多行文本控件的最大字符是2000  那么最多只能10个多行文本,目前大概是80/90个控件> <span class="fontColor" >2022/12/30 </span>


## 31.表单如何只能创建人编辑？
> ~~~cs
>  protected override void OnLoad(H3.SmartForm.LoadSmartFormResponse response)
    {
>       if(this.Request.BizObject.CreatedBy != this.Request.UserContext.UserId && response.Actions.ContainsKey("Edit"))
>       {
>       response.Actions.Remove("Edit");
>       }
>   }
> ~~~
 <span class="fontColor" >
 2022/1/5 </span>


## 32.导入数据导不进去，错误原因下载不下来，是什么原因？点了就变灰了，实际也没下载出来下载未导入数据
 ![logo](../img/faq-8.png ':size=20%')</br>
 在系统管理》全局设置》列表版本 改为新版列表
 <span class="fontColor" >2023/2/7 </span>
 

## 33.可以发布多少个表单到钉钉工作台？
从氚云发布到钉钉工作台的图标上限为50，包括：发布应用，列表，和表单三种图标的总和
<span class="fontColor" >2023/2/7 </span>


## 34.氚云待办不同步到钉钉待办
1，先确认流程表单有没有超过200个，第201个表单发起的待办则不显示，删除过的也算，需要手动删除无用的表单，控制在200个以内；</br>
2，再确定是所有人没同步（检查氚云在钉钉的可见范围是否为全部）还是个别人没同步，个别人没同步需要提供没同步的人员名称并反馈给对应的成功经理去处理。</br>
3、钉钉的授权到期了，调不了钉钉接口。
<span class="fontColor" >2023/2/7 </span>


## 35.报表中计算字段显示数值不正确？
数字控件没有赋值时，默认值时null，null与其他数字运算后依然是null。</br>
1、可以对参与运算的字段给默认值，比如0；</br>
2、如果修改数据源不方便，可以改计算字段的公式请参照如下写法，兼容null值。</br>
比如原计算公式为：入库-出库，改为：IF(入库,入库,0) - IF(出库,出库,0)</br>
注意：左侧计算字段要修改，汇总表中也要编辑修改
<span class="fontColor" >2023/2/8 </span></br>


## 36.氚云预览的文件如何进行打印？
预览的文件不支持打印
<span class="fontColor" >2023/2/9 </span></br>


## 37.正在进行中还没有结束的流程是怎么通过业务规则更新？
业务规则只会在数据生效后才触发，如果是流程中的数据要触发，要么用自动化功能，要么做一个辅助表，通过子流程在流程过程中生成一个有效的辅助表数据，通过这个辅助表数据触发业务规则
<span class="fontColor" >2023/2/9 </span></br>


## 38.现在氚云发布到钉钉工作台的表单或者列表能改名字么？同一个表单，以表单形式和列表形式都发到了钉钉工作台，怎么能做个区分？
改不了

<span class="fontColor" >2023/2/9 </span></br>


## 39.用代码Create生成了另外一个表单的数据，那  那个表单里的代码和业务规则会不会执行？
代码不会执行   业务规则会执行

<span class="fontColor" >2023/2/9 </span></br>


## 40.非调试模式不报错，调试模式弹窗报错
当应用下的后端代码中存在声明变量，但未赋默认值时，就会导致非调试模式下不报错，调试模式下弹出以下错误：
> 系统异常：DoAction 失败 无法将类型为“H3.SmartForm.ResponseContext”的对象强制转换为类型“H3.SmartForm.LoadListViewResponse”

会导致异常的声明变量示例：
``` cs
string a;
int b;
```

正确的声明变量实例：
``` cs
string a = "字符串";
int b = 0;
```
``` cs
或者看看有没有声明了相同的类，复制完表单就报错，大概率就是复制的表单有问题，可以第一时间去看下
```
解决方案：
<br/>应用下的表单内代码量少时，可以一个个表单点进去排查。

若代码量多时，则先打开前端调试器，再打开后端调试器，待报错弹出后，<br/>
在前端调试器的network工具下，从上往下查看所有OnAction请求，会在某个请求的响应数据中，有具体的报错代码位置。

<span class="fontColor" >2023/3/6 </span></br>




## 41.如果填充子流程有些字段有值有些字段没有值
存在可能情况：
1.检查下子流程表单有没有设置不允许重复录入
2.检查流程设计填充子流程的配置字段有没有被反写