# Example 3: Risk Mitigation Workflow with Owner Tracking

**Context**: Track risk mitigation from identification to resolution

**Implementation**:

```typescript
// risk-mitigation.ts
export type MitigationAction = {
  riskId: string;
  action: string;
  owner: string;
  deadline: Date;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';
  completedAt?: Date;
  blockedReason?: string;
};

export class RiskMitigationTracker {
  private risks: Map<string, RiskScore> = new Map();
  private actions: Map<string, MitigationAction[]> = new Map();
  private history: Array<{ riskId: string; event: string; timestamp: Date }> = [];

  // Register a new risk
  addRisk(risk: RiskScore): void {
    this.risks.set(risk.id, risk);
    this.logHistory(risk.id, `Risk registered: ${risk.title} (Score: ${risk.score})`);

    // Auto-assign mitigation requirements for score ≥6
    if (requiresMitigation(risk.score) && !risk.mitigationPlan) {
      this.logHistory(risk.id, `⚠️  Mitigation required (score ${risk.score}). Assign owner and plan.`);
    }
  }

  // Add mitigation action
  addMitigationAction(action: MitigationAction): void {
    const risk = this.risks.get(action.riskId);
    if (!risk) throw new Error(`Risk ${action.riskId} not found`);

    const existingActions = this.actions.get(action.riskId) || [];
    existingActions.push(action);
    this.actions.set(action.riskId, existingActions);

    this.logHistory(action.riskId, `Mitigation action added: ${action.action} (Owner: ${action.owner})`);
  }

  // Complete mitigation action
  completeMitigation(riskId: string, actionIndex: number): void {
    const actions = this.actions.get(riskId);
    if (!actions || !actions[actionIndex]) throw new Error('Action not found');

    actions[actionIndex].status = 'COMPLETED';
    actions[actionIndex].completedAt = new Date();

    this.logHistory(riskId, `Mitigation completed: ${actions[actionIndex].action}`);

    // If all actions completed, mark risk as MITIGATED
    if (actions.every((a) => a.status === 'COMPLETED')) {
      const risk = this.risks.get(riskId)!;
      risk.status = 'MITIGATED';
      this.logHistory(riskId, `✅ Risk mitigated. All actions complete.`);
    }
  }

  // Request waiver for a risk
  requestWaiver(riskId: string, reason: string, approver: string, expiryDays: number): void {
    const risk = this.risks.get(riskId);
    if (!risk) throw new Error(`Risk ${riskId} not found`);

    risk.status = 'WAIVED';
    risk.waiverReason = reason;
    risk.waiverApprover = approver;
    risk.waiverExpiry = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);

    this.logHistory(riskId, `⚠️  Waiver granted by ${approver}. Expires: ${risk.waiverExpiry}`);
  }

  // Generate risk report
  generateReport(): string {
    const allRisks = Array.from(this.risks.values());
    const critical = allRisks.filter((r) => r.score === 9 && r.status === 'OPEN');
    const high = allRisks.filter((r) => r.score >= 6 && r.score < 9 && r.status === 'OPEN');
    const mitigated = allRisks.filter((r) => r.status === 'MITIGATED');
    const waived = allRisks.filter((r) => r.status === 'WAIVED');

    let report = `# Risk Mitigation Report\n\n`;
    report += `**Generated**: ${new Date().toISOString()}\n\n`;
    report += `## Summary\n`;
    report += `- Total Risks: ${allRisks.length}\n`;
    report += `- Critical (Score=9, OPEN): ${critical.length}\n`;
    report += `- High (Score 6-8, OPEN): ${high.length}\n`;
    report += `- Mitigated: ${mitigated.length}\n`;
    report += `- Waived: ${waived.length}\n\n`;

    if (critical.length > 0) {
      report += `## 🚨 Critical Risks (BLOCKERS)\n\n`;
      critical.forEach((r) => {
        report += `- **${r.title}** (${r.category})\n`;
        report += `  - Score: ${r.score} (Probability: ${r.probability}, Impact: ${r.impact})\n`;
        report += `  - Owner: ${r.owner}\n`;
        report += `  - Mitigation: ${r.mitigationPlan || 'NOT ASSIGNED'}\n\n`;
      });
    }

    if (high.length > 0) {
      report += `## ⚠️  High Risks\n\n`;
      high.forEach((r) => {
        report += `- **${r.title}** (${r.category})\n`;
        report += `  - Score: ${r.score}\n`;
        report += `  - Owner: ${r.owner}\n`;
        report += `  - Deadline: ${r.deadline?.toISOString().split('T')[0] || 'NOT SET'}\n\n`;
      });
    }

    return report;
  }

  private logHistory(riskId: string, event: string): void {
    this.history.push({ riskId, event, timestamp: new Date() });
  }

  getHistory(riskId: string): Array<{ event: string; timestamp: Date }> {
    return this.history.filter((h) => h.riskId === riskId).map((h) => ({ event: h.event, timestamp: h.timestamp }));
  }
}
```

**Usage Example**:

```typescript
const tracker = new RiskMitigationTracker();

// Register critical security risk
tracker.addRisk({
  id: 'risk-001',
  category: 'SEC',
  title: 'SQL injection vulnerability in user search',
  description: 'Unsanitized input allows arbitrary SQL execution',
  probability: 3,
  impact: 3,
  score: 9,
  owner: 'security-team',
  status: 'OPEN',
});

// Add mitigation actions
tracker.addMitigationAction({
  riskId: 'risk-001',
  action: 'Add parameterized queries to user-search endpoint',
  owner: 'alice@example.com',
  deadline: new Date('2025-10-20'),
  status: 'IN_PROGRESS',
});

tracker.addMitigationAction({
  riskId: 'risk-001',
  action: 'Add WAF rule to block SQL injection patterns',
  owner: 'bob@example.com',
  deadline: new Date('2025-10-22'),
  status: 'PENDING',
});

// Complete first action
tracker.completeMitigation('risk-001', 0);

// Generate report
console.log(tracker.generateReport());
// Markdown report with critical risks, owners, deadlines

// View history
console.log(tracker.getHistory('risk-001'));
// [
//   { event: 'Risk registered: SQL injection...', timestamp: ... },
//   { event: 'Mitigation action added: Add parameterized queries...', timestamp: ... },
//   { event: 'Mitigation completed: Add parameterized queries...', timestamp: ... }
// ]
```

**Key Points**:

- **Ownership enforcement**: Every risk >4 requires owner assignment
- **Deadline tracking**: Mitigation actions have explicit deadlines
- **Audit trail**: Complete history of risk lifecycle (registered → mitigated)
- **Automated reports**: Markdown output for Confluence/GitHub wikis

---
