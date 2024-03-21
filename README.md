# 氚专开发者共创文档

[文档仓库](https://gitee.com/h3yun-pro-public/h3yun-pro-doc)  |  [浏览文档](https://h3yunpro.github.io/h3yun-pro-doc/)  |  [氚云官方文档](https://help.h3yun.com/channels/3.html)

## 概述

此文档库建立，是希望以另一种编排方式，引导开发者上手氚云专业版。并且欢迎所有开发人员参与进来，一起补充、完善文档，互帮互助。


## 本文档AI助手

如果您不想翻文档，欢迎您使用本文档的专属AI助手（目前处于实验期）。

在钉钉中打开此链接：[https://applink.dingtalk.com/client/aiAgent?assistantId=470fe45f326b46b08bb77df404f31fc8&from=share](https://applink.dingtalk.com/client/aiAgent?assistantId=470fe45f326b46b08bb77df404f31fc8&from=share)


## 如何做出贡献

遵照以下规范编写内容，前往 [Gitee仓库](https://gitee.com/h3yun-pro-public/h3yun-pro-doc) 提交 PR 和 ISSUE 。<br/>
如您有对文档建设的idea，或是代码示例的需求，也欢迎您提交ISSUE，让我们一起获得进步的力量！

提交pr的操作：
1. fork仓库
2. 完成贡献后，在gitee上发起 Pull Requests


## 文档/目录

- ```index.html``` 文档主页面，此页面包含 文档样式、配置、插件引入
- ```_sidebar.md``` 目录文档，在doc目录下添加了新markdown文件后，需要在此加入目录
- ```/doc``` 存放文档的markdown文件
- ```/img``` 存放文档中所用到的图片
- ```/file``` 存放代码量较大的项目文件，或者SDK等
- ```/css``` 存放样式文件，以及自定义样式
- ```/js``` 存放js插件


## 默认分支

- ```master``` 主分支，此分支内容实时推送到线上文档
- ```quick``` 快速编辑分支，用于在线编写文档
- ```dev``` 开发状态分支，用于研发新功能


## 本地预览

本地预览只需要一个可挂载静态文件的服务，所以可以利用一些语言的简易Web服务模块。

文档内已内置三个bat文件：```netrv.bat``` 、 ```noderv.bat``` 、 ```pyrv.bat```，您可以取用任意一个。

在本地编写文档，需要预览时，打开 ```cmd```，```cd``` 到文档根目录，则可以直接使用命令启动一个本地的静态文件服务。

文件对应命令及依赖：

|  文件            |  cmd命令        |        依赖                                 |
|  ----            | ----         | ----                                           |
| ```netrv.bat```  | ```netrv```  | 需要安装 ```dotnet``` 和 ```dotnet-serve``` 模块 |
| ```noderv.bat``` | ```noderv``` | 需要安装 ```nodejs``` 和 ```http-server``` 模块  |
| ```pyrv.bat```   | ```pyrv```   | 需要安装 ```python 3```                         |


## 感谢名单

* 本文档基于 [docsify](https://docsify.js.org/) 框架构建

