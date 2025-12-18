# Auto-Commit Setup for StoryTeller

This project includes an automatic commit feature that watches for file changes and commits them to Git automatically.

## How It Works

The auto-commit watcher:
- Monitors the project directory for file changes every 30 seconds
- Automatically stages all changes (`git add .`)
- Creates a commit with a timestamp
- Pushes changes to GitHub automatically

## Usage

### Option 1: Using the Batch File (Recommended)
Simply double-click `start-auto-commit.bat` to start the watcher.

### Option 2: Using PowerShell
1. Open PowerShell in the project directory
2. Run: `.\auto-commit.ps1`

### Option 3: Run in Background
To run the watcher in the background:
```powershell
Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass -File auto-commit.ps1" -WindowStyle Hidden
```

## Stopping the Watcher

Press `Ctrl+C` in the terminal where the watcher is running.

## Configuration

You can modify the check interval in `auto-commit.ps1`:
```powershell
Start-Sleep -Seconds 30  # Change this number to adjust frequency
```

## Notes

- The watcher will only commit if there are actual changes
- Each commit includes a timestamp: "Auto-commit: YYYY-MM-DD HH:mm:ss"
- Changes are automatically pushed to the remote repository
- Make sure you're authenticated with GitHub (already done via `gh auth`)

## Alternative: Manual Commit

If you prefer manual control, you can still use standard git commands:
```bash
git add .
git commit -m "Your message"
git push
```

## Troubleshooting

**If PowerShell blocks the script:**
Run this command in PowerShell as Administrator:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**If push fails:**
Make sure you're authenticated with GitHub:
```bash
"C:\Program Files\GitHub CLI\gh.exe" auth status
```
