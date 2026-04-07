import { COMPANY } from "@/lib/data";

export const metadata = {
  title: "Careers — Rational Cyphy",
};

const openings = [
  {
    title: "Robotics Engineer — Autonomous Systems R&D",
    type: "Full-time · Champaign, IL",
    description:
      "Design, build, and field-test autonomous aerial platforms for GPS-denied environments. You'll own the hardware stack — from CAD and embedded integration (flight controllers, sensors, radios) through bench validation and outdoor flight tests — while collaborating closely with our AI and perception team. Requires 2–5 yrs experience with robotics/embedded systems; UAV or field robotics background a plus.",
  },
];

export default function CareersPage() {
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
            Join Us
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
            Careers
          </h1>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--muted)",
          }}
        >
          § 04
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
          We&apos;re a small team tackling hard problems in physical intelligence,
          formal verification, and autonomous systems. If you want to build things
          that matter, we want to talk.
        </p>
        <div
          className="flex flex-col gap-3"
          style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.8 }}
        >
          <p>
            <strong style={{ color: "var(--text)" }}>Location:</strong>{" "}
            {COMPANY.location} (on-site preferred)
          </p>
          <p>
            <strong style={{ color: "var(--text)" }}>Stage:</strong> Funded
            startup ({COMPANY.funding} from NASA, AFRL, NSF)
          </p>
          <p>
            <strong style={{ color: "var(--text)" }}>Apply:</strong>{" "}
            {COMPANY.email}
          </p>
        </div>
      </div>

      {/* Openings */}
      <div className="flex flex-col">
        {openings.map((job, i) => (
          <div
            key={i}
            className="grid gap-10 py-10"
            style={{
              gridTemplateColumns: "1fr 2fr auto",
              borderBottom:
                i < openings.length - 1 ? "1px solid var(--border)" : "none",
              alignItems: "start",
            }}
          >
            <div>
              <h3
                className="font-semibold"
                style={{
                  fontSize: "20px",
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                  marginBottom: "6px",
                }}
              >
                {job.title}
              </h3>
              <span
                className="px-3 py-1 text-xs"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: "1px solid var(--border-hi)",
                  color: "var(--accent)",
                  background: "rgba(99,179,237,0.06)",
                  borderRadius: "100px",
                }}
              >
                {job.type}
              </span>
            </div>

            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.8,
                color: "var(--muted)",
              }}
            >
              {job.description}
            </p>

            <a
              href={`mailto:${COMPANY.email}?subject=Application: ${job.title}`}
              className="no-underline px-5 py-2 text-xs font-semibold transition-colors"
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
                borderRadius: "var(--radius)",
                whiteSpace: "nowrap",
              }}
            >
              Apply
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
