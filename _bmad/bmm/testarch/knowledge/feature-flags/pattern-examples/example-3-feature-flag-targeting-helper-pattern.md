# Example 3: Feature Flag Targeting Helper Pattern

**Context**: Reusable helpers for programmatic flag control via LaunchDarkly/Split.io API.

**Implementation**:

```typescript
// tests/support/feature-flag-helpers.ts
import { request as playwrightRequest } from '@playwright/test';
import { FLAGS, FlagKey } from '@/utils/feature-flags';

/**
 * LaunchDarkly API client configuration
 * Use test project SDK key (NOT production)
 */
const LD_SDK_KEY = process.env.LD_SDK_KEY_TEST;
const LD_API_BASE = 'https://app.launchdarkly.com/api/v2';

type FlagVariation = boolean | string | number | object;

/**
 * Set flag variation for specific user
 * Uses LaunchDarkly API to create user target
 */
export async function setFlagForUser(flagKey: FlagKey, userId: string, variation: FlagVariation): Promise<void> {
  const response = await playwrightRequest.newContext().then((ctx) =>
    ctx.post(`${LD_API_BASE}/flags/${flagKey}/targeting`, {
      headers: {
        Authorization: LD_SDK_KEY!,
        'Content-Type': 'application/json',
      },
      data: {
        targets: [
          {
            values: [userId],
            variation: variation ? 1 : 0, // 0 = off, 1 = on
          },
        ],
      },
    }),
  );

  if (!response.ok()) {
    throw new Error(`Failed to set flag ${flagKey} for user ${userId}: ${response.status()}`);
  }
}

/**
 * Remove user from flag targeting
 * CRITICAL for test cleanup
 */
export async function removeFlagTarget(flagKey: FlagKey, userId: string): Promise<void> {
  const response = await playwrightRequest.newContext().then((ctx) =>
    ctx.delete(`${LD_API_BASE}/flags/${flagKey}/targeting/users/${userId}`, {
      headers: {
        Authorization: LD_SDK_KEY!,
      },
    }),
  );

  if (!response.ok() && response.status() !== 404) {
    // 404 is acceptable (user wasn't targeted)
    throw new Error(`Failed to remove flag ${flagKey} target for user ${userId}: ${response.status()}`);
  }
}

/**
 * Percentage rollout helper
 * Enable flag for N% of users
 */
export async function setFlagRolloutPercentage(flagKey: FlagKey, percentage: number): Promise<void> {
  if (percentage < 0 || percentage > 100) {
    throw new Error('Percentage must be between 0 and 100');
  }

  const response = await playwrightRequest.newContext().then((ctx) =>
    ctx.patch(`${LD_API_BASE}/flags/${flagKey}`, {
      headers: {
        Authorization: LD_SDK_KEY!,
        'Content-Type': 'application/json',
      },
      data: {
        rollout: {
          variations: [
            { variation: 0, weight: 100 - percentage }, // off
            { variation: 1, weight: percentage }, // on
          ],
        },
      },
    }),
  );

  if (!response.ok()) {
    throw new Error(`Failed to set rollout for flag ${flagKey}: ${response.status()}`);
  }
}

/**
 * Enable flag globally (100% rollout)
 */
export async function enableFlagGlobally(flagKey: FlagKey): Promise<void> {
  await setFlagRolloutPercentage(flagKey, 100);
}

/**
 * Disable flag globally (0% rollout)
 */
export async function disableFlagGlobally(flagKey: FlagKey): Promise<void> {
  await setFlagRolloutPercentage(flagKey, 0);
}

/**
 * Stub feature flags in local/test environments
 * Bypasses LaunchDarkly entirely
 */
export function stubFeatureFlags(flags: Record<FlagKey, FlagVariation>): void {
  // Set flags in localStorage or inject into window
  if (typeof window !== 'undefined') {
    (window as any).__STUBBED_FLAGS__ = flags;
  }
}
```

**Usage in Playwright fixture**:

```typescript
// playwright/fixtures/feature-flag-fixture.ts
import { test as base } from '@playwright/test';
import { setFlagForUser, removeFlagTarget } from '../support/feature-flag-helpers';
import { FlagKey } from '@/utils/feature-flags';

type FeatureFlagFixture = {
  featureFlags: {
    enable: (flag: FlagKey, userId: string) => Promise<void>;
    disable: (flag: FlagKey, userId: string) => Promise<void>;
    cleanup: (flag: FlagKey, userId: string) => Promise<void>;
  };
};

export const test = base.extend<FeatureFlagFixture>({
  featureFlags: async ({}, use) => {
    const cleanupQueue: Array<{ flag: FlagKey; userId: string }> = [];

    await use({
      enable: async (flag, userId) => {
        await setFlagForUser(flag, userId, true);
        cleanupQueue.push({ flag, userId });
      },
      disable: async (flag, userId) => {
        await setFlagForUser(flag, userId, false);
        cleanupQueue.push({ flag, userId });
      },
      cleanup: async (flag, userId) => {
        await removeFlagTarget(flag, userId);
      },
    });

    // Auto-cleanup after test
    for (const { flag, userId } of cleanupQueue) {
      await removeFlagTarget(flag, userId);
    }
  },
});
```

**Key Points**:

- **API-driven control**: No manual UI clicks required
- **Auto-cleanup**: Fixture tracks and removes targeting
- **Percentage rollouts**: Test gradual feature releases
- **Stubbing option**: Local development without LaunchDarkly
- **Type-safe**: FlagKey prevents typos

---
