import { test, expect, _electron as electron } from '@playwright/test';
import * as path from 'path';

// Cross-platform binary path helper
function getTauriBinaryPath(): string {
  const binaryName = process.platform === 'win32'
    ? 'storyteller.exe'
    : 'storyteller';
  return path.join('src-tauri', 'target', 'debug', binaryName);
}

let app;
let page;

test.beforeEach(async () => {
  // Launch Tauri app via Electron with cross-platform path
  const binaryPath = getTauriBinaryPath();
  app = await electron.launch({
    executablePath: binaryPath
  });
  page = await app.firstWindow();
});

test.afterEach(async () => {
  await app.close();
});

test('app launches and displays home screen', async () => {
  await expect(page.locator('text=Welcome to StoryTeller')).toBeVisible();
});

test('primary buttons are clickable', async () => {
  await page.click('button:has-text("Create New Project")');
  await expect(page.locator('text=Project wizard coming soon')).toBeVisible();
});
