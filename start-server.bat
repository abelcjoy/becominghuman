@echo off
echo ========================================
echo   Clarity For Humans - Local Server
echo ========================================
echo.
echo Starting local web server...
echo Open your browser to: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Try different server options
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using Python HTTP Server...
    python -m http.server 8000
    goto :end
)

where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using Node.js HTTP Server...
    echo Installing http-server if needed...
    call npx -y http-server -p 8000
    goto :end
)

echo ERROR: Neither Python nor Node.js found!
echo Please install one of them to run the local server.
echo.
echo Option 1: Install Python from https://www.python.org/
echo Option 2: Install Node.js from https://nodejs.org/
echo.
pause

:end
