# Acceptance Criteria

1. **Given** the application is launched with no projects
   **When** the home screen renders
   **Then** a welcome message is displayed: "Welcome to StoryTeller"
   **And** two primary action buttons are shown: "Create New Project" (primary button) and "Open Existing Project" (secondary button)
   **And** an empty state illustration is displayed
   **And** the layout follows Fluent Design principles with proper spacing

2. **Given** the application has 1-5 recent projects
   **When** the home screen renders
   **Then** a "Recent Projects" section displays a card for each project
   **And** each project card shows: project title, author/pen name, last modified date (relative time: "2 hours ago"), project thumbnail or genre icon, word count progress (e.g., "15,000 / 80,000 words")
   **And** clicking a project card opens that project
   **And** each card has a context menu with "Open", "Open in File Explorer", and "Remove from List" options
   **And** the "Create New Project" button remains prominently displayed above the list

3. **Given** the application has 10+ recent projects
   **When** the home screen renders
   **Then** only the 10 most recent projects are displayed
   **And** a "View All Projects" link is shown at the bottom
   **And** projects are sorted by last_opened_at descending
