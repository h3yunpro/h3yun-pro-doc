echo off

echo "此功能需要安装python 3，用于启动文档的预览服务，方便文档编写。"

start http://127.0.0.1:3000
python -m http.server 3000

