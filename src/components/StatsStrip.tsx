import { COMPANY } from "@/lib/data";

const stats = [
  { value: COMPANY.funding, label: "Total Funding" },
  { value: "NASA \u00b7 AFRL \u00b7 NSF", label: "Government Backers", small: true },
  { value: "2", label: "Core Technologies" },
  { value: String(COMPANY.teamSize), label: "Team Members" },
];

export default function StatsStrip() {
  return (
    <div
      className="grid grid-cols-4"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex flex-col gap-1.5 px-12 py-8"
          style={{
            borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
          }}
        >
          <span
            className="font-bold"
            style={{
              fontSize: stat.small ? "20px" : "36px",
              letterSpacing: stat.small ? "0.02em" : "-0.04em",
              lineHeight: 1,
              color: "var(--text)",
              fontFamily: stat.small ? "var(--font-body)" : undefined,
            }}
          >
            {stat.value}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
