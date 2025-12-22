# Rationale

Environment-specific configuration prevents hardcoded URLs, timeouts, and credentials from leaking into tests. A central config map with fail-fast validation catches missing environments early. Standardized timeouts reduce flakiness while remaining long enough for real-world network conditions. Consistent artifact storage (`test-results/`, `playwright-report/`) enables CI pipelines to upload failure evidence automatically. Versioned dependencies (`.nvmrc`, `package.json` browser versions) eliminate "works on my machine" issues between local and CI environments.
