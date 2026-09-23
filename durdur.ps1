Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "  SınavKoçu.ai - Sunucu Durduruluyor...                  " -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""

$connections = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue

if ($connections) {
    foreach ($conn in $connections) {
        $procId = $conn.OwningProcess
        Write-Host "Port 3000 üzerindeki işlem kapatılıyor (PID: $procId)..." -ForegroundColor Yellow
        Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
    }
    Write-Host ""
    Write-Host "[BAŞARILI] Sunucu durduruldu ve port 3000 serbest bırakıldı." -ForegroundColor Green
} else {
    Write-Host "Port 3000 üzerinde çalışan aktif sunucu bulunamadı." -ForegroundColor Gray
}
