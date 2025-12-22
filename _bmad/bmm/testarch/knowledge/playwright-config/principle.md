# Principle

Load environment configs via a central map (`envConfigMap`), standardize timeouts (action 15s, navigation 30s, expect 10s, test 60s), emit HTML + JUnit reporters, and store artifacts under `test-results/` for CI upload. Keep `.env.example`, `.nvmrc`, and browser dependencies versioned so local and CI runs stay aligned.
