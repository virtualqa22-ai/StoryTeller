# Auto-commit script for StoryTeller project
# This script watches for file changes and automatically commits them

$projectPath = $PSScriptRoot
$lastCommitTime = Get-Date

Write-Host "Auto-commit watcher started for StoryTeller project" -ForegroundColor Green
Write-Host "Monitoring: $projectPath" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

while ($true) {
    Start-Sleep -Seconds 30  # Check every 30 seconds

    # Change to project directory
    Set-Location $projectPath

    # Check for changes
    $status = git status --porcelain 2>&1

    if ($status -and $status.Length -gt 0) {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Changes detected..." -ForegroundColor Yellow

        # Stage all changes
        git add .

        # Create commit with timestamp
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $commitMessage = "Auto-commit: $timestamp"

        git commit -m $commitMessage 2>&1 | Out-Null

        if ($LASTEXITCODE -eq 0) {
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ✓ Changes committed successfully" -ForegroundColor Green

            # Push to remote
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Pushing to remote..." -ForegroundColor Cyan
            git push origin master 2>&1 | Out-Null

            if ($LASTEXITCODE -eq 0) {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ✓ Pushed to GitHub" -ForegroundColor Green
            } else {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ✗ Push failed" -ForegroundColor Red
            }
        }

        Write-Host ""
    }
}
