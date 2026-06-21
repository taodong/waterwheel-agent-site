# Waterwheel Installation Package

This package contains the files needed to configure and run the Duotail Waterwheel front-end testing agent in Docker.

These instructions support **macOS / Linux** and **Windows (PowerShell)**.

For full documentation, visit: https://waterwheel.duotail.com

## Files Included

| File                         | Usage                                                        |
|------------------------------|--------------------------------------------------------------|
| create-sync-subfolders.sh    | macOS/Linux helper script to create local folder structure   |
| create-sync-subfolders.ps1   | Windows PowerShell helper script to create local structure   |
| docker-compose.yml           | Docker Compose file for the Waterwheel agent                 |
| dot_env                      | Template environment file (rename to `.env`)                 |
| extra-instruction.md         | Optional global runtime instructions for all test tasks      |
| preset-context.json          | Optional per-run seed data and task flow definition          |
| system-prompt-cn.md          | Chinese system prompt sample for DeepSeek                    |
| email-permissions.yaml       | Sample email permissions configuration                        |
| allowed-domains.yaml         | Browser domain allowlist sample                              |
| global-context.json          | Sample global constants shared across tests                  |
| test-wikipedia-english.md    | Basic test to verify installation                            |
| 1_test_wikipedia_search.md   | Chained sample task 1 for token tuning                       |
| 2_test_wikipedia_navigate.md | Chained sample task 2 for token tuning                       |

## Prerequisite

- Docker Desktop

## Installation

### 1. Create the Folder Structure

Run the helper script for your platform to create the local folder structure used for Docker volume mapping.

- macOS / Linux:

```shell
chmod +x create-sync-subfolders.sh
./create-sync-subfolders.sh /path/to/sync
```

- Windows (PowerShell):

```powershell
./create-sync-subfolders.ps1 C:\path\to\sync
```

If no path is provided, the current directory is used. If the path does not exist, it is created automatically.

If PowerShell blocks script execution, allow it for the current session:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Expected directory layout:

```text
<sync>/
└── agent/
	├── instructions/
	├── tasks/
	└── outputs/
```

### 2. Configure Environment Variables

Open `dot_env` and fill in the following variables:

```shell
WATERWHEEL_SYNC_VOLUME_PATH=${to_fill} # Sync folder from step 1 (for example /path/to/sync or C:\path\to\sync)
API_PROVIDER=${to_fill}                # AI provider
AI_MODEL=${to_fill}                    # AI model
AI_API_KEY=${to_fill}                  # AI API key
```

### 3. Place the Environment File

Rename `dot_env` to `.env`, then place it in the same directory as `docker-compose.yml`.

### 4. Copy Instruction Files

Copy the following files into `<sync>/agent/instructions`:

- `allowed-domains.yaml`
- `email-permissions.yaml`
- `global-context.json`

Optional files for advanced behavior:

- `preset-context.json`
- `extra-instruction.md`

### 5. Copy Task Files

Copy `test-wikipedia-english.md` into `<sync>/agent/tasks`.

Optional chained sample tasks:

- `1_test_wikipedia_search.md`
- `2_test_wikipedia_navigate.md`

If you use chained tasks, also copy `preset-context.json` into `<sync>/agent/instructions` and define the `flow` section.

### 6. Deploy the Docker Container

From the same directory as `docker-compose.yml`, run:

```shell
docker compose up -d
```

## Verify Installation

Run the following command and confirm there are no errors in `<sync>/agent/outputs/agent.log`:

```shell
docker compose exec waterwheel-agent run-qa --dry-run
```

## Execute Tests

To execute all tests under `<sync>/agent/tasks`, run:

```shell
docker compose exec waterwheel-agent run-qa
```

After completion, check results in `<sync>/agent/outputs/test-results.json`.