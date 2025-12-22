# Project Documentation Index

## Project Overview

- **Type:** {{repository_type}} {{#if multi-part}}with {{parts.length}} parts{{/if}}
- **Primary Language:** {{primary_language}}
- **Architecture:** {{architecture_type}}

## Quick Reference

{{#if single_part}}

- **Tech Stack:** {{tech_stack_summary}}
- **Entry Point:** {{entry_point}}
- **Architecture Pattern:** {{architecture_pattern}}
  {{else}}
  {{#each parts}}

### {{part_name}} ({{part_id}})

- **Type:** {{project_type}}
- **Tech Stack:** {{tech_stack}}
- **Root:** {{root_path}}
  {{/each}}
  {{/if}}

## Generated Documentation

- [Project Overview](./project-overview.md)
- [Architecture](./architecture{{#if multi-part}}-{part\*id}{{/if}}.md){{#unless architecture_file_exists}} (To be generated) {{/unless}}
- [Source Tree Analysis](./source-tree-analysis.md)
- [Component Inventory](./component-inventory{{#if multi-part}}-{part\*id}{{/if}}.md){{#unless component_inventory_exists}} (To be generated) {{/unless}}
- [Development Guide](./development-guide{{#if multi-part}}-{part\*id}{{/if}}.md){{#unless dev_guide_exists}} (To be generated) {{/unless}}
  {{#if deployment_found}}- [Deployment Guide](./deployment-guide.md){{#unless deployment_guide_exists}} (To be generated) {{/unless}}{{/if}}
  {{#if contribution_found}}- [Contribution Guide](./contribution-guide.md){{/if}}
  {{#if api_documented}}- [API Contracts](./api-contracts{{#if multi-part}}-{part_id}{{/if}}.md){{#unless api_contracts_exists}} (To be generated) {{/unless}}{{/if}}
  {{#if data_models_documented}}- [Data Models](./data-models{{#if multi-part}}-{part_id}{{/if}}.md){{#unless data_models_exists}} (To be generated) {{/unless}}{{/if}}
  {{#if multi-part}}- [Integration Architecture](./integration-architecture.md){{#unless integration_arch_exists}} (To be generated) {{/unless}}{{/if}}

## Existing Documentation

{{#each existing_docs}}

- [{{title}}]({{relative_path}}) - {{description}}
  {{/each}}

## Getting Started

{{getting_started_instructions}}
</action>

<action>Before writing index.md, check which expected files actually exist:

- For each document that should have been generated, check if file exists on disk
- Set existence flags: architecture_file_exists, component_inventory_exists, dev_guide_exists, etc.
- These flags determine whether to add the _(To be generated)_ marker
- Track which files are missing in {{missing_docs_list}} for reporting
  </action>

<action>IMMEDIATELY write index.md to disk with appropriate _(To be generated)_ markers for missing files</action>
<action>Validate index has all required sections and links are valid</action>

<template-output>index</template-output>

<action>Update state file:

- Add to completed_steps: {"step": "step_10", "status": "completed", "timestamp": "{{now}}", "summary": "Master index generated"}
- Update current_step = "step_11"
- Add output: "index.md"
  </action>

<action>PURGE index content from context</action>
</step>

<step n="11" goal="Validate and review generated documentation" if="workflow_mode != deep_dive">
<action>Show summary of all generated files:
Generated in {{output_folder}}/:
{{file_list_with_sizes}}
</action>

<action>Run validation checklist from {validation}</action>

<critical>INCOMPLETE DOCUMENTATION DETECTION:

1. PRIMARY SCAN: Look for exact marker: _(To be generated)_
2. FALLBACK SCAN: Look for fuzzy patterns (in case agent was lazy):
   - _(TBD)_
   - _(TODO)_
   - _(Coming soon)_
   - _(Not yet generated)_
   - _(Pending)_
3. Extract document metadata from each match for user selection
   </critical>

<action>Read {output_folder}/index.md</action>

<action>Scan for incomplete documentation markers:
Step 1: Search for exact pattern "_(To be generated)_" (case-sensitive)
Step 2: For each match found, extract the entire line
Step 3: Parse line to extract:

- Document title (text within [brackets] or **bold**)
- File path (from markdown link or inferable from title)
- Document type (infer from filename: architecture, api-contracts, data-models, component-inventory, development-guide, deployment-guide, integration-architecture)
- Part ID if applicable (extract from filename like "architecture-server.md" → part_id: "server")
  Step 4: Add to {{incomplete_docs_strict}} array
  </action>

<action>Fallback fuzzy scan for alternate markers:
Search for patterns: _(TBD)_, _(TODO)_, _(Coming soon)_, _(Not yet generated)_, _(Pending)_
For each fuzzy match:

- Extract same metadata as strict scan
- Add to {{incomplete_docs_fuzzy}} array with fuzzy_match flag
  </action>

<action>Combine results:
Set {{incomplete_docs_list}} = {{incomplete_docs_strict}} + {{incomplete_docs_fuzzy}}
For each item store structure:
{
"title": "Architecture – Server",
"file\*path": "./architecture-server.md",
"doc_type": "architecture",
"part_id": "server",
"line_text": "- [Architecture – Server](./architecture-server.md) (To be generated)",
"fuzzy_match": false
}
</action>

<ask>Documentation generation complete!

Summary:

- Project Type: {{project_type_summary}}
- Parts Documented: {{parts_count}}
- Files Generated: {{files_count}}
- Total Lines: {{total_lines}}

{{#if incomplete_docs_list.length > 0}}
⚠️ **Incomplete Documentation Detected:**

I found {{incomplete_docs_list.length}} item(s) marked as incomplete:

{{#each incomplete_docs_list}}
{{@index + 1}}. **{{title}}** ({{doc_type}}{{#if part_id}} for {{part_id}}{{/if}}){{#if fuzzy_match}} ⚠️ [non-standard marker]{{/if}}
{{/each}}

{{/if}}

Would you like to:

{{#if incomplete_docs_list.length > 0}}

1. **Generate incomplete documentation** - Complete any of the {{incomplete_docs_list.length}} items above
2. Review any specific section [type section name]
3. Add more detail to any area [type area name]
4. Generate additional custom documentation [describe what]
5. Finalize and complete [type 'done']
   {{else}}
6. Review any specific section [type section name]
7. Add more detail to any area [type area name]
8. Generate additional documentation [describe what]
9. Finalize and complete [type 'done']
   {{/if}}

Your choice:
</ask>

<check if="user selects option 1 (generate incomplete)">
  <ask>Which incomplete items would you like to generate?

{{#each incomplete_docs_list}}
{{@index + 1}}. {{title}} ({{doc_type}}{{#if part_id}} - {{part_id}}{{/if}})
{{/each}}
{{incomplete_docs_list.length + 1}}. All of them

Enter number(s) separated by commas (e.g., "1,3,5"), or type 'all':
</ask>

<action>Parse user selection:

- If "all", set {{selected_items}} = all items in {{incomplete_docs_list}}
- If comma-separated numbers, extract selected items by index
- Store result in {{selected_items}} array
  </action>

  <action>Display: "Generating {{selected_items.length}} document(s)..."</action>

  <action>For each item in {{selected_items}}:

1. **Identify the part and requirements:**
   - Extract part_id from item (if exists)
   - Look up part data in project_parts array from state file
   - Load documentation_requirements for that part's project_type_id

2. **Route to appropriate generation substep based on doc_type:**

   **If doc_type == "architecture":**
   - Display: "Generating architecture documentation for {{part_id}}..."
   - Load architecture_match for this part from state file (Step 3 cache)
   - Re-run Step 8 architecture generation logic ONLY for this specific part
   - Use matched template and fill with cached data from state file
   - Write architecture-{{part_id}}.md to disk
   - Validate completeness

   **If doc_type == "api-contracts":**
   - Display: "Generating API contracts for {{part_id}}..."
   - Load part data and documentation_requirements
   - Re-run Step 4 API scan substep targeting ONLY this part
   - Use scan_level from state file (quick/deep/exhaustive)
   - Generate api-contracts-{{part_id}}.md
   - Validate document structure

   **If doc_type == "data-models":**
   - Display: "Generating data models documentation for {{part_id}}..."
   - Re-run Step 4 data models scan substep targeting ONLY this part
   - Use schema_migration_patterns from documentation_requirements
   - Generate data-models-{{part_id}}.md
   - Validate completeness

   **If doc_type == "component-inventory":**
   - Display: "Generating component inventory for {{part_id}}..."
   - Re-run Step 9 component inventory generation for this specific part
   - Scan components/, ui/, widgets/ folders
   - Generate component-inventory-{{part_id}}.md
   - Validate structure

   **If doc_type == "development-guide":**
   - Display: "Generating development guide for {{part_id}}..."
   - Re-run Step 9 development guide generation for this specific part
   - Use key_file_patterns and test_file_patterns from documentation_requirements
   - Generate development-guide-{{part_id}}.md
   - Validate completeness

   **If doc_type == "deployment-guide":**
   - Display: "Generating deployment guide..."
   - Re-run Step 6 deployment configuration scan
   - Re-run Step 9 deployment guide generation
   - Generate deployment-guide.md
   - Validate structure

   **If doc_type == "integration-architecture":**
   - Display: "Generating integration architecture..."
   - Re-run Step 7 integration analysis for all parts
   - Generate integration-architecture.md
   - Validate completeness

3. **Post-generation actions:**
   - Confirm file was written successfully
   - Update state file with newly generated output
   - Add to {{newly_generated_docs}} tracking list
   - Display: "✓ Generated: {{file_path}}"

4. **Handle errors:**
   - If generation fails, log error and continue with next item
   - Track failed items in {{failed_generations}} list
     </action>

<action>After all selected items are processed:

**Update index.md to remove markers:**

1. Read current index.md content
2. For each item in {{newly_generated_docs}}:
   - Find the line containing the file link and marker
   - Remove the _(To be generated)_ or fuzzy marker text
   - Leave the markdown link intact
3. Write updated index.md back to disk
4. Update state file to record index.md modification
   </action>

<action>Display generation summary:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ **Documentation Generation Complete!**

**Successfully Generated:**
{{#each newly_generated_docs}}

- {{title}} → {{file_path}}
  {{/each}}

{{#if failed_generations.length > 0}}
**Failed to Generate:**
{{#each failed_generations}}

- {{title}} ({{error_message}})
  {{/each}}
  {{/if}}

**Updated:** index.md (removed incomplete markers)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</action>

<action>Update state file with all generation activities</action>

<action>Return to Step 11 menu (loop back to check for any remaining incomplete items)</action>
</check>

<action if="user requests other changes (options 2-3)">Make requested modifications and regenerate affected files</action>
<action if="user selects finalize (option 4 or 5)">Proceed to Step 12 completion</action>

<check if="not finalizing">
  <action>Update state file:
- Add to completed_steps: {"step": "step_11_iteration", "status": "completed", "timestamp": "{{now}}", "summary": "Review iteration complete"}
- Keep current_step = "step_11" (for loop back)
- Update last_updated timestamp
  </action>
  <action>Loop back to beginning of Step 11 (re-scan for remaining incomplete docs)</action>
</check>

<check if="finalizing">
  <action>Update state file:
- Add to completed_steps: {"step": "step_11", "status": "completed", "timestamp": "{{now}}", "summary": "Validation and review complete"}
- Update current_step = "step_12"
  </action>
  <action>Proceed to Step 12</action>
</check>
</step>

<step n="12" goal="Finalize and provide next steps" if="workflow_mode != deep_dive">
<action>Create final summary report</action>
<action>Compile verification recap variables:
  - Set {{verification_summary}} to the concrete tests, validations, or scripts you executed (or "none run").
  - Set {{open_risks}} to any remaining risks or TODO follow-ups (or "none").
  - Set {{next_checks}} to recommended actions before merging/deploying (or "none").
</action>

<action>Display completion message:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
