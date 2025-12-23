# Step 1: Run Preflight Checks

## Actions

1. **Verify Git Repository**
   - Check for `.git/` directory
   - Confirm remote repository configured (`git remote -v`)
   - If not initialized, HALT with message: "Git repository required for CI/CD setup"

2. **Validate Test Framework**
   - Look for `playwright.config.*` or `cypress.config.*`
   - Read framework configuration to extract:
     - Test directory location
     - Test command
     - Reporter configuration
     - Timeout settings
   - If not found, HALT with message: "Run `framework` workflow first to set up test infrastructure"

3. **Run Local Tests**
   - Execute `npm run test:e2e` (or equivalent from package.json)
   - Ensure tests pass before CI setup
   - If tests fail, HALT with message: "Fix failing tests before setting up CI/CD"

4. **Detect CI Platform**
   - Check for existing CI configuration:
     - `.github/workflows/*.yml` (GitHub Actions)
     - `.gitlab-ci.yml` (GitLab CI)
     - `.circleci/config.yml` (Circle CI)
     - `Jenkinsfile` (Jenkins)
   - If found, ask user: "Update existing CI configuration or create new?"
   - If not found, detect platform from git remote:
     - `github.com` → GitHub Actions (default)
     - `gitlab.com` → GitLab CI
     - Ask user if unable to auto-detect

5. **Read Environment Configuration**
   - Use `.nvmrc` for Node version if present
   - If missing, default to a current LTS (Node 24) or newer instead of a fixed old version
   - Read `package.json` to identify dependencies (affects caching strategy)

**Halt Condition:** If preflight checks fail, stop immediately and report which requirement failed.

---
