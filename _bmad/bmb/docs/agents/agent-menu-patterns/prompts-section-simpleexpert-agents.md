# Prompts Section (Simple/Expert Agents)

## Prompt Structure

```yaml
prompts:
  - id: unique-identifier
    content: |
      <instructions>
      What this prompt accomplishes
      </instructions>

      <process>
      1. First step
      {{#if custom_option}}
      2. Conditional step
      {{/if}}
      3. Final step
      </process>

      <output_format>
      Expected structure of results
      </output_format>
```

## Semantic XML Tags in Prompts

Use XML tags to structure prompt content:

- `<instructions>` - What to do
- `<process>` - Step-by-step approach
- `<output_format>` - Expected results
- `<examples>` - Sample outputs
- `<constraints>` - Limitations
- `<context>` - Background information

## Handlebars in Prompts

Customize based on install_config:

```yaml
prompts:
  - id: analyze
    content: |
      {{#if detailed_mode}}
      Perform comprehensive analysis with full explanations.
      {{/if}}
      {{#unless detailed_mode}}
      Quick analysis focusing on key points.
      {{/unless}}

      Address {{user_name}} in {{communication_style}} tone.
```
