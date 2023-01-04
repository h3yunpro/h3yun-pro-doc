# 氚专开发者共创文档

[文档仓库](https://gitee.com/h3yun-pro-public/h3yun-pro-doc)  |  [浏览文档](https://h3yunpro.github.io/h3yun-pro-doc/)  |  [docsify](https://docsify.js.org/#/zh-cn/) 

!> 官方文档地址： [https://help.h3yun.com/channels/3.html](https://help.h3yun.com/channels/3.html)


## 概述

此文档库创立，是希望以另一种编排方式，引导开发者上手氚云专业版。并且欢迎所有开发人员参与进来，一起补充、完善文档，互帮互助。后续本文档将会作为群机器人训练数据。


## 如何做出贡献

如您想要为本文档做出贡献，可以前往 [文档仓库](https://gitee.com/h3yun-pro-public/h3yun-pro-doc) 提交 PR 和 ISSUE 。

提交pr的操作：

1、fork仓库

2、完成贡献后，在gitee上发起 Pull Requests


## 文档/目录

- ```index.html``` 文档主页面，此页面包含 文档样式、配置、插件引入

- ```_sidebar.md``` 目录文档，在doc目录下添加了新markdown文件后，需要在此加入目录
  
- ```/doc``` 存放文档的markdown文件
  
- ```/img``` 存放markdown文件所用到的图片
  
- ```/file``` 存放代码量较大的项目文件，或者SDK等

- ```/css``` 存放样式文件，以及自定义样式

- ```/js``` 存放js插件


## 默认分支

- ```master``` 主分支，此分支内容实时推送到线上文档

- ```quick``` 快速编辑分支，用于直接在gitee在线对文档细节微调


## 本地预览

本地预览只需要一个可挂载静态文件的服务，所以可以利用一些语言的简易Web服务模块。

文档内已内置三个bat文件：```netrv.bat``` 、 ```noderv.bat``` 、 ```pyrv.bat```，您可以取用任意一个。

在本地编写文档，需要预览时，打开 ```cmd```，```cd``` 到文档根目录，则可以直接使用命令启动一个本地的静态文件服务。

文件对应命令及依赖：

|  文件            |  命令        |  依赖                                           |
|  ----            | ----         | ----                                           |
| ```netrv.bat```  | ```netrv```  | 需要安装 ```dotnet``` 和 ```dotnet-serve``` 模块 |
| ```noderv.bat``` | ```noderv``` | 需要安装 ```nodejs``` 和 ```http-server``` 模块  |
| ```pyrv.bat```   | ```pyrv```   | 需要安装 ```python 3```                         |