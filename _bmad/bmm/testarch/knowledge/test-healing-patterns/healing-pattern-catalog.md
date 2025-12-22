# Healing Pattern Catalog

| Failure Type   | Diagnostic Signature                          | Healing Strategy                      | Prevention Pattern                        |
| -------------- | --------------------------------------------- | ------------------------------------- | ----------------------------------------- |
| Stale Selector | "locator resolved to 0 elements"              | Replace with data-testid or ARIA role | Selector hierarchy (testid > ARIA > text) |
| Race Condition | "timeout waiting for element"                 | Add network-first interception        | Intercept before navigate                 |
| Dynamic Data   | "Expected 'User 123' but got 'User 456'"      | Use regex or capture dynamic values   | Never hardcode IDs/timestamps             |
| Network Error  | "API call failed", "500 error"                | Add route mocking                     | Mock all external dependencies            |
| Hard Wait      | Test contains `waitForTimeout()` or `wait(n)` | Replace with event-based waits        | Always use deterministic waits            |
