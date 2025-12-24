# Architecturally Significant Requirements (ASRs)

## High-Priority ASRs (Score ≥6)

| ASR ID | Category | Requirement | Probability | Impact | Score | Testing Approach |
|--------|----------|-------------|-------------|--------|-------|------------------|
| ASR-001 | DATA | 99.99% data reliability, zero data loss (NFR-R2, NFR-R11) | 3 | 3 | 9 | Fault injection (crash during save), 100 scenarios, automated tests |
| ASR-002 | PERF | 60 FPS editor for 10K+ word documents (NFR-P10, NFR-P11) | 3 | 3 | 9 | Performance telemetry + manual QA, automated FPS monitoring |
| ASR-003 | PERF | 3s cold start, 2s project load (NFR-P2, NFR-P3) | 2 | 3 | 6 | Automated performance tests in CI, time budget assertions |
| ASR-004 | DATA | <5% contradiction false negative rate (NFR-Q1) | 3 | 3 | 9 | 500+ AI chapter human review (beta), ground truth corpus |
| ASR-005 | SEC | API keys encrypted in OS keychain, never logged (NFR-S2, NFR-S3) | 2 | 3 | 6 | Security audit, log scraping tests, manual penetration testing |
| ASR-006 | PERF | Chapter generation <7min with validation (NFR-P5) | 2 | 2 | 4 | Mocked AI responses, integration tests with real APIs |
| **ASR-011** | **DATA** | **SQLite + Qdrant atomic updates during Story Bible changes** | **3** | **3** | **9** | **Coordinated fault injection: crash during dual-write, verify both recover or both rollback** |

## Medium-Priority ASRs (Score 3-4)

| ASR ID | Category | Requirement | Probability | Impact | Score | Testing Approach |
|--------|----------|-------------|-------------|--------|-------|------------------|
| ASR-007 | BUS | Export 100% pass rate (KDP, IngramSpark, EPUB3) (NFR-C4-C6) | 2 | 2 | 4 | EPUBCheck validation, KDP/IngramSpark test uploads |
| ASR-008 | TECH | Cross-platform consistency (Windows/Mac/Linux) (NFR-C1-C3) | 2 | 2 | 4 | Platform-specific test suites, visual regression tests |
| ASR-009 | TECH | Multi-AI provider support (5 providers) (NFR-C8-C10) | 1 | 3 | 3 | Provider abstraction tests, integration tests per provider |
| ASR-010 | PERF | Story Bible semantic search <10s cold, <2s warm (NFR-P19) | 2 | 2 | 4 | Performance benchmarks, Qdrant query optimization tests |

---

## 🔴 **ASR-011: Dual-Database Transaction Safety (CRITICAL - NEW)**

**Context:** StoryTeller uses TWO databases for Story Bible:
- **SQLite:** Structured data (character names, attributes, relationships)
- **Qdrant:** Vector embeddings for semantic search

**Risk:** Power loss or crash during Story Bible update could corrupt Qdrant while SQLite commits successfully, leading to semantic search returning wrong results and AI generating contradictory content.

**Testing Requirements:**

**1. Unit Tests (Mock Qdrant):**
- SQLite transaction + Qdrant update wrapper
- Verify rollback behavior on Qdrant failure
- Test error handling for Qdrant connection loss

**2. Integration Tests (Real Dual-Write):**
- Story Bible entry creation → verify both DBs updated
- Story Bible entry update → verify both DBs consistent
- Story Bible entry deletion → verify both DBs cleaned up

**3. Fault Injection Scenarios (NEW - CRITICAL):**
```
Scenario 1: Crash during SQLite commit, before Qdrant update
  → Expected: SQLite rollback, Qdrant unchanged, retry succeeds

Scenario 2: Crash during Qdrant update, after SQLite commit
  → Expected: Qdrant rollback or rebuild from SQLite, consistency restored

Scenario 3: Power loss simulation (kill -9 during dual-write)
  → Expected: Both recover or both rollback, no orphaned data

Scenario 4: Disk full during Qdrant embedding write
  → Expected: Clear error message, SQLite rollback, user prompted

Scenario 5: Qdrant collection corruption (manual file edit)
  → Expected: Detect corruption on startup, rebuild from SQLite
```

**Architecture Decision Required (Sprint 0):**
- **Option A:** Implement write-ahead log (WAL) for Qdrant updates
- **Option B:** Store embeddings in SQLite BLOB with vector extension (removes Qdrant)
- **Option C:** Accept eventual consistency, rebuild Qdrant from SQLite on corruption detection
- **Decision must be made before Epic 4 (Story Bible) implementation**

**Acceptance Criteria:**
- 100 fault injection tests pass (all 5 scenarios with variations)
- Recovery time <10 seconds for corruption detection + rebuild
- User never sees "wrong" semantic search results after crash
- Beta telemetry: Zero reports of Story Bible data loss or inconsistency

---
