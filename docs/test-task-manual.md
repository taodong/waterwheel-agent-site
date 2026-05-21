---
title: Manage Test Tasks
description: How to author, structure, and organise test task files for the Waterwheel agent.
sidebar_position: 4
---

# Manage Test Tasks

All test tasks scheduled to run by the agent must be plain-text Markdown (`.md`) files placed under the `/agent/tasks` directory.

## File Location and Structure

- Place test files under `/agent/tasks`.
- Use the `.md` extension.
- Each file contains two parts:
  1. YAML front matter properties
  2. Markdown test instructions

```md
---
name: Register and Activate Account
id: 2
node: 1
required: 0
ignore: false
release: 0.3.0
ticket: Bug-002
---
# Register and Activate Account
Run the registration and activation flow.
```

## Supported YAML Properties

### Standard Fields

- **`name`** _(optional)_
  - Human-readable test name.
  - If omitted, the filename is used.

- **`id`** _(optional)_
  - Test identifier, stored as text.
  - If omitted, the filename is used.

- **`node`** _(optional)_
  - Dependency node assigned to this test.
  - Must be a non-negative integer.
  - Invalid values are ignored.

- **`required`** _(optional)_
  - Dependency requirements — the node IDs this test depends on.
  - Must be non-negative integer values.
  - Invalid values are ignored.
  - When present and valid, this test is treated as a dependent test.

- **`ignore`** _(optional)_
  - Only `true` (case-insensitive) excludes the test from the run.
  - Both `true` and `True` are treated as ignored.

### Custom Fields

Any property key not in the reserved list is treated as custom metadata and exported under `customFields` in `test-results.json`.

Reserved keys: `name`, `id`, `node`, `required`, `ignore`

Custom field behaviour:
- Values are copied into `customFields` and converted to text.
- Output shape: `Record<string, string>`

## Test Types

### Independent Test

A test without a `required` field.

- Always eligible to run.
- May or may not have a `node`.

```md
---
name: Open Home Page
id: 1
---
# Open Home Page
Open the home page and verify it loads correctly.
```

### Dependent Test

A test with a `required` field.

- Runs only when the required nodes satisfy the dependency rules.
- May include a `node` or not.

```md
---
name: Purchase Plan
id: 3
node: 2
required: 1
---
# Purchase Plan
Purchase a subscription plan.
```

## Dependency Check Rules

For a dependent test, the agent evaluates the required nodes against tests that appear earlier in the run:

1. If all required nodes are `success` → execute the test.
2. If any required node is `abort` → set the current test to `skipped`.
3. If any required node is `skipped` → set the current test to `skipped`.
4. Otherwise → set the current test to `abort`.

Additional rules:
- If no test is found for a required node among earlier tests, the current test becomes `abort`.
- If multiple tests share the same `node`, that node is `success` only when all tests on that node succeed.
- Ignored tests are excluded from node evaluation.

## Test Status

| Status | Meaning | Typical Trigger | Dependency Impact |
|---|---|---|---|
| `queued` | Initial state before the execution decision. | Loader initialises test entries. | Not treated as satisfied. |
| `ignored` | User intentionally excluded this test from the run. | `ignore: true` in front matter. | Excluded from dependency evaluation. |
| `success` | Test executed and passed. | Task run completes successfully. | Satisfies required node checks. |
| `failed` | Test executed but failed. | Task run completes with failure. | Does not satisfy required node checks; dependent tests become `abort` unless an `abort` or `skipped` rule applies first. |
| `abort` | Test did not run because dependency requirements cannot be satisfied. | Dependency checker cannot validate required nodes as successful. | Causes dependent tests requiring that node to become `skipped`. |
| `skipped` | Test was planned but could not run due to upstream dependency state. | Any required node is `abort` or `skipped`. | Causes downstream dependent tests requiring that node to become `skipped`. |

### `ignored` vs `skipped`

These statuses are distinct:

- **`ignored`**: the test was intentionally excluded from this run via `ignore: true`.
- **`skipped`**: the test was intended to run but could not, due to an upstream dependency failure.

