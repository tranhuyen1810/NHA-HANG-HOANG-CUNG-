# Script tự động lưu lên GitHub
# Cách sử dụng: Chạy script này bất cứ khi nào muốn lưu thay đổi

$currentDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Auto save: $currentDate"

Write-Host "🔄 Đang kiểm tra thay đổi..." -ForegroundColor Cyan

# Kiểm tra xem có thay đổi không
$status = git status --porcelain

if ($status) {
    Write-Host "📝 Tìm thấy thay đổi, đang lưu..." -ForegroundColor Yellow
    
    # Add tất cả file
    git add .
    
    # Commit với message tự động
    git commit -m $commitMessage
    
    # Push lên GitHub
    git push origin main
    
    Write-Host "✅ Đã lưu thành công lên GitHub!" -ForegroundColor Green
    Write-Host "📅 Thời gian: $currentDate" -ForegroundColor Gray
} else {
    Write-Host "✓ Không có thay đổi mới" -ForegroundColor Green
}

Write-Host "`n✨ Hoàn tất!" -ForegroundColor Cyan
