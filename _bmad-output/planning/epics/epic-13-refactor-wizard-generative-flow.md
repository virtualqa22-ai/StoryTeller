# Epic 13: Refactor Wizard for Generative Flow

The current Project Creation Wizard (Epic 2) was implemented as a manual data entry flow. The original `Requirement.txt` specified a generative flow where the AI actively assists in creating characters, settings, and chapter outlines during the setup process. This epic refactors the wizard to match those requirements.

## Story 13.1: Implement Global API Key Gate [Tier 1]

As a new user,
I must provide an API key before I can proceed with the application,
So that the AI features are guaranteed to be available for the generative wizard steps.

**Acceptance Criteria:**
- **Given** the user launches the application for the first time (or has no API key stored)
- **When** the application starts
- **Then** a "Gate" screen is displayed blocking access to the rest of the app
- **And** the user is prompted to select a provider and enter an API key
- **And** validation is performed (connection test)
- **And** once validated and stored, the user is automatically advanced to the Wizard or Home screen
- **Note:** This replaces the current Step 5 "LLM Configuration" in the wizard.

## Story 13.2: Implement Generative Character Creation in Wizard [Tier 1]

As an author,
I want the AI to generate character ideas based on my story premise,
So that I can quickly populate my story with interesting characters.

**Acceptance Criteria:**
- **Given** the user has entered Story Title, Genre, and Description (Step 2 in requirements)
- **When** the user proceeds to the "Characters" step
- **Then** the AI automatically generates 5-10 character ideas (Name, Role, Brief Description) based on the story premise
- **And** the user can select/deselect which characters to keep
- **And** the user can edit the generated characters or add manual ones
- **And** the selected characters are saved to the project's Story Bible upon project creation

## Story 13.3: Implement Generative Setting Creation in Wizard [Tier 1]

As an author,
I want the AI to generate setting ideas based on my story premise,
So that I can visualize the world of my story.

**Acceptance Criteria:**
- **Given** the user has confirmed characters
- **When** the user proceeds to the "Settings" step
- **Then** the AI automatically generates 5-10 setting ideas (Name, Type, Description) based on the story premise
- **And** the user can select/deselect settings
- **And** the user can edit or add manual settings
- **And** the selected settings are saved to the Story Bible

## Story 13.4: Implement Generative Chapter Outline in Wizard [Tier 1]

As an author,
I want the AI to generate a chapter outline based on my story elements,
So that I have a roadmap for writing.

**Acceptance Criteria:**
- **Given** the user has confirmed characters and settings
- **When** the user proceeds to the "Outline" step
- **Then** the AI generates a list of chapters (Title, Synopsis)
- **And** the user can reorder, edit, add, or delete chapters
- **And** the final outline is saved as the project's initial chapter structure

## Story 13.5: Refactor Wizard Step Order and State Management [Tier 1]

As a developer,
I need to update the wizard's internal state and step navigation to support the generative flow,
So that the user experience is seamless and data is correctly persisted.

**Acceptance Criteria:**
- **Given** the new generative requirements
- **When** the wizard logic is refactored
- **Then** the step order is:
    1. Project Details (Title, Genre, Description) - *was Step 1*
    2. Character Generation (AI) - *New*
    3. Setting Generation (AI) - *New*
    4. Outline Generation (AI) - *New*
    5. Review & Create - *New/Modified*
- **And** the "LLM Configuration" step is removed (moved to Global Gate)
- **And** the "Writing Style" step (current Step 4) is either preserved as an optional step or integrated into Project Details
- **And** the WizardState interface is updated to hold the generated lists (characters, settings, chapters)

## Story 13.6: Implement Global Settings Access for API Key Management [Tier 1]

As a user,
I want a settings icon accessible from all screens,
So that I can update or change my AI API key at any time without navigating away from my work.

**Acceptance Criteria:**
- **Given** the user is on any screen (Wizard, Home, Workspace, etc.)
- **When** the user looks for settings
- **Then** a visible "Settings" icon (gear icon) is present in the UI (e.g., top-right corner or sidebar)
- **And** clicking the icon opens a settings popup/modal
- **And** the modal allows the user to view the currently configured provider
- **And** the modal allows the user to update/change the API key
- **And** the change takes effect immediately for subsequent AI operations
