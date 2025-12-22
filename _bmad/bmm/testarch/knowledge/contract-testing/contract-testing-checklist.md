# Contract Testing Checklist

Before implementing contract testing, verify:

- [ ] **Pact Broker setup**: Hosted (Pactflow) or self-hosted broker configured
- [ ] **Consumer tests**: Generate pacts in CI, publish to broker on merge
- [ ] **Provider verification**: Runs on PR, verifies all consumer pacts
- [ ] **State handlers**: Provider implements all given() states
- [ ] **can-i-deploy**: Blocks deployment if contracts incompatible
- [ ] **Webhooks configured**: Consumer changes trigger provider verification
- [ ] **Retention policy**: Old pacts archived (keep 30 days, all production tags)
- [ ] **Resilience tested**: Timeouts, retries, error codes in contracts
