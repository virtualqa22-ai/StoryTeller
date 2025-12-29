# Multi-AI Provider Support

- FR60: System supports multiple AI providers through API key configuration
- FR61: Users can switch between AI models when one reaches limits
- FR62: System provides clear error messages distinguishing between connection failures and AI provider unavailability
- FR63: System automatically switches to alternate configured AI provider when primary provider fails
- FR64: System handles API failures gracefully with user notification and retry options
- FR65: Users can add or change API keys during active project
- FR66: System stores API keys securely in OS credential manager (Windows Credential Manager, macOS Keychain, Linux libsecret)
- FR67: System manages context window limits by intelligently pruning less relevant Story Bible entries when approaching token limits
- FR68: System logs AI generation decisions and validation results for quality assurance and troubleshooting
- FR137: System provides demo mode with simulated AI responses for testing without API costs
- FR150: Users can disable AI features entirely and use StoryTeller as writing/organization tool only
- FR182: System never logs or exposes API keys in diagnostic logs, error messages, or telemetry
- FR183: System allows users to remove/revoke stored API keys
- FR192: System pauses AI generation gracefully when API authentication fails and allows user to update credentials
- FR204: Users can manually flag AI-generated content as containing contradictions for quality improvement
- FR205: System learns from user contradiction flags to improve validation accuracy
- FR214: System handles API rate limiting with intelligent retry and user notification
