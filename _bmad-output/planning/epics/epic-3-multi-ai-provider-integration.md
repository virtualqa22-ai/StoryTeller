# Epic 3: Multi-AI Provider Integration

Authors can securely connect to multiple AI providers (OpenAI, Claude, Gemini, Deepseek, Yandex, custom), switch between them when needed, and have their API keys stored securely in OS credential storage.

### Story 3.1: Design AI Provider Database Schema [Tier 1]

As a development team,
I want a database schema for storing AI provider configurations,
So that users can manage multiple providers with proper metadata.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V3__create_ai_providers_schema.sql`
**Then** the migration defines an `ai_providers` table with fields: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY to projects.id), provider_name (TEXT NOT NULL: 'openai', 'claude', 'gemini', 'deepseek', 'yandex', 'custom'), display_name (TEXT), api_endpoint (TEXT), model_name (TEXT), is_primary (BOOLEAN DEFAULT 0), is_active (BOOLEAN DEFAULT 1), created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), last_used_at (TIMESTAMP)
**And** the schema includes a unique constraint on (project_id, provider_name)
**And** the schema includes an index on (project_id, is_primary)
**And** only one provider per project can have is_primary = 1 (enforced via trigger)

**Given** the ai_providers table is created
**When** the team tests the schema
**Then** provider records can be inserted for a project
**And** API keys are NOT stored in this table (stored in OS keychain)
**And** the primary provider can be identified via the is_primary flag
**And** inactive providers (is_active = 0) are excluded from failover logic

### Story 3.2: Implement OS Keychain Integration for Secure Credential Storage [Tier 1]

As a development team,
I want API keys stored in OS-specific secure credential storage,
So that sensitive keys are never stored in plaintext and follow platform security best practices.

**Acceptance Criteria:**

**Given** the Tauri Rust backend
**When** the team implements keychain integration
**Then** the following OS-specific libraries are used: macOS: Security framework (keychain-rs crate or native), Windows: Windows Credential Manager (windows crate with CredWrite/CredRead), Linux: libsecret (secret-service crate)
**And** a unified Rust abstraction layer is created with methods: `store_credential(service: &str, account: &str, password: &str) -> Result<()>`, `retrieve_credential(service: &str, account: &str) -> Result<String>`, `delete_credential(service: &str, account: &str) -> Result<()>`

**Given** the keychain abstraction is implemented
**When** the team tests credential storage
**Then** storing a credential with `service = "storyteller.ai_provider"` and `account = "project_{id}_{provider_name}"` succeeds
**And** the credential is retrievable using the same service and account identifiers
**And** deleting the credential removes it from the keychain
**And** attempting to retrieve a non-existent credential returns a specific error (not a generic failure)

**Given** the keychain integration is tested on all platforms
**When** the team runs platform-specific tests
**Then** credentials are stored in: macOS: Keychain Access.app shows "storyteller.ai_provider" entries, Windows: Credential Manager shows "storyteller.ai_provider" entries, Linux: libsecret stores credentials accessible via `secret-tool`
**And** credentials persist across app restarts
**And** credentials are isolated per project (using project_id in account identifier)

**Given** the OS keychain is unavailable (e.g., Linux without libsecret)
**When** the application attempts to store credentials
**Then** a fallback mechanism is used: AES-256-GCM encrypted file stored at `{app_data}/credentials.enc`, Key derived from machine-specific hardware ID, Clear warning displayed to user about fallback security
**And** the fallback is documented in error messages

### Story 3.3: Build AI Provider Configuration UI [Tier 1]

As an author,
I want a settings UI to manage my AI provider configurations,
So that I can add, edit, or remove API keys and switch between providers.

**Acceptance Criteria:**

**Given** the user opens Settings (Ctrl+, or ⌘+,)
**When** the user navigates to the "AI Providers" section
**Then** a list of configured providers is displayed with columns: Provider name (with icon), Model, Status (Active/Inactive toggle), Primary (radio button), Actions (Edit, Delete)
**And** an "Add Provider" button is prominently displayed
**And** if no providers are configured, an empty state is shown with the message "No AI providers configured. Add one to enable AI features."

**Given** the user clicks "Add Provider"
**When** the provider configuration modal opens
**Then** the following fields are displayed: "Provider" dropdown (OpenAI, Anthropic Claude, Google Gemini, Deepseek, Yandex, Custom), "API Key" password input (masked), "Model Name" text input (pre-filled with default for selected provider), "API Endpoint" text input (only shown for Custom provider), "Set as Primary" checkbox
**And** a "Test Connection" button is displayed
**And** "Save" and "Cancel" buttons are displayed

**Given** the user selects "OpenAI" as the provider
**When** the modal updates
**Then** the "Model Name" field is pre-filled with "gpt-4o"
**And** the "API Endpoint" field is hidden (uses default OpenAI endpoint)
**And** a help link is displayed: "Get your OpenAI API key" (links to OpenAI docs)

**Given** the user enters an API key and clicks "Test Connection"
**When** the test runs
**Then** a loading spinner is displayed with the message "Testing connection..."
**And** a test API call is made to the provider (e.g., simple completion or model list)
**And** if successful, a green checkmark appears with "Connection successful! Model: {model_name}"
**And** if failed, a red X appears with a specific error message (e.g., "Invalid API key", "Network error", "Rate limit exceeded")
**And** the "Save" button is only enabled after a successful test

**Given** the user successfully tests and saves a provider
**When** the provider is added
**Then** the new provider appears in the providers list
**And** if "Set as Primary" was checked, the provider is marked as primary (other providers are unmarked)
**And** the API key is stored in OS keychain
**And** a success toast is displayed: "Provider added successfully"

### Story 3.4: Implement AI Provider Abstraction Layer [Tier 1]

As a development team,
I want a unified abstraction layer for all AI providers,
So that the application can interact with different providers through a consistent interface.

**Acceptance Criteria:**

**Given** the Rust backend has multiple AI provider integrations
**When** the team implements the abstraction layer
**Then** a Rust trait `AIProvider` is defined with methods: `generate_completion(&self, prompt: &str, context: &str, max_tokens: u32) -> Result<String>`, `stream_completion(&self, prompt: &str, context: &str, max_tokens: u32) -> Result<Stream<String>>`, `get_model_info(&self) -> ModelInfo`, `test_connection(&self) -> Result<bool>`
**And** concrete implementations are created for each provider: `OpenAIProvider`, `ClaudeProvider`, `GeminiProvider`, `DeepseekProvider`, `YandexProvider`, `CustomProvider`

**Given** the abstraction layer is implemented
**When** the application needs to generate content
**Then** the code uses the `AIProvider` trait interface
**And** the specific provider is selected based on the project's primary provider configuration
**And** switching providers requires no changes to calling code (only configuration)

**Given** a provider-specific implementation (e.g., OpenAIProvider)
**When** the implementation is reviewed
**Then** it correctly formats prompts for that provider's API
**And** it handles provider-specific authentication (Bearer token, API key header, etc.)
**And** it correctly parses responses from that provider's API
**And** it implements retry logic for transient failures (3 retries with exponential backoff)
**And** it respects rate limits with appropriate delays

**Given** the abstraction layer is complete
**When** the team tests with multiple providers
**Then** the same StoryTeller features work identically regardless of which provider is configured
**And** switching the primary provider in settings immediately affects subsequent AI operations
**And** provider-specific errors are translated to user-friendly messages

### Story 3.5: Implement Rate Limiting and Quota Management [Tier 2]

As an author,
I want the application to handle API rate limits gracefully,
So that I don't lose work or experience errors when my API provider enforces rate limits.

**Acceptance Criteria:**

**Given** an AI provider with rate limits
**When** the application makes API calls
**Then** each provider implementation tracks request counts per minute
**And** if approaching the known rate limit (e.g., 90% of limit), the application delays requests
**And** if a rate limit error is received (HTTP 429), the application waits for the specified retry-after duration
**And** the user sees a toast notification: "API rate limit reached. Retrying in {X} seconds..."

**Given** a rate limit error occurs during AI generation
**When** the retry logic executes
**Then** the application waits for the retry-after period
**And** the generation progress indicator shows "Rate limit reached, retrying..."
**And** after the wait period, the request is automatically retried
**And** if the retry succeeds, generation continues seamlessly
**And** if the retry fails after 3 attempts, the user sees an actionable error

**Given** the user's API quota is exhausted (monthly limit)
**When** an API call fails with a quota exceeded error
**Then** the application displays a specific error message: "Your {provider} API quota has been exhausted. Please upgrade your plan or switch to another provider."
**And** a "Switch Provider" button is displayed in the error message
**And** clicking the button opens the AI Provider settings

### Story 3.6: Implement Automatic Failover to Alternate Providers [Tier 2]

As an author,
I want the application to automatically switch to a backup AI provider if the primary fails,
So that my writing workflow is not interrupted by provider outages.

**Acceptance Criteria:**

**Given** a project has multiple active AI providers configured
**When** the primary provider fails (network error, service unavailable, rate limit exhausted)
**Then** the application automatically attempts to use the next active provider
**And** a toast notification is displayed: "Primary provider unavailable. Switched to {backup_provider}."
**And** the generation continues with the backup provider
**And** the user can optionally set the backup provider as the new primary

**Given** the primary provider fails and a backup provider is used
**When** the backup provider successfully completes the request
**Then** subsequent requests continue using the backup provider for the current session
**And** the original primary provider is automatically retried after 5 minutes (background check)
**And** if the primary provider is available again, the user is notified: "Primary provider {name} is available again."

**Given** all configured providers fail
**When** the application exhausts all failover options
**Then** the user sees a clear error message: "All configured AI providers are unavailable. Please check your internet connection or provider status."
**And** a "Retry" button is displayed
**And** a "Configure Providers" button is displayed to access settings

### Story 3.7: Implement API Key Rotation and Revocation [Tier 2]

As an author,
I want to easily rotate or revoke my API keys,
So that I can maintain security if a key is compromised.

**Acceptance Criteria:**

**Given** the user is viewing the AI Providers list in Settings
**When** the user clicks "Edit" on a provider
**Then** an edit modal opens with the current configuration (API key is masked: "••••••••••••")
**And** a "Change API Key" button is displayed
**And** clicking "Change API Key" reveals a new API key input field
**And** the user can enter a new key and click "Test Connection"
**And** if successful, clicking "Save" updates the key in OS keychain
**And** the old key is removed from keychain

**Given** the user wants to revoke a provider
**When** the user clicks "Delete" on a provider
**Then** a confirmation modal is displayed: "Remove {provider_name}? This will delete the stored API key and you'll need to re-enter it if you want to use this provider again."
**And** if confirmed, the provider record is deleted from the database
**And** the API key is removed from OS keychain
**And** if the deleted provider was primary, the user is prompted to select a new primary provider

**Given** the application detects an invalid API key during operation
**When** an authentication error occurs
**Then** the application pauses the current operation gracefully
**And** a modal is displayed: "The API key for {provider} is no longer valid. Please update your credentials."
**And** an "Update Key" button opens the provider edit modal
**And** the user can update the key without losing unsaved work

### Story 3.8: Implement Clear Error Messages and User Guidance [Tier 1]

As an author,
I want clear and actionable error messages when AI provider issues occur,
So that I understand what went wrong and how to fix it.

**Acceptance Criteria:**

**Given** an AI provider error occurs
**When** the application handles the error
**Then** the error message distinguishes between error types: "Invalid API Key" → "The API key for {provider} is invalid. Please check your key in Settings.", "Network Error" → "Cannot connect to {provider}. Please check your internet connection.", "Service Unavailable" → "{provider} is currently unavailable. Trying backup provider...", "Rate Limit" → "API rate limit reached for {provider}. Retrying in {X} seconds.", "Quota Exceeded" → "Your {provider} monthly quota has been exhausted. Please upgrade your plan."
**And** each error message includes a specific action button (e.g., "Open Settings", "Retry", "Switch Provider")

**Given** the application is offline (no internet connection)
**When** the user attempts to use AI features
**Then** a clear message is displayed: "AI features require an internet connection. You can continue writing and use AI features when you're back online."
**And** AI-related buttons are disabled with a tooltip explaining why
**And** the status bar shows an offline indicator

**Given** the user has not configured any AI providers
**When** the user attempts to use AI features
**Then** a modal is displayed: "AI providers not configured. Would you like to set one up now?"
**And** a "Configure AI Provider" button opens the Settings → AI Providers page
**And** a "Maybe Later" button allows the user to continue without AI features

**Given** an error occurs during AI generation
**When** the error is logged
**Then** diagnostic logs capture: Error type and message, Provider name, Timestamp, Request context (prompt type, e.g., "chapter generation"), User action (e.g., "retry", "switched provider")
**And** API keys are NEVER logged in any logs
**And** manuscript content is NEVER logged in any logs