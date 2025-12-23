# Selector Resilience Checklist

Before deploying selectors:

- [ ] **Hierarchy followed**: data-testid (1st choice) > ARIA (2nd) > text (3rd) > CSS/ID (last resort)
- [ ] **Interactive elements use data-testid**: Buttons, inputs, links have dedicated test attributes
- [ ] **Semantic elements use ARIA**: Headings, navigation, forms use roles and accessible names
- [ ] **No brittle patterns**: No CSS classes (except visual tests), no arbitrary nth(), no complex XPath
- [ ] **Dynamic content handled**: Regex for IDs/timestamps, filter() for lists, partial matching for text
- [ ] **Selectors are scoped**: Use container locators to narrow scope (prevent ambiguity)
- [ ] **Human-readable**: Selectors document user intent (clear, semantic, maintainable)
- [ ] **Validated in Inspector**: Test selectors interactively before committing (page.pause())
