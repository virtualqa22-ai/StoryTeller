# Troubleshooting Quick Flow

## Common Issues

**Issue: Scope creep during development**
**Solution:** Refer back to tech spec, explicitly document new requirements

**Issue: Unknown patterns or conventions**
**Solution:** Use party-mode to bring in architect or senior dev

**Issue: Testing bottleneck**
**Solution:** Leverage TEA agent for automated test generation

**Issue: Integration conflicts**
**Solution:** Document dependencies, coordinate with affected teams

## Emergency Procedures

**Production Hotfix:**

1. Create branch from production
2. Quick dev with minimal changes
3. Deploy to staging
4. Quick regression test
5. Deploy to production
6. Merge to main

**Critical Bug:**

1. Immediate investigation
2. Party-mode if unclear
3. Quick fix with rollback plan
4. Post-mortem documentation

---
