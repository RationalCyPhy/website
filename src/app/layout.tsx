import type { Metadata } from "next";
import { Inter, DM_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/lib/theme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Rational Cyphy — Physical Intelligence",
  description:
    "We build powerful drones, their autonomy stacks, and rigorous tooling to design, verify, and reason about AI-enabled systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="aerospace"
      className={`${inter.variable} ${dmMono.variable} ${jakarta.variable}`}
    >
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
