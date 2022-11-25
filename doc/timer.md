# 定时器

氚云中想要定时执行一段代码去处理数据，可以利用定时器

氚云有一个定时器引擎，此引擎会每隔4小时（此间隔为底层设定，不可更改），检测用户编写的代码。

当检测到代码中有继承 ```H3.SmartForm.Timer``` 类的子类，将会动态实例化此子类，并且自动调用子类中的 ```OnWork``` 方法。

如果应用内定义了多个 ```H3.SmartForm.Timer``` 类的子类，则会按定义的顺序逐个执行，并不是同时执行。

利用这个特性，我们只需要，定义一个类，并且继承 ```H3.SmartForm.Timer```，那我们的代码就可以每隔4小时执行一次了。

?> 一般而言，会把定时器类定义在表单设计后端代码，默认的表单类之下

?> 定义的定时器，无需在任意地方调用，只需定义即可，等待定时器引擎自动去触发

?> 由于不确定定时器引擎何时去调用自定义代码，又是固定4小时一次，所以可以根据触发时的时间范围（范围时间差为4小时）去确定，下面的代码示例有做示范

!> 注：为了不给服务器造成过大负担，每个应用，定时器引擎只会耗费20分钟时间去执行用户的代码。
从触发用户第一个定时器开始计时，到达20分钟时，不管当前代码是否执行完成，都会立马中止，并且不再执行其他未执行的定时器

定时器定义代码示例：

``` cs
//定义一个定时器类(类名格式：自定义名称 + _Timer)，且继承H3.SmartForm.Timer类
public class MyTest_Timer: H3.SmartForm.Timer
{
    //构造方法，跟类名保持一致，里面不必书写代码，但是必须存在
    public MyTest_Timer() { }

    /*
        重写父类的OnWork方法，此步必做，否则会报错
        定时器引擎实例化MyTest_Timer后，会自动调用本方法
        此方法每隔4小时被定时器引擎调用一次
    */
    protected override void OnWork(H3.IEngine engine)
    {
        /*
            1. 此处无当前表单业务对象，所以不能使用this.Request.BizObject，请另行查询出需要的业务对象
            2. 此处无请求对象，所以请将this.Request.Engine替换为方法传入参数的engine
            3. 此处无当前登录人，所以请将this.Request.UserContext.UserId替换为指定的人员id或系统默认用户Id（即：H3.Organization.User.SystemUserId）
        */

        DateTime nowTime = DateTime.Now;//获取当前时间

        /*--------------示例一---------------*/
        DateTime sTime = DateTime.Parse(nowTime.ToString("yyyy-MM-dd 10:00:00"));//获取今天的10点
        DateTime eTime = DateTime.Parse(nowTime.ToString("yyyy-MM-dd 14:00:00"));//获取今天的14点
        //判断当前时间是否处于10点-14点间
        if(sTime <= nowTime && eTime >= nowTime)
        {
            //在每天 10点-14点 间要执行的代码
            //时间间隔范围必须至少为 4小时，来匹配上定时器引擎的触发间隔
        }

        /*--------------示例二---------------*/
        //判断当前时间小时数范围为 8点-16点
        if(nowTime.Hour >= 8 && nowTime.Hour <= 16)
        {
            //在每天 8点-16点 间要执行的代码
            //这个时间范围相差 8小时，理论上，此处代码一天会被执行 2次
        }

        /*--------------示例三---------------*/
        //判断当前时间月份为12月，日期为1号，小时为12点-16点
        if(nowTime.Month == 12 && nowTime.Day == 1 && nowTime.Hour >= 12 && nowTime.Hour <= 16)
        {
            //在每年 12月1号 12点-16点 间触发执行一次
        }

        /*--------------示例四---------------*/
        //调用定时器类中封装的方法
        DoSomething(engine, nowTime);
    }

    //业务代码封装成方法
    public static void DoSomething(H3.IEngine engine, DateTime time)
    {

    }
}
```

扩展：

1. 执行结果如何知晓？

   可以搭建一个日志表单，定时器中将执行结果写入到该表单

2. 如何调试定时器里的代码？
   
   定时器类中依然可以封装方法，把业务代码封装成一个 ```public static``` 方法（示例代码中有做演示），就可以在表单的OnLoad事件中调用，进行后端调试了

   调用定时器里的业务代码方法示例：

``` cs
protected override void OnLoad(H3.SmartForm.LoadSmartFormResponse response)
{
    MyTest_Timer.DoSomething(this.Engine, DateTime.Now);
    base.OnLoad(response);
}
```