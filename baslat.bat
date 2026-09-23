@echo off
title SinavKocu.ai - LGS Gelistirme Sunucusu

echo =========================================================
echo   SinavKocu.ai - LGS Hazirlik Platformu Baslatiliyor
echo =========================================================
echo.
echo [1/2] Tarayiciniz aciliyor: http://localhost:3000
echo [2/2] Next.js gelistirme sunucusu baslatiliyor...
echo.
echo Sunucuyu durdurmak icin bu pencereyi kapatabilir veya
echo durdur.bat dosyasini calistirabilirsiniz.
echo ---------------------------------------------------------
echo.

start http://localhost:3000
call npm.cmd run dev
