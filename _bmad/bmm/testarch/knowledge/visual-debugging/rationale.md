# Rationale

**The Problem**: CI failures often provide minimal context—a timeout, a selector mismatch, or a network error—forcing developers to reproduce issues locally (if they can). This wastes time and discourages test maintenance.

**The Solution**: Capture rich debugging artifacts **only on failure** to balance storage costs with diagnostic value. Modern tools like Playwright Trace Viewer, Cypress Debug UI, and HAR recordings provide interactive, time-travel debugging that reveals exactly what the test saw at each step.

**Why This Matters**:

- Reduces failure triage time by 80-90% (visual context vs logs alone)
- Enables debugging without local reproduction
- Improves test maintenance confidence (clear failure root cause)
- Catches timing/race conditions that are hard to reproduce locally
