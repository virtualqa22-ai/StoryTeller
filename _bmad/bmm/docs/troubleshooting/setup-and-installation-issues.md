# Setup and Installation Issues

## Problem: BMM not found after installation

**Symptoms:**

- `bmad` command not recognized
- Agent files not accessible
- Workflows don't load

**Solution:**

```bash
# Check if BMM is installed
ls bmad/

# If not present, run installer
npx bmad-method@alpha install

# For fresh install
npx bmad-method@alpha install --skip-version-prompt
```

## Problem: Agents don't have menu

**Symptoms:**

- Load agent file but no menu appears
- Agent doesn't respond to commands

**Solution:**

1. Ensure you're loading the correct agent file path: `bmad/bmm/agents/[agent-name].md`
2. Wait a few seconds for agent to initialize
3. Try asking "show menu" or "help"
4. Check IDE supports Markdown rendering with context
5. For Claude Code: Ensure agent file is open in chat context

## Problem: Workflows not found

**Symptoms:**

- Agent says workflow doesn't exist
- Menu shows workflow but won't run

**Solution:**

1. Check workflow exists: `ls bmad/bmm/workflows/`
2. Verify agent has access to workflow (check agent's workflow list)
3. Try using menu number instead of workflow name
4. Restart chat with agent in fresh session

---
