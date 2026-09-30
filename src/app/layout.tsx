import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { FX } from "@/components/FX";
import { Nav } from "@/components/Nav";
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

export const metadata: Metadata = {
  title: "Phornphat Lepkhrut | Frontend Developer & UX/UI Designer",
  description: "Phornphat Lepkhrut — Frontend Developer & UX/UI Designer crafting seamless digital experiences.",
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/assets/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  },
  openGraph: {
    type: "website",
    title: "Phornphat Lepkhrut | Frontend Developer & UX/UI Designer",
    description: "Crafting seamless digital experiences.",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0e0e0e", colorScheme: "dark" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={lineSeed.variable} data-theme="dark">
      <body>
        <div className="ambient" aria-hidden="true"><span className="ambient-orb ambient-orb--left" /><span className="ambient-orb ambient-orb--right" /></div>
        <div className="intro" aria-hidden="true"><i /><i /></div>
        <a href="#main" className="skip">Skip to content</a>
        <Nav />
        {children}
        <FX />
      </body>
    </html>
  );
}
