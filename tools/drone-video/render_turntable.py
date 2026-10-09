"""
Headless Blender turntable render of a 3D model in the Rational Cyphy site look:
dark studio, warm key light, electric-blue and violet rim lights, transparent
background (composited over the card colour by assemble.py).

Usage (from the repo root):

  /Applications/Blender.app/Contents/MacOS/Blender --background \
      --python tools/drone-video/render_turntable.py -- \
      --model videos/drone/model/drone.glb \
      --out   videos/drone/work/turntable \
      [--frames 240] [--fps 30] [--size 1280x720] [--samples 64]
      [--elevation 22] [--wobble 6] [--distance 2.6] [--lens 50]
      [--rotate 0,0,0] [--smooth] [--save-blend] [--demo]

Frames land in <out>/frame_0001.png ... (RGBA PNG). The model spins one full
turn over --frames frames, so frame N+1 == frame 1 and the clip loops cleanly.

Supported model formats: .glb .gltf .obj .fbx .stl .ply .usd/.usda/.usdc .blend
CAD-native files (STEP, IGES, SLDPRT, F3D) must be exported to one of these first.
"""

import argparse
import math
import os
import sys

import bpy
from mathutils import Vector

# Site palette (globals.css, aerospace theme)
ACCENT = (0.388, 0.702, 0.929)   # #63b3ed
ACCENT2 = (0.624, 0.478, 0.918)  # #9f7aea


def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    p = argparse.ArgumentParser()
    p.add_argument("--model", help="path to the 3D model")
    p.add_argument("--out", required=True, help="output directory for PNG frames")
    p.add_argument("--frames", type=int, default=240, help="frames per full turn")
    p.add_argument("--fps", type=int, default=30)
    p.add_argument("--size", default="1280x720")
    p.add_argument("--samples", type=int, default=64, help="EEVEE render samples")
    p.add_argument("--elevation", type=float, default=22.0, help="camera elevation, degrees")
    p.add_argument("--wobble", type=float, default=6.0, help="elevation oscillation amplitude, degrees")
    p.add_argument("--distance", type=float, default=2.3, help="camera distance (model is scaled to unit size)")
    p.add_argument("--lens", type=float, default=50.0, help="camera focal length, mm")
    p.add_argument("--rotate", default="0,0,0", help="pre-rotation of the model, degrees X,Y,Z (fix up-axis)")
    p.add_argument("--smooth", action="store_true", help="auto-smooth shading (on by default for STL)")
    p.add_argument("--save-blend", action="store_true", help="also save <out>/scene.blend for manual tweaks")
    p.add_argument("--demo", action="store_true", help="render a placeholder quadcopter instead of --model")
    p.add_argument("--start", type=int, default=1, help="first frame to render (resume)")
    p.add_argument("--end", type=int, default=0, help="last frame to render (default: --frames)")
    return p.parse_args(argv)


# ---------------------------------------------------------------- import

def import_model(path):
    ext = os.path.splitext(path)[1].lower()
    before = set(bpy.data.objects)
    if ext in (".glb", ".gltf"):
        bpy.ops.import_scene.gltf(filepath=path)
    elif ext == ".obj":
        bpy.ops.wm.obj_import(filepath=path)
    elif ext == ".fbx":
        try:
            bpy.ops.wm.fbx_import(filepath=path)
        except (AttributeError, RuntimeError):
            bpy.ops.import_scene.fbx(filepath=path)
    elif ext == ".stl":
        bpy.ops.wm.stl_import(filepath=path)
    elif ext == ".ply":
        bpy.ops.wm.ply_import(filepath=path)
    elif ext in (".usd", ".usda", ".usdc", ".usdz"):
        bpy.ops.wm.usd_import(filepath=path)
    elif ext == ".blend":
        with bpy.data.libraries.load(path) as (src, dst):
            dst.objects = src.objects
        for o in dst.objects:
            if o is not None:
                bpy.context.scene.collection.objects.link(o)
    else:
        raise SystemExit(f"unsupported model format: {ext}")
    objs = [o for o in bpy.data.objects if o not in before and o.name in bpy.context.scene.objects]
    if not objs:
        raise SystemExit("import produced no objects")
    return objs


def make_material(name, color, metallic, roughness):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    return m


