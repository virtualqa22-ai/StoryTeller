# Testing Guide

## Unit Testing (Vitest)

### Component Tests
```typescript
import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import Button from "./button.svelte";

describe("Button", () => {
    it("renders with text", () => {
        render(Button, { props: { children: "Click me" } });
        expect(screen.getByRole("button")).toHaveTextContent("Click me");
    });

    it("applies custom class", () => {
        const { container } = render(Button, {
            props: { class: "custom-class" }
        });
        expect(container.firstChild).toHaveClass("custom-class");
    });
});
```

### Utility Tests
```typescript
import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
    it("formats ISO date to readable string", () => {
        const result = formatDate("2025-12-29T12:00:00Z");
        expect(result).toBe("Dec 29, 2025");
    });
});
```

---

## E2E Testing (Playwright)

### Page Tests
```typescript
import { test, expect } from "@playwright/test";

test.describe("Home Screen", () => {
    test("displays empty state when no projects", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("[data-testid='empty-state']")).toBeVisible();
    });

    test("displays recent projects list", async ({ page }) => {
        // TODO: Seed database with test data
        await page.goto("/");
        await expect(page.locator("[data-testid='projects-grid']")).toBeVisible();
    });
});
```

### Selectors Strategy
1. **data-testid** for major UI elements
2. **role-based** for accessibility (`getByRole("button")`)
3. **text content** as last resort

---

## Rust Testing

### Unit Tests
```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_project() {
        let conn = Connection::open_in_memory().unwrap();
        // ... test logic
    }
}
```

### Integration Tests
```rust
// tests/integration_test.rs
use storyteller_lib::db;

#[test]
fn test_full_workflow() {
    // Test complete CRUD workflow
}
```

---
