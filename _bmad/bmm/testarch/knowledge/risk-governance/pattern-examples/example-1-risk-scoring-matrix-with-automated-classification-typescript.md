# Example 1: Risk Scoring Matrix with Automated Classification (TypeScript)

**Context**: Calculate risk scores automatically from test results and categorize by risk type

**Implementation**:

```typescript
// risk-scoring.ts - Risk classification and scoring system
export const RISK_CATEGORIES = {
  TECH: 'TECH', // Technical debt, architecture fragility
  SEC: 'SEC', // Security vulnerabilities
  PERF: 'PERF', // Performance degradation
  DATA: 'DATA', // Data integrity, corruption
  BUS: 'BUS', // Business logic errors
  OPS: 'OPS', // Operational issues (deployment, monitoring)
} as const;

export type RiskCategory = keyof typeof RISK_CATEGORIES;

export type RiskScore = {
  id: string;
  category: RiskCategory;
  title: string;
  description: string;
  probability: 1 | 2 | 3; // 1=Low, 2=Medium, 3=High
  impact: 1 | 2 | 3; // 1=Low, 2=Medium, 3=High
  score: number; // probability × impact (1-9)
  owner: string;
  mitigationPlan?: string;
  deadline?: Date;
  status: 'OPEN' | 'MITIGATED' | 'WAIVED' | 'ACCEPTED';
  waiverReason?: string;
  waiverApprover?: string;
  waiverExpiry?: Date;
};

// Risk scoring rules
export function calculateRiskScore(probability: 1 | 2 | 3, impact: 1 | 2 | 3): number {
  return probability * impact;
}

export function requiresMitigation(score: number): boolean {
  return score >= 6; // Scores 6-9 demand action
}

export function isCriticalBlocker(score: number): boolean {
  return score === 9; // Probability=3 AND Impact=3 → FAIL gate
}

export function classifyRiskLevel(score: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
  if (score === 9) return 'CRITICAL';
  if (score >= 6) return 'HIGH';
  if (score >= 4) return 'MEDIUM';
  return 'LOW';
}

// Example: Risk assessment from test failures
export function assessTestFailureRisk(failure: {
  test: string;
  category: RiskCategory;
  affectedUsers: number;
  revenueImpact: number;
  securityVulnerability: boolean;
}): RiskScore {
  // Probability based on test failure frequency (simplified)
  const probability: 1 | 2 | 3 = 3; // Test failed = High probability

  // Impact based on business context
  let impact: 1 | 2 | 3 = 1;
  if (failure.securityVulnerability) impact = 3;
  else if (failure.revenueImpact > 10000) impact = 3;
  else if (failure.affectedUsers > 1000) impact = 2;
  else impact = 1;

  const score = calculateRiskScore(probability, impact);

  return {
    id: `risk-${Date.now()}`,
    category: failure.category,
    title: `Test failure: ${failure.test}`,
    description: `Affects ${failure.affectedUsers} users, $${failure.revenueImpact} revenue`,
    probability,
    impact,
    score,
    owner: 'unassigned',
    status: score === 9 ? 'OPEN' : 'OPEN',
  };
}
```

**Key Points**:

- **Objective scoring**: Probability (1-3) × Impact (1-3) = Score (1-9)
- **Clear thresholds**: Score ≥6 requires mitigation, score = 9 blocks release
- **Business context**: Revenue, users, security drive impact calculation
- **Status tracking**: OPEN → MITIGATED → WAIVED → ACCEPTED lifecycle

---
