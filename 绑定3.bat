@echo off
chcp 65001 >nul
echo ==========================================
echo        正在修复身份认证并上传
echo ==========================================
echo.

:: 1. 配置身份信息 (这一步是解决报错的关键)
:: 为了方便，这里帮你设置默认信息，你也可以手动改
git config --global user.email "user@ai-toy.com"
git config --global user.name "AI-Creator"

echo 身份信息已配置 (使用默认虚拟身份)...
echo.

:: 2. 重新提交文件 (因为上次失败了，所以要重做)
echo 正在创建提交记录...
git add .
git commit -m "Fix identity and first commit"

:: 3. 确保分支正确
git branch -M main

:: 4. 再次尝试推送到 GitHub
echo.
echo 正在上传到服务器...
git push -u origin main

echo.
echo ==========================================
echo            修复完成！
echo ==========================================
echo 请去 GitHub 页面刷新，查看文件是否已上传。
echo 以后修改网页，直接用之前的“更新网站.bat”即可。
pause