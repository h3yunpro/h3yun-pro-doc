# 消息通知/提醒


## 发送短信实例

可用位置：✔表单 / ✔列表 / ✔定时器 / ✔自定义接口
``` cs
//在表单提交时发送短信
protected override void OnSubmit(string actionName, H3.SmartForm.SmartFormPostValue postValue, H3.SmartForm.SubmitSmartFormResponse response)
{
    if(actionName == "Submit")
    {
        SendMessage(this.Request.BizObject["Msg"] + string.Empty, this.Request.BizObject["phone"] + string.Empty);
    }

    base.OnSubmit(actionName, postValue, response);
}

public void SendMessage(string Msg, string phone)
{
    List < H3.Notification.UserMessage > _messageList = new List<H3.Notification.UserMessage>();
    string welcomeWords = Msg;//发送内容
    string send = H3.Organization.User.SystemUserId;//发起人
    string receiverid = phone;//接收人
    H3.Notification.UserMessage _message = new H3.Notification.UserMessage(H3.Notification.UserMessageType.MobileMessage, send, receiverid, receiverid, "【氚云】工资到账通知", welcomeWords, "");
    _messageList.Add(_message);//必须要有【】签名
    if(_messageList.Count > 0)
    {
        this.Request.Engine.Notifier.Send(_messageList.ToArray());//执行发送
    }
}
```

### 注意事项

在发送短信代码书写前，请阅读以下注意点：
1. 短信余量充足，可在系统管理中查看剩余短信条数
2. 若是发送短信H3.Notification.UserMessage方法中Title参数必须带有签名【】

[//]: # (## 静态方法-UserMessage)

[//]: # ()
[//]: # (```H3.DataModel.BizObject.UserMessage``` 方法用于发送消息通知。)

[//]: # ()
[//]: # (方法传入参数：)

[//]: # (- ```Type```：类型)


