# Step 1: Execution Mode Determination and Context Loading

## Mode Detection

- [ ] Execution mode correctly determined:
  - [ ] BMad-Integrated Mode (story_file variable set) OR
  - [ ] Standalone Mode (target_feature or target_files set) OR
  - [ ] Auto-discover Mode (no targets specified)

## BMad Artifacts (If Available - OPTIONAL)

- [ ] Story markdown loaded (if `{story_file}` provided)
- [ ] Acceptance criteria extracted from story (if available)
- [ ] Tech-spec.md loaded (if `{use_tech_spec}` true and file exists)
- [ ] Test-design.md loaded (if `{use_test_design}` true and file exists)
- [ ] PRD.md loaded (if `{use_prd}` true and file exists)
- [ ] **Note**: Absence of BMad artifacts does NOT halt workflow

## Framework Configuration

- [ ] Test framework config loaded (playwright.config.ts or cypress.config.ts)
- [ ] Test directory structure identified from `{test_dir}`
- [ ] Existing test patterns reviewed
- [ ] Test runner capabilities noted (parallel execution, fixtures, etc.)

## Coverage Analysis

- [ ] Existing test files searched in `{test_dir}` (if `{analyze_coverage}` true)
- [ ] Tested features vs untested features identified
- [ ] Coverage gaps mapped (tests to source files)
- [ ] Existing fixture and factory patterns checked

## Knowledge Base Fragments Loaded

- [ ] `test-levels-framework.md` - Test level selection
- [ ] `test-priorities.md` - Priority classification (P0-P3)
- [ ] `fixture-architecture.md` - Fixture patterns with auto-cleanup
- [ ] `data-factories.md` - Factory patterns using faker
- [ ] `selective-testing.md` - Targeted test execution strategies
- [ ] `ci-burn-in.md` - Flaky test detection patterns
- [ ] `test-quality.md` - Test design principles

---
