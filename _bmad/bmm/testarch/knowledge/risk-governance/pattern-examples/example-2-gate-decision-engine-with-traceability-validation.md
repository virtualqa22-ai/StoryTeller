# Example 2: Gate Decision Engine with Traceability Validation

**Context**: Automated gate decision based on risk scores and test coverage

**Implementation**:

```typescript
// gate-decision-engine.ts
export type GateDecision = 'PASS' | 'CONCERNS' | 'FAIL' | 'WAIVED';

export type CoverageGap = {
  acceptanceCriteria: string;
  testMissing: string;
  reason: string;
};

export type GateResult = {
  decision: GateDecision;
  timestamp: Date;
  criticalRisks: RiskScore[];
  highRisks: RiskScore[];
  coverageGaps: CoverageGap[];
  summary: string;
  recommendations: string[];
};

export function evaluateGate(params: { risks: RiskScore[]; coverageGaps: CoverageGap[]; waiverApprover?: string }): GateResult {
  const { risks, coverageGaps, waiverApprover } = params;

  // Categorize risks
  const criticalRisks = risks.filter((r) => r.score === 9 && r.status === 'OPEN');
  const highRisks = risks.filter((r) => r.score >= 6 && r.score < 9 && r.status === 'OPEN');
  const unresolvedGaps = coverageGaps.filter((g) => !g.reason);

  // Decision logic
  let decision: GateDecision;

  // FAIL: Critical blockers (score=9) or missing coverage
  if (criticalRisks.length > 0 || unresolvedGaps.length > 0) {
    decision = 'FAIL';
  }
  // WAIVED: All risks waived by authorized approver
  else if (risks.every((r) => r.status === 'WAIVED') && waiverApprover) {
    decision = 'WAIVED';
  }
  // CONCERNS: High risks (score 6-8) with mitigation plans
  else if (highRisks.length > 0 && highRisks.every((r) => r.mitigationPlan && r.owner !== 'unassigned')) {
    decision = 'CONCERNS';
  }
  // PASS: No critical issues, all risks mitigated or low
  else {
    decision = 'PASS';
  }

  // Generate recommendations
  const recommendations: string[] = [];
  if (criticalRisks.length > 0) {
    recommendations.push(`🚨 ${criticalRisks.length} CRITICAL risk(s) must be mitigated before release`);
  }
  if (unresolvedGaps.length > 0) {
    recommendations.push(`📋 ${unresolvedGaps.length} acceptance criteria lack test coverage`);
  }
  if (highRisks.some((r) => !r.mitigationPlan)) {
    recommendations.push(`⚠️  High risks without mitigation plans: assign owners and deadlines`);
  }
  if (decision === 'PASS') {
    recommendations.push(`✅ All risks mitigated or acceptable. Ready for release.`);
  }

  return {
    decision,
    timestamp: new Date(),
    criticalRisks,
    highRisks,
    coverageGaps: unresolvedGaps,
    summary: generateSummary(decision, risks, unresolvedGaps),
    recommendations,
  };
}

function generateSummary(decision: GateDecision, risks: RiskScore[], gaps: CoverageGap[]): string {
  const total = risks.length;
  const critical = risks.filter((r) => r.score === 9).length;
  const high = risks.filter((r) => r.score >= 6 && r.score < 9).length;

  return `Gate Decision: ${decision}. Total Risks: ${total} (${critical} critical, ${high} high). Coverage Gaps: ${gaps.length}.`;
}
```

**Usage Example**:

```typescript
// Example: Running gate check before deployment
import { assessTestFailureRisk, evaluateGate } from './gate-decision-engine';

// Collect risks from test results
const risks: RiskScore[] = [
  assessTestFailureRisk({
    test: 'Payment processing with expired card',
    category: 'BUS',
    affectedUsers: 5000,
    revenueImpact: 50000,
    securityVulnerability: false,
  }),
  assessTestFailureRisk({
    test: 'SQL injection in search endpoint',
    category: 'SEC',
    affectedUsers: 10000,
    revenueImpact: 0,
    securityVulnerability: true,
  }),
];

// Identify coverage gaps
const coverageGaps: CoverageGap[] = [
  {
    acceptanceCriteria: 'User can reset password via email',
    testMissing: 'e2e/auth/password-reset.spec.ts',
    reason: '', // Empty = unresolved
  },
];

// Evaluate gate
const gateResult = evaluateGate({ risks, coverageGaps });

console.log(gateResult.decision); // 'FAIL'
console.log(gateResult.summary);
// "Gate Decision: FAIL. Total Risks: 2 (1 critical, 1 high). Coverage Gaps: 1."

console.log(gateResult.recommendations);
// [
//   "🚨 1 CRITICAL risk(s) must be mitigated before release",
//   "📋 1 acceptance criteria lack test coverage"
// ]
```

**Key Points**:

- **Automated decision**: No human interpretation required
- **Clear criteria**: FAIL = critical risks or gaps, CONCERNS = high risks with plans, PASS = low risks
- **Actionable output**: Recommendations drive next steps
- **Audit trail**: Timestamp, decision, and context for compliance

---
