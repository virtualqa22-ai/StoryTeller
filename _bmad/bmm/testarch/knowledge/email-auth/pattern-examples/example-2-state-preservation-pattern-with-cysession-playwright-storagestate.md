# Example 2: State Preservation Pattern with cy.session / Playwright storageState

**Context**: Cache authenticated session to avoid requesting magic link on every test.

**Implementation**:

```typescript
// playwright/fixtures/email-auth-fixture.ts
import { test as base } from '@playwright/test';
import { getMagicLinkFromEmail } from '../support/mailosaur-helpers';

type EmailAuthFixture = {
  authenticatedUser: { email: string; token: string };
};

export const test = base.extend<EmailAuthFixture>({
  authenticatedUser: async ({ page, context }, use) => {
    const randomId = Math.floor(Math.random() * 1000000);
    const testEmail = `user-${randomId}@${process.env.MAILOSAUR_SERVER_ID}.mailosaur.net`;

    // Check if we have cached auth state for this email
    const storageStatePath = `./test-results/auth-state-${testEmail}.json`;

    try {
      // Try to reuse existing session
      await context.storageState({ path: storageStatePath });
      await page.goto('/dashboard');

      // Validate session is still valid
      const isAuthenticated = await page.getByTestId('user-menu').isVisible({ timeout: 2000 });

      if (isAuthenticated) {
        console.log(`✅ Reusing cached session for ${testEmail}`);
        await use({ email: testEmail, token: 'cached' });
        return;
      }
    } catch (error) {
      console.log(`📧 No cached session, requesting magic link for ${testEmail}`);
    }

    // Request new magic link
    await page.goto('/login');
    await page.getByTestId('email-input').fill(testEmail);
    await page.getByTestId('send-magic-link').click();

    // Get magic link from email
    const magicLink = await getMagicLinkFromEmail(testEmail);

    // Visit link and authenticate
    await page.goto(magicLink);
    await expect(page.getByTestId('user-menu')).toBeVisible();

    // Extract auth token from localStorage
    const authToken = await page.evaluate(() => localStorage.getItem('authToken'));

    // Save session state for reuse
    await context.storageState({ path: storageStatePath });

    console.log(`💾 Cached session for ${testEmail}`);

    await use({ email: testEmail, token: authToken || '' });
  },
});
```

**Cypress equivalent with cy.session + data-session**:

```javascript
// cypress/support/commands/email-auth.js
import { dataSession } from 'cypress-data-session';

/**
 * Authenticate via magic link with session caching
 * - First run: Requests email, extracts link, authenticates
 * - Subsequent runs: Reuses cached session (no email)
 */
Cypress.Commands.add('authViaMagicLink', (email) => {
  return dataSession({
    name: `magic-link-${email}`,

    // First-time setup: Request and process magic link
    setup: () => {
      cy.visit('/login');
      cy.get('[data-cy="email-input"]').type(email);
      cy.get('[data-cy="send-magic-link"]').click();

      // Get magic link from Mailosaur
      cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVERID'), {
        sentTo: email,
      })
        .its('html.links.0.href')
        .should('exist')
        .then((magicLink) => {
          cy.visit(magicLink);
        });

      // Wait for authentication
      cy.get('[data-cy="user-menu"]', { timeout: 10000 }).should('be.visible');

      // Preserve authentication state
      return cy.getAllLocalStorage().then((storage) => {
        return { storage, email };
      });
    },

    // Validate cached session is still valid
    validate: (cached) => {
      return cy.wrap(Boolean(cached?.storage));
    },

    // Recreate session from cache (no email needed)
    recreate: (cached) => {
      // Restore localStorage
      cy.setLocalStorage(cached.storage);
      cy.visit('/dashboard');
      cy.get('[data-cy="user-menu"]', { timeout: 5000 }).should('be.visible');
    },

    shareAcrossSpecs: true, // Share session across all tests
  });
});
```

**Usage in tests**:

```javascript
// cypress/e2e/dashboard.cy.ts
describe('Dashboard', () => {
  const serverId = Cypress.env('MAILOSAUR_SERVERID');
  const testEmail = `test-user@${serverId}.mailosaur.net`;

  beforeEach(() => {
    // First test: Requests magic link
    // Subsequent tests: Reuses cached session (no email!)
    cy.authViaMagicLink(testEmail);
  });

  it('should display user dashboard', () => {
    cy.get('[data-cy="dashboard-content"]').should('be.visible');
  });

  it('should show user profile', () => {
    cy.get('[data-cy="user-email"]').should('contain', testEmail);
  });

  // Both tests share same session - only 1 email consumed!
});
```

**Key Points**:

- **Session caching**: First test requests email, rest reuse session
- **State preservation**: localStorage/cookies saved and restored
- **Validation**: Check cached session is still valid
- **Quota optimization**: Massive reduction in email consumption
- **Fast tests**: Cached auth takes seconds vs. minutes

---
