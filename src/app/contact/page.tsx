import { COMPANY } from "@/lib/data";

export const metadata = {
  title: "Contact — Rational Cyphy",
};

export default function ContactPage() {
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
            Get in Touch
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
            Contact
          </h1>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--muted)",
          }}
        >
          § 05
        </span>
      </div>

      <div
        className="grid gap-16"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        {/* Info */}
        <div className="flex flex-col gap-10">
          <div>
            <h2
              className="font-medium mb-4"
              style={{
                fontSize: "24px",
                letterSpacing: "-0.02em",
                color: "var(--text)",
              }}
            >
              Let&apos;s work together
            </h2>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.8,
                color: "var(--muted)",
              }}
            >
              Whether you&apos;re interested in our technology, research
              collaboration, or joining the team — we&apos;d love to hear from
              you.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {[
              { label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
              { label: "Location", value: COMPANY.location, href: undefined },
              { label: "Coordinates", value: "40.1020°N, 88.2272°W", href: undefined },
            ].map((item) => (
              <div key={item.label}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "6px",
                  }}
                >
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="no-underline"
                    style={{ fontSize: "16px", color: "var(--accent)" }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p style={{ fontSize: "16px", color: "var(--text)" }}>
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact form placeholder */}
        <div
          className="flex flex-col gap-6"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "36px",
          }}
        >
          <div className="flex flex-col gap-2">
            <label
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 text-sm outline-none"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                color: "var(--text)",
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full px-4 py-3 text-sm outline-none"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                color: "var(--text)",
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              Message
            </label>
            <textarea
              rows={5}
              placeholder="What can we help you with?"
              className="w-full px-4 py-3 text-sm outline-none resize-y"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                color: "var(--text)",
              }}
            />
          </div>

          <button
            className="w-full py-3 text-sm font-semibold transition-colors cursor-pointer"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              border: "none",
              borderRadius: "var(--radius)",
            }}
          >
            Send Message
          </button>

          <p
            className="text-center"
            style={{
              fontSize: "11px",
              color: "var(--muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Or email us directly at {COMPANY.email}
          </p>
        </div>
      </div>
    </div>
  );
}
