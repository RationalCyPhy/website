# Drone video pipeline

Produces `public/assets/videos/mapping-drone.mp4` (and its poster frame) for the
Mapping Drone tile on the Technology page, from two kinds of raw material that
stay out of git and off the public site:

    videos/drone/model/      3D model of the prototype (.glb)
    videos/drone/footage/    flight-log screen recordings (onboard + phone view)
    videos/drone/shots.json  the cut: which clip, which view, which seconds
    videos/drone/work/       rendered frames and intermediates

`videos/` is gitignored. Only the finished MP4 and poster are committed.

## 1. Turntable render (Blender, headless)

    /Applications/Blender.app/Contents/MacOS/Blender --background \
        --python tools/drone-video/render_turntable.py -- \
        --model videos/drone/model/RCPprototype1-3d-model/drone-camera-with-props.glb \
        --out videos/drone/work/turntable --frames 240 --fps 30 --size 1280x720 --save-blend

One full turn over `--frames` frames, transparent background, RGBA PNGs. Camera
elevation breathes once per turn so the loop is seamless. `--save-blend` writes
`scene.blend` next to the frames for manual tweaks. `--rotate X,Y,Z` fixes a
wrong up-axis; `--distance` and `--elevation` frame the model; `--demo` renders a
placeholder quadcopter when no model is at hand.

## 2. Cut (ffmpeg)

    python3 tools/drone-video/assemble.py videos/drone/shots.json

Manifest fields:

- `size`, `fps`, `bg` (card colour behind the turntable), `xfade` (crossfade
  seconds), `loop_fade` (fade to `bg` at both ends so the loop seam is clean),
  `crf`/`preset` (libx264), `out`, `poster`, `font` (for split-screen labels).
- `sources.<name>.path` and `.views.<view>.crop = [w, h, x, y]`: the pixel
  rectangle of that view inside the screen recording. Optional `filters`
  (any ffmpeg filter string, used here for the onboard camera's white balance)
  and `label`.
- `shots`: in order. `frames` (a PNG sequence), `view` (one view, full frame,
  optional `zoom = [w, h, x, y]` inside the view crop) or `split` (two views
  side by side with labels, optional per-view `zooms`). `start`/`dur` in seconds of the source.

All paths are relative to the manifest file.

## 3. Wire into the site

`src/lib/data.ts` → `FEATURED_TECHS` → Mapping Drone `video` and `poster`.
