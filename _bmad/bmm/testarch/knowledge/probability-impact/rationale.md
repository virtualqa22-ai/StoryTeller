# Rationale

**The Problem**: Without quantifiable risk assessment, teams over-test low-value scenarios while missing critical risks. Gut feeling leads to inconsistent prioritization and missed edge cases.

**The Solution**: Standardize risk evaluation with a 3×3 matrix (probability: 1-3, impact: 1-3). Multiply to derive risk score (1-9). Automate classification (DOCUMENT, MONITOR, MITIGATE, BLOCK) based on thresholds. This approach surfaces hidden risks early and justifies testing decisions to stakeholders.

**Why This Matters**:

- Consistent risk language across product, engineering, and QA
- Objective prioritization of test scenarios (not politics)
- Automatic gate decisions (score=9 → FAIL until resolved)
- Audit trail for compliance and retrospectives
