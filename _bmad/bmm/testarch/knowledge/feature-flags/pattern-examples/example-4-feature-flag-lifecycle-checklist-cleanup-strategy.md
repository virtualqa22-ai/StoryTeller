# Example 4: Feature Flag Lifecycle Checklist & Cleanup Strategy

**Context**: Governance checklist and automated cleanup detection for stale flags.

**Implementation**:

```typescript
// scripts/feature-flag-audit.ts
/**
 * Feature Flag Lifecycle Audit Script
 * Run weekly to detect stale flags requiring cleanup
 */

import { FLAG_REGISTRY, FLAGS, getExpiredFlags, FlagKey } from '../src/utils/feature-flags';
import * as fs from 'fs';
import * as path from 'path';

type AuditResult = {
  totalFlags: number;
  expiredFlags: FlagKey[];
  missingOwners: FlagKey[];
  missingDates: FlagKey[];
  permanentFlags: FlagKey[];
  flagsNearingExpiry: FlagKey[];
};

/**
 * Audit all feature flags for governance compliance
 */
function auditFeatureFlags(): AuditResult {
  const allFlags = Object.keys(FLAG_REGISTRY) as FlagKey[];
  const expiredFlags = getExpiredFlags().map((meta) => meta.key);

  // Flags expiring in next 30 days
  const thirtyDaysFromNow = Date.now() + 30 * 24 * 60 * 60 * 1000;
  const flagsNearingExpiry = allFlags.filter((flag) => {
    const meta = FLAG_REGISTRY[flag];
    if (!meta.expiryDate) return false;
    const expiry = new Date(meta.expiryDate).getTime();
    return expiry > Date.now() && expiry < thirtyDaysFromNow;
  });

  // Missing metadata
  const missingOwners = allFlags.filter((flag) => !FLAG_REGISTRY[flag].owner);
  const missingDates = allFlags.filter((flag) => !FLAG_REGISTRY[flag].createdDate);

  // Permanent flags (no expiry, requiresCleanup = false)
  const permanentFlags = allFlags.filter((flag) => {
    const meta = FLAG_REGISTRY[flag];
    return !meta.expiryDate && !meta.requiresCleanup;
  });

  return {
    totalFlags: allFlags.length,
    expiredFlags,
    missingOwners,
    missingDates,
    permanentFlags,
    flagsNearingExpiry,
  };
}

/**
 * Generate markdown report
 */
function generateReport(audit: AuditResult): string {
  let report = `# Feature Flag Audit Report\n\n`;
  report += `**Date**: ${new Date().toISOString()}\n`;
  report += `**Total Flags**: ${audit.totalFlags}\n\n`;

  if (audit.expiredFlags.length > 0) {
    report += `## ⚠️ EXPIRED FLAGS - IMMEDIATE CLEANUP REQUIRED\n\n`;
    audit.expiredFlags.forEach((flag) => {
      const meta = FLAG_REGISTRY[flag];
      report += `- **${meta.name}** (\`${flag}\`)\n`;
      report += `  - Owner: ${meta.owner}\n`;
      report += `  - Expired: ${meta.expiryDate}\n`;
      report += `  - Action: Remove flag code, update tests, deploy\n\n`;
    });
  }

  if (audit.flagsNearingExpiry.length > 0) {
    report += `## ⏰ FLAGS EXPIRING SOON (Next 30 Days)\n\n`;
    audit.flagsNearingExpiry.forEach((flag) => {
      const meta = FLAG_REGISTRY[flag];
      report += `- **${meta.name}** (\`${flag}\`)\n`;
      report += `  - Owner: ${meta.owner}\n`;
      report += `  - Expires: ${meta.expiryDate}\n`;
      report += `  - Action: Plan cleanup or extend expiry\n\n`;
    });
  }

  if (audit.permanentFlags.length > 0) {
    report += `## 🔄 PERMANENT FLAGS (No Expiry)\n\n`;
    audit.permanentFlags.forEach((flag) => {
      const meta = FLAG_REGISTRY[flag];
      report += `- **${meta.name}** (\`${flag}\`) - Owner: ${meta.owner}\n`;
    });
    report += `\n`;
  }

  if (audit.missingOwners.length > 0 || audit.missingDates.length > 0) {
    report += `## ❌ GOVERNANCE ISSUES\n\n`;
    if (audit.missingOwners.length > 0) {
      report += `**Missing Owners**: ${audit.missingOwners.join(', ')}\n`;
    }
    if (audit.missingDates.length > 0) {
      report += `**Missing Created Dates**: ${audit.missingDates.join(', ')}\n`;
    }
    report += `\n`;
  }

  return report;
}

