# Rationale

Email authentication introduces unique challenges: asynchronous email delivery, quota limits (AWS Cognito: 50/day), cost per email, and complex state management (session preservation across link clicks). Without proper patterns, tests become slow (wait for email each time), expensive (quota exhaustion), and brittle (timing issues, missing state). Using email capture services + session caching + state preservation patterns makes email auth tests fast, reliable, and cost-effective.
