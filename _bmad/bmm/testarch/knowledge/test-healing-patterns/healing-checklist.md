# Healing Checklist

Before enabling auto-healing in workflows:

- [ ] **Failure catalog documented**: Common patterns identified (selectors, timing, data, network, hard waits)
- [ ] **Diagnostic signatures defined**: Error message patterns for each failure type
- [ ] **Healing strategies documented**: Fix patterns for each failure type
- [ ] **Prevention patterns documented**: Best practices to avoid recurrence
- [ ] **Healing iteration limit set**: Max 3 attempts before marking test.fixme()
- [ ] **MCP integration optional**: Graceful degradation without Playwright MCP
- [ ] **Pattern-based fallback**: Use knowledge base patterns when MCP unavailable
- [ ] **Healing report generated**: Document what was healed and how
