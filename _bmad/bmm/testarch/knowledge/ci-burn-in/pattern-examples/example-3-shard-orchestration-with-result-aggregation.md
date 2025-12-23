# Example 3: Shard Orchestration with Result Aggregation

**Context**: Advanced sharding strategy for large test suites with intelligent result merging.

**Implementation**:

```javascript
// scripts/run-sharded-tests.js
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Run tests across multiple shards and aggregate results
 * Usage: node scripts/run-sharded-tests.js --shards=4 --env=staging
 */

const SHARD_COUNT = parseInt(process.env.SHARD_COUNT || '4');
const TEST_ENV = process.env.TEST_ENV || 'local';
const RESULTS_DIR = path.join(__dirname, '../test-results');

console.log(`🚀 Running tests across ${SHARD_COUNT} shards`);
console.log(`Environment: ${TEST_ENV}`);
console.log('━'.repeat(50));

// Ensure results directory exists
if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

/**
 * Run a single shard
 */
function runShard(shardIndex) {
  return new Promise((resolve, reject) => {
    const shardId = `${shardIndex}/${SHARD_COUNT}`;
    console.log(`\n📦 Starting shard ${shardId}...`);

    const child = spawn('npx', ['playwright', 'test', `--shard=${shardId}`, '--reporter=json'], {
      env: { ...process.env, TEST_ENV, SHARD_INDEX: shardIndex },
      stdio: 'pipe',
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
      process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
      process.stderr.write(data);
    });

    child.on('close', (code) => {
      // Save shard results
      const resultFile = path.join(RESULTS_DIR, `shard-${shardIndex}.json`);
      try {
        const result = JSON.parse(stdout);
        fs.writeFileSync(resultFile, JSON.stringify(result, null, 2));
        console.log(`✅ Shard ${shardId} completed (exit code: ${code})`);
        resolve({ shardIndex, code, result });
      } catch (error) {
        console.error(`❌ Shard ${shardId} failed to parse results:`, error.message);
        reject({ shardIndex, code, error });
      }
    });

    child.on('error', (error) => {
      console.error(`❌ Shard ${shardId} process error:`, error.message);
      reject({ shardIndex, error });
    });
  });
}

/**
 * Aggregate results from all shards
 */
function aggregateResults() {
  console.log('\n📊 Aggregating results from all shards...');

  const shardResults = [];
  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;
  let totalSkipped = 0;
  let totalFlaky = 0;

  for (let i = 1; i <= SHARD_COUNT; i++) {
    const resultFile = path.join(RESULTS_DIR, `shard-${i}.json`);
    if (fs.existsSync(resultFile)) {
      const result = JSON.parse(fs.readFileSync(resultFile, 'utf8'));
      shardResults.push(result);

      // Aggregate stats
      totalTests += result.stats?.expected || 0;
      totalPassed += result.stats?.expected || 0;
      totalFailed += result.stats?.unexpected || 0;
      totalSkipped += result.stats?.skipped || 0;
      totalFlaky += result.stats?.flaky || 0;
    }
  }

  const summary = {
    totalShards: SHARD_COUNT,
    environment: TEST_ENV,
    totalTests,
    passed: totalPassed,
    failed: totalFailed,
    skipped: totalSkipped,
    flaky: totalFlaky,
    duration: shardResults.reduce((acc, r) => acc + (r.duration || 0), 0),
    timestamp: new Date().toISOString(),
  };

  // Save aggregated summary
  fs.writeFileSync(path.join(RESULTS_DIR, 'summary.json'), JSON.stringify(summary, null, 2));

  console.log('\n━'.repeat(50));
  console.log('📈 Test Results Summary');
  console.log('━'.repeat(50));
  console.log(`Total tests:    ${totalTests}`);
  console.log(`✅ Passed:      ${totalPassed}`);
  console.log(`❌ Failed:      ${totalFailed}`);
  console.log(`⏭️  Skipped:     ${totalSkipped}`);
  console.log(`⚠️  Flaky:       ${totalFlaky}`);
  console.log(`⏱️  Duration:    ${(summary.duration / 1000).toFixed(2)}s`);
  console.log('━'.repeat(50));

  return summary;
}

/**
 * Main execution
 */
async function main() {
  const startTime = Date.now();
  const shardPromises = [];

  // Run all shards in parallel
  for (let i = 1; i <= SHARD_COUNT; i++) {
    shardPromises.push(runShard(i));
  }

  try {
    await Promise.allSettled(shardPromises);
  } catch (error) {
    console.error('❌ One or more shards failed:', error);
  }

  // Aggregate results
  const summary = aggregateResults();

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n⏱️  Total execution time: ${totalTime}s`);

  // Exit with failure if any tests failed
  if (summary.failed > 0) {
    console.error('\n❌ Test suite failed');
    process.exit(1);
  }

  console.log('\n✅ All tests passed');
  process.exit(0);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
```

**package.json integration**:

```json
{
  "scripts": {
    "test:sharded": "node scripts/run-sharded-tests.js",
    "test:sharded:ci": "SHARD_COUNT=8 TEST_ENV=staging node scripts/run-sharded-tests.js"
  }
}
```

**Key Points**:

- **Parallel shard execution**: All shards run simultaneously
- **Result aggregation**: Unified summary across shards
- **Failure detection**: Exit code reflects overall test status
- **Artifact preservation**: Individual shard results saved for debugging
- **CI/local compatibility**: Same script works in both environments

---
