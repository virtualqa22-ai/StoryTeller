# Principle

CI pipelines must execute tests reliably, quickly, and provide clear feedback. Burn-in testing (running changed tests multiple times) flushes out flakiness before merge. Stage jobs strategically: install/cache once, run changed specs first for fast feedback, then shard full suites with fail-fast disabled to preserve evidence.
