# Rationale

**The Problem**: Without formal risk governance, releases become political—loud voices win, quiet risks hide, and teams discover critical issues in production. "We thought it was fine" isn't a release strategy.

**The Solution**: Risk scoring (1-3 scale for probability and impact, total 1-9) creates shared language. Scores ≥6 demand documented mitigation. Scores = 9 mandate gate failure. Every acceptance criterion maps to a test, and gaps require explicit waivers with owners and expiry dates.

**Why This Matters**:

- Removes ambiguity from release decisions (objective scores vs subjective opinions)
- Creates audit trail for compliance (FDA, SOC2, ISO require documented risk management)
- Identifies true blockers early (prevents last-minute production fires)
- Distributes responsibility (owners, mitigation plans, deadlines for every risk >4)
