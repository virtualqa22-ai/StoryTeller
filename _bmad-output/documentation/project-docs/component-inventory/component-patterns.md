# Component Patterns

## Svelte 5 Runes
All components use modern Svelte 5 runes:
- `$props()` - Component props declaration
- `$derived()` - Computed reactive values
- `$state()` - Component-local reactive state
- `$effect()` - Side effects (rare, avoided when possible)

## TypeScript
- Strict type checking enabled
- Props interfaces defined inline or as types
- Generic types for flexible components (e.g., `Snippet`)

## Styling
- Tailwind CSS utility classes
- Fluent Design tokens for colors and spacing
- `cn()` utility for conditional class merging
- Custom CSS variables defined in `app.css`

## Accessibility
- Semantic HTML elements
- ARIA labels and roles where needed
- Keyboard navigation support
- Focus visible states

---
