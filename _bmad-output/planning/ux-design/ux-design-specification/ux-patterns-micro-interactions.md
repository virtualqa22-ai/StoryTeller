# UX Patterns & Micro-Interactions

## Interaction Patterns

**Hover States:**
- Buttons: Darken 10%, subtle lift (2px shadow)
- Cards: Lift 4px, stronger shadow
- Links: Underline appears, color darkens
- Icons: Scale 110%, color change

**Click/Tap Feedback:**
- Buttons: Scale 98%, brief press animation
- Cards: Scale 99%, quick bounce back
- Checkboxes: Checkmark animates in
- Toggles: Smooth slide transition

**Focus States:**
- All interactive: 2px blue outline
- Inputs: Outline + label color change
- Buttons: Outline + subtle glow
- Cards: Outline + lift

**Loading States:**
- Buttons: Spinner replaces text, disabled
- Content: Skeleton screens (not spinners)
- Progress: Linear bar at top of screen
- Long operations: Progress with estimated time

## Micro-Interactions

**Auto-Save Indicator:**
- "Saving..." appears briefly
- Transitions to "Last saved 30 seconds ago"
- Updates every 30 seconds
- Click to view version history

**Word Count Update:**
- Animates when count changes
- Milestone celebrations at round numbers
- Color changes as approaching goal
- Confetti animation at goal achievement

**Chapter Completion:**
- Checkmark animates in
- Brief "Chapter complete! 🎉" toast
- Progress bar updates smoothly
- Next chapter highlights

**Story Bible Suggestion:**
- Slides in from right
- Gentle pulse to draw attention
- Dismissible with X or click away
- Accepts with single click

**AI Generation Progress:**
- Context assembly: Items check off as found
- Generation: Animated dots or progress bar
- Validation: Quick check animation
- Preview: Smooth slide-in from bottom

**Validation Results:**
- Success: Green checkmark with subtle bounce
- Warning: Amber icon with gentle shake
- Error: Red X with attention-grabbing pulse
- Expandable: Smooth accordion animation

**Achievement Unlocked:**
- Badge slides in from top-right
- Brief celebration animation
- Auto-dismisses after 5 seconds
- Click to view all achievements

**Streak Counter:**
- Fire emoji pulses on increment
- Number counts up with animation
- Special animation at milestones (7, 30, 100 days)
- Sad face if streak breaks (encouraging, not punishing)

## Feedback Patterns

**Immediate Feedback:**
- Typing: Instant character appearance (< 16ms)
- Clicks: Visual response within 100ms
- Validation: Real-time as user types
- Auto-save: Visible status update

**Progressive Feedback:**
- AI generation: Multi-stage progress
- Export: Step-by-step progress
- Story Bible building: Incremental growth
- Novel completion: Percentage updates

**Confirmatory Feedback:**
- Actions: "Scene added! ✓" toast
- Deletions: "Chapter deleted" with undo
- Saves: "Changes saved" brief message
- Exports: "Export complete! 📚" celebration

**Error Feedback:**
- Specific: "Marcus's eye color contradicts Chapter 3"
- Actionable: "Which is correct? [Blue] [Brown]"
- Helpful: "This will update your Story Bible"
- Recoverable: Always provide undo or fix path

---
