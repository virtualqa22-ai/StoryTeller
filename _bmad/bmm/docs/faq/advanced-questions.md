# Advanced Questions

## Q: What if my project grows from Level 1 to Level 3?

**A:** Totally fine! When you realize scope has grown:

1. Run create-prd to add product-level planning
2. Run create-architecture for system design
3. Use existing tech-spec as input for PRD
4. Continue with updated level

The system is flexible - growth is expected.

## Q: Can I mix greenfield and brownfield approaches?

**A:** Yes! Common scenario: adding new greenfield feature to brownfield codebase. Approach:

1. Run document-project for brownfield context
2. Use greenfield workflows for new feature planning
3. Explicitly document integration points between new and existing
4. Test integration thoroughly

## Q: How do I handle urgent hotfixes during a sprint?

**A:** Use correct-course workflow or just:

1. Save your current work state
2. Load PM agent → quick tech-spec for hotfix
3. Implement hotfix (Level 0 flow)
4. Deploy hotfix
5. Return to original sprint work

Level 0 Quick Spec Flow is perfect for urgent fixes.

## Q: What if I disagree with the workflow's recommendations?

**A:** Workflows are guidance, not enforcement. If a workflow recommends something that doesn't make sense for your context:

- Explain your reasoning to the agent
- Ask for alternative approaches
- Skip the recommendation if you're confident
- Document why you deviated (for future reference)

Trust your expertise - BMM supports your decisions.

## Q: Can multiple developers work on the same BMM project?

**A:** Yes! But the paradigm is fundamentally different from traditional agile teams.

**Key Difference:**

- **Traditional:** Multiple devs work on stories within one epic (months)
- **Agentic:** Each dev owns complete epics (days)

**In traditional agile:** A team of 5 devs might spend 2-3 months on a single epic, with each dev owning different stories.

**With BMM + AI agents:** A single dev can complete an entire epic in 1-3 days. What used to take months now takes days.

**Team Work Distribution:**

- **Recommended:** Split work by **epic** (not story)
- Each developer owns complete epics end-to-end
- Parallel work happens at epic level
- Minimal coordination needed

**For full-stack apps:**

- Frontend and backend can be separate epics (unusual in traditional agile)
- Frontend dev owns all frontend epics
- Backend dev owns all backend epics
- Works because delivery is so fast

**Enterprise Considerations:**

- Use **git submodules** for BMM installation (not .gitignore)
- Allows personal configurations without polluting main repo
- Teams may use different AI tools (Claude Code, Cursor, etc.)
- Developers may follow different methods or create custom agents/workflows

**Quick Tips:**

- Share `sprint-status.yaml` (single source of truth)
- Assign entire epics to developers (not individual stories)
- Coordinate at epic boundaries, not story level
- Use git submodules for BMM in enterprise settings

**For comprehensive coverage of enterprise team collaboration, work distribution strategies, git submodule setup, and velocity expectations, see:**

👉 **[Enterprise Agentic Development Guide](./enterprise-agentic-development/index.md)**

## Q: What is party mode and when should I use it?

**A:** Party mode is a unique multi-agent collaboration feature where ALL your installed agents (19+ from BMM, CIS, BMB, custom modules) discuss your challenges together in real-time.

**How it works:**

1. Run `/bmad:core:workflows:party-mode` (or `*party-mode` from any agent)
2. Introduce your topic
3. BMad Master selects 2-3 most relevant agents per message
4. Agents cross-talk, debate, and build on each other's ideas

**Best for:**

- Strategic decisions with trade-offs (architecture choices, tech stack, scope)
- Creative brainstorming (game design, product innovation, UX ideation)
- Cross-functional alignment (epic kickoffs, retrospectives, phase transitions)
- Complex problem-solving (multi-faceted challenges, risk assessment)

**Example parties:**

- **Product Strategy:** PM + Innovation Strategist (CIS) + Analyst
- **Technical Design:** Architect + Creative Problem Solver (CIS) + Game Architect
- **User Experience:** UX Designer + Design Thinking Coach (CIS) + Storyteller (CIS)

**Why it's powerful:**

- Diverse perspectives (technical, creative, strategic)
- Healthy debate reveals blind spots
- Emergent insights from agent interaction
- Natural collaboration across modules

**For complete documentation:**

👉 **[Party Mode Guide](./party-mode.md)** - How it works, when to use it, example compositions, best practices

---
