# Step 1.5: Generation Mode Selection (NEW - Phase 2.5)

## Actions

1. **Detect Generation Mode**

   Determine mode based on scenario complexity:

   **AI Generation Mode (DEFAULT)**:
   - Clear acceptance criteria with standard patterns
   - Uses: AI-generated tests from requirements
   - Appropriate for: CRUD, auth, navigation, API tests
   - Fastest approach

   **Recording Mode (OPTIONAL - Complex UI)**:
   - Complex UI interactions (drag-drop, wizards, multi-page flows)
   - Uses: Interactive test recording with Playwright MCP
   - Appropriate for: Visual workflows, unclear requirements
   - Only if config.tea_use_mcp_enhancements is true AND MCP available

2. **AI Generation Mode (DEFAULT - Continue to Step 2)**

   For standard scenarios:
   - Continue with existing workflow (Step 2: Select Test Levels and Strategy)
   - AI generates tests based on acceptance criteria from Step 1
   - Use knowledge base patterns for test structure

3. **Recording Mode (OPTIONAL - Complex UI Only)**

   For complex UI scenarios AND config.tea_use_mcp_enhancements is true:

   **A. Check MCP Availability**

   If Playwright MCP tools are available in your IDE:
   - Use MCP recording mode (Step 3.B)

   If MCP unavailable:
   - Fallback to AI generation mode (silent, automatic)
   - Continue to Step 2

   **B. Interactive Test Recording (MCP-Based)**

   Use Playwright MCP test-generator tools:

   **Setup:**

   ```
   1. Use generator_setup_page to initialize recording session
   2. Navigate to application starting URL (from story context)
   3. Ready to record user interactions
   ```

   **Recording Process (Per Acceptance Criterion):**

   ```
   4. Read acceptance criterion from story
   5. Manually execute test scenario using browser_* tools:
      - browser_navigate: Navigate to pages
      - browser_click: Click buttons, links, elements
      - browser_type: Fill form fields
      - browser_select: Select dropdown options
      - browser_check: Check/uncheck checkboxes
   6. Add verification steps using browser_verify_* tools:
      - browser_verify_text: Verify text content
      - browser_verify_visible: Verify element visibility
      - browser_verify_url: Verify URL navigation
   7. Capture interaction log with generator_read_log
   8. Generate test file with generator_write_test
   9. Repeat for next acceptance criterion
   ```

   **Post-Recording Enhancement:**

   ```
   10. Review generated test code
   11. Enhance with knowledge base patterns:
       - Add Given-When-Then comments
       - Replace recorded selectors with data-testid (if needed)
       - Add network-first interception (from network-first.md)
       - Add fixtures for auth/data setup (from fixture-architecture.md)
       - Use factories for test data (from data-factories.md)
   12. Verify tests fail (missing implementation)
   13. Continue to Step 4 (Build Data Infrastructure)
   ```

   **When to Use Recording Mode:**
   - ✅ Complex UI interactions (drag-drop, multi-step forms, wizards)
   - ✅ Visual workflows (modals, dialogs, animations)
   - ✅ Unclear requirements (exploratory, discovering expected behavior)
   - ✅ Multi-page flows (checkout, registration, onboarding)
   - ❌ NOT for simple CRUD (AI generation faster)
   - ❌ NOT for API-only tests (no UI to record)

   **When to Use AI Generation (Default):**
   - ✅ Clear acceptance criteria available
   - ✅ Standard patterns (login, CRUD, navigation)
   - ✅ Need many tests quickly
   - ✅ API/backend tests (no UI interaction)

4. **Proceed to Test Level Selection**

   After mode selection:
   - AI Generation: Continue to Step 2 (Select Test Levels and Strategy)
   - Recording: Skip to Step 4 (Build Data Infrastructure) - tests already generated

---
