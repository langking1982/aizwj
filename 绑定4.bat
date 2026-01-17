@echo off
chcp 65001 >nul
echo ==========================================
echo        正在重建与 GitHub 的连接...
echo ==========================================
echo.

:: 1. 询问仓库地址
set /p repo_url=https://github.com/langking1982/aizwj.git

:: 2. 清理旧的错误连接 (如果有的话)
git remote remove origin 2>nul

:: 3. 建立新的正确连接
echo.
echo 正在连接远程仓库...
git remote add origin %repo_url%

:: 4. 确保分支名为 main
git branch -M main

:: 5. 强制推送到服务器
echo.
echo 正在强力上传...
git push -u origin main --force

echo.
echo ==========================================
echo               大功告成！
echo ==========================================
echo 如果上面没有红色的 fatal 错误，说明上传成功。
echo 请等待 1 分钟后刷新你的 GitHub Pages 网址。
echo.
echo 以后只需要双击【更新网站.bat】即可，不需要再用这个脚本了。
pause