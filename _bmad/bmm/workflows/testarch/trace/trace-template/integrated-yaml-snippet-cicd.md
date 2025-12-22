# Integrated YAML Snippet (CI/CD)

```yaml
traceability_and_gate:
  # Phase 1: Traceability
  traceability:
    story_id: "{STORY_ID}"
    date: "{DATE}"
    coverage:
      overall: {OVERALL_PCT}%
      p0: {P0_PCT}%
      p1: {P1_PCT}%
      p2: {P2_PCT}%
      p3: {P3_PCT}%
    gaps:
      critical: {CRITICAL_COUNT}
      high: {HIGH_COUNT}
      medium: {MEDIUM_COUNT}
      low: {LOW_COUNT}
    quality:
      passing_tests: {PASSING_COUNT}
      total_tests: {TOTAL_TESTS}
      blocker_issues: {BLOCKER_COUNT}
      warning_issues: {WARNING_COUNT}
    recommendations:
      - "{RECOMMENDATION_1}"
      - "{RECOMMENDATION_2}"

  # Phase 2: Gate Decision
  gate_decision:
    decision: "{PASS | CONCERNS | FAIL | WAIVED}"
    gate_type: "{story | epic | release | hotfix}"
    decision_mode: "{deterministic | manual}"
    criteria:
      p0_coverage: {p0_coverage}%
      p0_pass_rate: {p0_pass_rate}%
      p1_coverage: {p1_coverage}%
      p1_pass_rate: {p1_pass_rate}%
      overall_pass_rate: {overall_pass_rate}%
      overall_coverage: {overall_coverage}%
      security_issues: {security_issue_count}
      critical_nfrs_fail: {critical_nfr_fail_count}
      flaky_tests: {flaky_test_count}
    thresholds:
      min_p0_coverage: 100
      min_p0_pass_rate: 100
      min_p1_coverage: {min_p1_coverage}
      min_p1_pass_rate: {min_p1_pass_rate}
      min_overall_pass_rate: {min_overall_pass_rate}
      min_coverage: {min_coverage}
    evidence:
      test_results: "{CI_run_id | test_report_url}"
      traceability: "{trace_file_path}"
      nfr_assessment: "{nfr_file_path}"
      code_coverage: "{coverage_report_url}"
    next_steps: "{brief_summary_of_recommendations}"
    waiver: # Only if WAIVED
      reason: "{business_justification}"
      approver: "{name}, {role}"
      expiry: "{YYYY-MM-DD}"
      remediation_due: "{YYYY-MM-DD}"
```

---
