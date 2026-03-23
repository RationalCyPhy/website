"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-12 py-4 backdrop-blur-xl"
      style={{
        background: "var(--nav-bg)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Link href="/" className="flex items-center gap-0 no-underline">
        <span className="text-sm font-semibold tracking-wide" style={{ color: "var(--text)" }}>
          Rational
        </span>
        <span className="text-sm font-semibold tracking-wide text-gradient">
          Cyphy
        </span>
      </Link>

      <ul className="flex items-center gap-9 list-none m-0 p-0">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          const isContact = link.label === "Contact";

          if (isContact) {
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs font-semibold tracking-wide no-underline px-4 py-2 transition-colors"
                  style={{
                    color: "var(--accent)",
                    background: "rgba(99,179,237,0.1)",
                    border: "1px solid rgba(99,179,237,0.3)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          }

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs font-medium tracking-wide no-underline transition-colors"
                style={{
                  color: isActive ? "var(--text)" : "var(--muted)",
                  letterSpacing: "0.04em",
                }}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
