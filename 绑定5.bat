@echo off
chcp 65001 >nul
echo ==========================================
echo      正在绑定: langking1982/aizwj
echo ==========================================
echo.

:: 1. 清理可能存在的错误连接
git remote remove origin 2>nul

:: 2. 直接使用你的仓库地址 (硬编码，确保不出错)
echo 正在连接...
git remote add origin https://github.com/langking1982/aizwj.git

:: 3. 确保分支正确
git branch -M main

:: 4. 强制上传
echo 正在上传文件，请稍候...
git push -u origin main --force

echo.
echo ==========================================
echo 如果上面显示 "Writing objects: 100%"
echo 那就是彻底成功了！
echo ==========================================
pause