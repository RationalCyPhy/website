"use client";

import { COMPANY } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-grid">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          right: "-5%",
          transform: "translateY(-50%) scale(0.7)",
          transformOrigin: "center right",
          height: "100%",
          objectFit: "contain",
        }}
        src="/website/assets/emergencev3_cropped.mp4"
      />

      {/* Left-side gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(6,8,16,0.92) 0%, rgba(6,8,16,0.75) 38%, rgba(6,8,16,0.1) 65%, transparent 100%)",
        }}
      />

      <div className="relative z-10 px-16 max-w-[620px]">
        {/* Tag */}
        <div
          className="flex items-center gap-2.5 mb-5 animate-fade-in-up"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
          {COMPANY.tagline} &middot; {COMPANY.location}
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up-delay-1"
          style={{
            fontSize: "clamp(38px, 5.5vw, 72px)",
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
            color: "var(--text)",
          }}
        >
          <strong className="font-bold text-gradient">Verifiable</strong>
          <br />
          Physical AI
        </h1>

        {/* Sub */}
        <p
          className="animate-fade-in-up-delay-2"
          style={{
            fontSize: "15px",
            lineHeight: 1.75,
            color: "var(--text-secondary)",
            maxWidth: "480px",
            marginBottom: "40px",
          }}
        >
          We build powerful autonomy stacks and rigorous tooling to design, verify, and reason about AI-enabled systems — from hardware to formal assurance.
        </p>

        {/* CTAs — commented out, kept as nav menu items
        <div className="flex gap-3 items-center animate-fade-in-up-delay-3">
          <a
            href="/technology"
            className="no-underline px-7 py-3 text-sm font-bold transition-colors"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              borderRadius: "var(--radius)",
            }}
          >
            Our Technology
          </a>
          <a
            href="/research"
            className="no-underline px-7 py-3 text-sm font-medium transition-colors"
            style={{
              background: "transparent",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
            }}
          >
            Research &amp; Papers
          </a>
        </div>
        */}
      </div>

    </section>
  );
}
