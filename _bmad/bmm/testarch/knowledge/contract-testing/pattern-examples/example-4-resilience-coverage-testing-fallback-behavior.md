# Example 4: Resilience Coverage (Testing Fallback Behavior)

**Context**: Capture timeout, retry, and error handling behavior explicitly in contracts.

**Implementation**:

```typescript
// tests/contract/user-api-resilience.pact.spec.ts
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { getUserById, ApiError } from '@/api/user-service';

const { like, string } = MatchersV3;

const provider = new PactV3({
  consumer: 'user-management-web',
  provider: 'user-api-service',
  dir: './pacts',
});

describe('User API Resilience Contract', () => {
  /**
   * Test 500 error handling
   * Verifies consumer handles server errors gracefully
   */
  it('should handle 500 errors with retry logic', async () => {
    await provider
      .given('server is experiencing errors')
      .uponReceiving('a request that returns 500')
      .withRequest({
        method: 'GET',
        path: '/users/1',
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: {
          error: 'Internal server error',
          code: 'INTERNAL_ERROR',
          retryable: true,
        },
      })
      .executeTest(async (mockServer) => {
        // Consumer should retry on 500
        try {
          await getUserById(1, {
            baseURL: mockServer.url,
            retries: 3,
            retryDelay: 100,
          });
          fail('Should have thrown error after retries');
        } catch (error) {
          expect(error).toBeInstanceOf(ApiError);
          expect((error as ApiError).code).toBe('INTERNAL_ERROR');
          expect((error as ApiError).retryable).toBe(true);
        }
      });
  });

  /**
   * Test 429 rate limiting
   * Verifies consumer respects rate limits
   */
  it('should handle 429 rate limit with backoff', async () => {
    await provider
      .given('rate limit exceeded for user')
      .uponReceiving('a request that is rate limited')
      .withRequest({
        method: 'GET',
        path: '/users/1',
      })
      .willRespondWith({
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60', // Retry after 60 seconds
        },
        body: {
          error: 'Too many requests',
          code: 'RATE_LIMIT_EXCEEDED',
        },
      })
      .executeTest(async (mockServer) => {
        try {
          await getUserById(1, {
            baseURL: mockServer.url,
            respectRateLimit: true,
          });
          fail('Should have thrown rate limit error');
        } catch (error) {
          expect(error).toBeInstanceOf(ApiError);
          expect((error as ApiError).code).toBe('RATE_LIMIT_EXCEEDED');
          expect((error as ApiError).retryAfter).toBe(60);
        }
      });
  });

  /**
   * Test timeout handling
   * Verifies consumer has appropriate timeout configuration
   */
  it('should timeout after 10 seconds', async () => {
    await provider
      .given('server is slow to respond')
      .uponReceiving('a request that times out')
      .withRequest({
        method: 'GET',
        path: '/users/1',
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: like({ id: 1, name: 'John' }),
      })
      .withDelay(15000) // Simulate 15 second delay
      .executeTest(async (mockServer) => {
        try {
          await getUserById(1, {
            baseURL: mockServer.url,
            timeout: 10000, // 10 second timeout
          });
          fail('Should have timed out');
        } catch (error) {
          expect(error).toBeInstanceOf(ApiError);
          expect((error as ApiError).code).toBe('TIMEOUT');
        }
      });
  });

  /**
   * Test partial response (optional fields)
   * Verifies consumer handles missing optional data
   */
  it('should handle response with missing optional fields', async () => {
    await provider
      .given('user exists with minimal data')
      .uponReceiving('a request for user with partial data')
      .withRequest({
        method: 'GET',
        path: '/users/1',
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: integer(1),
          name: string('John Doe'),
          email: string('john@example.com'),
          // role, createdAt, etc. omitted (optional fields)
        },
      })
      .executeTest(async (mockServer) => {
        const user = await getUserById(1, { baseURL: mockServer.url });

        // Consumer handles missing optional fields gracefully
        expect(user.id).toBe(1);
        expect(user.name).toBe('John Doe');
        expect(user.role).toBeUndefined(); // Optional field
        expect(user.createdAt).toBeUndefined(); // Optional field
      });
  });
});
```

**API client with retry logic**:

```typescript
// src/api/user-service.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public retryable: boolean = false,
    public retryAfter?: number,
  ) {
    super(message);
  }
}

/**
 * User API client with retry and error handling
 */
export async function getUserById(
  id: number,
  config?: AxiosRequestConfig & { retries?: number; retryDelay?: number; respectRateLimit?: boolean },
): Promise<User> {
  const { retries = 3, retryDelay = 1000, respectRateLimit = true, ...axiosConfig } = config || {};

  let lastError: Error;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.get(`/users/${id}`, axiosConfig);
      return response.data;
    } catch (error: any) {
      lastError = error;

      // Handle rate limiting
      if (error.response?.status === 429) {
        const retryAfter = parseInt(error.response.headers['retry-after'] || '60');
        throw new ApiError('Too many requests', 'RATE_LIMIT_EXCEEDED', false, retryAfter);
      }

      // Retry on 500 errors
      if (error.response?.status === 500 && attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt));
        continue;
      }

      // Handle 404
      if (error.response?.status === 404) {
        throw new ApiError('User not found', 'USER_NOT_FOUND', false);
      }

      // Handle timeout
      if (error.code === 'ECONNABORTED') {
        throw new ApiError('Request timeout', 'TIMEOUT', true);
      }

      break;
    }
  }

  throw new ApiError('Request failed after retries', 'INTERNAL_ERROR', true);
}
```

**Key Points**:

- **Resilience contracts**: Timeouts, retries, errors explicitly tested
- **State handlers**: Provider sets up each test scenario
- **Error handling**: Consumer validates graceful degradation
- **Retry logic**: Exponential backoff tested
- **Optional fields**: Consumer handles partial responses

---
