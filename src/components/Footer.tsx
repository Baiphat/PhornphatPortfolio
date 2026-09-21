"use client";

import { useLang } from "@/components/LanguageProvider";
import { site } from "@/data/site";

/* Footer ใช้ Tailwind utility ล้วน (ไม่มี CSS แยก) — สี navy-deep มาจาก @theme ใน globals.css */
export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[6] bg-navy-deep px-5 py-[30px] text-center">
      <p
        className="text-[clamp(13px,3.5vw,15px)] tracking-[0.01em] text-white/90"
        suppressHydrationWarning
      >
        &copy; {year} {site.fullName}. All rights reserved.
      </p>
      <p className="mt-1 text-[clamp(12px,3vw,13px)] font-light text-white/50">{t.footerSub}</p>
    </footer>
  );
}
