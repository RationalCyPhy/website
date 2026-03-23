import { TECHNOLOGIES } from "@/lib/data";

export const metadata = {
  title: "Technology — Rational Cyphy",
};

export default function TechnologyPage() {
  return (
    <div className="pt-24 pb-16 px-16">
      {/* Header */}
      <div
        className="flex items-baseline justify-between pb-8 mb-12"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "12px",
            }}
          >
            What We Build
          </p>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--text)",
            }}
          >
            Technology
          </h1>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--muted)",
          }}
        >
          § 02
        </span>
      </div>

      {/* Technology list */}
      <div className="flex flex-col">
        {TECHNOLOGIES.map((tech, i) => {
          const dotColor =
            tech.color === "accent"
              ? "var(--accent)"
              : tech.color === "green"
                ? "var(--green)"
                : "var(--accent2)";

          return (
            <div
              key={tech.id}
              className="grid gap-10 py-10"
              style={{
                gridTemplateColumns: "48px 1fr 2.2fr 160px",
                borderBottom: i < TECHNOLOGIES.length - 1 ? "1px solid var(--border)" : "none",
                alignItems: "start",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--muted)",
                  paddingTop: "3px",
                }}
              >
                {tech.id}
              </span>

              <div>
                <h2
                  className="font-semibold"
                  style={{
                    fontSize: "24px",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    color: "var(--text)",
                    marginBottom: "6px",
                  }}
                >
                  {tech.name}
                </h2>
                <p
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: dotColor,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ background: dotColor }}
                  />
                  {tech.category}
                </p>
              </div>

              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "var(--muted)",
                }}
              >
                {tech.description}
              </p>

              <div className="flex flex-col gap-1.5 items-end">
                {tech.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-right"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
