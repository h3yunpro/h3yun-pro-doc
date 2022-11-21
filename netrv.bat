echo off

echo "此功能需要安装dotnet和dotnet-serve模块，用于在本地预览文档"

start http://127.0.0.1:3000

dotnet serve -p 3000