Behavioural differences:
- Ignored tests are sorted to the top of the run list before all other tests.
- Ignored tests are never executed.
- Ignored tests do not satisfy dependencies, even if they declare a `node`.

## Authoring Patterns

### Pattern A — Independent test, no node

```md
---
name: Test 1
id: 1
---
# Test 1
...
```

### Pattern B — Independent test on a node

```md
---
name: Test 2
id: 2
node: 1
---
# Test 2
...
```

### Pattern C — Dependent test with one required node

```md
---
name: Test 3
id: 3
node: 2
required: 1
---
# Test 3
...
```

### Pattern D — Dependent test with multiple required nodes

```md
---
name: Test 4
id: 4
required: 1,2
---
# Test 4
...
```

### Pattern E — Ignored test with custom metadata

```md
---
name: Experimental Flow
id: 9
node: 5
required: 1
ignore: true
release: 0.3.0
owner: qa-team
---
# Experimental Flow
...
```

## Output Mapping Reference

### Runtime Result Fields

| Field | Notes |
|---|---|
| `name` | Always present |
| `file` | Always present |
| `id` | Always present |
| `status` | Always present |
| `result` | Always present |
| `node` | Present if validly parsed |
| `required` | Present if validly parsed |
| `customFields` | Present if custom fields were defined |

### Dry-run Plan Fields

| Field | Notes |
|---|---|
| `name` | Always present |
| `file` | Always present |
| `id` | Always present |
| `status` | Always present |
| `node` | Present if validly parsed |
| `required` | Present if validly parsed |
| `customFields` | Present if custom fields were defined |

## Passing Data Between Tests

### A. Global Context — static values shared across all tests

The agent supports a global context file configured by the `GLOBAL_CONTEXT` environment variable. The default path is `/agent/instructions/global_context.json`. Use this for fixed environment data such as base URLs, shared accounts, or tenant IDs.

```json title="global_context.json (example)"
{
  "BASE_URL": "https://staging.example.com",
  "TENANT": "acme",
  "SUPPORT_EMAIL": "qa@example.com"
}
```

:::tip
Use uppercase variable names in `global_context.json` to avoid naming conflicts with runtime context variables.
:::

### B. Runtime Context — values discovered during a test and reused by later tests

Runtime sharing uses the local `context-manager` tool. Values remain available to all subsequent tests in the same run until end-of-run cleanup.

Recommended pattern:

1. The producer test discovers a value.
2. The producer test stores it using `context-manager` action `set`.
3. The consumer test reads it using `context-manager` action `get` or `summary`.

Both reading and writing runtime context variables must be explicitly instructed in the test task body.

To write a value, reference `context-manager` in the test prompt. For example:

> _"Generate a username, then use `context-manager.set` to save it as `username`."_

To read a value, reference it with a `context.` prefix. For example:

> _"Fill the username field with `context.username`."_

:::note
Runtime context variable names are case-sensitive.
:::

### C. Dependency with data passing

If test B requires data produced by test A, define the dependency explicitly using `node` and `required`. This ensures the producer test always runs before the consumer, eliminating race conditions and missing-data errors. Even with dependency ordering in place, always validate required context values at the start of the consumer test.

```md title="Producer"
---
name: Create Order
id: 10
node: 10
---
# Create Order
Create an order, then store `order_id` using `context-manager set`.
```

```md title="Consumer"
---
name: Cancel Order
id: 11
node: 11
required: 10
---
# Cancel Order
Read `order_id` from `context-manager` and cancel that order.
```

## Quick Author Checklist

Before committing a new task file:

- [ ] File has the `.md` extension.
- [ ] YAML front matter is valid and enclosed by `---`.
- [ ] `node` is a non-negative integer when used.
- [ ] `required` lists valid non-negative integer node IDs.
- [ ] `ignore: true` is used only for tests intentionally excluded from the run.
- [ ] Any extra metadata uses non-reserved keys.
- [ ] The test body clearly describes the actions to take and the expected outcomes.

## Recommended Best Practices

1. Divide each test into numbered steps.
2. Verify no more than one element per step.
3. Validate any global or runtime context variables at the start of the test to fail fast if they are missing.