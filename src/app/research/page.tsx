import { RESEARCH, COMPANY } from "@/lib/data";

export const metadata = {
  title: "Research — Rational Cyphy",
};

export default function ResearchPage() {
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
            Publications &amp; Projects
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
            Research
          </h1>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--muted)",
          }}
        >
          § 01
        </span>
      </div>

      {/* Intro */}
      <div
        className="grid gap-16 pb-12 mb-12"
        style={{
          gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            fontWeight: 300,
          }}
        >
          Our research spans runtime assurance, 3D Gaussian Splatting, and formal
          verification of learning-enabled systems. Funded by NASA, AFRL, and NSF.
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.8, color: "var(--muted)" }}>
          At Rational Cyphy, research and engineering are tightly coupled. Our
          publications directly inform the systems we build — from the formal
          methods underlying RTAEval to the perception pipelines in our mapping
          platform.
        </p>
      </div>

      {/* Papers */}
      <div className="flex flex-col">
        {RESEARCH.map((pub, i) => (
          <div
            key={i}
            className="grid gap-10 py-8"
            style={{
              gridTemplateColumns: "32px 1fr 160px",
              borderBottom:
                i < RESEARCH.length - 1 ? "1px solid var(--border)" : "none",
              alignItems: "start",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--muted)",
                paddingTop: "2px",
              }}
            >
              [{i + 1}]
            </span>

            <div>
              <h3
                className="font-medium"
                style={{
                  fontSize: "18px",
                  color: "var(--text)",
                  lineHeight: 1.4,
                  marginBottom: "6px",
                  letterSpacing: "-0.01em",
                }}
              >
                {pub.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--accent)",
                  opacity: 0.7,
                  letterSpacing: "0.05em",
                }}
              >
                Funded by {pub.funder} &middot; {pub.status}
              </p>
            </div>

            <div className="text-right">
              <span
                className="px-3 py-1 text-xs"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  border: "1px solid var(--border-hi)",
                  color: "var(--accent)",
                  background: "rgba(99,179,237,0.06)",
                  borderRadius: "100px",
                }}
              >
                {pub.funder}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div
        className="mt-12 p-10 text-center"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "16px" }}>
          Interested in collaborating on research?
        </p>
        <a
          href={`mailto:${COMPANY.email}`}
          className="no-underline px-6 py-3 text-sm font-semibold"
          style={{
            background: "var(--accent)",
            color: "var(--bg)",
            borderRadius: "var(--radius)",
          }}
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}
