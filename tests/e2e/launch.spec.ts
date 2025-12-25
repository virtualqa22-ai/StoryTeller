import { test, expect, _electron as electron } from '@playwright/test';
import type { Page, ElectronApplication } from '@playwright/test';
import * as path from 'path';

// Cross-platform binary path helper
function getTauriBinaryPath(): string {
    const binaryName = process.platform === 'win32'
        ? 'storyteller.exe'
        : 'storyteller';
    return path.join('src-tauri', 'target', 'debug', binaryName);
}

let app: ElectronApplication;
let page: Page;

test.beforeEach(async () => {
    // Launch Tauri app via Electron with cross-platform path
    app = await electron.launch({
        args: [getTauriBinaryPath()]
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
    const createButton = page.locator('button:has-text("Create New Project")');
    await expect(createButton).toBeVisible();
    await createButton.click();

    // Verify placeholder message appears (from Story 1.2 implementation)
    await expect(page.locator('text=Project wizard coming soon')).toBeVisible();
});
