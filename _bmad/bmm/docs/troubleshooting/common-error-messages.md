# Common Error Messages

## "No workflow status file found"

**Cause:** Haven't run workflow-init yet
**Fix:** Load Analyst agent → run workflow-init

## "Epic file not found"

**Cause:** PRD/epics not created, or wrong path
**Fix:** Verify PRD/epics exist in output folder, check config.yaml paths

## "Story not in sprint-status.yaml"

**Cause:** Sprint-planning not run, or story file not created
**Fix:** Run sprint-planning workflow, verify story files exist

## "Documentation insufficient for brownfield"

**Cause:** No docs/index.md or document-project not run
**Fix:** Run document-project workflow with Deep scan

## "Level detection failed"

**Cause:** Ambiguous project description
**Fix:** Be more specific, use level keywords (fix, feature, platform, etc.)

## "Context generation failed"

**Cause:** Missing prerequisites (story file or docs)
**Fix:** Verify story file exists, docs present

---
