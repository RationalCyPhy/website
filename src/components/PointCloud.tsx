"use client";

import { useRef, useEffect } from "react";

interface Point {
  x: number;
  y: number;
  z: number;
  type: "ground" | "object" | "scatter";
}

const N = 1800;

function generatePoints(): Point[] {
  const points: Point[] = [];

  // Ground plane cluster
  for (let i = 0; i < N * 0.35; i++) {
    const r = Math.random() * 2.2;
    const theta = Math.random() * Math.PI * 2;
    points.push({
      x: r * Math.cos(theta) + (Math.random() - 0.5) * 0.3,
      y: -0.9 + (Math.random() - 0.5) * 0.15,
      z: r * Math.sin(theta) + (Math.random() - 0.5) * 0.3,
      type: "ground",
    });
  }

  // Object / structure cluster
  for (let i = 0; i < N * 0.3; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 0.5 + Math.random() * 0.4;
    points.push({
      x: 0.6 + r * Math.sin(phi) * Math.cos(theta),
      y: 0.1 + r * Math.cos(phi) * 0.7,
      z: 0.3 + r * Math.sin(phi) * Math.sin(theta),
      type: "object",
    });
  }

  // Scattered far-field points
  for (let i = 0; i < N * 0.35; i++) {
    points.push({
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 2.5,
      z: (Math.random() - 0.5) * 5,
      type: "scatter",
    });
  }

  return points;
}

export default function PointCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number;
    let angle = 0;
    let animId: number;
    const points = generatePoints();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.scale(dpr, dpr);
    }

    function project(px: number, py: number, pz: number, rotY: number) {
      const cosY = Math.cos(rotY),
        sinY = Math.sin(rotY);
      const rx = px * cosY - pz * sinY;
      const rz = px * sinY + pz * cosY;

      const tilt = 0.35;
      const cosX = Math.cos(tilt),
        sinX = Math.sin(tilt);
      const ry2 = py * cosX - rz * sinX;
      const rz2 = py * sinX + rz * cosX;

      const fov = 460;
      const depth = fov / (fov + rz2 * 80 + 200);

      const cx = W / 2;
      const cy = H / 2;
      const screenX = cx + rx * depth * 220 + W * 0.2;
      const screenY = cy + ry2 * depth * 220;

      return { sx: screenX, sy: screenY, depth, z: rz2 };
    }

    function colorForPoint(p: Point, depth: number) {
      const t = (p.y + 1.0) / 2.2;
      if (p.type === "scatter") {
        return `rgba(99,179,237,${(0.08 + depth * 0.15).toFixed(3)})`;
      }
      if (p.type === "ground") {
        const alpha = 0.25 + depth * 0.5;
        return `rgba(72,187,120,${(alpha * 0.7).toFixed(3)})`;
      }
      const r = Math.round(99 + (159 - 99) * t);
      const g = Math.round(179 + (122 - 179) * t);
      const b = Math.round(237 + (234 - 237) * t);
      return `rgba(${r},${g},${b},${(0.35 + depth * 0.55).toFixed(3)})`;
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      const projected = points
        .map((p) => {
          const pr = project(p.x, p.y, p.z, angle);
          return { p, pr };
        })
        .sort((a, b) => a.pr.z - b.pr.z);

      for (const { p, pr } of projected) {
        const { sx, sy, depth } = pr;
        if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) continue;

        const size =
          p.type === "object"
            ? (1.2 + depth * 3) * 0.7
            : (0.6 + depth * 2) * 0.7;

        ctx!.beginPath();
        ctx!.arc(sx, sy, Math.max(0.4, size), 0, Math.PI * 2);
        ctx!.fillStyle = colorForPoint(p, depth);
        ctx!.fill();
      }

      angle += 0.0018;
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const handleResize = () => {
      resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
