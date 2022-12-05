 <style>
.fontColor{
            color: gray ;
            float: right;
            }
.imgstyle{
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

>Q16:接口创建的表单数据触发业务规则跟消息通知吗?
> <span class="fontColor" > 2022/12/5 </span></br>
>A16:会触发，如果消息通知没触发，看看人员控件的值是否给了固定值，因为在接口创建数据时是不会给人员控件默认值的，有可能没发是因为
> 人员控件的值是空的，  ```H_User```人员基础信息表
> 
> Q17:仪表盘有sql嘛？
 > <span class="fontColor" > 2022/12/5 </span></br>
> A17:仪表盘也支持sql的，需要找相关人员开通权限
