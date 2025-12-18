@echo off
echo Starting StoryTeller Auto-Commit Watcher...
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0auto-commit.ps1"
pause
