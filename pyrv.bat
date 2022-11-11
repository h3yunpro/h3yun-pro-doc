echo off

echo "此功能需要安装python 3，用于在本地预览文档"

start http://127.0.0.1:3000
python -m http.server 3000

