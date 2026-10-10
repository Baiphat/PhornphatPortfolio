import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { FX } from "@/components/FX";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Nav } from "@/components/Nav";
import { cookies } from 'next/headers';
import "./globals.css";

const lineSeed = localFont({
  src: [
    { path: "../fonts/LINESeedSansTH-Thin.woff2", weight: "100", style: "normal" },
    { path: "../fonts/LINESeedSansTH-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/LINESeedSansTH-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/LINESeedSansTH-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../fonts/LINESeedSansTH-Heavy.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-line-seed",
  display: "swap",
});

export async function generateMetadata() {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("portfolio-language");
  const language = langCookie?.value === "th" ? "th" : "en"; // default to en if not th

  const title = language === "th"
    ? "ภรภัทร เล็บครุฑ | Frontend Developer & UX/UI Designer"
    : "Phornphat Lepkhrut | Frontend Developer & UX/UI Designer";

  const description = language === "th"
    ? "ภรภัทร เล็บครุฑ — Frontend Developer & UX/UI Designer ผู้สร้างประสบการณ์ดิจิทัลที่ใช้งานได้จริง"
    : "Phornphat Lepkhrut — Frontend Developer & UX/UI Designer crafting seamless digital experiences.";

  return {
    title,
    description,
    referrer: "strict-origin-when-cross-origin",
    icons: {
      icon: [
        { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/assets/favicon.ico", sizes: "any", type: "image/x-icon" },
      ],
    },
    openGraph: {
      type: "website",
      title,
      description: language === "th"
        ? "สร้างประสบการณ์ดิจิทัลที่ใช้งานได้จริง"
        : "Crafting seamless digital experiences.",
    },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0e0e0e", colorScheme: "dark" };

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("portfolio-language");
  const language = langCookie?.value === "th" ? "th" : "en";

  return (
    <html lang={language} className={lineSeed.variable} data-theme="dark">
      <body>
        <div className="ambient" aria-hidden="true"><span className="ambient-orb ambient-orb--left" /><span className="ambient-orb ambient-orb--right" /></div>
        <div className="intro" aria-hidden="true"><i /><i /></div>
        <LanguageProvider>
          <Nav />
          {children}
          <FX />
        </LanguageProvider>
      </body>
    </html>
  );
}
