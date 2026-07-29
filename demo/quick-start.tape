# Waterwheel quick start demo
#
# Records the six steps of docs/quick-start.mdx as a real terminal session.
#
# Usage:
#   brew install vhs
#   export DEEPSEEK_KEY=sk-...        # or any supported provider key
#   vhs demo/quick-start.tape
#
# The key is read from $DEEPSEEK_KEY and never rendered on screen.
# Every command shown is executed for real; nothing is faked.
#
# WARNING: this DESTROYS an existing waterwheel-agent container. The setup block
# below runs `docker rm -f waterwheel-agent` so the demo starts from a clean
# state, and the recorded run spends real tokens on the configured provider.

Output static/img/quick-start-demo.gif
Output demo/quick-start-demo.mp4

Set Shell bash
Set FontSize 14
Set Width 1080
Set Height 640
Set Padding 16
Set Margin 12
Set MarginFill "#1a1b26"
Set BorderRadius 8
Set WindowBar Colorful
Set Framerate 10
Set TypingSpeed 40ms
Set Theme "TokyoNight"

# --- setup: clean slate, quiet prompt (not shown in the recording) ---
Hide
Type "docker rm -f waterwheel-agent >/dev/null 2>&1; clear" Enter
Type `export PS1="$ "` Enter
Type "export DOCKER_CLI_HINTS=false" Enter
Type "clear" Enter
Sleep 1s
Show

# --- 1. Set your API key ---
Type "# 1. Point AI_API_KEY at your provider key" Enter
Sleep 800ms
Type "export AI_API_KEY=$DEEPSEEK_KEY" Enter
Sleep 1s

# --- 2. Install the Waterwheel container ---
Type "# 2. Start the agent -- no volume mounts needed" Enter
Sleep 800ms
Type "docker run -d --name waterwheel-agent \" Enter
Type "  -e AI_API_KEY \" Enter
Type "  taojdcn/duotail-waterwheel:1.4.0" Enter
Sleep 6s

# --- 3. Configure the agent ---
Type "# 3. Choose provider, model and token mode" Enter
Sleep 800ms
Type "docker exec waterwheel-agent config-ai-provider \" Enter
Type "  --provider deepseek --model deepseek-v4-pro --mode efficiency" Enter
Sleep 5s

Type "clear" Enter
Sleep 500ms

# --- 4. Verify your configuration ---
Type "# 4. Dry run -- validates config, spends no tokens" Enter
Sleep 800ms
Type "docker exec -it waterwheel-agent run-qa --dry-run" Enter
Sleep 30s

Type "clear" Enter
Sleep 500ms

# --- 5. Run your QA tasks ---
Type "# 5. A sample test ships inside the image" Enter
Sleep 800ms
Type "docker exec -it waterwheel-agent manage-test-files list" Enter
Sleep 3s
Type "docker exec -it waterwheel-agent run-qa" Enter
Sleep 75s

# --- 6. Check the results ---
Type "# 6. Read the outcome" Enter
Sleep 800ms
Type "docker exec -it waterwheel-agent check-test-result" Enter
Sleep 5s
