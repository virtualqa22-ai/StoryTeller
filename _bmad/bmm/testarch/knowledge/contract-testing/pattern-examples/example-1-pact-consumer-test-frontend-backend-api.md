# Example 1: Pact Consumer Test (Frontend → Backend API)

**Context**: React application consuming a user management API, defining expected interactions.

**Implementation**:

```typescript
// tests/contract/user-api.pact.spec.ts
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { getUserById, createUser, User } from '@/api/user-service';

const { like, eachLike, string, integer } = MatchersV3;

/**
 * Consumer-Driven Contract Test
 * - Consumer (React app) defines expected API behavior
 * - Generates pact file for provider to verify
 * - Runs in isolation (no real backend required)
 */

const provider = new PactV3({
  consumer: 'user-management-web',
  provider: 'user-api-service',
  dir: './pacts', // Output directory for pact files
  logLevel: 'warn',
});

describe('User API Contract', () => {
  describe('GET /users/:id', () => {
    it('should return user when user exists', async () => {
      // Arrange: Define expected interaction
      await provider
        .given('user with id 1 exists') // Provider state
        .uponReceiving('a request for user 1')
        .withRequest({
          method: 'GET',
          path: '/users/1',
          headers: {
            Accept: 'application/json',
            Authorization: like('Bearer token123'), // Matcher: any string
          },
        })
        .willRespondWith({
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: like({
            id: integer(1),
            name: string('John Doe'),
            email: string('john@example.com'),
            role: string('user'),
            createdAt: string('2025-01-15T10:00:00Z'),
          }),
        })
        .executeTest(async (mockServer) => {
          // Act: Call consumer code against mock server
          const user = await getUserById(1, {
            baseURL: mockServer.url,
            headers: { Authorization: 'Bearer token123' },
          });

          // Assert: Validate consumer behavior
          expect(user).toEqual(
            expect.objectContaining({
              id: 1,
              name: 'John Doe',
              email: 'john@example.com',
              role: 'user',
            }),
          );
        });
    });

    it('should handle 404 when user does not exist', async () => {
      await provider
        .given('user with id 999 does not exist')
        .uponReceiving('a request for non-existent user')
        .withRequest({
          method: 'GET',
          path: '/users/999',
          headers: { Accept: 'application/json' },
        })
        .willRespondWith({
          status: 404,
          headers: { 'Content-Type': 'application/json' },
          body: {
            error: 'User not found',
            code: 'USER_NOT_FOUND',
          },
        })
        .executeTest(async (mockServer) => {
          // Act & Assert: Consumer handles 404 gracefully
          await expect(getUserById(999, { baseURL: mockServer.url })).rejects.toThrow('User not found');
        });
    });
  });

  describe('POST /users', () => {
    it('should create user and return 201', async () => {
      const newUser: Omit<User, 'id' | 'createdAt'> = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'admin',
      };

      await provider
        .given('no users exist')
        .uponReceiving('a request to create a user')
        .withRequest({
          method: 'POST',
          path: '/users',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: like(newUser),
        })
        .willRespondWith({
          status: 201,
          headers: { 'Content-Type': 'application/json' },
          body: like({
            id: integer(2),
            name: string('Jane Smith'),
            email: string('jane@example.com'),
            role: string('admin'),
            createdAt: string('2025-01-15T11:00:00Z'),
          }),
        })
        .executeTest(async (mockServer) => {
          const createdUser = await createUser(newUser, {
            baseURL: mockServer.url,
          });

          expect(createdUser).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              name: 'Jane Smith',
              email: 'jane@example.com',
              role: 'admin',
            }),
          );
        });
    });
  });
});
```

**package.json scripts**:

```json
{
  "scripts": {
    "test:contract": "jest tests/contract --testTimeout=30000",
    "pact:publish": "pact-broker publish ./pacts --consumer-app-version=$GIT_SHA --broker-base-url=$PACT_BROKER_URL --broker-token=$PACT_BROKER_TOKEN"
  }
}
```

**Key Points**:

- **Consumer-driven**: Frontend defines expectations, not backend
- **Matchers**: `like`, `string`, `integer` for flexible matching
- **Provider states**: given() sets up test preconditions
- **Isolation**: No real backend needed, runs fast
- **Pact generation**: Automatically creates JSON pact files

---