def build_demo():
    """Crude quadcopter from primitives, used to test lighting and the cut."""
    objs = []

    def add(op, **kw):
        op(**kw)
        o = bpy.context.active_object
        objs.append(o)
        return o

    carbon = make_material("DemoCarbon", (0.03, 0.03, 0.035), 0.3, 0.45)
    metal = make_material("DemoMetal", (0.45, 0.47, 0.5), 0.9, 0.3)
    prop = make_material("DemoProp", (0.05, 0.06, 0.08), 0.1, 0.25)

    body = add(bpy.ops.mesh.primitive_cube_add, size=1)
    body.scale = (0.9, 0.6, 0.22)
    body.data.materials.append(carbon)
    top = add(bpy.ops.mesh.primitive_cube_add, size=1, location=(0, 0, 0.17))
    top.scale = (0.55, 0.4, 0.14)
    top.data.materials.append(carbon)
    gimbal = add(bpy.ops.mesh.primitive_uv_sphere_add, radius=0.14, location=(0.5, 0, -0.2))
    gimbal.data.materials.append(metal)

    for i, (sx, sy) in enumerate([(1, 1), (1, -1), (-1, 1), (-1, -1)]):
        ang = math.atan2(sy, sx)
        arm = add(bpy.ops.mesh.primitive_cylinder_add, radius=0.055, depth=1.3,
                  location=(sx * 0.75, sy * 0.65, 0.0),
                  rotation=(0, math.radians(90), ang))
        arm.data.materials.append(carbon)
        motor = add(bpy.ops.mesh.primitive_cylinder_add, radius=0.14, depth=0.2,
                    location=(sx * 1.2, sy * 1.1, 0.14))
        motor.data.materials.append(metal)
        for k in range(2):
            blade = add(bpy.ops.mesh.primitive_cube_add, size=1,
                        location=(sx * 1.2, sy * 1.1, 0.27),
                        rotation=(0, 0, math.radians(35 * i) + k * math.pi / 2))
            blade.scale = (1.0, 0.11, 0.012)
            blade.data.materials.append(prop)
        leg = add(bpy.ops.mesh.primitive_cylinder_add, radius=0.03, depth=0.45,
                  location=(sx * 0.6, sy * 0.45, -0.3),
                  rotation=(math.radians(-sy * 15), math.radians(sx * 10), 0))
        leg.data.materials.append(carbon)
    return objs


# ---------------------------------------------------------------- scene

def world_bbox(objs):
    pts = []
    for o in objs:
        if o.type != "MESH":
            continue
        for c in o.bound_box:
            pts.append(o.matrix_world @ Vector(c))
    if not pts:
        raise SystemExit("no mesh objects to frame")
    lo = Vector((min(p.x for p in pts), min(p.y for p in pts), min(p.z for p in pts)))
    hi = Vector((max(p.x for p in pts), max(p.y for p in pts), max(p.z for p in pts)))
    return lo, hi


def normalize(objs, rotate_deg, smooth):
    """Parent the model under Spin > ModelRoot, centre it and scale to unit size."""
    scene = bpy.context.scene
    spin = bpy.data.objects.new("Spin", None)
    root = bpy.data.objects.new("ModelRoot", None)
    scene.collection.objects.link(spin)
    scene.collection.objects.link(root)
    root.parent = spin
    imported = set(objs)
    for o in objs:
        if o.parent is None or o.parent not in imported:
            o.parent = root
    root.rotation_euler = [math.radians(float(v)) for v in rotate_deg.split(",")]
    bpy.context.view_layer.update()

    lo, hi = world_bbox(objs)
    size = max(hi - lo)
    centre = (lo + hi) / 2
    s = 1.0 / size
    root.scale = (s, s, s)
    root.location = -centre * s
    bpy.context.view_layer.update()

    meshes = [o for o in objs if o.type == "MESH"]
    default = make_material("DefaultBody", (0.09, 0.095, 0.11), 0.6, 0.35)
    for o in meshes:
        if not o.data.materials or all(m is None for m in o.data.materials):
            o.data.materials.clear()
            o.data.materials.append(default)
    if smooth and meshes:
        with bpy.context.temp_override(selected_editable_objects=meshes,
                                       active_object=meshes[0], object=meshes[0]):
            try:
                bpy.ops.object.shade_auto_smooth()
            except Exception:
                bpy.ops.object.shade_smooth()
    return spin


def add_light(name, kind, loc, energy, color, size=2.0):
    data = bpy.data.lights.new(name, kind)
    data.energy = energy
    data.color = color
    if kind == "AREA":
        data.size = size
    ob = bpy.data.objects.new(name, data)
    ob.location = loc
    bpy.context.scene.collection.objects.link(ob)
    track = ob.constraints.new("TRACK_TO")
    track.target = bpy.data.objects["Target"]
    track.track_axis = "TRACK_NEGATIVE_Z"
    track.up_axis = "UP_Y"
    return ob


