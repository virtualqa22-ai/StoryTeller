# Story 2.7: Build Wizard Step 5 - AI Provider Configuration

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an author,
I want to optionally configure my AI provider API key in the wizard,
so that I can start generating content immediately after project creation.

## Acceptance Criteria

1. **Progress Indicator and Skip Option (AC#1)**
   - **Given** the user is on Step 5 of the wizard
   - **When** the wizard displays Step 5
   - **Then** the progress indicator shows "Step 5 of 6: AI Provider (Optional)"
   - **And** a prominent message is displayed: "You can configure this later from Settings"
   - **And** a "Skip this step" button is displayed prominently

2. **AI Provider Selection and API Key Input (AC#2)**
   - **Then** an "AI Provider" dropdown is displayed with options: OpenAI, Anthropic Claude, Google Gemini, Deepseek, Yandex, Custom Provider
   - **And** an "API Key" password input field is displayed (masked input)
   - **And** a "Test Connection" button is displayed next to the API key field

3. **Test Connection Functionality (AC#3)**
   - **Given** the user selects an AI provider and enters an API key
   - **When** the user clicks "Test Connection"
   - **Then** the application makes a test API call to verify the key
   - **And** a loading spinner is displayed during the test
   - **And** if successful, a green checkmark appears with the message "Connection successful"
   - **And** if failed, a red X appears with an error message explaining the issue (e.g., "Invalid API key" or "Network connection error")

4. **Skip Functionality (AC#4)**
   - **Given** the user clicks "Skip this step"
   - **When** the wizard advances
   - **Then** no API key is saved
   - **And** the wizard moves to Step 6
   - **And** a note is stored in wizard state that API configuration was skipped

5. **Save and Advance with Valid Key (AC#5)**
   - **Given** the user has successfully tested an API key
   - **When** the user clicks "Next"
   - **Then** the API key is saved securely to OS credential storage
   - **And** the wizard advances to Step 6

## Tasks / Subtasks

- [ ] Implement Step 5 route/view with progress indicator (AC: #1)
  - [ ] Add wizard step metadata and ARIA attributes for accessibility
  - [ ] Ensure progress shows "Step 5 of 6: AI Provider (Optional)"
  - [ ] Display prominent message: "You can configure this later from Settings"
  - [ ] Add "Skip this step" button with proper styling and positioning

- [ ] Build AI provider selection and API key input (AC: #2)
  - [ ] Create "AI Provider" dropdown/select component with options:
    - [ ] OpenAI
    - [ ] Anthropic Claude
    - [ ] Google Gemini
    - [ ] Deepseek
    - [ ] Yandex
    - [ ] Custom Provider
  - [ ] Create masked password input field for API key
  - [ ] Add "Test Connection" button next to API key field
  - [ ] Implement proper form layout and accessibility

- [ ] Implement Test Connection functionality (AC: #3)
  - [ ] Create Tauri backend command for testing API connections
  - [ ] Implement provider-specific API test calls:
    - [ ] OpenAI: Test with models list endpoint
    - [ ] Anthropic Claude: Test with messages endpoint
    - [ ] Google Gemini: Test with appropriate endpoint
    - [ ] Deepseek: Test with appropriate endpoint
    - [ ] Yandex: Test with appropriate endpoint
    - [ ] Custom Provider: Allow user to specify test endpoint
  - [ ] Add loading spinner during test
  - [ ] Display success state: green checkmark + "Connection successful"
  - [ ] Display error state: red X + specific error message
  - [ ] Handle network errors vs authentication errors vs rate limit errors

- [ ] Implement Skip functionality (AC: #4)
  - [ ] "Skip this step" button navigates to Step 6
  - [ ] No API key data saved to wizard state
  - [ ] Store flag in wizard state: `aiProviderSkipped: true`
  - [ ] Ensure Back button can return to Step 5 with fields cleared

- [ ] Implement secure API key storage (AC: #5)
  - [ ] Research Tauri v2 keychain/credential storage options (Stronghold vs keyring plugin)
  - [ ] Implement secure storage using OS keychain (macOS Keychain, Windows Credential Manager, Linux Secret Service)
  - [ ] Create Tauri command: `store_api_key(provider: string, api_key: string)`
  - [ ] Create Tauri command: `retrieve_api_key(provider: string) -> Option<String>`
  - [ ] Handle storage failures gracefully with user-friendly error messages
  - [ ] Next button enabled only after successful test OR user chooses to skip

- [ ] Implement Back and Cancel button handlers (consistency with other steps)
  - [ ] Back button returns to Step 4
  - [ ] Cancel button closes wizard with confirmation

- [ ] Add unit tests for Step 5 component
  - [ ] Test progress indicator displays correctly
  - [ ] Test ARIA attributes on progress indicator
  - [ ] Test AI provider dropdown renders all options
  - [ ] Test API key input is masked (type="password")
  - [ ] Test "Skip this step" button navigates to Step 6
  - [ ] Test "Test Connection" button triggers validation
  - [ ] Test loading state during connection test
  - [ ] Test success state display (green checkmark + message)
  - [ ] Test error state display (red X + error message)
  - [ ] Test Next button enabled only after successful test
  - [ ] Test Back and Cancel button functionality
  - [ ] Mock Tauri commands for frontend unit tests

- [ ] Add E2E tests for wizard Step 5 flow (optional)
  - [ ] Test full happy path: select provider → enter API key → test connection → Next → advances to Step 6
  - [ ] Test skip path: click "Skip this step" → wizard advances to Step 6
  - [ ] Test error path: enter invalid API key → test connection → error message displayed
  - [ ] Test Back button returns to Step 4 with data preserved

## Dev Notes

### Critical Implementation Context

**This story implements Step 5 of a 6-step wizard**, continuing the wizard built in stories 2-3 through 2-6. Step 5 is unique because it's **optional** - users can skip API configuration and set it up later. This step involves:
1. Frontend UI for provider selection and API key input
2. Backend Tauri commands for testing API connections
3. Secure OS-level credential storage (keychain integration)
4. Error handling for network failures, invalid keys, and rate limiting

### Established Wizard Architecture Patterns

Based on analysis of Steps 1-4 (stories 2-3 through 2-6), the wizard follows these **exact patterns**:

1. **Component Structure** (from `step-3.svelte` and `step-4.svelte`):
   - Use Svelte 5 runes: `$props()`, `$state()`, `$derived()`
   - Props interface: `onNext`, `onBack`, `onCancel`
   - State variables with separate "touched" tracking for validation
   - Derived validation errors with `showValidation` flag
   - Handler functions that validate before calling `onNext`

2. **Validation Pattern**:
   ```typescript
   // Touch tracking
   let providerTouched = $state(false);
   let apiKeyTouched = $state(false);
   let showValidation = $state(false);

   // Connection test state
   let isTestingConnection = $state(false);
   let connectionTestResult = $state<'idle' | 'success' | 'error'>('idle');
   let connectionErrorMessage = $state('');

   // Derived validation
   const canProceed = $derived(
     connectionTestResult === 'success' ||
     // Can skip without testing
     true
   );

   async function handleTestConnection() {
     if (!selectedProvider || !apiKey.trim()) {
       showValidation = true;
       return;
     }

     isTestingConnection = true;
     connectionTestResult = 'idle';
     connectionErrorMessage = '';

     try {
       const result = await invoke<boolean>('test_api_connection', {
         provider: selectedProvider,
         apiKey: apiKey.trim()
       });

       if (result) {
         connectionTestResult = 'success';
       } else {
         connectionTestResult = 'error';
         connectionErrorMessage = 'Connection test failed';
       }
     } catch (error) {
       connectionTestResult = 'error';
       connectionErrorMessage = error.message || 'Network connection error';
     } finally {
       isTestingConnection = false;
     }
   }

   function handleSkip() {
     onNext({
       aiProvider: null,
       apiKey: null,
       aiProviderSkipped: true
     });
   }

   async function handleNext() {
     if (connectionTestResult !== 'success') {
       // If user didn't test connection, they must skip
       return;
     }

     // Save to secure storage
     try {
       await invoke('store_api_key', {
         provider: selectedProvider,
         apiKey: apiKey.trim()
       });

       onNext({
         aiProvider: selectedProvider,
         apiKey: '***STORED_SECURELY***', // Don't pass actual key
         aiProviderSkipped: false
       });
     } catch (error) {
       connectionTestResult = 'error';
       connectionErrorMessage = 'Failed to save API key securely';
     }
   }
   ```

3. **UI Component Imports** (established in previous steps):
   ```typescript
   import Button from '$lib/components/ui/button/button.svelte';
   import Label from '$lib/components/ui/label/label.svelte';
   import FormItem from '$lib/components/ui/form/form-item.svelte';
   import FormMessage from '$lib/components/ui/form/form-message.svelte';
   import Input from '$lib/components/ui/input/input.svelte'; // For password input
   import Select from '$lib/components/ui/select/select.svelte'; // For AI provider dropdown
   import { Check, X, Loader2 } from 'lucide-svelte'; // Icons for test results
   ```

4. **Accessibility Requirements** (from Steps 1-4):
   - Progress indicator must have `role="progressbar"`, `aria-label`, `aria-valuenow="5"`, `aria-valuemin="1"`, `aria-valuemax="6"`
   - All interactive elements need `data-testid` attributes
   - Password input should have `type="password"` and proper labels
   - Connection test results should be announced to screen readers with `aria-live="polite"`

5. **Layout and Styling**:
   - Root div: `class="p-6 space-y-6" data-testid="wizard-step-5"`
   - Navigation buttons in flex container with `justify-between`
   - Button order: Left side (Cancel, Back), Right side (Skip / Next)
   - Use semantic Tailwind tokens: `text-destructive`, `bg-muted`, `text-muted-foreground`
   - Success/error indicators use lucide-svelte icons with appropriate colors

### Step 5 Specific Requirements

**AI Provider Dropdown:**
- Provider options: OpenAI, Anthropic Claude, Google Gemini, Deepseek, Yandex, Custom Provider
- Use Select component from UI library or native `<select>` with consistent styling
- Bind to `selectedProvider` state variable
- Default to empty/null (no preselection)

**API Key Input:**
- Password input field (masked)
- `type="password"` attribute
- Bind to `apiKey` state variable
- Placeholder: "Enter your API key"
- Add visibility toggle icon (optional enhancement)

**Test Connection Button:**
- Position next to API key field
- Disabled when provider or API key is empty
- Shows loading spinner when `isTestingConnection === true`
- Updates to show result icon after test completes

**Connection Test Results Display:**
- **Success State:**
  - Green checkmark icon (lucide-svelte `Check` component)
  - Text: "Connection successful" in green/success color
  - Enable Next button
- **Error State:**
  - Red X icon (lucide-svelte `X` component)
  - Specific error message (e.g., "Invalid API key", "Network connection error")
  - Next button remains disabled
- **Loading State:**
  - Spinner icon (lucide-svelte `Loader2` with animation)
  - Text: "Testing connection..."

**Skip Button:**
- Prominent secondary button
- Position: Above or below the form fields (highly visible)
- Label: "Skip this step"
- Advances to Step 6 without saving any data

**Next Button Logic:**
- Only enabled when `connectionTestResult === 'success'`
- Saves API key to secure storage before advancing
- Handle storage failures with error message

### Tauri Backend Requirements

**New Tauri Commands Needed:**

1. **`test_api_connection`**
   ```rust
   #[tauri::command]
   async fn test_api_connection(provider: String, api_key: String) -> Result<bool, String> {
       match provider.as_str() {
           "OpenAI" => test_openai_api(api_key).await,
           "Anthropic Claude" => test_anthropic_api(api_key).await,
           "Google Gemini" => test_gemini_api(api_key).await,
           "Deepseek" => test_deepseek_api(api_key).await,
           "Yandex" => test_yandex_api(api_key).await,
           "Custom Provider" => Ok(true), // Skip test for custom
           _ => Err("Unsupported provider".to_string())
       }
   }
   ```

2. **`store_api_key`**
   ```rust
   #[tauri::command]
   async fn store_api_key(provider: String, api_key: String) -> Result<(), String> {
       // Use OS keychain (macOS Keychain, Windows Credential Manager, Linux Secret Service)
       // Consider using tauri-plugin-keyring or manual implementation
       // Service name: "com.storyteller.app"
       // Account name: provider (e.g., "OpenAI")
       // Password: api_key
   }
   ```

3. **`retrieve_api_key`**
   ```rust
   #[tauri::command]
   async fn retrieve_api_key(provider: String) -> Result<Option<String>, String> {
       // Retrieve from OS keychain
   }
   ```

**API Test Implementation Details:**

For each AI provider, make a minimal API call to verify the key:
- **OpenAI**: `GET https://api.openai.com/v1/models` with `Authorization: Bearer {api_key}`
- **Anthropic Claude**: `POST https://api.anthropic.com/v1/messages` with minimal request
- **Google Gemini**: Use appropriate Gemini API endpoint
- **Deepseek**: Use appropriate Deepseek API endpoint
- **Yandex**: Use appropriate Yandex API endpoint

Handle different error types:
- HTTP 401/403: "Invalid API key"
- HTTP 429: "Rate limit exceeded - please try again later"
- Network errors: "Network connection error - check your internet connection"
- Other errors: Generic error message with status code

**Required Rust Crates:**
- `reqwest` (already in use?) for HTTP requests
- `keyring` crate for OS keychain integration (if not using Tauri plugin)
- OR `tauri-plugin-keyring` for Tauri-native keychain support
- `serde` for JSON serialization (already in use)

### Previous Story Intelligence (Story 2-6)

**Key Learnings from Story 2-6:**
- ✅ Svelte 5 runes (`$props`, `$state`, `$derived`) work perfectly
- ✅ Touch-based validation pattern prevents premature error display
- ✅ `showValidation` flag ensures errors show on Next button click
- ✅ Native HTML elements (like `<textarea>`) preferred for direct DOM access (e.g., focus())
- ✅ Custom styled alerts/warnings work well inline (no separate Alert component needed)
- ✅ `$derived.by()` is the idiomatic Svelte 5 pattern for complex derived state
- ✅ Input trimming prevents whitespace-only submissions
- ✅ Comprehensive unit tests with `@testing-library/svelte` + Vitest
- ✅ All navigation buttons (Cancel, Back, Next, Skip) tested separately
- ✅ ARIA attributes added to progress indicator for WCAG 2.1 AA compliance

**Code Review Feedback Applied in Previous Stories:**
- Added ARIA attributes to progress indicator
- Expanded test coverage for all button interactions
- Input sanitization to prevent invalid data
- Documented all modified files in File List section
- Used `$derived.by()` instead of `$derived(() => {...})` for idiomatic reactivity

**Files Modified in Story 2-6:**
1. `src/lib/components/wizard/step-4.svelte` (NEW)
2. `src/lib/components/wizard/wizard.svelte` (MODIFIED - added Step 4 integration)
3. `src/lib/components/wizard/types.ts` (MODIFIED - added Step 4 data structures)
4. `src/lib/components/wizard/index.ts` (MODIFIED - exported Step4 component)
5. `src/lib/components/wizard/step-4.test.ts` (NEW)
6. `_bmad-output/implementation/sprint-artifacts/sprint-status.yaml` (MODIFIED)
7. Story file created with detailed Dev Agent Record

### Git Intelligence from Recent Commits

**Commit: 3edc84f - "Implemented 2-5 Wizard Step 3"**
- Modified 9 files total (6 modified, 3 new)
- Pattern: Each step creates `step-X.svelte`, `step-X.test.ts`, and updates `types.ts`, `index.ts`, `wizard.svelte`
- Test coverage: 13 tests for Step 3 (all passing)
- Established validation patterns with dropdowns and numeric inputs

**Consistent File Modification Pattern:**
1. Create new step component: `src/lib/components/wizard/step-X.svelte`
2. Create unit tests: `src/lib/components/wizard/step-X.test.ts`
3. Update types: `src/lib/components/wizard/types.ts` (add WizardStepXData interface)
4. Update exports: `src/lib/components/wizard/index.ts`
5. Update wizard flow: `src/lib/components/wizard/wizard.svelte`
6. Update sprint status: `_bmad-output/implementation/sprint-artifacts/sprint-status.yaml`
7. Create story file: `_bmad-output/implementation/sprint-artifacts/2-X-story-name.md`

### Architecture Compliance

**Technology Stack (from project-context.md):**
- **Svelte 5.0.0** with runes-based reactivity ✅
- **TypeScript 5.6.2** strict mode ✅
- **Tailwind CSS 4.1.18** with semantic tokens ✅
- **Vitest 4.0.16** for unit tests ✅
- **Tauri v2** with Rust backend ✅
- **rusqlite 0.32** for database (if API keys stored in DB as fallback) ✅

**Critical Svelte 5 Rules:**
- ❌ **DON'T** use `export let prop` (old Svelte syntax)
- ✅ **DO** use `let { prop } = $props()` rune
- ❌ **DON'T** use `<slot>` (old Svelte syntax)
- ✅ **DO** use `Snippet` type and `{@render}` syntax (not applicable to this step)
- ✅ **DO** use `$state()` for reactive component state
- ✅ **DO** use `$derived()` or `$derived.by()` for computed values

**Tailwind CSS Rules:**
- ✅ Always use `cn()` helper from `$lib/utils` for class merging
- ✅ Use semantic color tokens: `bg-primary`, `text-destructive`, `text-success`, `text-muted-foreground`
- ❌ **DON'T** use raw colors like `bg-blue-500` or `text-green-600`
- ✅ Use Fluent Design spacing: `p-6`, `space-y-6`, `mt-1`, `gap-4`
- ✅ Success state: `text-green-600 dark:text-green-400` or semantic equivalent
- ✅ Error state: `text-destructive`

**Tauri Integration Rules:**
- ✅ Always use `invoke<ReturnType>('command_name', { param })` with explicit return types
- ✅ Wrap all `invoke()` calls in try-catch blocks
- ✅ New Rust commands MUST be added to `generate_handler![]` macro in `src-tauri/src/main.rs`
- ✅ Use `#[tauri::command]` attribute on all command functions
- ✅ Return `Result<T, String>` from Rust commands for proper error handling

**Testing Standards:**
- Unit tests co-located: `step-5.svelte` + `step-5.test.ts` in same folder
- Use `@testing-library/svelte` with `render()` and `screen.getByRole()`
- Add `data-testid` to all interactive elements and major containers
- Mock Tauri commands using `vi.mock('@tauri-apps/api/core')`
- Test all button interactions (Back, Cancel, Skip, Test Connection, Next)
- Test async operations (loading states, success/error states)

### File Structure Requirements

**Expected New/Modified Files:**

**Frontend:**
1. `src/lib/components/wizard/step-5.svelte` (NEW) - Step 5 UI component
2. `src/lib/components/wizard/step-5.test.ts` (NEW) - Unit tests for Step 5
3. `src/lib/components/wizard/types.ts` (MODIFY) - Add `WizardStep5Data` interface
4. `src/lib/components/wizard/index.ts` (MODIFY) - Export Step5 component and types
5. `src/lib/components/wizard/wizard.svelte` (MODIFY) - Integrate Step 5 into wizard flow

**Backend (Tauri):**
6. `src-tauri/src/commands/api_provider.rs` (NEW) - API connection testing commands
7. `src-tauri/src/commands/keychain.rs` (NEW) - Secure credential storage commands
8. `src-tauri/src/commands/mod.rs` (MODIFY) - Export new command modules
9. `src-tauri/src/main.rs` (MODIFY) - Register new commands in `generate_handler![]`
10. `src-tauri/Cargo.toml` (MODIFY) - Add `keyring` or `tauri-plugin-keyring` dependency

**Documentation:**
11. `_bmad-output/implementation/sprint-artifacts/sprint-status.yaml` (MODIFY) - Update story status
12. `_bmad-output/implementation/sprint-artifacts/2-7-build-wizard-step-5-ai-provider-configuration.md` (NEW - this file)

**Type Definitions to Add (types.ts):**
```typescript
export interface WizardStep5Data {
  aiProvider: string | null; // "OpenAI" | "Anthropic Claude" | etc. | null if skipped
  apiKey: string | null; // "***STORED_SECURELY***" or null if skipped
  aiProviderSkipped: boolean; // true if user clicked "Skip this step"
}

// Update WizardState to include step5
export interface WizardState {
  step1?: WizardStep1Data;
  step2?: WizardStep2Data;
  step3?: WizardStep3Data;
  step4?: WizardStep4Data;
  step5?: WizardStep5Data; // ADD THIS
  step6?: WizardStep6Data;
}
```

### Testing Requirements

**Unit Tests (step-5.test.ts) - Target 16+ tests:**
1. Test progress indicator renders "Step 5 of 6: AI Provider (Optional)"
2. Test ARIA attributes on progress indicator
3. Test "You can configure this later from Settings" message displays
4. Test AI provider dropdown renders all 6 options
5. Test API key input is type="password" (masked)
6. Test "Skip this step" button is present and prominent
7. Test "Skip this step" calls `onNext` with correct data structure
8. Test "Test Connection" button is disabled when provider or key is empty
9. Test "Test Connection" button triggers connection test
10. Test loading state during connection test (spinner displayed)
11. Test success state display (green checkmark + "Connection successful")
12. Test error state display (red X + error message)
13. Test Next button is disabled when connection test hasn't succeeded
14. Test Next button is enabled after successful connection test
15. Test Next button saves API key to secure storage
16. Test Back button calls `onBack` handler
17. Test Cancel button calls `onCancel` handler
18. Test error handling when secure storage fails

**Mock Strategy for Unit Tests:**
```typescript
import { vi } from 'vitest';
import { invoke } from '@tauri-apps/api/core';

vi.mock('@tauri-apps/api/core', () => ({
  invoke: vi.fn()
}));

// In tests:
vi.mocked(invoke).mockResolvedValue(true); // Success
vi.mocked(invoke).mockRejectedValue(new Error('Invalid API key')); // Error
```

**E2E Tests (optional but valuable for this complex step):**
- Full wizard flow from Step 1 → Step 5 → Step 6
- Test connection with valid API key (requires test API key or mock)
- Test connection with invalid API key
- Skip flow: click "Skip this step" → verify Step 6 loads
- Error handling: network errors, rate limiting
- Back button preserves Step 4 data

### Library & Framework Requirements

**UI Components to Use:**
- `Button` - from `$lib/components/ui/button/button.svelte`
- `Label` - from `$lib/components/ui/label/label.svelte`
- `FormItem` - from `$lib/components/ui/form/form-item.svelte`
- `FormMessage` - from `$lib/components/ui/form/form-message.svelte`
- `Input` - from `$lib/components/ui/input/input.svelte` (for password field)
- `Select` - from `$lib/components/ui/select/select.svelte` (for AI provider dropdown)
- `Check`, `X`, `Loader2` - from `lucide-svelte` (icons for test results)

**If Select component doesn't exist:**
- Use native `<select>` with consistent styling
- Apply classes: `w-full p-2 rounded-md border border-input bg-background text-sm`
- Follow Input component styling patterns

**Tauri API Imports:**
```typescript
import { invoke } from '@tauri-apps/api/core';
```

### Latest Technical Specifics (Web Research Results)

**Tauri v2 Secure Credential Storage (2025-2026):**

Based on web research, Tauri v2 has two main approaches for secure API key storage:

1. **Official Stronghold Plugin:**
   - Uses IOTA Stronghold secret management engine
   - Encrypted database for secrets
   - **Limitation:** Does NOT use system keychain, requires user password
   - **Best for:** Complex secret management, multiple keys

2. **Community Keyring Plugin (RECOMMENDED for this story):**
   - `tauri-plugin-keyring` - wrapper over Rust `keyring` crate
   - **Uses OS native keychains:**
     - macOS: Keychain
     - Windows: Credential Manager
     - Linux: Secret Service (libsecret)
   - **Advantage:** No user password needed, seamless OS integration
   - **Installation:** Add to `Cargo.toml`:
     ```toml
     [dependencies]
     keyring = "2.0" # Or use tauri-plugin-keyring
     ```

**Implementation Recommendation:**
- Use `keyring` crate for simplicity and native OS integration
- Service name: `"com.storyteller.app"`
- Account/username: Provider name (e.g., `"OpenAI"`)
- Password: API key value

**API Key Validation Best Practices (2025-2026):**

Based on web research:

1. **Test with Model List Endpoint:**
   - OpenAI: `GET /v1/models` is lightweight and reliable
   - Returns list of available models if key is valid
   - Fast response time (< 1 second typically)

2. **Error Handling:**
   - HTTP 401/403: "Invalid API key"
   - HTTP 429: "Rate limit exceeded"
   - Network errors: "Network connection error"
   - Timeout errors: "Connection timeout"

3. **Security:**
   - NEVER log or expose API keys in error messages
   - Store keys in environment variables or secure storage only
   - Use HTTPS for all API calls (enforced by providers)
   - Validate key format before testing (e.g., OpenAI keys start with "sk-")

4. **User Experience:**
   - Show clear loading state during test (spinner)
   - Provide specific error messages (not generic "failed")
   - Allow retry after failed test
   - Don't block user from proceeding if they want to skip

**Sources:**
- [Tauri Stronghold Plugin](https://v2.tauri.app/plugin/stronghold/)
- [Tauri Keyring Discussion](https://github.com/tauri-apps/tauri/discussions/7846)
- [tauri-plugin-keyring](https://github.com/HuakunShen/tauri-plugin-keyring)
- [OpenAI API Key Best Practices](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety)
- [OpenAI API Key Validation](https://trevorfox.com/api-key-tester/openai)

### Svelte 5 Reactivity (2025-2026)

**State Management:**
```typescript
// Reactive state
let selectedProvider = $state<string>('');
let apiKey = $state<string>('');
let isTestingConnection = $state<boolean>(false);
let connectionTestResult = $state<'idle' | 'success' | 'error'>('idle');
let connectionErrorMessage = $state<string>('');

// Derived state
const canTestConnection = $derived.by(() => {
  return selectedProvider !== '' && apiKey.trim().length > 0;
});

const canProceedToNext = $derived.by(() => {
  return connectionTestResult === 'success';
});
```

**Async Operations:**
```typescript
async function handleTestConnection() {
  if (!canTestConnection) return;

  isTestingConnection = true;
  connectionTestResult = 'idle';
  connectionErrorMessage = '';

  try {
    const isValid = await invoke<boolean>('test_api_connection', {
      provider: selectedProvider,
      apiKey: apiKey.trim()
    });

    connectionTestResult = isValid ? 'success' : 'error';
    if (!isValid) {
      connectionErrorMessage = 'Invalid API key';
    }
  } catch (error: any) {
    connectionTestResult = 'error';
    connectionErrorMessage = error?.message || 'Connection test failed';
  } finally {
    isTestingConnection = false;
  }
}
```

### TypeScript Strict Mode

All code must pass strict mode:
- Explicit return types for async functions
- Type assertions only when safe
- No `any` types without justification
- Proper error typing in catch blocks

### Accessibility (WCAG 2.1 AA)

- Progress indicator needs `role="progressbar"` with ARIA attributes
- Password input should have proper label association
- Connection test results should use `aria-live="polite"` for screen reader announcements
- All form inputs need visible labels
- Error messages should be programmatically associated with inputs
- Skip button should have clear focus indicator

### Project Context Reference

See comprehensive project rules and patterns:
- [Project Context](file:///c:/Users/KaRaN/trae-workspace/StoryTeller/_bmad-output/documentation/project-docs/project-context.md)
- [Epic 2: Project Setup & Configuration Wizard](file:///c:/Users/KaRaN/trae-workspace/StoryTeller/_bmad-output/planning/epics/epic-2-project-setup-configuration-wizard.md#L203-L236)
- [Previous Story (2-6)](file:///c:/Users/KaRaN/trae-workspace/StoryTeller/_bmad-output/implementation/sprint-artifacts/2-6-build-wizard-step-4-plot-premise.md)

### Implementation Checklist

**Before Starting:**
- [ ] Read Step 4 implementation (`step-4.svelte`) to understand latest patterns
- [ ] Research Tauri keyring integration options (Stronghold vs keyring crate)
- [ ] Verify Select component exists in UI library, or plan to use native `<select>`
- [ ] Review validation pattern from Steps 3-4
- [ ] Understand optional step logic (Skip button behavior)
- [ ] Plan API test implementation for each provider

**During Implementation:**

**Frontend:**
- [ ] Use exact same component structure as Steps 3-4
- [ ] Implement AI provider dropdown with 6 options
- [ ] Implement password input for API key (masked)
- [ ] Add prominent "Skip this step" button
- [ ] Implement Test Connection button with loading state
- [ ] Display connection test results (success/error with icons)
- [ ] Enable Next button only after successful test
- [ ] Add all required `data-testid` attributes
- [ ] Write comprehensive unit tests (target 16+ tests)

**Backend:**
- [ ] Create `src-tauri/src/commands/api_provider.rs`
- [ ] Implement `test_api_connection` command for each provider
- [ ] Create `src-tauri/src/commands/keychain.rs`
- [ ] Implement `store_api_key` command using keyring crate
- [ ] Implement `retrieve_api_key` command
- [ ] Register all new commands in `main.rs`
- [ ] Add `keyring` dependency to `Cargo.toml`
- [ ] Test keychain integration on target OS (Windows/macOS/Linux)

**After Implementation:**
- [ ] Run `pnpm check` to verify TypeScript types
- [ ] Run `pnpm test` to verify all unit tests pass
- [ ] Test manually in browser for connection test flow
- [ ] Test skip flow manually
- [ ] Test secure storage on OS keychain (verify key is stored)
- [ ] Verify accessibility with keyboard navigation
- [ ] Update story file with Dev Agent Record

### Critical Implementation Notes

⚠️ **SECURITY WARNING:**
- NEVER log API keys in console or error messages
- API keys should only exist in:
  1. User input (masked)
  2. Secure OS keychain
  3. Memory during test (cleared after)
- Do NOT store API keys in:
  - SQLite database (unless encrypted)
  - Local storage
  - Plain text files
  - Git repository

⚠️ **ERROR HANDLING:**
- Network errors vs authentication errors must be distinguished
- Rate limiting (HTTP 429) should suggest retry later
- Timeout errors should be user-friendly
- Storage errors should offer fallback or retry

⚠️ **USER EXPERIENCE:**
- "Skip this step" must be prominent and clear
- Loading state must be obvious during test
- Success state must be visually clear (green checkmark)
- Error messages must be specific and actionable
- Users should be able to retry after errors

### Story Completion Status

**Status:** ready-for-dev

**Note:** This story is **ready for development** with comprehensive context provided. All architectural patterns, API integration requirements, secure storage implementation, testing requirements, and UI component dependencies have been thoroughly documented. The developer has everything needed for flawless implementation based on established patterns from Steps 1-4, plus additional backend Tauri integration.

**Key Complexity Factors:**
1. Backend Tauri commands required (API testing + keychain storage)
2. Async operations with loading/success/error states
3. Optional step logic (skip functionality)
4. Secure credential storage using OS keychain
5. Multiple AI provider integrations
6. Comprehensive error handling for network/auth/storage failures

This is the most complex wizard step so far, requiring both frontend UI work and significant backend Rust development.

## Dev Agent Record

### Agent Model Used

_To be filled by Dev agent: Claude Sonnet 4.5 (claude-sonnet-4-5-20250929) or equivalent_

### Debug Log References

_To be filled by Dev agent during implementation_

### Completion Notes List

_To be filled by Dev agent after implementation:_
- Implementation summary
- Key technical decisions made
- Deviations from plan (if any)
- Testing approach and results
- Challenges encountered and solutions

### File List

_To be filled by Dev agent with all modified/created files:_
1. `src/lib/components/wizard/step-5.svelte` (NEW)
2. `src/lib/components/wizard/step-5.test.ts` (NEW)
3. `src/lib/components/wizard/types.ts` (MODIFIED)
4. `src/lib/components/wizard/index.ts` (MODIFIED)
5. `src/lib/components/wizard/wizard.svelte` (MODIFIED)
6. `src-tauri/src/commands/api_provider.rs` (NEW)
7. `src-tauri/src/commands/keychain.rs` (NEW)
8. `src-tauri/src/commands/mod.rs` (MODIFIED)
9. `src-tauri/src/main.rs` (MODIFIED)
10. `src-tauri/Cargo.toml` (MODIFIED)
11. `_bmad-output/implementation/sprint-artifacts/sprint-status.yaml` (MODIFIED)
12. `_bmad-output/implementation/sprint-artifacts/2-7-build-wizard-step-5-ai-provider-configuration.md` (this file)

### Change Log

_To be filled by Dev agent with implementation timeline and changes_
