#!/usr/bin/env bash
# Rebuild static/img/quick-start-demo.gif from demo/quick-start-demo.mp4,
# time-compressing the stretches where the terminal sits idle.
#
#   vhs demo/quick-start.tape        # produces the .mp4 and a raw .gif
#   ./demo/compress-waits.sh         # replaces the .gif with a tighter one
#
# Why: run-qa genuinely takes ~55s, during which the agent works silently and
# the screen does not change. A faithful real-time recording is ~2m40s and
# loops badly on a docs page. Command output always plays at readable speed;
# only the idle waits are sped up.
#
# NOTE: the segment boundaries below were measured against one specific
# recording. If you re-record, re-derive them before trusting this script:
#
#   ffmpeg -ss <t> -i demo/quick-start-demo.mp4 -frames:v 1 /tmp/f.png
#
# and find where output stops and resumes changing.

set -euo pipefail
cd "$(dirname "$0")/.."

SRC=demo/quick-start-demo.mp4
OUT=static/img/quick-start-demo.gif

[ -f "$SRC" ] || { echo "missing $SRC -- run 'vhs demo/quick-start.tape' first" >&2; exit 1; }

# segment       span (s)    speed   what is on screen
#   a             0-45       1.5x   steps 1-3, step 4 typed, dry run starts
#   b            45-57       6x     idle: dry run working
#   c            57-62       1.5x   dry run completion lines
#   d            62-69       6x     idle: tail of the dry-run sleep
#   e            69-97       1.5x   step 5, run-qa start, orchestrator output
#   f            97-134      9x     idle: agent drives the browser silently
#   g           134-159      1.5x   run teardown, step 6, "All tests passed"
ffmpeg -v error -i "$SRC" -filter_complex "
[0:v]trim=0:45,setpts=(PTS-STARTPTS)/1.5[a];
[0:v]trim=45:57,setpts=(PTS-STARTPTS)/6[b];
[0:v]trim=57:62,setpts=(PTS-STARTPTS)/1.5[c];
[0:v]trim=62:69,setpts=(PTS-STARTPTS)/6[d];
[0:v]trim=69:97,setpts=(PTS-STARTPTS)/1.5[e];
[0:v]trim=97:134,setpts=(PTS-STARTPTS)/9[f];
[0:v]trim=134:159,setpts=(PTS-STARTPTS)/1.5[g];
[a][b][c][d][e][f][g]concat=n=7:v=1:a=0,fps=10[o];
[o]split[s0][s1];[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3
" -loop 0 "$OUT" -y

echo "wrote $OUT ($(du -h "$OUT" | cut -f1))"
