# Example 3: Explicit Assertions in Tests

**Context**: When validating test results, keep assertions visible in test bodies. Never hide assertions in helper functions - this obscures test intent and makes failures harder to diagnose.

**Implementation**:

```typescript
// ❌ BAD: Assertions hidden in helper functions
// helpers/api-validators.ts
export async function validateUserCreation(response: Response, expectedEmail: string) {
  const user = await response.json();
  expect(response.status()).toBe(201);
  expect(user.email).toBe(expectedEmail);
  expect(user.id).toBeTruthy();
  expect(user.createdAt).toBeTruthy();
  // Hidden assertions - not visible in test
}

test('create user via API - OPAQUE', async ({ request }) => {
  const userData = createUser({ email: 'test@example.com' });

  const response = await request.post('/api/users', { data: userData });

  // What assertions are running? Have to check helper.
  await validateUserCreation(response, userData.email);
  // When this fails, error is: "validateUserCreation failed" - NOT helpful
});

// ✅ GOOD: Assertions explicit in test
test('create user via API', async ({ request }) => {
  const userData = createUser({ email: 'test@example.com' });

  const response = await request.post('/api/users', { data: userData });

  // All assertions visible - clear test intent
  expect(response.status()).toBe(201);

  const createdUser = await response.json();
  expect(createdUser.id).toBeTruthy();
  expect(createdUser.email).toBe(userData.email);
  expect(createdUser.name).toBe(userData.name);
  expect(createdUser.role).toBe('user');
  expect(createdUser.createdAt).toBeTruthy();
  expect(createdUser.isActive).toBe(true);

  // When this fails, error is: "Expected role to be 'user', got 'admin'" - HELPFUL
});

// ✅ ACCEPTABLE: Helper for data extraction, NOT assertions
// helpers/api-extractors.ts
export async function extractUserFromResponse(response: Response): Promise<User> {
  const user = await response.json();
  return user; // Just extracts, no assertions
}

test('create user with extraction helper', async ({ request }) => {
  const userData = createUser({ email: 'test@example.com' });

  const response = await request.post('/api/users', { data: userData });

  // Extract data with helper (OK)
  const createdUser = await extractUserFromResponse(response);

  // But keep assertions in test (REQUIRED)
  expect(response.status()).toBe(201);
  expect(createdUser.email).toBe(userData.email);
  expect(createdUser.role).toBe('user');
});

// Cypress equivalent
describe('User API', () => {
  it('should create user with explicit assertions', () => {
    const userData = createUser({ email: 'test@example.com' });

    cy.request('POST', '/api/users', userData).then((response) => {
      // All assertions visible in test
      expect(response.status).to.equal(201);
      expect(response.body.id).to.exist;
      expect(response.body.email).to.equal(userData.email);
      expect(response.body.name).to.equal(userData.name);
      expect(response.body.role).to.equal('user');
      expect(response.body.createdAt).to.exist;
      expect(response.body.isActive).to.be.true;
    });
  });
});

// ✅ GOOD: Parametrized tests for soft assertions (bulk validation)
test.describe('User creation validation', () => {
  const testCases = [
    { field: 'email', value: 'test@example.com', expected: 'test@example.com' },
    { field: 'name', value: 'Test User', expected: 'Test User' },
    { field: 'role', value: 'admin', expected: 'admin' },
    { field: 'isActive', value: true, expected: true },
  ];

  for (const { field, value, expected } of testCases) {
    test(`should set ${field} correctly`, async ({ request }) => {
      const userData = createUser({ [field]: value });

      const response = await request.post('/api/users', { data: userData });
      const user = await response.json();

      // Parametrized assertion - still explicit
      expect(user[field]).toBe(expected);
    });
  }
});
```

**Key Points**:

- Never hide `expect()` calls in helper functions
- Helpers can extract/transform data, but assertions stay in tests
- Parametrized tests are acceptable for bulk validation (still explicit)
- Explicit assertions make failures actionable: "Expected X, got Y"
- Hidden assertions produce vague failures: "Helper function failed"
