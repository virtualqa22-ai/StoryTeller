# File and Path Issues

## Problem: Output files in wrong location

**Symptoms:**

- PRD created in wrong folder
- Story files not where expected
- Documentation scattered

**Solution:**
Check `bmad/bmm/config.yaml` for configured paths:

```yaml
output_folder: '{project-root}/docs'
dev_story_location: '{project-root}/docs/stories'
```

Default locations:

- Planning docs (PRD, epics, architecture): `{output_folder}/`
- Stories: `{dev_story_location}/`
- Status files: `{output_folder}/bmm-workflow-status.md`, `{output_folder}/sprint-status.yaml`

To change locations, edit config.yaml then re-run workflows.

## Problem: Can't find status file

**Symptoms:**

- workflow-status says no status file
- Can't track progress
- Lost place in workflow

**Solution:**

1. **Check default location**: `docs/bmm-workflow-status.md`
2. **If missing, reinitialize**:
   ```
   Load Analyst agent → run workflow-init
   ```
3. **For Phase 4**: Look for `sprint-status.yaml` in same folder as PRD
4. **Search for it**:
   ```bash
   find . -name "bmm-workflow-status.md"
   find . -name "sprint-status.yaml"
   ```

## Problem: Sprint-status.yaml not updating

**Symptoms:**

- Workflows complete but status unchanged
- Stories stuck in old status
- Epic status not progressing

**Solution:**

1. **Manual update required** - Most status changes are manual:
   ```yaml
   stories:
     - id: epic-1-story-1
       status: done # Change this manually
   ```
2. **Some workflows auto-update**:
   - sprint-planning creates file
   - create-story changes story to "ready-for-dev"
   - dev-story may auto-update (check workflow)
3. **Re-run sprint-planning** to resync if needed

---
