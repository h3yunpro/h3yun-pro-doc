# 纯净版代码示例

给氚专老玩家准备，无注释，方便复制粘贴，快速使用

## 定时器

``` cs
public class MyTest_Timer: H3.SmartForm.Timer
{
    public MyTest_Timer() { }

    protected override void OnWork(H3.IEngine engine)
    {
        DateTime nowTime = DateTime.Now;

    }
}
```