#!/usr/bin/env python3
"""
Cut the drone video from a JSON shot list: turntable frames plus cropped views of
the flight-log screen recording, crossfaded into one silent, looping H.264 MP4,
with a poster frame.

Usage (any working directory):

    python3 tools/drone-video/assemble.py videos/drone/shots.json

Paths inside the manifest are relative to the manifest file. See README.md for
the manifest fields.
"""

import json
import os
import subprocess
import sys


def sh(cmd):
    print("+", " ".join(str(c) for c in cmd), flush=True)
    subprocess.run([str(c) for c in cmd], check=True)


def duration(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
        check=True, capture_output=True, text=True).stdout.strip()
    return float(out)


def esc(text):
    """Escape a drawtext value."""
    return text.replace("\\", "\\\\").replace(":", "\\:").replace("'", "\\'")


class Cut:
    def __init__(self, manifest_path):
        with open(manifest_path) as f:
            self.m = json.load(f)
        self.base = os.path.dirname(os.path.abspath(manifest_path))
        self.w, self.h = self.m.get("size", [1280, 720])
        self.fps = self.m.get("fps", 30)
        self.bg = self.m.get("bg", "0d0f1a")
        self.font = self.m.get("font", "/System/Library/Fonts/SFNSMono.ttf")
        self.work = self.path(self.m.get("work", "work/cut"))
        os.makedirs(self.work, exist_ok=True)

    def path(self, p):
        return p if os.path.isabs(p) else os.path.join(self.base, p)

    # ---------------------------------------------------------- per-view filters

    def view_chain(self, src, vname, out_w, out_h, zoom=None, label=None):
        """Filter chain turning the full screen recording into one view at out_w x out_h."""
        view = self.m["sources"][src]["views"][vname]
        w, h, x, y = view["crop"]
        parts = [f"crop={w}:{h}:{x}:{y}"]
        if view.get("filters"):
            parts.append(view["filters"])
        if zoom:
            zw, zh, zx, zy = zoom
            parts.append(f"crop={zw}:{zh}:{zx}:{zy}")
        parts.append(f"scale={out_w}:{out_h}:force_original_aspect_ratio=increase:flags=lanczos")
        parts.append(f"crop={out_w}:{out_h}")
        if label:
            parts.append(
                f"drawtext=fontfile={self.font}:text='{esc(label)}':fontsize=15:"
                f"fontcolor=0xe8edf8@0.9:x=18:y=16:box=1:boxcolor=0x{self.bg}@0.6:boxborderw=7")
        return ",".join(parts)

    def common_tail(self):
        return f"fps={self.fps},setsar=1,format=yuv420p"

    def intermediate_opts(self):
        return ["-c:v", "libx264", "-crf", "16", "-preset", "veryfast", "-pix_fmt", "yuv420p", "-an"]

    # ---------------------------------------------------------- shots

    def render_shot(self, i, shot):
        out = os.path.join(self.work, f"shot{i:02d}.mp4")
        kind = shot["type"]
        trim = []
        if "start" in shot:
            trim += ["-ss", str(shot["start"])]
        if "dur" in shot:
            trim += ["-t", str(shot["dur"])]

        if kind == "frames":
            frames = os.path.join(self.path(shot["dir"]), shot.get("pattern", "frame_%04d.png"))
            fc = (f"[1:v]scale={self.w}:{self.h}:force_original_aspect_ratio=decrease,"
                  f"pad={self.w}:{self.h}:(ow-iw)/2:(oh-ih)/2:color=0x{self.bg}@0,format=rgba[fg];"
                  f"[0:v][fg]overlay=shortest=1,{self.common_tail()}[v]")
            sh(["ffmpeg", "-v", "error", "-y",
                "-f", "lavfi", "-i", f"color=c=0x{self.bg}:s={self.w}x{self.h}:r={self.fps}",
                "-framerate", str(self.fps), "-i", frames,
                "-filter_complex", fc, "-map", "[v]", *trim, *self.intermediate_opts(), out])

        elif kind == "view":
            src = self.path(self.m["sources"][shot["src"]]["path"])
            chain = self.view_chain(shot["src"], shot["view"], self.w, self.h,
                                    zoom=shot.get("zoom"), label=shot.get("label"))
            sh(["ffmpeg", "-v", "error", "-y", *trim, "-i", src,
                "-vf", f"{chain},{self.common_tail()}", *self.intermediate_opts(), out])

        elif kind == "split":
            src = self.path(self.m["sources"][shot["src"]]["path"])
            gap = shot.get("gap", 4)
            half = (self.w - gap) // 2
            half -= half % 2
            a, b = shot["views"]
            views = self.m["sources"][shot["src"]]["views"]
            la = shot.get("labels", {}).get(a, views[a].get("label"))
            lb = shot.get("labels", {}).get(b, views[b].get("label"))
            zooms = shot.get("zooms", {})
            fc = (f"[0:v]split=2[a][b];"
                  f"[a]{self.view_chain(shot['src'], a, half, self.h, zoom=zooms.get(a), label=la)}[l];"
                  f"[b]{self.view_chain(shot['src'], b, half, self.h, zoom=zooms.get(b), label=lb)}[r];"
                  f"color=c=0x{self.bg}:s={gap}x{self.h}:r={self.fps}[g];"
                  f"[l][g][r]hstack=inputs=3:shortest=1,{self.common_tail()}[v]")
            sh(["ffmpeg", "-v", "error", "-y", *trim, "-i", src,
                "-filter_complex", fc, "-map", "[v]", *self.intermediate_opts(), out])
        else:
            raise SystemExit(f"unknown shot type {kind!r}")
        return out

    # ---------------------------------------------------------- final cut

    def assemble(self):
        shots = self.m["shots"]
        files = [self.render_shot(i, s) for i, s in enumerate(shots)]
        durs = [duration(f) for f in files]
        xf = float(self.m.get("xfade", 0.6))
        trans = self.m.get("transition", "fade")
        lf = float(self.m.get("loop_fade", 0.5))
        out = self.path(self.m.get("out", "drone.mp4"))
        os.makedirs(os.path.dirname(out), exist_ok=True)

        inputs = []
        for f in files:
            inputs += ["-i", f]
        chain = []
        for i in range(len(files)):
            chain.append(f"[{i}:v]settb=AVTB,setpts=PTS-STARTPTS[v{i}]")
        total = durs[0]
        prev = "v0"
        for i in range(1, len(files)):
            offset = total - xf
            chain.append(f"[{prev}][v{i}]xfade=transition={trans}:duration={xf}:offset={offset:.3f}[x{i}]")
            prev = f"x{i}"
            total = total + durs[i] - xf
        tail = ""
        if lf > 0:
            tail = (f",fade=t=in:st=0:d={lf}:color=0x{self.bg},"
                    f"fade=t=out:st={total - lf:.3f}:d={lf}:color=0x{self.bg}")
        chain.append(f"[{prev}]format=yuv420p{tail}[out]")

        sh(["ffmpeg", "-v", "error", "-y", *inputs,
            "-filter_complex", ";".join(chain), "-map", "[out]",
            "-c:v", "libx264", "-crf", str(self.m.get("crf", 23)),
            "-preset", self.m.get("preset", "slow"), "-profile:v", "high",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", out])

        poster = self.path(self.m.get("poster", os.path.splitext(out)[0] + "-poster.jpg"))
        poster_t = float(self.m.get("poster_time", lf + 0.3))
        sh(["ffmpeg", "-v", "error", "-y", "-ss", str(poster_t), "-i", out,
            "-frames:v", "1", "-q:v", "3", poster])

        print(f"\nshots: {[round(d, 2) for d in durs]} s, crossfade {xf} s")
        print(f"output: {out}  {duration(out):.2f} s  {os.path.getsize(out) / 1e6:.1f} MB")
        print(f"poster: {poster}  {os.path.getsize(poster) / 1e3:.0f} kB")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    Cut(sys.argv[1]).assemble()
