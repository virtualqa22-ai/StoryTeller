# Troubleshooting

**Q: Do I always need architecture?**
A: No. Quick Flow skips it. BMad Method and Enterprise both require it.

**Q: How do I know if I need architecture?**
A: If you chose BMad Method or Enterprise track in planning (workflow-init), you need architecture to prevent agent conflicts.

**Q: What's the difference between architecture and tech-spec?**
A: Tech-spec is implementation-focused for simple changes. Architecture is system design for complex multi-epic projects.

**Q: Can I skip gate check?**
A: Only for Quick Flow. BMad Method and Enterprise both require gate check before Phase 4.

**Q: What if gate check fails?**
A: Resolve the identified gaps (missing architecture sections, conflicting requirements) and re-run gate check.

**Q: How long should architecture take?**
A: BMad Method: 1-2 days for architecture. Enterprise: 2-3 days total (1-2 days architecture + 0.5-1 day optional extended workflows). If taking longer, you may be over-documenting.

**Q: Do ADRs need to be perfect?**
A: No. ADRs capture key decisions with rationale. They should be concise (1 page max per ADR).

**Q: Can I update architecture during implementation?**
A: Yes! Architecture is living. Update it as you learn. Use `correct-course` workflow for significant changes.

---

_Phase 3 Solutioning - Technical decisions before implementation._
