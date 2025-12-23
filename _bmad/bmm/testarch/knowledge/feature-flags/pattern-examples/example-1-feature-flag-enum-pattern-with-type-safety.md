# Example 1: Feature Flag Enum Pattern with Type Safety

**Context**: Centralized flag management with TypeScript type safety and runtime validation.

**Implementation**:

```typescript
// src/utils/feature-flags.ts
/**
 * Centralized feature flag definitions
 * - Object.freeze prevents runtime modifications
 * - TypeScript ensures compile-time type safety
 * - Single source of truth for all flag keys
 */
export const FLAGS = Object.freeze({
  // User-facing features
  NEW_CHECKOUT_FLOW: 'new-checkout-flow',
  DARK_MODE: 'dark-mode',
  ENHANCED_SEARCH: 'enhanced-search',

  // Experiments
  PRICING_EXPERIMENT_A: 'pricing-experiment-a',
  HOMEPAGE_VARIANT_B: 'homepage-variant-b',

  // Infrastructure
  USE_NEW_API_ENDPOINT: 'use-new-api-endpoint',
  ENABLE_ANALYTICS_V2: 'enable-analytics-v2',

  // Killswitches (emergency disables)
  DISABLE_PAYMENT_PROCESSING: 'disable-payment-processing',
  DISABLE_EMAIL_NOTIFICATIONS: 'disable-email-notifications',
} as const);

/**
 * Type-safe flag keys
 * Prevents typos and ensures autocomplete in IDEs
 */
export type FlagKey = (typeof FLAGS)[keyof typeof FLAGS];

/**
 * Flag metadata for governance
 */
type FlagMetadata = {
  key: FlagKey;
  name: string;
  owner: string;
  createdDate: string;
  expiryDate?: string;
  defaultState: boolean;
  requiresCleanup: boolean;
  dependencies?: FlagKey[];
  telemetryEvents?: string[];
};

/**
 * Flag registry with governance metadata
 * Used for flag lifecycle tracking and cleanup alerts
 */
export const FLAG_REGISTRY: Record<FlagKey, FlagMetadata> = {
  [FLAGS.NEW_CHECKOUT_FLOW]: {
    key: FLAGS.NEW_CHECKOUT_FLOW,
    name: 'New Checkout Flow',
    owner: 'payments-team',
    createdDate: '2025-01-15',
    expiryDate: '2025-03-15',
    defaultState: false,
    requiresCleanup: true,
    dependencies: [FLAGS.USE_NEW_API_ENDPOINT],
    telemetryEvents: ['checkout_started', 'checkout_completed'],
  },
  [FLAGS.DARK_MODE]: {
    key: FLAGS.DARK_MODE,
    name: 'Dark Mode UI',
    owner: 'frontend-team',
    createdDate: '2025-01-10',
    defaultState: false,
    requiresCleanup: false, // Permanent feature toggle
  },
  // ... rest of registry
};

/**
 * Validate flag exists in registry
 * Throws at runtime if flag is unregistered
 */
export function validateFlag(flag: string): asserts flag is FlagKey {
  if (!Object.values(FLAGS).includes(flag as FlagKey)) {
    throw new Error(`Unregistered feature flag: ${flag}`);
  }
}

/**
 * Check if flag is expired (needs removal)
 */
export function isFlagExpired(flag: FlagKey): boolean {
  const metadata = FLAG_REGISTRY[flag];
  if (!metadata.expiryDate) return false;

  const expiry = new Date(metadata.expiryDate);
  return Date.now() > expiry.getTime();
}

/**
 * Get all expired flags requiring cleanup
 */
export function getExpiredFlags(): FlagMetadata[] {
  return Object.values(FLAG_REGISTRY).filter((meta) => isFlagExpired(meta.key));
}
```

**Usage in application code**:

```typescript
// components/Checkout.tsx
import { FLAGS } from '@/utils/feature-flags';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';

export function Checkout() {
  const isNewFlow = useFeatureFlag(FLAGS.NEW_CHECKOUT_FLOW);

  return isNewFlow ? <NewCheckoutFlow /> : <LegacyCheckoutFlow />;
}
```

**Key Points**:

- **Type safety**: TypeScript catches typos at compile time
- **Runtime validation**: validateFlag ensures only registered flags used
- **Metadata tracking**: Owner, dates, dependencies documented
- **Expiry alerts**: Automated detection of stale flags
- **Single source of truth**: All flags defined in one place

---
