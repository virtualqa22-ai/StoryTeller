# Example 1: Magic Link Extraction with Mailosaur

**Context**: Passwordless login flow where user receives magic link via email, clicks it, and is authenticated.

**Implementation**:

```typescript
// tests/e2e/magic-link-auth.spec.ts
import { test, expect } from '@playwright/test';

/**
 * Magic Link Authentication Flow
 * 1. User enters email
 * 2. Backend sends magic link
 * 3. Test retrieves email via Mailosaur
 * 4. Extract and visit magic link
 * 5. Verify user is authenticated
 */

// Mailosaur configuration
const MAILOSAUR_API_KEY = process.env.MAILOSAUR_API_KEY!;
const MAILOSAUR_SERVER_ID = process.env.MAILOSAUR_SERVER_ID!;

/**
 * Extract href from HTML email body
 * DOMParser provides XML/HTML parsing in Node.js
 */
function extractMagicLink(htmlString: string): string | null {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM(htmlString);
  const link = dom.window.document.querySelector('#magic-link-button');
  return link ? (link as HTMLAnchorElement).href : null;
}

/**
 * Alternative: Use Mailosaur's built-in link extraction
 * Mailosaur automatically parses links - no regex needed!
 */
async function getMagicLinkFromEmail(email: string): Promise<string> {
  const MailosaurClient = require('mailosaur');
  const mailosaur = new MailosaurClient(MAILOSAUR_API_KEY);

  // Wait for email (timeout: 30 seconds)
  const message = await mailosaur.messages.get(
    MAILOSAUR_SERVER_ID,
    {
      sentTo: email,
    },
    {
      timeout: 30000, // 30 seconds
    },
  );

  // Mailosaur extracts links automatically - no parsing needed!
  const magicLink = message.html?.links?.[0]?.href;

  if (!magicLink) {
    throw new Error(`Magic link not found in email to ${email}`);
  }

  console.log(`📧 Email received. Magic link extracted: ${magicLink}`);
  return magicLink;
}

test.describe('Magic Link Authentication', () => {
  test('should authenticate user via magic link', async ({ page, context }) => {
    // Arrange: Generate unique test email
    const randomId = Math.floor(Math.random() * 1000000);
    const testEmail = `user-${randomId}@${MAILOSAUR_SERVER_ID}.mailosaur.net`;

    // Act: Request magic link
    await page.goto('/login');
    await page.getByTestId('email-input').fill(testEmail);
    await page.getByTestId('send-magic-link').click();

    // Assert: Success message
    await expect(page.getByTestId('check-email-message')).toBeVisible();
    await expect(page.getByTestId('check-email-message')).toContainText('Check your email');

    // Retrieve magic link from email
    const magicLink = await getMagicLinkFromEmail(testEmail);

    // Visit magic link
    await page.goto(magicLink);

    // Assert: User is authenticated
    await expect(page.getByTestId('user-menu')).toBeVisible();
    await expect(page.getByTestId('user-email')).toContainText(testEmail);

    // Verify session storage preserved
    const localStorage = await page.evaluate(() => JSON.stringify(window.localStorage));
    expect(localStorage).toContain('authToken');
  });

  test('should handle expired magic link', async ({ page }) => {
    // Use pre-expired link (older than 15 minutes)
    const expiredLink = 'http://localhost:3000/auth/verify?token=expired-token-123';

    await page.goto(expiredLink);

    // Assert: Error message displayed
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toContainText('link has expired');

    // Assert: User NOT authenticated
    await expect(page.getByTestId('user-menu')).not.toBeVisible();
  });

  test('should prevent reusing magic link', async ({ page }) => {
    const randomId = Math.floor(Math.random() * 1000000);
    const testEmail = `user-${randomId}@${MAILOSAUR_SERVER_ID}.mailosaur.net`;

    // Request magic link
    await page.goto('/login');
    await page.getByTestId('email-input').fill(testEmail);
    await page.getByTestId('send-magic-link').click();

    const magicLink = await getMagicLinkFromEmail(testEmail);

    // Visit link first time (success)
    await page.goto(magicLink);
    await expect(page.getByTestId('user-menu')).toBeVisible();

    // Sign out
    await page.getByTestId('sign-out').click();

    // Try to reuse same link (should fail)
    await page.goto(magicLink);
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toContainText('link has already been used');
  });
});
```

**Cypress equivalent with Mailosaur plugin**:

```javascript
// cypress/e2e/magic-link-auth.cy.ts
describe('Magic Link Authentication', () => {
  it('should authenticate user via magic link', () => {
    const serverId = Cypress.env('MAILOSAUR_SERVERID');
    const randomId = Cypress._.random(1e6);
    const testEmail = `user-${randomId}@${serverId}.mailosaur.net`;

    // Request magic link
    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type(testEmail);
    cy.get('[data-cy="send-magic-link"]').click();
    cy.get('[data-cy="check-email-message"]').should('be.visible');

    // Retrieve and visit magic link
    cy.mailosaurGetMessage(serverId, { sentTo: testEmail })
      .its('html.links.0.href') // Mailosaur extracts links automatically!
      .should('exist')
      .then((magicLink) => {
        cy.log(`Magic link: ${magicLink}`);
        cy.visit(magicLink);
      });

    // Verify authenticated
    cy.get('[data-cy="user-menu"]').should('be.visible');
    cy.get('[data-cy="user-email"]').should('contain', testEmail);
  });
});
```

**Key Points**:

- **Mailosaur auto-extraction**: `html.links[0].href` or `html.codes[0].value`
- **Unique emails**: Random ID prevents collisions
- **Negative testing**: Expired and reused links tested
- **State verification**: localStorage/session checked
- **Fast email retrieval**: 30 second timeout typical

---
