@echo off
color 0a
echo ==========================================
echo        首次设置：绑定 GitHub 仓库
echo ==========================================
echo.

:: 1. 询问仓库地址
set /p repo_url=https://github.com/langking1982/aizwj.git

echo.
echo 正在初始化...
:: 2. 初始化 Git
git init
git branch -M main

:: 3. 关联远程仓库
git remote add origin %repo_url%

echo.
echo 正在提交文件...
git add .
git commit -m "First time setup"

echo.
echo 正在强推到服务器 (如果弹出登录窗口，请登录)...
:: 4. 强制推送 (防止因为仓库里有README文件导致冲突)
git push -u origin main --force

echo.
echo ==========================================
echo 恭喜！绑定成功！
echo 现在你可以把这个脚本删了，以后直接用“更新网站.bat”即可。
echo ==========================================
pause