def build_studio(args):
    scene = bpy.context.scene
    target = bpy.data.objects.new("Target", None)
    scene.collection.objects.link(target)

    add_light("Key", "AREA", (2.6, -2.4, 3.0), 420, (1.0, 0.97, 0.92), size=2.5)
    add_light("RimBlue", "AREA", (-3.0, 2.6, 1.6), 420, ACCENT, size=3.0)
    add_light("RimViolet", "AREA", (3.2, 2.8, 0.4), 260, ACCENT2, size=3.0)
    add_light("Fill", "AREA", (0.0, -4.0, 0.6), 90, (0.85, 0.9, 1.0), size=4.0)

    world = bpy.data.worlds.new("Studio")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    bg.inputs["Color"].default_value = (0.02, 0.025, 0.045, 1.0)
    bg.inputs["Strength"].default_value = 1.0

    cam_data = bpy.data.cameras.new("Camera")
    cam_data.lens = args.lens
    cam_data.sensor_width = 36
    cam = bpy.data.objects.new("Camera", cam_data)
    scene.collection.objects.link(cam)
    scene.camera = cam
    track = cam.constraints.new("TRACK_TO")
    track.target = target
    track.track_axis = "TRACK_NEGATIVE_Z"
    track.up_axis = "UP_Y"
    return cam


def _fcurves(anim):
    """F-curves of an object's action, across the legacy and layered (4.4+) action APIs."""
    act = anim.action
    if hasattr(act, "fcurves"):
        return list(act.fcurves)
    out = []
    for layer in act.layers:
        for strip in layer.strips:
            for cb in strip.channelbags:
                out.extend(cb.fcurves)
    return out


def animate(spin, cam, args):
    n = args.frames
    try:
        bpy.context.preferences.edit.keyframe_new_interpolation_type = "LINEAR"
    except Exception:
        pass
    # one full turn, linear, frame n+1 coincides with frame 1
    spin.rotation_euler[2] = 0.0
    spin.keyframe_insert("rotation_euler", index=2, frame=1)
    spin.rotation_euler[2] = 2 * math.pi
    spin.keyframe_insert("rotation_euler", index=2, frame=n + 1)
    # camera elevation breathes once per turn (loops)
    for f in range(1, n + 2):
        t = (f - 1) / n
        e = math.radians(args.elevation + args.wobble * math.sin(2 * math.pi * t))
        cam.location = (0.0, -args.distance * math.cos(e), args.distance * math.sin(e))
        cam.keyframe_insert("location", frame=f)
    for ob in (spin, cam):
        for fc in _fcurves(ob.animation_data):
            for kp in fc.keyframe_points:
                kp.interpolation = "LINEAR"


def configure_render(args):
    scene = bpy.context.scene
    for engine in ("BLENDER_EEVEE_NEXT", "BLENDER_EEVEE"):
        try:
            scene.render.engine = engine
            break
        except TypeError:
            continue
    w, h = (int(v) for v in args.size.lower().split("x"))
    r = scene.render
    r.resolution_x, r.resolution_y = w, h
    r.resolution_percentage = 100
    r.fps = args.fps
    r.film_transparent = True
    r.image_settings.file_format = "PNG"
    r.image_settings.color_mode = "RGBA"
    r.image_settings.color_depth = "8"
    r.filepath = os.path.join(os.path.abspath(args.out), "frame_")
    scene.frame_start = args.start
    scene.frame_end = args.end or args.frames
    try:
        scene.eevee.taa_render_samples = args.samples
    except AttributeError:
        pass
    try:
        scene.view_settings.view_transform = "AgX"
        scene.view_settings.look = "None"
    except TypeError:
        pass


def main():
    args = parse_args()
    if not args.demo and not args.model:
        raise SystemExit("give --model <file> or --demo")
    bpy.ops.wm.read_factory_settings(use_empty=True)
    os.makedirs(args.out, exist_ok=True)

    if args.demo:
        objs = build_demo()
        smooth = False
    else:
        path = os.path.abspath(args.model)
        objs = import_model(path)
        smooth = args.smooth or path.lower().endswith(".stl")
    spin = normalize(objs, args.rotate, smooth)
    cam = build_studio(args)
    animate(spin, cam, args)
    configure_render(args)

    if args.save_blend:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.join(os.path.abspath(args.out), "scene.blend"))

    print(f"[turntable] {len(objs)} objects, frames {bpy.context.scene.frame_start}-{bpy.context.scene.frame_end} "
          f"at {args.size} -> {args.out}")
    bpy.ops.render.render(animation=True)


if __name__ == "__main__":
    main()
