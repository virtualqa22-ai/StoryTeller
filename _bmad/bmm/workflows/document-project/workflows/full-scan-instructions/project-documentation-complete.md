# Project Documentation Complete! ✓

**Location:** {{output_folder}}/

**Master Index:** {{output_folder}}/index.md
👆 This is your primary entry point for AI-assisted development

**Generated Documentation:**
{{generated_files_list}}

**Next Steps:**

1. Review the index.md to familiarize yourself with the documentation structure
2. When creating a brownfield PRD, point the PRD workflow to: {{output_folder}}/index.md
3. For UI-only features: Reference {{output_folder}}/architecture-{{ui_part_id}}.md
4. For API-only features: Reference {{output_folder}}/architecture-{{api_part_id}}.md
5. For full-stack features: Reference both part architectures + integration-architecture.md

**Verification Recap:**

- Tests/extractions executed: {{verification_summary}}
- Outstanding risks or follow-ups: {{open_risks}}
- Recommended next checks before PR: {{next_checks}}

**Brownfield PRD Command:**
When ready to plan new features, run the PRD workflow and provide this index as input.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</action>

<action>FINALIZE state file:

- Add to completed_steps: {"step": "step_12", "status": "completed", "timestamp": "{{now}}", "summary": "Workflow complete"}
- Update timestamps.completed = "{{now}}"
- Update current_step = "completed"
- Write final state file
  </action>

<action>Display: "State file saved: {{output_folder}}/project-scan-report.json"</action>

</workflow>
