# Rationale

Quality tests provide reliable signal about application health. Flaky tests erode confidence and waste engineering time. Tests that use hard waits (`waitForTimeout(3000)`) are non-deterministic and slow. Tests with hidden assertions or conditional logic become unmaintainable. Large tests (>300 lines) are hard to understand and debug. Slow tests (>1.5 min) block CI pipelines. Self-cleaning tests prevent state pollution in parallel runs.
