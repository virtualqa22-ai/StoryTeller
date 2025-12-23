# Example 4: Pact Broker Housekeeping & Lifecycle Management

**Context**: Automated broker maintenance to prevent contract sprawl and noise.

**Implementation**:

```typescript
// scripts/pact-broker-housekeeping.ts
/**
 * Pact Broker Housekeeping Script
 * - Archive superseded contracts
 * - Expire unused pacts
 * - Tag releases for environment tracking
 */

import { execSync } from 'child_process';

const PACT_BROKER_URL = process.env.PACT_BROKER_URL!;
const PACT_BROKER_TOKEN = process.env.PACT_BROKER_TOKEN!;
const PACTICIPANT = 'user-api-service';

/**
 * Tag release with environment
 */
function tagRelease(version: string, environment: 'staging' | 'production') {
  console.log(`🏷️  Tagging ${PACTICIPANT} v${version} as ${environment}`);

  execSync(
    `npx pact-broker create-version-tag \
      --pacticipant ${PACTICIPANT} \
      --version ${version} \
      --tag ${environment} \
      --broker-base-url ${PACT_BROKER_URL} \
      --broker-token ${PACT_BROKER_TOKEN}`,
    { stdio: 'inherit' },
  );
}

/**
 * Record deployment to environment
 */
function recordDeployment(version: string, environment: 'staging' | 'production') {
  console.log(`📝 Recording deployment of ${PACTICIPANT} v${version} to ${environment}`);

  execSync(
    `npx pact-broker record-deployment \
      --pacticipant ${PACTICIPANT} \
      --version ${version} \
      --environment ${environment} \
      --broker-base-url ${PACT_BROKER_URL} \
      --broker-token ${PACT_BROKER_TOKEN}`,
    { stdio: 'inherit' },
  );
}

/**
 * Clean up old pact versions (retention policy)
 * Keep: last 30 days, all production tags, latest from each branch
 */
function cleanupOldPacts() {
  console.log(`🧹 Cleaning up old pacts for ${PACTICIPANT}`);

  execSync(
    `npx pact-broker clean \
      --pacticipant ${PACTICIPANT} \
      --broker-base-url ${PACT_BROKER_URL} \
      --broker-token ${PACT_BROKER_TOKEN} \
      --keep-latest-for-branch 1 \
      --keep-min-age 30`,
    { stdio: 'inherit' },
  );
}

/**
 * Check deployment compatibility
 */
function canIDeploy(version: string, toEnvironment: string): boolean {
  console.log(`🔍 Checking if ${PACTICIPANT} v${version} can deploy to ${toEnvironment}`);

  try {
    execSync(
      `npx pact-broker can-i-deploy \
        --pacticipant ${PACTICIPANT} \
        --version ${version} \
        --to-environment ${toEnvironment} \
        --broker-base-url ${PACT_BROKER_URL} \
        --broker-token ${PACT_BROKER_TOKEN} \
        --retry-while-unknown 6 \
        --retry-interval 10`,
      { stdio: 'inherit' },
    );
    return true;
  } catch (error) {
    console.error(`❌ Cannot deploy to ${toEnvironment}`);
    return false;
  }
}

/**
 * Main housekeeping workflow
 */
async function main() {
  const command = process.argv[2];
  const version = process.argv[3];
  const environment = process.argv[4] as 'staging' | 'production';

  switch (command) {
    case 'tag-release':
      tagRelease(version, environment);
      break;

    case 'record-deployment':
      recordDeployment(version, environment);
      break;

    case 'can-i-deploy':
      const canDeploy = canIDeploy(version, environment);
      process.exit(canDeploy ? 0 : 1);

    case 'cleanup':
      cleanupOldPacts();
      break;

    default:
      console.error('Unknown command. Use: tag-release | record-deployment | can-i-deploy | cleanup');
      process.exit(1);
  }
}

main();
```

**package.json scripts**:

```json
{
  "scripts": {
    "pact:tag": "ts-node scripts/pact-broker-housekeeping.ts tag-release",
    "pact:record": "ts-node scripts/pact-broker-housekeeping.ts record-deployment",
    "pact:can-deploy": "ts-node scripts/pact-broker-housekeeping.ts can-i-deploy",
    "pact:cleanup": "ts-node scripts/pact-broker-housekeeping.ts cleanup"
  }
}
```

**Deployment workflow integration**:

```yaml
# .github/workflows/deploy-production.yml
name: Deploy to Production
on:
  push:
    tags:
      - 'v*'

jobs:
  verify-contracts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Check pact compatibility
        run: npm run pact:can-deploy ${{ github.ref_name }} production
        env:
          PACT_BROKER_URL: ${{ secrets.PACT_BROKER_URL }}
          PACT_BROKER_TOKEN: ${{ secrets.PACT_BROKER_TOKEN }}

  deploy:
    needs: verify-contracts
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: ./scripts/deploy.sh production

      - name: Record deployment in Pact Broker
        run: npm run pact:record ${{ github.ref_name }} production
        env:
          PACT_BROKER_URL: ${{ secrets.PACT_BROKER_URL }}
          PACT_BROKER_TOKEN: ${{ secrets.PACT_BROKER_TOKEN }}
```

**Scheduled cleanup**:

```yaml
# .github/workflows/pact-housekeeping.yml
name: Pact Broker Housekeeping
on:
  schedule:
    - cron: '0 2 * * 0' # Weekly on Sunday at 2 AM

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Cleanup old pacts
        run: npm run pact:cleanup
        env:
          PACT_BROKER_URL: ${{ secrets.PACT_BROKER_URL }}
          PACT_BROKER_TOKEN: ${{ secrets.PACT_BROKER_TOKEN }}
```

**Key Points**:

- **Automated tagging**: Releases tagged with environment
- **Deployment tracking**: Broker knows which version is where
- **Safety gate**: can-i-deploy blocks incompatible deployments
- **Retention policy**: Keep recent, production, and branch-latest pacts
- **Webhook triggers**: Provider verification runs on consumer changes

---
