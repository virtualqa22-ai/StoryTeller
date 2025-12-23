# Example 2: Pact Provider Verification (Backend validates contracts)

**Context**: Node.js/Express API verifying pacts published by consumers.

**Implementation**:

```typescript
// tests/contract/user-api.provider.spec.ts
import { Verifier, VerifierOptions } from '@pact-foundation/pact';
import { server } from '../../src/server'; // Your Express/Fastify app
import { seedDatabase, resetDatabase } from '../support/db-helpers';

/**
 * Provider Verification Test
 * - Provider (backend API) verifies against published pacts
 * - State handlers setup test data for each interaction
 * - Runs before merge to catch breaking changes
 */

describe('Pact Provider Verification', () => {
  let serverInstance;
  const PORT = 3001;

  beforeAll(async () => {
    // Start provider server
    serverInstance = server.listen(PORT);
    console.log(`Provider server running on port ${PORT}`);
  });

  afterAll(async () => {
    // Cleanup
    await serverInstance.close();
  });

  it('should verify pacts from all consumers', async () => {
    const opts: VerifierOptions = {
      // Provider details
      provider: 'user-api-service',
      providerBaseUrl: `http://localhost:${PORT}`,

      // Pact Broker configuration
      pactBrokerUrl: process.env.PACT_BROKER_URL,
      pactBrokerToken: process.env.PACT_BROKER_TOKEN,
      publishVerificationResult: process.env.CI === 'true',
      providerVersion: process.env.GIT_SHA || 'dev',

      // State handlers: Setup provider state for each interaction
      stateHandlers: {
        'user with id 1 exists': async () => {
          await seedDatabase({
            users: [
              {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                role: 'user',
                createdAt: '2025-01-15T10:00:00Z',
              },
            ],
          });
          return 'User seeded successfully';
        },

        'user with id 999 does not exist': async () => {
          // Ensure user doesn't exist
          await resetDatabase();
          return 'Database reset';
        },

        'no users exist': async () => {
          await resetDatabase();
          return 'Database empty';
        },
      },

      // Request filters: Add auth headers to all requests
      requestFilter: (req, res, next) => {
        // Mock authentication for verification
        req.headers['x-user-id'] = 'test-user';
        req.headers['authorization'] = 'Bearer valid-test-token';
        next();
      },

      // Timeout for verification
      timeout: 30000,
    };

    // Run verification
    await new Verifier(opts).verifyProvider();
  });
});
```

**CI integration**:

```yaml
# .github/workflows/pact-provider.yml
name: Pact Provider Verification
on:
  pull_request:
  push:
    branches: [main]

jobs:
  verify-contracts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'

      - name: Install dependencies
        run: npm ci

      - name: Start database
        run: docker-compose up -d postgres

      - name: Run migrations
        run: npm run db:migrate

      - name: Verify pacts
        run: npm run test:contract:provider
        env:
          PACT_BROKER_URL: ${{ secrets.PACT_BROKER_URL }}
          PACT_BROKER_TOKEN: ${{ secrets.PACT_BROKER_TOKEN }}
          GIT_SHA: ${{ github.sha }}
          CI: true

      - name: Can I Deploy?
        run: |
          npx pact-broker can-i-deploy \
            --pacticipant user-api-service \
            --version ${{ github.sha }} \
            --to-environment production
        env:
          PACT_BROKER_BASE_URL: ${{ secrets.PACT_BROKER_URL }}
          PACT_BROKER_TOKEN: ${{ secrets.PACT_BROKER_TOKEN }}
```

**Key Points**:

- **State handlers**: Setup provider data for each given() state
- **Request filters**: Add auth/headers for verification requests
- **CI publishing**: Verification results sent to broker
- **can-i-deploy**: Safety check before production deployment
- **Database isolation**: Reset between state handlers

---
