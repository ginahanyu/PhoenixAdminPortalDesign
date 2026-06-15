@echo off
setlocal

cd /d "%~dp0"
set "APP_URL=http://127.0.0.1:3005/"

start "Phoenix Admin Portal Dev Server" powershell.exe -NoExit -ExecutionPolicy Bypass -File "%~dp0scripts\start-dev-3001.ps1"

echo Waiting for dev server at %APP_URL%
set /a retries=0

:wait_for_server
powershell.exe -NoLogo -NoProfile -Command "try { $response = Invoke-WebRequest -Uri '%APP_URL%' -UseBasicParsing -TimeoutSec 1; if ($response.StatusCode -ge 200) { exit 0 } else { exit 1 } } catch { exit 1 }"
if %errorlevel%==0 goto open_browser

set /a retries+=1
if %retries% geq 30 goto timeout

ping 127.0.0.1 -n 2 >nul
goto wait_for_server

:open_browser
start "" "%APP_URL%"
exit /b 0

:timeout
echo Dev server did not become ready within 30 seconds.
exit /b 1
