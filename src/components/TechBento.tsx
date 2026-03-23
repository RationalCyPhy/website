"use client";

import { TECHNOLOGIES, FUNDERS, RESEARCH, COMPANY } from "@/lib/data";

function TechTile({
  tech,
  className,
  style,
}: {
  tech: (typeof TECHNOLOGIES)[number];
  className?: string;
  style?: React.CSSProperties;
}) {
  const dotColor =
    tech.color === "accent"
      ? "var(--accent)"
      : tech.color === "green"
        ? "var(--green)"
        : "var(--accent2)";

  return (
    <div
      className={`flex flex-col justify-between transition-colors duration-200 ${className || ""}`}
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "28px 32px",
        ...style,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hi)";
        (e.currentTarget as HTMLElement).style.background = "var(--card-hi)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.background = "var(--card)";
      }}
    >
      <div
        className="flex items-center gap-2 mb-1.5"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        <span
          className="w-[5px] h-[5px] rounded-full"
          style={{ background: dotColor }}
        />
        {tech.category}
      </div>
      <div>
        <h3
          className="font-semibold mb-2"
          style={{
            fontSize: "19px",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            color: "var(--text)",
          }}
        >
          {tech.name}
        </h3>
        <p
          style={{
            fontSize: "12.5px",
            lineHeight: 1.65,
            color: "var(--muted)",
          }}
        >
          {tech.description}
        </p>
      </div>
      <span
        className="mt-3 inline-block"
        style={{ fontSize: "16px", color: "var(--accent)", opacity: 0.7 }}
      >
        &#8599;
      </span>
    </div>
  );
}

export default function TechBento() {
  return (
    <section className="px-12 py-12">
      <div
        className="grid gap-2.5"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "72px",
        }}
      >
        {/* Gaussian Splat showcase — large tile */}
        <div
          className="col-span-7 row-span-4 relative overflow-hidden flex flex-col justify-end"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          {/* Decorative splat dots */}
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 60% 40% at 50% 40%, rgba(99,179,237,0.12) 0%, transparent 70%),
              radial-gradient(ellipse 40% 50% at 70% 60%, rgba(159,122,234,0.1) 0%, transparent 60%),
              radial-gradient(ellipse 80% 60% at 30% 70%, rgba(72,187,120,0.06) 0%, transparent 60%)
            `,
          }} />
          <div
            className="relative z-10 p-8"
            style={{
              background: "linear-gradient(to top, rgba(13,15,26,0.9) 0%, transparent 100%)",
            }}
          >
            <div
              className="flex items-center gap-2 mb-2.5"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              &#9672; 3D Gaussian Splatting &middot; Demo
            </div>
            <h3
              className="font-semibold mb-2"
              style={{ fontSize: "20px", letterSpacing: "-0.02em", color: "var(--text)" }}
            >
              Visual Tracking &amp; Mapping
            </h3>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
              Real-time 3D reconstruction using neural radiance fields and Gaussian
              splat representations. Onboard intelligence for precision mapping.
            </p>
          </div>
        </div>

        {/* RTAEval tile */}
        <TechTile
          tech={TECHNOLOGIES[0]}
          className="col-span-5 row-span-2"
        />

        {/* Drone tile */}
        <TechTile
          tech={TECHNOLOGIES[1]}
          className="col-span-3 row-span-2"
        />

        {/* Visual tracking tile (compact) */}
        <div
          className="col-span-2 row-span-2 flex flex-col justify-between transition-colors duration-200"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "28px 24px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hi)";
            (e.currentTarget as HTMLElement).style.background = "var(--card-hi)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.background = "var(--card)";
          }}
        >
          <div
            className="flex items-center gap-2"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            <span
              className="w-[5px] h-[5px] rounded-full"
              style={{ background: "var(--accent2)" }}
            />
            Vision
          </div>
          <div
            className="font-semibold"
            style={{ fontSize: "15px", color: "var(--text)" }}
          >
            Visual
            <br />
            Tracking
          </div>
          <span style={{ fontSize: "16px", color: "var(--accent)", opacity: 0.7 }}>
            &#8599;
          </span>
        </div>

        {/* Funding tile */}
        <div
          className="col-span-4 row-span-2 flex items-center gap-8"
          style={{
            background: "linear-gradient(135deg, rgba(99,179,237,0.08), rgba(159,122,234,0.08))",
            border: "1px solid rgba(99,179,237,0.12)",
            borderRadius: "var(--radius-lg)",
            padding: "28px 32px",
          }}
        >
          <span
            className="font-bold"
            style={{
              fontSize: "48px",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "var(--accent)",
            }}
          >
            {COMPANY.funding}
          </span>
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "8px",
              }}
            >
              Funded by
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {FUNDERS.map((f) => (
                <span
                  key={f.abbr}
                  className="px-3 py-1 text-xs rounded-full"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    border: "1px solid var(--border-hi)",
                    color: "var(--accent)",
                    background: "rgba(99,179,237,0.06)",
                  }}
                >
                  {f.abbr}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Research tile */}
        <div
          className="col-span-4 row-span-2 flex flex-col justify-between transition-colors duration-200"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "28px 32px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hi)";
            (e.currentTarget as HTMLElement).style.background = "var(--card-hi)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.background = "var(--card)";
          }}
        >
          <div
            className="flex items-center gap-2"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            <span
              className="w-[5px] h-[5px] rounded-full"
              style={{ background: "var(--accent)" }}
            />
            Research
          </div>
          <div className="flex flex-col gap-1.5 flex-1 mt-2">
            {RESEARCH.map((pub, i) => (
              <div
                key={i}
                className="text-xs pl-3"
                style={{
                  color: "rgba(232,237,248,0.5)",
                  lineHeight: 1.5,
                  borderLeft: "2px solid rgba(99,179,237,0.25)",
                }}
              >
                {pub.title}
              </div>
            ))}
          </div>
          <span
            className="mt-3 text-xs"
            style={{ color: "var(--accent)", opacity: 0.7 }}
          >
            View all publications &#8599;
          </span>
        </div>

      </div>
    </section>
  );
}
