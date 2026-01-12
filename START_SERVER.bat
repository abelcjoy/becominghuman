@echo off
echo ========================================
echo   CLARITY SOVEREIGN - LOCAL SERVER
echo ========================================
echo.
echo Starting server on http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
echo Opening browser in 3 seconds...
echo.

timeout /t 3 /nobreak >nul
start http://localhost:8000

php -S localhost:8000
