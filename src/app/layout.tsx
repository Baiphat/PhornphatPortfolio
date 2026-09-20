import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { connection } from "next/server";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Nav } from "@/components/Nav";
import { ScrollSpy } from "@/components/ScrollSpy";
import { StarField } from "@/components/StarField";
import "./globals.css";

/* ฟอนต์ LINE Seed Sans TH — Next.js ฝังและโหลดจากโดเมนตัวเอง (ไม่พึ่งเว็บภายนอก) */
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
  title: "Phornphat Lepkhrut | Web UX/UI & Graphic Designer",
  description:
    "Phornphat Lepkhrut — a Web UX/UI and Graphic Designer crafting seamless digital experiences.",
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    type: "website",
    title: "Phornphat Lepkhrut | Web UX/UI & Graphic Designer",
    description: "A Web UX/UI and Graphic Designer crafting seamless digital experiences.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#041727",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // บังคับให้หน้าเรนเดอร์ใหม่ทุกครั้งที่มีคนเข้า เพื่อให้ Next.js ใส่ nonce ของ CSP ลงในสคริปต์ได้
  // (ดู src/proxy.ts) — เว็บหน้าเดียวขนาดนี้ไม่มีผลต่อความเร็วที่เห็นได้
  await connection();

  return (
    <html lang="en" className={lineSeed.variable}>
      <body>
        <LanguageProvider>
          <a
            href="#main"
            className="fixed left-3 -top-[60px] z-50 rounded-full bg-white px-4 py-2.5 font-bold text-navy transition-[top] duration-200 focus:top-3"
          >
            Skip to content
          </a>
          <div className="bg" aria-hidden="true" />
          <StarField />
          <div className="glow" aria-hidden="true" />
          <Nav />
          <ScrollSpy />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
