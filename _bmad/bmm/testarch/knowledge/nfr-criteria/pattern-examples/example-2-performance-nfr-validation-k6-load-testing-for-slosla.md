# Example 2: Performance NFR Validation (k6 Load Testing for SLO/SLA)

**Context**: Use k6 for load testing, stress testing, and SLO/SLA enforcement (NOT Playwright)

**Implementation**:

```javascript
// tests/nfr/performance.k6.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const apiDuration = new Trend('api_duration');

// Performance thresholds (SLO/SLA)
export const options = {
  stages: [
    { duration: '1m', target: 50 }, // Ramp up to 50 users
    { duration: '3m', target: 50 }, // Stay at 50 users for 3 minutes
    { duration: '1m', target: 100 }, // Spike to 100 users
    { duration: '3m', target: 100 }, // Stay at 100 users
    { duration: '1m', target: 0 }, // Ramp down
  ],
  thresholds: {
    // SLO: 95% of requests must complete in <500ms
    http_req_duration: ['p(95)<500'],
    // SLO: Error rate must be <1%
    errors: ['rate<0.01'],
    // SLA: API endpoints must respond in <1s (99th percentile)
    api_duration: ['p(99)<1000'],
  },
};

export default function () {
  // Test 1: Homepage load performance
  const homepageResponse = http.get(`${__ENV.BASE_URL}/`);
  check(homepageResponse, {
    'homepage status is 200': (r) => r.status === 200,
    'homepage loads in <2s': (r) => r.timings.duration < 2000,
  });
  errorRate.add(homepageResponse.status !== 200);

  // Test 2: API endpoint performance
  const apiResponse = http.get(`${__ENV.BASE_URL}/api/products?limit=10`, {
    headers: { Authorization: `Bearer ${__ENV.API_TOKEN}` },
  });
  check(apiResponse, {
    'API status is 200': (r) => r.status === 200,
    'API responds in <500ms': (r) => r.timings.duration < 500,
  });
  apiDuration.add(apiResponse.timings.duration);
  errorRate.add(apiResponse.status !== 200);

  // Test 3: Search endpoint under load
  const searchResponse = http.get(`${__ENV.BASE_URL}/api/search?q=laptop&limit=100`);
  check(searchResponse, {
    'search status is 200': (r) => r.status === 200,
    'search responds in <1s': (r) => r.timings.duration < 1000,
    'search returns results': (r) => JSON.parse(r.body).results.length > 0,
  });
  errorRate.add(searchResponse.status !== 200);

  sleep(1); // Realistic user think time
}

// Threshold validation (run after test)
export function handleSummary(data) {
  const p95Duration = data.metrics.http_req_duration.values['p(95)'];
  const p99ApiDuration = data.metrics.api_duration.values['p(99)'];
  const errorRateValue = data.metrics.errors.values.rate;

  console.log(`P95 request duration: ${p95Duration.toFixed(2)}ms`);
  console.log(`P99 API duration: ${p99ApiDuration.toFixed(2)}ms`);
  console.log(`Error rate: ${(errorRateValue * 100).toFixed(2)}%`);

  return {
    'summary.json': JSON.stringify(data),
    stdout: `
Performance NFR Results:
- P95 request duration: ${p95Duration < 500 ? '✅ PASS' : '❌ FAIL'} (${p95Duration.toFixed(2)}ms / 500ms threshold)
- P99 API duration: ${p99ApiDuration < 1000 ? '✅ PASS' : '❌ FAIL'} (${p99ApiDuration.toFixed(2)}ms / 1000ms threshold)
- Error rate: ${errorRateValue < 0.01 ? '✅ PASS' : '❌ FAIL'} (${(errorRateValue * 100).toFixed(2)}% / 1% threshold)
    `,
  };
}
```

**Run k6 tests:**

```bash
# Local smoke test (10 VUs, 30s)
k6 run --vus 10 --duration 30s tests/nfr/performance.k6.js

# Full load test (stages defined in script)
k6 run tests/nfr/performance.k6.js

# CI integration with thresholds
k6 run --out json=performance-results.json tests/nfr/performance.k6.js
```

**Key Points**:

- **k6 is the right tool** for load testing (NOT Playwright)
- SLO/SLA thresholds enforced automatically (`p(95)<500`, `rate<0.01`)
- Realistic load simulation (ramp up, sustained load, spike testing)
- Comprehensive metrics (p50, p95, p99, error rate, throughput)
- CI-friendly (JSON output, exit codes based on thresholds)

**Performance NFR Criteria**:

- ✅ PASS: All SLO/SLA targets met with k6 profiling evidence (p95 < 500ms, error rate < 1%)
- ⚠️ CONCERNS: Trending toward limits (e.g., p95 = 480ms approaching 500ms) or missing baselines
- ❌ FAIL: SLO/SLA breached (e.g., p95 > 500ms) or error rate > 1%

**Performance Testing Levels (from Test Architect course):**

- **Load testing**: System behavior under expected load
- **Stress testing**: System behavior under extreme load (breaking point)
- **Spike testing**: Sudden load increases (traffic spikes)
- **Endurance/Soak testing**: System behavior under sustained load (memory leaks, resource exhaustion)
- **Benchmarking**: Baseline measurements for comparison

**Note**: Playwright can validate **perceived performance** (Core Web Vitals via Lighthouse), but k6 validates **system performance** (throughput, latency, resource limits under load)

---
