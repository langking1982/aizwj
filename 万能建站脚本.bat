@echo off
chcp 65001 >nul
echo ==========================================
echo        新项目初始化工具 (无限建站版)
echo ==========================================
echo.
echo 注意：请确保你已经在 GitHub 创建了一个新的空仓库！
echo.

:: 1. 输入新仓库地址
set /p repo_url=请右键粘贴【新仓库】的 HTTPS 地址 (以 .git 结尾) 并回车: 

:: 2. 初始化 Git
git init
git branch -M main

:: 3. 关联远程仓库
git remote remove origin 2>nul
git remote add origin %repo_url%

:: 4. 首次提交并上传
echo.
echo 正在进行首次上传...
git add .
git commit -m "New Project Init"
git push -u origin main --force

echo.
echo ==========================================
echo 初始化完成！
echo 以后修改这个项目，直接用【更新网站.bat】即可。
echo ==========================================
pause