$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$logDir = Join-Path $root "logs"
if (-not (Test-Path $logDir)) {
  New-Item -ItemType Directory -Path $logDir | Out-Null
}

$logPath = Join-Path $logDir "dev-3005.log"
"[$(Get-Date -Format s)] Starting dev server from $root" | Out-File -FilePath $logPath -Encoding utf8

& npm.cmd run dev -- --host 127.0.0.1 *>> $logPath
