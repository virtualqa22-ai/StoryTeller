# AI Provider Integration Architecture

## Rate Limiting Implementation: Custom Token Bucket

**Decision:** Implement custom token bucket algorithm per provider

**Rationale:**
- Simple, transparent, easy to debug
- Per-provider configuration (OpenAI: 50/min, Anthropic: 40/min, etc.)
- No heavy dependency (tower middleware not needed)
- Fine-grained control for user cost management

**Implementation:**
```rust
// src-tauri/src/ai/rate_limiter.rs
use std::sync::Arc;
use tokio::sync::Mutex;
use tokio::time::{Duration, Instant};

pub struct TokenBucket {
    tokens: f64,
    capacity: f64,
    refill_rate: f64, // tokens per second
    last_refill: Instant,
}

impl TokenBucket {
    pub fn new(capacity: f64, refill_rate: f64) -> Self {
        Self {
            tokens: capacity,
            capacity,
            refill_rate,
            last_refill: Instant::now(),
        }
    }

    pub async fn acquire(&mut self) -> Result<()> {
        self.refill();

        if self.tokens >= 1.0 {
            self.tokens -= 1.0;
            Ok(())
        } else {
            // Wait for token availability
            let wait_time = Duration::from_secs_f64(
                (1.0 - self.tokens) / self.refill_rate
            );
            tokio::time::sleep(wait_time).await;
            self.tokens = 0.0;
            Ok(())
        }
    }

    fn refill(&mut self) {
        let now = Instant::now();
        let elapsed = now.duration_since(self.last_refill).as_secs_f64();
        self.tokens = (self.tokens + elapsed * self.refill_rate).min(self.capacity);
        self.last_refill = now;
    }
}

pub struct RateLimiters {
    openai: Arc<Mutex<TokenBucket>>,
    anthropic: Arc<Mutex<TokenBucket>>,
    google: Arc<Mutex<TokenBucket>>,
    deepseek: Arc<Mutex<TokenBucket>>,
    yandex: Arc<Mutex<TokenBucket>>,
}

impl RateLimiters {
    pub fn new() -> Self {
        Self {
            openai: Arc::new(Mutex::new(TokenBucket::new(50.0, 50.0 / 60.0))),      // 50/min
            anthropic: Arc::new(Mutex::new(TokenBucket::new(40.0, 40.0 / 60.0))),   // 40/min
            google: Arc::new(Mutex::new(TokenBucket::new(60.0, 60.0 / 60.0))),      // 60/min
            deepseek: Arc::new(Mutex::new(TokenBucket::new(30.0, 30.0 / 60.0))),    // 30/min
            yandex: Arc::new(Mutex::new(TokenBucket::new(20.0, 20.0 / 60.0))),      // 20/min
        }
    }

    pub async fn acquire(&self, provider: Provider) -> Result<()> {
        match provider {
            Provider::OpenAI => self.openai.lock().await.acquire().await,
            Provider::Anthropic => self.anthropic.lock().await.acquire().await,
            Provider::Google => self.google.lock().await.acquire().await,
            Provider::Deepseek => self.deepseek.lock().await.acquire().await,
            Provider::Yandex => self.yandex.lock().await.acquire().await,
        }
    }
}
```

**Configuration:**
- Rates configurable per provider in user settings
- Default rates based on free tier limits
- UI shows remaining quota (visual feedback)

## Prompt Template Storage: Hybrid (Files → SQLite)

**Decision:** Store prompts as markdown files, load into SQLite at startup

**Rationale:**
- **Developer Experience:** Edit prompts in markdown files (easy iteration, git tracking)
- **Version Control:** Git tracks prompt changes, A/B test variants
- **Runtime Performance:** Query fast from SQLite cache
- **User Customization:** Future feature (users edit prompts in-app, stored in SQLite)

**File Structure:**
```
src-tauri/prompts/
  character-generation-v1.md
  character-generation-v2.md  # A/B test variant
  worldbuilding-v1.md
  chapter-generation-v1.md
  dialogue-suggestion-v1.md
```

**Markdown Format:**
```markdown
---
name: character-generation
version: 1
variables: [genre, character_type, existing_characters]
active: true
---

# Character Generation Prompt

Generate a character for a {{genre}} story.

**Character Type:** {{character_type}}

**Existing Characters:** {{existing_characters}}

**Requirements:**
- Unique personality traits
- Consistent with genre conventions
- No conflicts with existing characters

**Output Format:**
- Name
- Age
- Occupation
- Personality (3-5 traits)
- Backstory (2-3 sentences)
```

**SQLite Schema:**
```sql
CREATE TABLE prompt_templates (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    version INTEGER NOT NULL,
    template TEXT NOT NULL,
    variables TEXT, -- JSON array
    active BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    success_rate REAL, -- A/B testing metric
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, version)
);
```

**Startup Flow:**
```rust
// On app startup
pub fn load_prompts(conn: &mut Connection) -> Result<()> {
    let prompt_files = read_dir("prompts/")?;

    for file in prompt_files {
        let content = read_to_string(file)?;
        let prompt = parse_prompt_markdown(&content)?;

        // Upsert to SQLite
        conn.execute(
            "INSERT OR REPLACE INTO prompt_templates
             (name, version, template, variables, active)
             VALUES (?1, ?2, ?3, ?4, ?5)",
            params![prompt.name, prompt.version, prompt.template,
                    prompt.variables, prompt.active]
        )?;
    }

    Ok(())
}
```

**Runtime Usage:**
```rust
pub async fn get_prompt(name: &str) -> Result<PromptTemplate> {
    // Query from SQLite cache
    let prompt = query_prompt_by_name(name)?;

    // Track usage for A/B testing
    increment_usage_count(prompt.id)?;

    Ok(prompt)
}
```

**A/B Testing Support:**
- Multiple versions of same prompt (v1, v2)
- Track usage_count and success_rate per version
- UI to select active version or enable A/B split testing
