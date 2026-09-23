Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  SınavKoçu.ai - LGS Hazırlık Platformu Başlatılıyor...  " -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tarayıcınız açılıyor: http://localhost:3000" -ForegroundColor Yellow

Start-Process "http://localhost:3000"
npm.cmd run dev
