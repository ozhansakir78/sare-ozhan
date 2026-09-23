@echo off
title SinavKocu LGS - Sunucu Durdur
echo =========================================================
echo   SinavKocu LGS - Sunucu Durduruluyor
echo =========================================================
echo.

set FOUND=0

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    echo Port 3000 uzerindeki islem kapatiliyor - PID: %%a
    taskkill /f /pid %%a >nul 2>&1
    set FOUND=1
)

if "%FOUND%"=="1" (
    echo.
    echo [BASARILI] Sunucu durduruldu ve Port 3000 serbest birakildi.
) else (
    echo.
    echo Port 3000 uzerinde calisan aktif bir sunucu bulunamadi.
)

echo.
echo Bu pencere 2 saniye icinde kapanacaktir.
ping 127.0.0.1 -n 3 >nul
