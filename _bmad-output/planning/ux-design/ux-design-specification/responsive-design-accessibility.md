# Responsive Design & Accessibility

## Responsive Breakpoints

**Desktop (1366px+):**
- Full three-column layout (sidebar + main + Story Bible panel)
- All features visible
- Keyboard shortcuts prominent
- Optimal for power users

**Tablet (768px - 1365px):**
- Two-column layout (sidebar collapses to icons, main content)
- Story Bible panel overlays when opened
- Touch-friendly targets (44x44px minimum)
- Simplified toolbar

**Mobile (< 768px) - Future Consideration:**
- Single column, full-screen writing
- Sidebar as drawer (swipe or button)
- Story Bible as modal
- Focus on core writing experience

## Responsive Patterns

**Flexible Panels:**
- Sidebar: Collapses to icon bar on smaller screens
- Story Bible: Becomes modal overlay
- Main content: Always takes remaining space
- Resizable: Draggable dividers remember position

**Adaptive Typography:**
- Desktop: Full type scale
- Tablet: Slightly smaller (90%)
- Mobile: Optimized for readability (larger body text)

**Touch Optimization:**
- Larger tap targets on touch devices
- Swipe gestures for navigation
- Pull-to-refresh where appropriate
- No hover-dependent interactions

## Accessibility Features

**Screen Reader Support:**
- Semantic HTML (header, nav, main, article)
- ARIA labels on all interactive elements
- ARIA live regions for dynamic content
- Proper heading hierarchy

**Keyboard Navigation:**
- Tab order follows visual flow
- All actions accessible via keyboard
- Shortcuts displayed in tooltips
- Escape closes modals/dialogs

**Visual Accessibility:**
- High contrast mode support
- Scalable text (zoom to 200%)
- Color-blind friendly (never color-only)
- Focus indicators always visible

**Motor Accessibility:**
- Large click targets (44x44px minimum)
- No time-limited actions
- Undo for all destructive actions
- Sticky keys compatible

**Cognitive Accessibility:**
- Clear, simple language
- Consistent patterns throughout
- Progress indicators for long operations
- Error messages are specific and helpful

## Accessibility Testing Checklist

- [ ] Screen reader testing (NVDA, VoiceOver)
- [ ] Keyboard-only navigation
- [ ] Color contrast verification (all combinations)
- [ ] Zoom testing (100%, 150%, 200%)
- [ ] Color blindness simulation
- [ ] Focus indicator visibility
- [ ] Touch target size verification
- [ ] ARIA label completeness

---
