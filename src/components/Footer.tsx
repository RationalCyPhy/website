import Link from "next/link";
import { COMPANY, NAV_LINKS } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      className="px-12 py-6 flex items-center justify-between"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <Link href="/" className="no-underline flex items-center">
        <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
          Rational
        </span>
        <span className="text-sm font-semibold text-gradient">Cyphy</span>
      </Link>

      <ul className="flex items-center gap-6 list-none m-0 p-0">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-xs no-underline transition-colors"
              style={{ color: "var(--muted)", letterSpacing: "0.04em" }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <span
        className="text-xs font-mono"
        style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
      >
        {COMPANY.location} &middot; {COMPANY.email} &middot; &copy;{" "}
        {new Date().getFullYear()}
      </span>
    </footer>
  );
}
