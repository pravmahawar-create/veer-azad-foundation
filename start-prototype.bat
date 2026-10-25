@echo off
echo ========================================================
echo   VEER AZAD CHARITABLE FOUNDATION - LOCAL PROTOTYPE
echo ========================================================
echo Starting preview server at http://localhost:5173 ...
cd /d "%~dp0"
call npm run preview -- --port 5173 --host
pause
