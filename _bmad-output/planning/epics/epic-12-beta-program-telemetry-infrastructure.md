# Epic 12: Beta Program & Telemetry Infrastructure

Product team can collect opt-in anonymous feedback, track quality metrics, validate data loss prevention, and improve the product based on real beta user usage across all platforms.

### Story 12.1: Design Telemetry Database Schema [Tier 1]

As a development team,
I want a database schema for telemetry events and user feedback,
So that we can collect and analyze beta user data effectively.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V10__create_telemetry_schema.sql`
**Then** tables are defined for telemetry_events, user_feedback, and telemetry_consent
**And** no PII is stored in telemetry data

### Story 12.2: Implement Opt-In Consent Dialog [Tier 1]

As an author,
I want clear control over whether StoryTeller collects anonymous usage data,
So that I can make an informed decision about privacy.

**Acceptance Criteria:**

**Given** StoryTeller launches for the first time
**When** the first-run experience begins
**Then** a telemetry consent dialog is displayed with clear explanation of what data is collected
**And** the user can opt-in or opt-out
**And** the preference is respected permanently

### Story 12.3: Implement Sentry Integration for Crash Reporting [Tier 1]

As a development team,
I want crash reports sent to Sentry,
So that we can diagnose and fix critical issues quickly.

**Acceptance Criteria:**

**Given** StoryTeller is built for beta
**When** an unhandled error occurs
**Then** the error report is sent to Sentry with stack trace, app version, platform, and anonymous user_id
**And** the report excludes all sensitive data (manuscript content, API keys, PII)

### Story 12.4: Implement In-App Feedback Mechanism [Tier 1]

As an author,
I want an easy way to provide feedback or report issues,
So that I can contribute to improving StoryTeller.

**Acceptance Criteria:**

**Given** the user wants to provide feedback
**When** the user clicks the "Feedback" button
**Then** a feedback form is displayed with fields for type (bug, feature, general), subject, description, rating, and optional contact email
**And** submitted feedback is stored and optionally uploaded (if telemetry enabled)

### Story 12.5: Implement Diagnostic Logging with Privacy Safeguards [Tier 1]

As a development team,
I want comprehensive diagnostic logs for troubleshooting,
So that we can diagnose issues while respecting privacy.

**Acceptance Criteria:**

**Given** the application is running
**When** operations occur
**Then** diagnostic events are logged to rotating log files (max 10MB each, 5 files retained)
**And** logs automatically scrub API keys, manuscript content, and PII
**And** users can view, export, or clear logs in Settings

### Story 12.6: Track Beta Program Metrics [Tier 2]

As a development team,
I want to track beta program success metrics,
So that we can measure product quality and readiness for launch.

**Acceptance Criteria:**

**Given** beta users are using StoryTeller
**When** telemetry data is collected
**Then** metrics are tracked: Total user-hours (target: 3,000+), Crash rate (target: <1 per 100 hours), Validation accuracy (FN <5%, FP <10%), Export success rate (target: >95%), Platform distribution (40% Windows, 40% macOS, 20% Linux)
**And** a beta dashboard displays progress toward quality gates

### Story 12.7: Implement Demo Mode [Tier 2]

As a developer or tester,
I want a demo mode with simulated AI responses,
So that I can test features without API costs.

**Acceptance Criteria:**

**Given** demo mode is enabled in Settings
**When** AI generation is triggered
**Then** simulated responses are returned (placeholder text, template characters)
**And** no actual API calls are made
**And** demo mode is clearly indicated in the UI
