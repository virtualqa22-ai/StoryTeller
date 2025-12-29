# Component Strategy

## Core Component Library

**Layout Components:**
1. **AppShell** - Header + sidebar + main content structure
2. **ResizablePanel** - Draggable dividers for flexible layout
3. **Sidebar** - Collapsible navigation with chapter list
4. **Header** - App title, auto-save status, user menu
5. **Modal** - Centered dialogs with overlay

**Navigation Components:**
1. **ChapterList** - Hierarchical tree with drag-drop reordering
2. **Breadcrumbs** - Current location context
3. **CommandPalette** - Keyboard-driven quick actions (Ctrl+P)
4. **TabBar** - Multi-project support (future)

**Input Components:**
1. **RichTextEditor** - Custom editor with validation overlay
2. **TextInput** - Standard text input with validation
3. **TextArea** - Multi-line text input
4. **Select** - Dropdown selection
5. **Checkbox** - Boolean selection
6. **RadioGroup** - Single selection from options

**Feedback Components:**
1. **ValidationIndicator** - Checkmark/warning/error with expandable details
2. **ProgressBar** - Linear progress visualization
3. **ProgressRing** - Circular progress (Duolingo-style)
4. **Toast** - Ambient notifications (bottom-right)
5. **Spinner** - Loading indicator
6. **Badge** - Achievement badges, counts

**Content Components:**
1. **StoryBibleCard** - Entry card with color-coded type
2. **ChapterCard** - Chapter preview with metadata
3. **AchievementBadge** - Milestone celebration
4. **StreakCounter** - Writing streak with fire emoji
5. **WordCountWidget** - Current/target word count

**Story Bible Components:**
1. **CharacterEditor** - Character profile form
2. **LocationEditor** - Location details form
3. **PlotEditor** - Plot point tracker
4. **RelationshipGraph** - Visual connections (advanced mode)

**AI Generation Components:**
1. **GenerationPreview** - Preview panel with accept/reject
2. **ContextAssembly** - Real-time context gathering visualization
3. **ValidationResults** - Expandable validation proof
4. **ContradictionResolver** - Side-by-side comparison for conflicts

## Component Design Patterns

**Composition Over Inheritance:**
- Small, focused components
- Compose complex UIs from simple building blocks
- Reusable across different contexts

**Prop-Driven Configuration:**
- Components configured via props, not variants
- Flexible without bloat
- TypeScript for type safety

**Accessibility Built-In:**
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management
- Screen reader announcements

**Performance Optimized:**
- Lazy loading for heavy components
- Virtual scrolling for long lists
- Memoization for expensive renders
- Code splitting by route

---
