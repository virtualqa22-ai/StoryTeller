# Example 4: Caching Strategy with cypress-data-session / Playwright Projects

**Context**: Minimize email consumption by sharing authentication state across tests and specs.

**Implementation**:

```javascript
// cypress/support/commands/register-and-sign-in.js
import { dataSession } from 'cypress-data-session';

/**
 * Email Authentication Caching Strategy
 * - One email per test run (not per spec, not per test)
 * - First spec: Full registration flow (form → email → code → sign in)
 * - Subsequent specs: Only sign in (reuse user)
 * - Subsequent tests in same spec: Session already active (no sign in)
 */

// Helper: Fill registration form
function fillRegistrationForm({ fullName, userName, email, password }) {
  cy.intercept('POST', 'https://cognito-idp*').as('cognito');
  cy.contains('Register').click();
  cy.get('#reg-dialog-form').should('be.visible');
  cy.get('#first-name').type(fullName, { delay: 0 });
  cy.get('#last-name').type(lastName, { delay: 0 });
  cy.get('#email').type(email, { delay: 0 });
  cy.get('#username').type(userName, { delay: 0 });
  cy.get('#password').type(password, { delay: 0 });
  cy.contains('button', 'Create an account').click();
  cy.wait('@cognito').its('response.statusCode').should('equal', 200);
}

// Helper: Confirm registration with email code
function confirmRegistration(email) {
  return cy
    .mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVERID'), { sentTo: email })
    .its('html.codes.0.value') // Mailosaur auto-extracts codes!
    .then((code) => {
      cy.intercept('POST', 'https://cognito-idp*').as('cognito');
      cy.get('#verification-code').type(code, { delay: 0 });
      cy.contains('button', 'Confirm registration').click();
      cy.wait('@cognito');
      cy.contains('You are now registered!').should('be.visible');
      cy.contains('button', /ok/i).click();
      return cy.wrap(code); // Return code for reference
    });
}

// Helper: Full registration (form + email)
function register({ fullName, userName, email, password }) {
  fillRegistrationForm({ fullName, userName, email, password });
  return confirmRegistration(email);
}

// Helper: Sign in
function signIn({ userName, password }) {
  cy.intercept('POST', 'https://cognito-idp*').as('cognito');
  cy.contains('Sign in').click();
  cy.get('#sign-in-username').type(userName, { delay: 0 });
  cy.get('#sign-in-password').type(password, { delay: 0 });
  cy.contains('button', 'Sign in').click();
  cy.wait('@cognito');
  cy.contains('Sign out').should('be.visible');
}

/**
 * Register and sign in with email caching
 * ONE EMAIL PER MACHINE (cypress run or cypress open)
 */
Cypress.Commands.add('registerAndSignIn', ({ fullName, userName, email, password }) => {
  return dataSession({
    name: email, // Unique session per email

    // First time: Full registration (form → email → code)
    init: () => register({ fullName, userName, email, password }),

    // Subsequent specs: Just check email exists (code already used)
    setup: () => confirmRegistration(email),

    // Always runs after init/setup: Sign in
    recreate: () => signIn({ userName, password }),

    // Share across ALL specs (one email for entire test run)
    shareAcrossSpecs: true,
  });
});
```

**Usage across multiple specs**:

```javascript
// cypress/e2e/place-order.cy.ts
describe('Place Order', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.registerAndSignIn({
      fullName: Cypress.env('fullName'), // From cypress.config
      userName: Cypress.env('userName'),
      email: Cypress.env('email'), // SAME email across all specs
      password: Cypress.env('password'),
    });
  });

  it('should place order', () => {
    /* ... */
  });
  it('should view order history', () => {
    /* ... */
  });
});

// cypress/e2e/profile.cy.ts
describe('User Profile', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.registerAndSignIn({
      fullName: Cypress.env('fullName'),
      userName: Cypress.env('userName'),
      email: Cypress.env('email'), // SAME email - no new email sent!
      password: Cypress.env('password'),
    });
  });

  it('should update profile', () => {
    /* ... */
  });
});
```

**Playwright equivalent with storageState**:

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: /global-setup\.ts/,
    },
    {
      name: 'authenticated',
      testMatch: /.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        storageState: '.auth/user-session.json', // Reuse auth state
      },
    },
  ],
});
```

```typescript
// tests/global-setup.ts (runs once)
import { test as setup } from '@playwright/test';
import { getMagicLinkFromEmail } from './support/mailosaur-helpers';

const authFile = '.auth/user-session.json';

setup('authenticate via magic link', async ({ page }) => {
  const testEmail = process.env.TEST_USER_EMAIL!;

  // Request magic link
  await page.goto('/login');
  await page.getByTestId('email-input').fill(testEmail);
  await page.getByTestId('send-magic-link').click();

  // Get and visit magic link
  const magicLink = await getMagicLinkFromEmail(testEmail);
  await page.goto(magicLink);

  // Verify authenticated
  await expect(page.getByTestId('user-menu')).toBeVisible();

  // Save authenticated state (ONE TIME for all tests)
  await page.context().storageState({ path: authFile });

  console.log('✅ Authentication state saved to', authFile);
});
```

**Key Points**:

- **One email per run**: Global setup authenticates once
- **State reuse**: All tests use cached storageState
- **cypress-data-session**: Intelligently manages cache lifecycle
- **shareAcrossSpecs**: Session shared across all spec files
- **Massive savings**: 500 tests = 1 email (not 500!)

---
