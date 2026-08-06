---
title: Token Efficiency
description: Configuration practices for teams looking to reduce token usage and API call volume.
sidebar_position: 3
---

# Token Efficiency

Our default settings favor prompt flexibility over token efficiency, allowing the agent to tolerate more ambiguity in test prompts. For teams willing to invest time in refining their test prompts, we recommend the following practices.

## Test Organization

The agent makes heavy use of token caching, which means token efficiency improves as test suite size grows — the more tests in a single run, the greater the caching benefit. When structuring your test cases, consider the following:

1. Group multiple verifications into a single test case where logical.
2. Include as many test tasks as possible in one run rather than splitting them across multiple runs.
3. Move steps that several tests repeat into a [test skill](../getting-started/create-test-skills.mdx). The
   agent sees only a skill's name and description until it decides the skill applies, so tests that never
   need it never pay for its body. On Anthropic models a skill loaded mid-test lands outside the cached
   prefix — read
   [Token Efficiency on Anthropic Models](../getting-started/create-test-skills.mdx#token-efficiency-on-anthropic-models)
   before building a long suite around large skills.

## Configuration Tuning

### Enable Context Compression

The LLM has no memory between calls, so every API request includes the full conversation history up to that point. A typical feature test may involve 30–50 API calls, and the message volume grows rapidly toward the end. For a well-structured test, however, the LLM does not need to keep re-processing earlier steps once their verifications are complete. Context compression allows the agent to discard history that is no longer needed after each successful verification.

Context compression is controlled by three environment variables:

| Variable | Description |
|---|---|
| `CONTEXT_COMPRESSION` | Enables the compression flow when set to `true` |
| `COMPRESSION_THRESHOLD_MIN` | Initial input token threshold for compression eligibility |
| `COMPRESSION_THRESHOLD_LEAP` | Step size for advancing the compression threshold after each compression |

**Threshold logic**

Compression is triggered at the first successful verification after input tokens reach `COMPRESSION_THRESHOLD_MIN`. After compression, the threshold is recalculated as follows:

- `T` = current threshold (`COMPRESSION_THRESHOLD_MIN`)
- `L` = `COMPRESSION_THRESHOLD_LEAP`
- `R` = input token count of the first request after compression

| Condition | Rule | Result |
|---|---|---|
| `R < T - L` | Keep | `COMPRESSION_THRESHOLD_MIN = T` |
| `T - L <= R < T` | Plus one leap | `COMPRESSION_THRESHOLD_MIN = T + L` |
| `R >= T` | Plus N leaps | Advance by `L` until `R < COMPRESSION_THRESHOLD_MIN - L` |

Unified loop form covering all three rules:

```
newThreshold = T
while R >= newThreshold - L:
  newThreshold += L
COMPRESSION_THRESHOLD_MIN = newThreshold
```

:::warning
Compressing too frequently may disorient the LLM and result in more API calls overall. Refer to our configuration recommendations for your specific LLM model.
:::

### Disable Snapshot History

When performing web tasks, the LLM takes a page snapshot to decide its next action. All snapshots are retained by default, functioning as a browsing history. Since web tests rarely need to revisit earlier page states, the risk of reducing or disabling snapshot history is low.

The number of snapshots sent to the LLM is controlled by `MAX_SNAPSHOTS_HISTORY`. For well-tuned test cases, set `MAX_SNAPSHOTS_HISTORY=0`.

:::tip
The agent has a built-in mechanism to always provide the LLM with the most current snapshot. Disabling snapshot history does not prevent the LLM from viewing the current page state.
:::

### Reduce Large Content Threshold

In some situations the agent operates on a complex web page or a large file. Large content is carried forward in every subsequent API call until the next compression. The environment variable `LARGE_CONTENT_THRESHOLD` instructs the agent to drop oversized items from the context after the current API call.

The default value is `10000` (10 KB). Reducing this value can lower input token counts when complex pages or large items are frequently involved.

### Reduce Max Iterations

`MAX_ITERATIONS` defines the maximum number of API calls allowed for a single test. When tuning a test case, reducing this value forces the agent to fail fast rather than continuing to consume tokens through potential hallucination cycles.

:::note
Based on our internal data, no real-world test has required more than 80 API calls for a successful run.
:::

### Disable Rate Limit Retry

As shown in our [AI Benchmark](../how-it-works/benchmark-report.mdx), the agent's token usage is consistently flat with only occasional spikes when handling large content. Under normal conditions, usage should not approach any provider rate limit. If you prefer fast failure over automatic retry in the rare event of rate limiting, disable retries by setting `RATE_LIMIT_RETRY=0`.