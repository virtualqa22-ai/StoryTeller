# Auto-commit script for StoryTeller project
# This script watches for file changes and automatically commits them

$projectPath = $PSScriptRoot

Write-Host "Auto-commit watcher started for StoryTeller project" -ForegroundColor Green
Write-Host "Monitoring: $projectPath" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

while ($true) {
    Start-Sleep -Seconds 30

    Set-Location $projectPath

    $status = git status --porcelain 2>$null

    if ($status) {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Changes detected..." -ForegroundColor Yellow

        git add . 2>$null

        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $commitMessage = "Auto-commit: $timestamp"

        $commitResult = git commit -m $commitMessage 2>&1

        if ($LASTEXITCODE -eq 0) {
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Committed successfully" -ForegroundColor Green

            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Pushing to remote..." -ForegroundColor Cyan
            $pushResult = git push origin master 2>&1

            if ($LASTEXITCODE -eq 0) {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Pushed to GitHub" -ForegroundColor Green
            } else {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Push failed" -ForegroundColor Red
            }
        }

        Write-Host ""
    }
}
