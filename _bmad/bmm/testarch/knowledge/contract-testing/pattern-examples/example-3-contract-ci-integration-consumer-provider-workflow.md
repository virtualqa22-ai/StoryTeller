# Example 3: Contract CI Integration (Consumer & Provider Workflow)

**Context**: Complete CI/CD workflow coordinating consumer pact publishing and provider verification.

**Implementation**:

```yaml
# .github/workflows/pact-consumer.yml (Consumer side)
name: Pact Consumer Tests
on:
  pull_request:
  push:
    branches: [main]

jobs:
  consumer-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'

      - name: Install dependencies
        run: npm ci

      - name: Run consumer contract tests
        run: npm run test:contract

      - name: Publish pacts to broker
        if: github.ref == 'refs/heads/main' || github.event_name == 'pull_request'
        run: |
          npx pact-broker publish ./pacts \
            --consumer-app-version ${{ github.sha }} \
            --branch ${{ github.head_ref || github.ref_name }} \
            --broker-base-url ${{ secrets.PACT_BROKER_URL }} \
            --broker-token ${{ secrets.PACT_BROKER_TOKEN }}

      - name: Tag pact with environment (main branch only)
        if: github.ref == 'refs/heads/main'
        run: |
          npx pact-broker create-version-tag \
            --pacticipant user-management-web \
            --version ${{ github.sha }} \
            --tag production \
            --broker-base-url ${{ secrets.PACT_BROKER_URL }} \
            --broker-token ${{ secrets.PACT_BROKER_TOKEN }}
```

```yaml
# .github/workflows/pact-provider.yml (Provider side)
name: Pact Provider Verification
on:
  pull_request:
  push:
    branches: [main]
  repository_dispatch:
    types: [pact_changed] # Webhook from Pact Broker

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

      - name: Start dependencies
        run: docker-compose up -d

      - name: Run provider verification
        run: npm run test:contract:provider
        env:
          PACT_BROKER_URL: ${{ secrets.PACT_BROKER_URL }}
          PACT_BROKER_TOKEN: ${{ secrets.PACT_BROKER_TOKEN }}
          GIT_SHA: ${{ github.sha }}
          CI: true

      - name: Publish verification results
        if: always()
        run: echo "Verification results published to broker"

      - name: Can I Deploy to Production?
        if: github.ref == 'refs/heads/main'
        run: |
          npx pact-broker can-i-deploy \
            --pacticipant user-api-service \
            --version ${{ github.sha }} \
            --to-environment production \
            --broker-base-url ${{ secrets.PACT_BROKER_URL }} \
            --broker-token ${{ secrets.PACT_BROKER_TOKEN }} \
            --retry-while-unknown 6 \
            --retry-interval 10

      - name: Record deployment (if can-i-deploy passed)
        if: success() && github.ref == 'refs/heads/main'
        run: |
          npx pact-broker record-deployment \
            --pacticipant user-api-service \
            --version ${{ github.sha }} \
            --environment production \
            --broker-base-url ${{ secrets.PACT_BROKER_URL }} \
            --broker-token ${{ secrets.PACT_BROKER_TOKEN }}
```

**Pact Broker Webhook Configuration**:

```json
{
  "events": [
    {
      "name": "contract_content_changed"
    }
  ],
  "request": {
    "method": "POST",
    "url": "https://api.github.com/repos/your-org/user-api/dispatches",
    "headers": {
      "Authorization": "Bearer ${user.githubToken}",
      "Content-Type": "application/json",
      "Accept": "application/vnd.github.v3+json"
    },
    "body": {
      "event_type": "pact_changed",
      "client_payload": {
        "pact_url": "${pactbroker.pactUrl}",
        "consumer": "${pactbroker.consumerName}",
        "provider": "${pactbroker.providerName}"
      }
    }
  }
}
```

**Key Points**:

- **Automatic trigger**: Consumer pact changes trigger provider verification via webhook
- **Branch tracking**: Pacts published per branch for feature testing
- **can-i-deploy**: Safety gate before production deployment
- **Record deployment**: Track which version is in each environment
- **Parallel dev**: Consumer and provider teams work independently

---
