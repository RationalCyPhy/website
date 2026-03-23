import { TEAM, COMPANY } from "@/lib/data";

export const metadata = {
  title: "Team — Rational Cyphy",
};

export default function TeamPage() {
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
            Who We Are
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
            Team
          </h1>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--muted)",
          }}
        >
          § 03
        </span>
      </div>

      {/* Intro */}
      <p
        className="mb-12 max-w-2xl"
        style={{
          fontSize: "18px",
          lineHeight: 1.7,
          color: "var(--text-secondary)",
          fontWeight: 300,
        }}
      >
        A focused team of researchers and engineers building verified physical
        intelligence at the University of Illinois Urbana-Champaign backed by funding from NASA and AFRL.
      </p>

      {/* Team grid */}
      <div className="grid grid-cols-2 gap-3">
        {TEAM.map((member, i) => (
          <div
            key={i}
            className="flex flex-col gap-6 transition-colors duration-200"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "36px 32px",
            }}
          >
            {/* Avatar with duotone tint */}
            <div
              className="relative w-20 h-20 rounded-full overflow-hidden"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(100%) contrast(1.1)" }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "var(--accent)",
                  mixBlendMode: "color",
                  opacity: 0.35,
                }}
              />
            </div>

            <div>
              <h3
                className="font-semibold"
                style={{
                  fontSize: "18px",
                  color: "var(--text)",
                  marginBottom: "4px",
                  letterSpacing: "-0.01em",
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--accent)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {member.role}
              </p>
              {member.credential && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--muted)",
                    marginTop: "4px",
                  }}
                >
                  {member.credential}
                </p>
              )}
            </div>

            <p style={{ fontSize: "13px", lineHeight: 1.7, color: "var(--muted)" }}>
              {member.bio}
            </p>
          </div>
        ))}
      </div>

      {/* Location note */}
      <div
        className="mt-8 p-8 flex items-center justify-between"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div>
          <h3
            className="font-semibold mb-1"
            style={{ fontSize: "16px", color: "var(--text)" }}
          >
            {COMPANY.location}
          </h3>
          <p style={{ fontSize: "13px", color: "var(--muted)" }}>
            Based at the University of Illinois at Urbana-Champaign
          </p>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--muted)",
          }}
        >
          40.1020°N, 88.2272°W
        </span>
      </div>
    </div>
  );
}
