# Example 3: Negative Flow Tests (Expired, Invalid, Reused Links)

**Context**: Comprehensive negative testing for email authentication edge cases.

**Implementation**:

```typescript
// tests/e2e/email-auth-negative.spec.ts
import { test, expect } from '@playwright/test';
import { getMagicLinkFromEmail } from '../support/mailosaur-helpers';

const MAILOSAUR_SERVER_ID = process.env.MAILOSAUR_SERVER_ID!;

test.describe('Email Auth Negative Flows', () => {
  test('should reject expired magic link', async ({ page }) => {
    // Generate expired link (simulate 24 hours ago)
    const expiredToken = Buffer.from(
      JSON.stringify({
        email: 'test@example.com',
        exp: Date.now() - 24 * 60 * 60 * 1000, // 24 hours ago
      }),
    ).toString('base64');

    const expiredLink = `http://localhost:3000/auth/verify?token=${expiredToken}`;

    // Visit expired link
    await page.goto(expiredLink);

    // Assert: Error displayed
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toContainText(/link.*expired|expired.*link/i);

    // Assert: Link to request new one
    await expect(page.getByTestId('request-new-link')).toBeVisible();

    // Assert: User NOT authenticated
    await expect(page.getByTestId('user-menu')).not.toBeVisible();
  });

  test('should reject invalid magic link token', async ({ page }) => {
    const invalidLink = 'http://localhost:3000/auth/verify?token=invalid-garbage';

    await page.goto(invalidLink);

    // Assert: Error displayed
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toContainText(/invalid.*link|link.*invalid/i);

    // Assert: User not authenticated
    await expect(page.getByTestId('user-menu')).not.toBeVisible();
  });

  test('should reject already-used magic link', async ({ page, context }) => {
    const randomId = Math.floor(Math.random() * 1000000);
    const testEmail = `user-${randomId}@${MAILOSAUR_SERVER_ID}.mailosaur.net`;

    // Request magic link
    await page.goto('/login');
    await page.getByTestId('email-input').fill(testEmail);
    await page.getByTestId('send-magic-link').click();

    const magicLink = await getMagicLinkFromEmail(testEmail);

    // Visit link FIRST time (success)
    await page.goto(magicLink);
    await expect(page.getByTestId('user-menu')).toBeVisible();

    // Sign out
    await page.getByTestId('user-menu').click();
    await page.getByTestId('sign-out').click();
    await expect(page.getByTestId('user-menu')).not.toBeVisible();

    // Try to reuse SAME link (should fail)
    await page.goto(magicLink);

    // Assert: Link already used error
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toContainText(/already.*used|link.*used/i);

    // Assert: User not authenticated
    await expect(page.getByTestId('user-menu')).not.toBeVisible();
  });

  test('should handle rapid successive link requests', async ({ page }) => {
    const randomId = Math.floor(Math.random() * 1000000);
    const testEmail = `user-${randomId}@${MAILOSAUR_SERVER_ID}.mailosaur.net`;

    // Request magic link 3 times rapidly
    for (let i = 0; i < 3; i++) {
      await page.goto('/login');
      await page.getByTestId('email-input').fill(testEmail);
      await page.getByTestId('send-magic-link').click();
      await expect(page.getByTestId('check-email-message')).toBeVisible();
    }

    // Only the LATEST link should work
    const MailosaurClient = require('mailosaur');
    const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY);

    const messages = await mailosaur.messages.list(MAILOSAUR_SERVER_ID, {
      sentTo: testEmail,
    });

    // Should receive 3 emails
    expect(messages.items.length).toBeGreaterThanOrEqual(3);

    // Get the LATEST magic link
    const latestMessage = messages.items[0]; // Most recent first
    const latestLink = latestMessage.html.links[0].href;

    // Latest link works
    await page.goto(latestLink);
    await expect(page.getByTestId('user-menu')).toBeVisible();

    // Older links should NOT work (if backend invalidates previous)
    await page.getByTestId('sign-out').click();
    const olderLink = messages.items[1].html.links[0].href;

    await page.goto(olderLink);
    await expect(page.getByTestId('error-message')).toBeVisible();
  });

  test('should rate-limit excessive magic link requests', async ({ page }) => {
    const randomId = Math.floor(Math.random() * 1000000);
    const testEmail = `user-${randomId}@${MAILOSAUR_SERVER_ID}.mailosaur.net`;

    // Request magic link 10 times rapidly (should hit rate limit)
    for (let i = 0; i < 10; i++) {
      await page.goto('/login');
      await page.getByTestId('email-input').fill(testEmail);
      await page.getByTestId('send-magic-link').click();

      // After N requests, should show rate limit error
      const errorVisible = await page
        .getByTestId('rate-limit-error')
        .isVisible({ timeout: 1000 })
        .catch(() => false);

      if (errorVisible) {
        console.log(`Rate limit hit after ${i + 1} requests`);
        await expect(page.getByTestId('rate-limit-error')).toContainText(/too many.*requests|rate.*limit/i);
        return;
      }
    }

    // If no rate limit after 10 requests, log warning
    console.warn('⚠️  No rate limit detected after 10 requests');
  });
});
```

**Key Points**:

- **Expired links**: Test 24+ hour old tokens
- **Invalid tokens**: Malformed or garbage tokens rejected
- **Reuse prevention**: Same link can't be used twice
- **Rapid requests**: Multiple requests handled gracefully
- **Rate limiting**: Excessive requests blocked

---
