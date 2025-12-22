# Agent Customization

You can customize any agent's personality without modifying core agent files.

## Location

**Customization Directory:** `{project-root}/_bmad/_config/agents/`

**Naming Convention:** `{module}-{agent-name}.customize.yaml`

**Examples:**

```
_bmad/_config/agents/
├── bmm-pm.customize.yaml
├── bmm-dev.customize.yaml
├── cis-storyteller.customize.yaml
└── bmb-bmad-builder.customize.yaml
```

## Override Structure

**File Format:**

```yaml
agent:
  persona:
    displayName: 'Custom Name' # Optional: Override display name
    communicationStyle: 'Custom style description' # Optional: Override style
    principles: # Optional: Add or replace principles
      - 'Custom principle for this project'
      - 'Another project-specific guideline'
```

## Override Behavior

**Precedence:** Customization > Manifest

**Merge Rules:**

- If field specified in customization, it replaces manifest value
- If field NOT specified, manifest value used
- Additional fields are added to agent personality
- Changes apply immediately when agent loaded

## Use Cases

**Adjust Formality:**

```yaml
agent:
  persona:
    communicationStyle: 'Formal and corporate-focused. Uses business terminology. Structured responses with executive summaries.'
```

**Add Domain Expertise:**

```yaml
agent:
  persona:
    identity: |
      Expert Product Manager with 15 years experience in healthcare SaaS.
      Deep understanding of HIPAA compliance, EHR integrations, and clinical workflows.
      Specializes in balancing regulatory requirements with user experience.
```

**Modify Principles:**

```yaml
agent:
  persona:
    principles:
      - 'HIPAA compliance is non-negotiable'
      - 'Prioritize patient safety over feature velocity'
      - 'Every feature must have clinical validation'
```

**Change Personality:**

```yaml
agent:
  persona:
    displayName: 'Alex' # Change from default "Amelia"
    communicationStyle: 'Casual and friendly. Uses emojis. Explains technical concepts in simple terms.'
```

## Party Mode Integration

Customizations automatically apply in party mode:

1. Party mode reads manifest
2. Checks for customization files
3. Merges customizations with manifest
4. Agents respond with customized personalities

**Example:**

```
You customize PM with healthcare expertise.
In party mode, PM now brings healthcare knowledge to discussions.
Other agents collaborate with PM's specialized perspective.
```

## Applying Customizations

**IMPORTANT:** Customizations don't take effect until you rebuild the agents.

**Complete Process:**

**Step 1: Create/Modify Customization File**

```bash
# Create customization file at:
# {project-root}/_bmad/_config/agents/{module}-{agent-name}.customize.yaml

# Example: _bmad/_config/agents/bmm-pm.customize.yaml
```

**Step 2: Regenerate Agent Manifest**

After modifying customization files, you must regenerate the agent manifest and rebuild agents:

```bash
# Run the installer to apply customizations
npx bmad-method install

# The installer will:
# 1. Read all customization files
# 2. Regenerate agent-manifest.csv with merged data
# 3. Rebuild agent .md files with customizations applied
```

**Step 3: Verify Changes**

Load the customized agent and verify the changes are reflected in its behavior and responses.

**Why This is Required:**

- Customization files are just configuration - they don't change agents directly
- The agent manifest must be regenerated to merge customizations
- Agent .md files must be rebuilt with the merged data
- Party mode and all workflows load agents from the rebuilt files

## Best Practices

1. **Keep it project-specific:** Customize for your domain, not general changes
2. **Don't break character:** Keep customizations aligned with agent's core role
3. **Test in party mode:** See how customizations interact with other agents
4. **Document why:** Add comments explaining customization purpose
5. **Share with team:** Customizations survive updates, can be version controlled
6. **Rebuild after changes:** Always run installer after modifying customization files

---
