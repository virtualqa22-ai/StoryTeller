# Process Steps

## Step 1: Context Loading

- [ ] Gate type identified (story/epic/release/hotfix)
- [ ] Target ID extracted (story_id, epic_num, or release_version)
- [ ] Decision thresholds loaded from workflow variables
- [ ] Risk tolerance configuration loaded
- [ ] Waiver policy loaded

## Step 2: Evidence Parsing

**Test Results:**

- [ ] Total test count extracted
- [ ] Passed test count extracted
- [ ] Failed test count extracted
- [ ] Skipped test count extracted
- [ ] Test duration extracted
- [ ] P0 test pass rate calculated
- [ ] P1 test pass rate calculated
- [ ] Overall test pass rate calculated

**Quality Assessments:**

- [ ] P0/P1/P2/P3 scenarios extracted from test-design.md (if available)
- [ ] Risk scores extracted from test-design.md (if available)
- [ ] Coverage percentages extracted from traceability-matrix.md (available from Phase 1)
- [ ] Coverage gaps extracted from traceability-matrix.md (available from Phase 1)
- [ ] NFR status extracted from nfr-assessment.md (if available)
- [ ] Security issues count extracted from nfr-assessment.md (if available)

**Code Coverage:**

- [ ] Line coverage percentage extracted (if available)
- [ ] Branch coverage percentage extracted (if available)
- [ ] Function coverage percentage extracted (if available)
- [ ] Critical path coverage validated (if available)

**Burn-in Results:**

- [ ] Burn-in iterations count extracted (if available)
- [ ] Flaky tests count extracted (if available)
- [ ] Stability score calculated (if available)

## Step 3: Decision Rules Application

**P0 Criteria Evaluation:**

- [ ] P0 test pass rate evaluated (must be 100%)
- [ ] P0 acceptance criteria coverage evaluated (must be 100%)
- [ ] Security issues count evaluated (must be 0)
- [ ] Critical NFR failures evaluated (must be 0)
- [ ] Flaky tests evaluated (must be 0 if burn-in enabled)
- [ ] P0 decision recorded: PASS or FAIL

**P1 Criteria Evaluation:**

- [ ] P1 test pass rate evaluated (threshold: min_p1_pass_rate)
- [ ] P1 acceptance criteria coverage evaluated (threshold: 95%)
- [ ] Overall test pass rate evaluated (threshold: min_overall_pass_rate)
- [ ] Code coverage evaluated (threshold: min_coverage)
- [ ] P1 decision recorded: PASS or CONCERNS

**P2/P3 Criteria Evaluation:**

- [ ] P2 failures tracked (informational, don't block if allow_p2_failures: true)
- [ ] P3 failures tracked (informational, don't block if allow_p3_failures: true)
- [ ] Residual risks documented

**Final Decision:**

- [ ] Decision determined: PASS / CONCERNS / FAIL / WAIVED
- [ ] Decision rationale documented
- [ ] Decision is deterministic (follows rules, not arbitrary)

## Step 4: Documentation

**Gate Decision Document Created:**

- [ ] Story/epic/release info section complete (ID, title, description, links)
- [ ] Decision clearly stated (PASS / CONCERNS / FAIL / WAIVED)
- [ ] Decision date recorded
- [ ] Evaluator recorded (user or agent name)

**Evidence Summary Documented:**

- [ ] Test results summary complete (total, passed, failed, pass rates)
- [ ] Coverage summary complete (P0/P1 criteria, code coverage)
- [ ] NFR validation summary complete (security, performance, reliability, maintainability)
- [ ] Flakiness summary complete (burn-in iterations, flaky test count)

**Rationale Documented:**

- [ ] Decision rationale clearly explained
- [ ] Key evidence highlighted
- [ ] Assumptions and caveats noted (if any)

**Residual Risks Documented (if CONCERNS or WAIVED):**

- [ ] Unresolved P1/P2 issues listed
- [ ] Probability × impact estimated for each risk
- [ ] Mitigations or workarounds described

**Waivers Documented (if WAIVED):**

- [ ] Waiver reason documented (business justification)
- [ ] Waiver approver documented (name, role)
- [ ] Waiver expiry date documented
- [ ] Remediation plan documented (fix in next release, due date)
- [ ] Monitoring plan documented

**Critical Issues Documented (if FAIL or CONCERNS):**

- [ ] Top 5-10 critical issues listed
- [ ] Priority assigned to each issue (P0/P1/P2)
- [ ] Owner assigned to each issue
- [ ] Due date assigned to each issue

**Recommendations Documented:**

- [ ] Next steps clearly stated for decision type
- [ ] Deployment recommendation provided
- [ ] Monitoring recommendations provided (if applicable)
- [ ] Remediation recommendations provided (if applicable)

## Step 5: Status Updates and Notifications

**Status File Updated:**

- [ ] Gate decision appended to bmm-workflow-status.md (if append_to_history: true)
- [ ] Format correct: `[DATE] Gate Decision: DECISION - Target {ID} - {rationale}`
- [ ] Status file committed or staged for commit

**Gate YAML Created:**

- [ ] Gate YAML snippet generated with decision and criteria
- [ ] Evidence references included in YAML
- [ ] Next steps included in YAML
- [ ] YAML file saved to output folder

**Stakeholder Notification Generated:**

- [ ] Notification subject line created
- [ ] Notification body created with summary
- [ ] Recipients identified (PM, SM, DEV lead, stakeholders)
- [ ] Notification ready for delivery (if notify_stakeholders: true)

**Outputs Saved:**

- [ ] Gate decision document saved to `{output_file}`
- [ ] Gate YAML saved to `{output_folder}/gate-decision-{target}.yaml`
- [ ] All outputs are valid and readable

---
