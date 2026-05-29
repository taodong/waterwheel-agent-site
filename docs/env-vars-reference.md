---
title: Docker Image Envrionment Variable Reference
description: Docker Image Envrionment Variable Reference
sidebar_position: 10
---
# Docker Image Envrionment Variable Reference

## MCP Variables

Variable | Description | Default
--- | --- | ---
`ENABLE_PLAYWRIGHT_MCP` | Enable Playwright MCP | `true`
`FIREWALL_DEBUG` | Enable firewall debug logs | `false`
`ENABLE_EMAIL_MCP` | Enable Email MCP | `true`
`MAIL_HOST` | The SMTP host to send email to | `localhost`
`MAIL_PORT` | The SMTP port to send email to | `25`
`MAILHOG_URL` | The Mailhog URL to check received emails | `http://localhost:8025`
`EMAIL_PERM_FILE` | The email permission file | `/agent/instructions/email-permissions.yaml`

> `ENABLE_PLAYWRIGHT_MCP` should always be true for the agent to work properly.

> We recommend to keep `ENABLE_EMAIL_MCP=true` to restrict the agent's ability in email sending. 
> Please update `Tools` section in `/agent/config/system.prompt.md` if turn off the email mcp. 

## Agent Variables

| Parameter | Description | Default |
|-----------|-------------|---------|
| `AI_PROVIDER` | AI provider name. Allowed values are `anthropic`, `openai`, `gemini` or `deepseek` | `anthropic` |
| `AI_MODEL` | AI model name | — |
| `AI_API_KEY` | AI API key | — |
| `AI_MAX_TOKENS` | Max tokens for a single response | `8192` |
| `AI_TEMPERATURE` | Temperature (0.0 for strict QA/Logic, 0.7 for creative) | `0.0` |
| `GLOBAL_CONTEXT` | Path to a JSON file of global variables/URLs injected into the system prompt | `/agent/instructions/global_context.json` |
| `EXTRA_INSTRUCTION` | Path to a Markdown file whose content is appended to the system prompt; ignored if the file does not exist | `/agent/instructions/extra-instructions.md` |
| `TEST_RUN_TIMEOUT` | Maximum total duration (in seconds) for the entire test run before it is stopped with status `timeout` | `7200` (2 hours) |
| `STEP_TIMEOUT_SEC` | Maximum duration (in seconds) the agent may idle without receiving an LLM response per step before the task is marked failed | `120` (2 minutes) |
| `MAX_SNAPSHOTS_HISTORY` | Maximum number of recent `browser_snapshot` tool results to keep in LLM message history; negative values are treated as `2`; `0` blocks direct `browser_snapshot` calls at runtime (use `take_verification_snapshot` instead) | `2` |
| `CONTEXT_COMPRESSION` | Enables message compression flow; evaluates to `true` only when set to `true` (case-insensitive) | `false` |
| `COMPRESSION_DEBUG` | Emits one compression debug log right before the next LLM call after a compression; evaluates to `true` only when set to `true` (case-insensitive) | `false` |
| `COMPRESSION_DEBUG_INCLUDE_REQUEST` | When `COMPRESSION_DEBUG=true`, logs the compressed messages (summary and continue prompt) instead of the compact summary mode | `false` |
| `COMPRESSION_THRESHOLD_MIN` | Initial input token threshold for compression eligibility; non-positive values fall back to `12500`. Requires `CONTEXT_COMPRESSION=true`. | `12500` |
| `COMPRESSION_THRESHOLD_LEAP` | Step size for advancing the compression threshold after each compression; non-positive values fall back to `5000`. Requires `CONTEXT_COMPRESSION=true`. | `5000` |
| `LARGE_CONTENT_THRESHOLD` | UTF-8 byte threshold for large content guards in API logging and snapshot retention; non-positive values fall back to `10000` | `10000` |
| `RATE_LIMIT_RETRY` | Maximum number of allowed rate-limit retries per task; negative values allow unlimited retries | `1` |
| `MAX_ITERATIONS` | Maximum number of LLM call iterations per task before the loop is forcibly stopped | `300` |
| `ENABLE_API_LOGGING` | Enables LLM API request/response logging to `/agent/outputs/api-log.json`; evaluates to `true` only when set to `true` (case-insensitive) | `false` |
| `MAXIMUM_RESTRICTED_TOOL_USAGE` | Maximum number of cumulative calls to restricted tools allowed between verified progress checkpoints. When the count exceeds this limit the task fails immediately. `0` or negative values disable the guard. The counter resets to `0` at the start of each task. | `3` |
