# Example 4: Coverage Traceability Matrix (Test-to-Requirement Mapping)

**Context**: Validate that every acceptance criterion maps to at least one test

**Implementation**:

```typescript
// coverage-traceability.ts
export type AcceptanceCriterion = {
  id: string;
  story: string;
  criterion: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
};

export type TestCase = {
  file: string;
  name: string;
  criteriaIds: string[]; // Links to acceptance criteria
};

export type CoverageMatrix = {
  criterion: AcceptanceCriterion;
  tests: TestCase[];
  covered: boolean;
  waiverReason?: string;
};

export function buildCoverageMatrix(criteria: AcceptanceCriterion[], tests: TestCase[]): CoverageMatrix[] {
  return criteria.map((criterion) => {
    const matchingTests = tests.filter((t) => t.criteriaIds.includes(criterion.id));

    return {
      criterion,
      tests: matchingTests,
      covered: matchingTests.length > 0,
    };
  });
}

export function validateCoverage(matrix: CoverageMatrix[]): {
  gaps: CoverageMatrix[];
  passRate: number;
} {
  const gaps = matrix.filter((m) => !m.covered && !m.waiverReason);
  const passRate = ((matrix.length - gaps.length) / matrix.length) * 100;

  return { gaps, passRate };
}

// Example: Extract criteria IDs from test names
export function extractCriteriaFromTests(testFiles: string[]): TestCase[] {
  // Simplified: In real implementation, parse test files with AST
  // Here we simulate extraction from test names
  return [
    {
      file: 'tests/e2e/auth/login.spec.ts',
      name: 'should allow user to login with valid credentials',
      criteriaIds: ['AC-001', 'AC-002'], // Linked to acceptance criteria
    },
    {
      file: 'tests/e2e/auth/password-reset.spec.ts',
      name: 'should send password reset email',
      criteriaIds: ['AC-003'],
    },
  ];
}

// Generate Markdown traceability report
export function generateTraceabilityReport(matrix: CoverageMatrix[]): string {
  let report = `# Requirements-to-Tests Traceability Matrix\n\n`;
  report += `**Generated**: ${new Date().toISOString()}\n\n`;

  const { gaps, passRate } = validateCoverage(matrix);

  report += `## Summary\n`;
  report += `- Total Criteria: ${matrix.length}\n`;
  report += `- Covered: ${matrix.filter((m) => m.covered).length}\n`;
  report += `- Gaps: ${gaps.length}\n`;
  report += `- Waived: ${matrix.filter((m) => m.waiverReason).length}\n`;
  report += `- Coverage Rate: ${passRate.toFixed(1)}%\n\n`;

  if (gaps.length > 0) {
    report += `## ❌ Coverage Gaps (MUST RESOLVE)\n\n`;
    report += `| Story | Criterion | Priority | Tests |\n`;
    report += `|-------|-----------|----------|-------|\n`;
    gaps.forEach((m) => {
      report += `| ${m.criterion.story} | ${m.criterion.criterion} | ${m.criterion.priority} | None |\n`;
    });
    report += `\n`;
  }

  report += `## ✅ Covered Criteria\n\n`;
  report += `| Story | Criterion | Tests |\n`;
  report += `|-------|-----------|-------|\n`;
  matrix
    .filter((m) => m.covered)
    .forEach((m) => {
      const testList = m.tests.map((t) => `\`${t.file}\``).join(', ');
      report += `| ${m.criterion.story} | ${m.criterion.criterion} | ${testList} |\n`;
    });

  return report;
}
```

**Usage Example**:

```typescript
// Define acceptance criteria
const criteria: AcceptanceCriterion[] = [
  { id: 'AC-001', story: 'US-123', criterion: 'User can login with email', priority: 'P0' },
  { id: 'AC-002', story: 'US-123', criterion: 'User sees error on invalid password', priority: 'P0' },
  { id: 'AC-003', story: 'US-124', criterion: 'User receives password reset email', priority: 'P1' },
  { id: 'AC-004', story: 'US-125', criterion: 'User can update profile', priority: 'P2' }, // NO TEST
];

// Extract tests
const tests: TestCase[] = extractCriteriaFromTests(['tests/e2e/auth/login.spec.ts', 'tests/e2e/auth/password-reset.spec.ts']);

// Build matrix
const matrix = buildCoverageMatrix(criteria, tests);

// Validate
const { gaps, passRate } = validateCoverage(matrix);
console.log(`Coverage: ${passRate.toFixed(1)}%`); // "Coverage: 75.0%"
console.log(`Gaps: ${gaps.length}`); // "Gaps: 1" (AC-004 has no test)

// Generate report
const report = generateTraceabilityReport(matrix);
console.log(report);
// Markdown table showing coverage gaps
```

**Key Points**:

- **Bidirectional traceability**: Criteria → Tests and Tests → Criteria
- **Gap detection**: Automatically identifies missing coverage
- **Priority awareness**: P0 gaps are critical blockers
- **Waiver support**: Allow explicit waivers for low-priority gaps

---
