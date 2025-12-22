# Principle

Feature flags enable controlled rollouts and A/B testing, but require disciplined testing governance. Centralize flag definitions in a frozen enum, test both enabled and disabled states, clean up targeting after each spec, and maintain a comprehensive flag lifecycle checklist. For LaunchDarkly-style systems, script API helpers to seed variations programmatically rather than manual UI mutations.
