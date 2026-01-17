@echo off
echo ==========================================
echo 正在准备更新网页...
echo ==========================================

:: 1. 添加所有修改的文件
git add .

:: 2. 提交修改记录
git commit -m "Auto Update: %date% %time%"

:: 3. 推送到 GitHub
echo 正在上传到服务器，请稍候...
git push origin main

echo ==========================================
echo 更新成功！
echo GitHub Pages 会有 1-2 分钟的延迟，请稍后刷新网页。
echo ==========================================
pause