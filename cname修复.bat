@echo off
chcp 65001 >nul
echo ==========================================
echo        正在修复同步冲突...
echo ==========================================
echo.

:: 1. 先把 GitHub 网页上的新变动（包括你绑定的域名配置）拉取下来
echo 正在拉取远程配置...
git pull origin main --no-rebase

:: 2. 删除错误的 CNAME.txt (如果存在)
if exist CNAME.txt (
    echo 发现错误的 CNAME.txt，正在删除...
    del CNAME.txt
)

:: 3. 确保正确的 CNAME 文件存在 (如果拉取没成功，这里强制补一个)
if not exist CNAME (
    echo 正在创建正确的 CNAME 文件...
    echo www.aizwj.top> CNAME
)

:: 4. 再次提交并上传
echo.
echo 正在重新上传...
git add .
git commit -m "Sync and Fix CNAME"
git push origin main

echo.
echo ==========================================
echo               修复完成！
echo ==========================================
echo 现在你电脑里的代码和网页已经完全同步了。
echo 以后继续使用【更新网站.bat】即可。
pause