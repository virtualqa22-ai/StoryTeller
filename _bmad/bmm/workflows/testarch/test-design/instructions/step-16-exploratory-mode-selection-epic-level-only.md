# Step 1.6: Exploratory Mode Selection (Epic-Level Only)

## Actions

1. **Detect Planning Mode**

   Determine mode based on context:

   **Requirements-Based Mode (DEFAULT)**:
   - Have clear story/PRD with acceptance criteria
   - Uses: Existing workflow (Steps 2-4)
   - Appropriate for: Documented features, greenfield projects

   **Exploratory Mode (OPTIONAL - Brownfield)**:
   - Missing/incomplete requirements AND brownfield application exists
   - Uses: UI exploration to discover functionality
   - Appropriate for: Undocumented brownfield apps, legacy systems

2. **Requirements-Based Mode (DEFAULT - Skip to Step 2)**

   If requirements are clear:
   - Continue with existing workflow (Step 2: Assess and Classify Risks)
   - Use loaded requirements from Step 1
   - Proceed with risk assessment based on documented requirements

3. **Exploratory Mode (OPTIONAL - Brownfield Apps)**

   If exploring brownfield application:

   **A. Check MCP Availability**

   If config.tea_use_mcp_enhancements is true AND Playwright MCP tools available:
   - Use MCP-assisted exploration (Step 3.B)

   If MCP unavailable OR config.tea_use_mcp_enhancements is false:
   - Use manual exploration fallback (Step 3.C)

   **B. MCP-Assisted Exploration (If MCP Tools Available)**

   Use Playwright MCP browser tools to explore UI:

   **Setup:**

   ```
   1. Use planner_setup_page to initialize browser
   2. Navigate to {exploration_url}
   3. Capture initial state with browser_snapshot
   ```

   **Exploration Process:**

   ```
   4. Use browser_navigate to explore different pages
   5. Use browser_click to interact with buttons, links, forms
   6. Use browser_hover to reveal hidden menus/tooltips
   7. Capture browser_snapshot at each significant state
   8. Take browser_screenshot for documentation
   9. Monitor browser_console_messages for JavaScript errors
   10. Track browser_network_requests to identify API calls
   11. Map user flows and interactive elements
   12. Document discovered functionality
   ```

   **Discovery Documentation:**
   - Create list of discovered features (pages, workflows, forms)
   - Identify user journeys (navigation paths)
   - Map API endpoints (from network requests)
   - Note error states (from console messages)
   - Capture screenshots for visual reference

   **Convert to Test Scenarios:**
   - Transform discoveries into testable requirements
   - Prioritize based on user flow criticality
   - Identify risks from discovered functionality
   - Continue with Step 2 (Assess and Classify Risks) using discovered requirements

   **C. Manual Exploration Fallback (If MCP Unavailable)**

   If Playwright MCP is not available:

   **Notify User:**

   ```markdown
   Exploratory mode enabled but Playwright MCP unavailable.

   **Manual exploration required:**

   1. Open application at: {exploration_url}
   2. Explore all pages, workflows, and features
   3. Document findings in markdown:
      - List of pages/features discovered
      - User journeys identified
      - API endpoints observed (DevTools Network tab)
      - JavaScript errors noted (DevTools Console)
      - Critical workflows mapped

   4. Provide exploration findings to continue workflow

   **Alternative:** Disable exploratory_mode and provide requirements documentation
   ```

   Wait for user to provide exploration findings, then:
   - Parse user-provided discovery documentation
   - Convert to testable requirements
   - Continue with Step 2 (risk assessment)

4. **Proceed to Risk Assessment**

   After mode selection (Requirements-Based OR Exploratory):
   - Continue to Step 2: Assess and Classify Risks
   - Use requirements from documentation (Requirements-Based) OR discoveries (Exploratory)

---
