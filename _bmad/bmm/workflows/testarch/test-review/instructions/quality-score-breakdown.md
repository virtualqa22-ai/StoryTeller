# Quality Score Breakdown

- Starting Score: 100
- Critical Violations (1 × -10): -10
- High Violations (2 × -5): -10
- Medium Violations (0 × -2): 0
- Low Violations (1 × -1): -1
- Bonus (BDD +5, Test IDs +5): +10
- **Final Score**: 78/100 (B)

```

---

# Integration with Other Workflows

## Before Test Review

- **atdd**: Generate acceptance tests (TEA reviews them for quality)
- **automate**: Expand regression suite (TEA reviews new tests)
- **dev story**: Developer writes implementation tests (TEA reviews them)

## After Test Review

- **Developer**: Addresses critical issues, improves based on recommendations
- **gate**: Test quality review feeds into gate decision (high-quality tests increase confidence)

## Coordinates With

- **Story File**: Review links to acceptance criteria context
- **Test Design**: Review validates tests align with prioritization
- **Knowledge Base**: Review references fragments for detailed guidance

---

# Important Notes

1. **Non-Prescriptive**: Review provides guidance, not rigid rules
2. **Context Matters**: Some violations may be justified for specific scenarios
3. **Knowledge-Based**: All feedback grounded in proven patterns from tea-index.csv
4. **Actionable**: Every issue includes recommended fix with code examples
5. **Quality Score**: Use as indicator, not absolute measure
6. **Continuous Improvement**: Review same tests periodically as patterns evolve

---

# Troubleshooting

**Problem: No test files found**
- Verify test_dir path is correct
- Check test file extensions match glob pattern
- Ensure test files exist in expected location

**Problem: Quality score seems too low/high**
- Review violation counts - may need to adjust thresholds
- Consider context - some projects have different standards
- Focus on critical issues first, not just score

**Problem: Inline comments not generated**
- Check generate_inline_comments: true in variables
- Verify write permissions on test files
- Review append_to_file: false (separate report mode)

**Problem: Knowledge fragments not loading**
- Verify tea-index.csv exists in testarch/ directory
- Check fragment file paths are correct
- Ensure auto_load_knowledge: true in variables
```
