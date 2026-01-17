@echo off
chcp 65001 >nul
echo ==========================================
echo        正在根据 .gitignore 清理仓库...
echo ==========================================
echo.

:: 1. 这一步很关键：把所有文件从"上传列表"中移除 (不会删你本地文件)
echo 正在重新扫描文件...
git rm -r --cached . >nul 2>&1

:: 2. 重新添加 (这时候 Git 就会自动看见 .gitignore 并忽略那些垃圾文件了)
git add .

:: 3. 提交清理记录
echo 正在提交更改...
git commit -m "Cleanup: Remove ignored files (scripts, logs, etc.)"

:: 4. 推送到服务器
echo 正在同步到 GitHub...
git push origin main

echo.
echo ==========================================
echo ★ 清理完成！★
echo.
echo 请去 GitHub 网页刷新看看：
echo 所有的 .bat 脚本应该都消失了，只剩下 index.html 和 images 等有用文件。
echo.
echo (注意：你电脑本地的脚本还在，方便你以后使用)
echo ==========================================
pause