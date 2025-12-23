# Complete User Journey

## Scenario 1: Bug Fix (Single Change)

**Goal:** Fix login validation bug

**Steps:**

1. **Start:** Load PM agent, say "I want to fix the login validation bug"
2. **PM runs tech-spec workflow:**
   - Asks: "What problem are you solving?"
   - You explain the validation issue
   - Detects your Node.js stack (Express 4.18.2, Jest for testing)
   - Analyzes existing UserService code patterns
   - Asks: "Should I follow your existing conventions?" → You say yes
   - Generates tech-spec.md with specific file paths and patterns
   - Creates story-login-fix.md
3. **Implement:** Load DEV agent, run `dev-story`
   - DEV reads tech-spec (has all context!)
   - Implements fix following existing patterns
   - Runs tests (following existing Jest patterns)
   - Done!

**Total time:** 15-30 minutes (mostly implementation)

---

## Scenario 2: Small Feature (Multi-Story)

**Goal:** Add OAuth social login (Google, GitHub)

**Steps:**

1. **Start:** Load PM agent, say "I want to add OAuth social login"
2. **PM runs tech-spec workflow:**
   - Asks about the feature scope
   - You specify: Google and GitHub OAuth
   - Detects your stack (Next.js 13.4, NextAuth.js already installed!)
   - Analyzes existing auth patterns
   - Confirms conventions with you
   - Generates:
     - tech-spec.md (comprehensive implementation guide)
     - epics.md (OAuth Integration epic)
     - story-oauth-1.md (Backend OAuth setup)
     - story-oauth-2.md (Frontend login buttons)
3. **Optional Sprint Planning:** Load SM agent, run `sprint-planning`
4. **Implement Story 1:**
   - Load DEV agent, run `dev-story` for story 1
   - DEV implements backend OAuth
5. **Implement Story 2:**
   - DEV agent, run `dev-story` for story 2
   - DEV implements frontend
   - Done!

**Total time:** 1-3 hours (mostly implementation)

---