/**
 * Feature Flag Lifecycle Checklist
 */
const FLAG_LIFECYCLE_CHECKLIST = `
# Feature Flag Lifecycle Checklist

# Before Creating a New Flag

- [ ] **Name**: Follow naming convention (kebab-case, descriptive)
- [ ] **Owner**: Assign team/individual responsible
- [ ] **Default State**: Determine safe default (usually false)
- [ ] **Expiry Date**: Set removal date (30-90 days typical)
- [ ] **Dependencies**: Document related flags
- [ ] **Telemetry**: Plan analytics events to track
- [ ] **Rollback Plan**: Define how to disable quickly

# During Development

- [ ] **Code Paths**: Both enabled/disabled states implemented
- [ ] **Tests**: Both variations tested in CI
- [ ] **Documentation**: Flag purpose documented in code/PR
- [ ] **Telemetry**: Analytics events instrumented
- [ ] **Error Handling**: Graceful degradation on flag service failure

# Before Launch

- [ ] **QA**: Both states tested in staging
- [ ] **Rollout Plan**: Gradual rollout percentage defined
- [ ] **Monitoring**: Dashboards/alerts for flag-related metrics
- [ ] **Stakeholder Communication**: Product/design aligned

# After Launch (Monitoring)

- [ ] **Metrics**: Success criteria tracked
- [ ] **Error Rates**: No increase in errors
- [ ] **Performance**: No degradation
- [ ] **User Feedback**: Qualitative data collected

# Cleanup (Post-Launch)

- [ ] **Remove Flag Code**: Delete if/else branches
- [ ] **Update Tests**: Remove flag-specific tests
- [ ] **Remove Targeting**: Clear all user targets
- [ ] **Delete Flag Config**: Remove from LaunchDarkly/registry
- [ ] **Update Documentation**: Remove references
- [ ] **Deploy**: Ship cleanup changes
`;

// Run audit
const audit = auditFeatureFlags();
const report = generateReport(audit);

// Save report
const outputPath = path.join(__dirname, '../feature-flag-audit-report.md');
fs.writeFileSync(outputPath, report);
fs.writeFileSync(path.join(__dirname, '../FEATURE-FLAG-CHECKLIST.md'), FLAG_LIFECYCLE_CHECKLIST);

console.log(`✅ Audit complete. Report saved to: ${outputPath}`);
console.log(`Total flags: ${audit.totalFlags}`);
console.log(`Expired flags: ${audit.expiredFlags.length}`);
console.log(`Flags expiring soon: ${audit.flagsNearingExpiry.length}`);

// Exit with error if expired flags exist
if (audit.expiredFlags.length > 0) {
  console.error(`\n❌ EXPIRED FLAGS DETECTED - CLEANUP REQUIRED`);
  process.exit(1);
}
```

**package.json scripts**:

```json
{
  "scripts": {
    "feature-flags:audit": "ts-node scripts/feature-flag-audit.ts",
    "feature-flags:audit:ci": "npm run feature-flags:audit || true"
  }
}
```

**Key Points**:

- **Automated detection**: Weekly audit catches stale flags
- **Lifecycle checklist**: Comprehensive governance guide
- **Expiry tracking**: Flags auto-expire after defined date
- **CI integration**: Audit runs in pipeline, warns on expiry
- **Ownership clarity**: Every flag has assigned owner

---
