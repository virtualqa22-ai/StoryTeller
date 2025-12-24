# Epic 9: Productivity & Motivation Features

Authors stay motivated and track their writing journey with milestone achievements, chapter objectives, productivity metrics, and exportable progress reports.

### Story 9.1: Design Productivity Tracking Database Schema [Tier 1]

As a development team,
I want a database schema for tracking writing sessions and productivity metrics,
So that authors can monitor their progress and stay motivated.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V9__create_productivity_schema.sql`
**Then** the migration defines a `writing_sessions` table with fields: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY), chapter_id (INTEGER, FOREIGN KEY, nullable), start_time (TIMESTAMP), end_time (TIMESTAMP), words_written (INTEGER), session_duration_seconds (INTEGER), created_at (TIMESTAMP)
**And** a `milestones` table is defined: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY), milestone_type (TEXT: 'first_chapter', '10k_words', '50k_words', 'chapter_complete', 'project_complete'), milestone_value (INTEGER), achieved_at (TIMESTAMP), is_celebrated (BOOLEAN DEFAULT 0)
**And** a `chapter_objectives` table is defined: id (PRIMARY KEY), chapter_id (INTEGER, FOREIGN KEY), objective_text (TEXT), is_completed (BOOLEAN DEFAULT 0), completed_at (TIMESTAMP)

### Story 9.2: Implement Writing Session Tracking [Tier 1]

As an author,
I want the application to automatically track my writing sessions,
So that I can see how much time and effort I'm putting into my novel.

**Acceptance Criteria:**

**Given** the author opens a chapter in the editor
**When** the author starts typing
**Then** a writing session is automatically started with start_time, chapter_id, and initial_word_count recorded
**And** the session tracks total words written and duration

**Given** a writing session is active
**When** the author stops writing for 30 minutes
**Then** the session is automatically ended with end_time and final metrics saved

### Story 9.3: Implement Productivity Dashboard [Tier 1]

As an author,
I want a dashboard showing my writing progress and productivity metrics,
So that I can stay motivated and track my goals.

**Acceptance Criteria:**

**Given** the author has written content across multiple sessions
**When** the author opens the Productivity Dashboard
**Then** the dashboard displays: Total project word count vs. target, Current writing streak (consecutive days), Words written today/week/month, Average words per session, Total time spent writing, Chapter completion rate, Milestone achievements (badges)
**And** visual elements include progress bars, charts, and badges

**Given** the author achieves a milestone
**When** the milestone is reached (e.g., 10,000 words)
**Then** a celebration animation is displayed with confetti
**And** a toast notification congratulates the author
**And** the milestone is recorded and displayed on the dashboard

### Story 9.4: Implement Chapter Objectives [Tier 2]

As an author,
I want to define objectives for each chapter,
So that I can track specific goals beyond word count.

**Acceptance Criteria:**

**Given** the author is viewing a chapter
**When** the author right-clicks the chapter
**Then** a "Set Chapter Objectives" option is available
**And** objectives can be added as a checklist
**And** objectives can be marked complete with checkboxes

**Given** all objectives for a chapter are completed
**When** the last objective is checked off
**Then** a celebration animation is displayed
**And** the chapter shows a completion badge

### Story 9.5: Implement Productivity Reports Export [Tier 2]

As an author,
I want to export my productivity data as a report,
So that I can share progress with accountability partners.

**Acceptance Criteria:**

**Given** the author is viewing the Productivity Dashboard
**When** an "Export Report" button is clicked
**Then** report options are displayed: Report period (7 days, 30 days, 90 days, all time), Format (PDF, CSV, JSON), Include charts, Include session details
**And** the report is generated and saved

---
