# Waterwheel Installation Package
The files in this package are used to configure Duotail Waterwheel front end test againt on a mac machine. Some of the files included are used for advanced configuration. Please refer to our document site for their usages.


## Prerequirement
The agent requires the following environment
 
- Mac (Apple "M" series chip)
- Docker Desktop

## Installation
 
### 1. Create the Folder Structure
 

Run `create-sync-subfolders.sh` to create the local folder structure used for Docker volume mapping.

```shell
chmod +x create-sync-subfolders.sh
./create-sync-subfolders.sh /path/to/sync
```
 
### 2. Configure Environment Variables
 
Open `dot_env.txt` and fill in the following variables.

```shell
WATERWHEEL_SYNC_VOLUME_PATH=${to_fill} # The folder `/path/to/sync` created in step 1
API_PROVIDER=${to_fill}                # AI provider
AI_MODEL=${to_fill}                    # AI model
AI_API_KEY=${to_fill}                  # AI API key
```
 
### 3. Place the Environment File
 
Rename `dot_env` to `.env` and place it in the same directory as `docker-compose.yml`.
 
### 4. Copy Instruction Files
 
Copy the following two files into `agent/instructions` under `/path/to/sync`.

- `allowed-domains.yaml`
- `email-permissions.yaml`

### 5. Copy Task File
 
Copy `test-wikipedia-english.md` into `/path/to/sync/agent/tasks`.
 
### 6. Deploy the Docker Container
 
From the same directory as `docker-compose.yml`, run:
 
```shell
docker compose up -d
```
 
## Verify Installation
 
To verify the installation, run the following command on your local machine and confirm no errors are reported in `/path/to/sync/agent/outputs/agent.log`.
 
```shell
docker compose exec waterwheel-agent run-qa --dry-run
```
 
## Execute Tests
 
To execute all tests under `/path/to/sync/agent/tasks`, run the following command on your local machine.
 
```shell
docker compose exec waterwheel-agent run-qa
```
 
Once the command completes, check the results at `/path/to/sync/agent/outputs/test-results.json`.