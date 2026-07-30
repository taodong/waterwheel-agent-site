---
title: Agent Permissions
description: How Waterwheel agent access is constrained across file system, MCP, URL, email, and scripting layers.
sidebar_position: 1
---

# Agent Permissions

The Waterwheel agent is a fully harnessed AI agent. Its access is confined through multiple layers of permission controls.

## User and File Access

The AI agent runs as `agentuser`, which is granted access only to the `/agent` directory. The full permission layout is shown below.

| Path | Owner:Group | Mode | `agentuser` Access | Notes |
|---|---|---|---|---|
| `/agent` | `agentuser:agentgroup` | varies | Read/write across owned tree | Home of agent code |
| `/agent/instructions` | `root:agentgroup` | `550` | Read and traverse, no write | Policy and config files mounted here are read-only at runtime |
| `/agent/tasks` | `root:agentgroup` | `550` | Read and traverse, no write | Task input files are read-only at runtime |
| `/agent/outputs` | `agentuser:agentgroup` | `770` | Full read/write/execute | Agent writes logs and output artifacts here |
| `/agent/bin` | `agentuser:agentgroup` | `770` | Full read/write/execute | Writable bin directory for agent use |

## MCP Access

The AI agent has no direct awareness of the MCP servers installed in the container. All preinstalled MCPs are managed as system services by `root` and are exposed to the agent through `/agent/config/mcp-config.json`. To change which MCPs are available to the agent, update this file.

```json title="mcp-config.json (default)"
{
  "mcpServers": {
    "playwright": {
      "transport": "streamable-http",
      "url": "http://localhost:3000/mcp"
    },
    "email": {
      "transport": "streamable-http",
      "url": "http://localhost:3002/mcp"
    }
  }
}
```

### URL Access

The URLs the agent is permitted to visit are controlled through the Playwright MCP. All allowed domains must be listed in `/agent/instructions/allowed-domains.yaml` as elements of the `allowed` array. If the agent is asked to access a URL whose domain is not listed, the test fails immediately.

```yaml title="allowed-domains.yaml (sample)"
allowed:
  - https://www.wikipedia.org
  - https://en.wikipedia.org
```

See the [Playwright MCP](./mcp-guide.mdx#playwright-mcp) section for full configuration details.

### Email Access

The agent's ability to send and receive emails is governed by the Email MCP. The domains and addresses permitted for email operations are defined in `/agent/instructions/email-permissions.yaml`.

```yaml title="email-permissions.yaml (sample)"
from:
  domains:
    - "*"
to:
  domains:
    - "*"
batchSize: 10000
```

See the [email-permissions.yaml file structure](https://github.com/taodong/duotail-test-sender#permissionsyaml-file-structure) reference for full configuration details.

:::note
For web tests that involve no email operations, this file can be left at its defaults and ignored.
:::

## Scripting

When no existing tool is available for a task, the AI agent may write and execute scripts to achieve its goal. To limit the risk of the agent bypassing permission controls through self-written scripts, a restricted tool list is enforced.

The restricted tool list is defined in `/agent/config/agent-config.json`. The maximum number of times a restricted tool may be invoked is set via the `MAXIMUM_RESTRICTED_TOOL_USAGE` environment variable.

```json title="agent-config.json (default restricted tools)"
{
  "restricted-tools": ["browser_run_code_unsafe"]
}
```