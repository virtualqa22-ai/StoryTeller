use std::time::Duration;
use reqwest;
use serde_json::json;

const API_TIMEOUT_SECS: u64 = 10;

/// Test API connection for a given AI provider
#[tauri::command]
pub async fn test_api_connection(provider: String, api_key: String) -> Result<bool, String> {
    // Wrap in timeout (10 seconds)
    match tokio::time::timeout(
        Duration::from_secs(API_TIMEOUT_SECS),
        test_provider_connection(&provider, &api_key)
    ).await {
        Ok(result) => result,
        Err(_) => Err("Connection timeout (10s)".to_string())
    }
}

/// Internal function to test connection based on provider
async fn test_provider_connection(provider: &str, api_key: &str) -> Result<bool, String> {
    match provider {
        "OpenAI" => test_openai_api(api_key).await,
        "Anthropic Claude" => test_anthropic_api(api_key).await,
        "Google Gemini" => test_gemini_api(api_key).await,
        "Deepseek" => test_deepseek_api(api_key).await,
        "Yandex" => test_yandex_api(api_key).await,
        _ => Err(format!("Unsupported provider: {}", provider))
    }
}

/// Test OpenAI API key
/// Endpoint: GET https://api.openai.com/v1/models
/// Header: Authorization: Bearer {api_key}
async fn test_openai_api(api_key: &str) -> Result<bool, String> {
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(API_TIMEOUT_SECS - 2)) // Slightly less than overall timeout
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    let response = client
        .get("https://api.openai.com/v1/models")
        .header("Authorization", format!("Bearer {}", api_key))
        .send()
        .await
        .map_err(|e| format!("Network connection error: {}", e))?;

    match response.status().as_u16() {
        200 => Ok(true),
        401 | 403 => Err("Invalid API key".to_string()),
        429 => Err("Rate limit exceeded - please try again later".to_string()),
        status => Err(format!("API error: HTTP {}", status))
    }
}

/// Test Anthropic Claude API key
/// Endpoint: POST https://api.anthropic.com/v1/messages
/// Headers: x-api-key, anthropic-version, Content-Type
async fn test_anthropic_api(api_key: &str) -> Result<bool, String> {
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(API_TIMEOUT_SECS - 2)) // Slightly less than overall timeout
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    let body = json!({
        "model": "claude-3-haiku-20240307",
        "max_tokens": 1,
        "messages": [{"role": "user", "content": "test"}]
    });

    let response = client
        .post("https://api.anthropic.com/v1/messages")
        .header("x-api-key", api_key)
        .header("anthropic-version", "2023-06-01")
        .header("Content-Type", "application/json")
        .json(&body)
        .send()
        .await
        .map_err(|e| format!("Network connection error: {}", e))?;

    match response.status().as_u16() {
        200 => Ok(true),
        401 | 403 => Err("Invalid API key".to_string()),
        429 => Err("Rate limit exceeded - please try again later".to_string()),
        status => Err(format!("API error: HTTP {}", status))
    }
}

/// Test Google Gemini API key
/// Endpoint: POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={api_key}
async fn test_gemini_api(api_key: &str) -> Result<bool, String> {
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(API_TIMEOUT_SECS - 2)) // Slightly less than overall timeout
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    let url = format!(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={}",
        api_key
    );

    let body = json!({
        "contents": [{"parts": [{"text": "test"}]}]
    });

    let response = client
        .post(&url)
        .header("Content-Type", "application/json")
        .json(&body)
        .send()
        .await
        .map_err(|e| format!("Network connection error: {}", e))?;

    match response.status().as_u16() {
        200 => Ok(true),
        400 | 401 | 403 => Err("Invalid API key".to_string()),
        429 => Err("Rate limit exceeded - please try again later".to_string()),
        status => Err(format!("API error: HTTP {}", status))
    }
}

/// Test Deepseek API key
/// Endpoint: POST https://api.deepseek.com/v1/chat/completions
/// Header: Authorization: Bearer {api_key}
async fn test_deepseek_api(api_key: &str) -> Result<bool, String> {
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(API_TIMEOUT_SECS - 2)) // Slightly less than overall timeout
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    let body = json!({
        "model": "deepseek-chat",
        "messages": [{"role": "user", "content": "test"}],
        "max_tokens": 1
    });

    let response = client
        .post("https://api.deepseek.com/v1/chat/completions")
        .header("Authorization", format!("Bearer {}", api_key))
        .header("Content-Type", "application/json")
        .json(&body)
        .send()
        .await
        .map_err(|e| format!("Network connection error: {}", e))?;

    match response.status().as_u16() {
        200 => Ok(true),
        401 | 403 => Err("Invalid API key".to_string()),
        429 => Err("Rate limit exceeded - please try again later".to_string()),
        status => Err(format!("API error: HTTP {}", status))
    }
}

/// Test Yandex API key
/// Endpoint: POST https://llm.api.cloud.yandex.net/foundationModels/v1/completion
/// Header: Authorization: Api-Key {api_key}
///
/// Note: Yandex API requires folder_id for full functionality. For validation purposes,
/// we attempt a minimal request to verify the API key format is accepted.
/// We only consider 200 responses as successful validation.
async fn test_yandex_api(api_key: &str) -> Result<bool, String> {
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(API_TIMEOUT_SECS - 2)) // Slightly less than overall timeout
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    // Simplified test - just check if the API key format is accepted
    // A more complete implementation would require folder_id from user
    let body = json!({
        "modelUri": "gpt://b1gtest/yandexgpt-lite",
        "completionOptions": {"maxTokens": 1},
        "messages": [{"role": "user", "text": "test"}]
    });

    let response = client
        .post("https://llm.api.cloud.yandex.net/foundationModels/v1/completion")
        .header("Authorization", format!("Api-Key {}", api_key))
        .header("Content-Type", "application/json")
        .json(&body)
        .send()
        .await
        .map_err(|e| format!("Network connection error: {}", e))?;

    match response.status().as_u16() {
        200 => Ok(true),
        // For Yandex, we only consider 200 as success - other responses are failures
        // Previously, 400 errors with "folder" or "catalog" were incorrectly treated as success
        400 => {
            // Parse error response to provide more specific error message
            let error_text = response.text().await.map_err(|e| format!("Failed to read response: {}", e))?;
            let error_lower = error_text.to_lowercase();
            if error_lower.contains("folder") || error_lower.contains("catalog") {
                // This indicates the key format is valid but requires additional configuration
                // Return a specific error message to inform the user
                Err("Yandex API key format is valid but requires additional configuration (folder_id)".to_string())
            } else {
                Err("Invalid API key or request format".to_string())
            }
        },
        401 | 403 => Err("Invalid API key".to_string()),
        429 => Err("Rate limit exceeded - please try again later".to_string()),
        status => Err(format!("API error: HTTP {}", status))
    }
}
