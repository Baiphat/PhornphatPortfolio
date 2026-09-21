"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  SECTION_IDS,
  getActiveSection,
  getServerActiveSection,
  isScrollLocked,
  setActiveSection,
  subscribeActive,
  unlockScroll,
  type SectionId,
} from "@/lib/scroll";

/** อ่านค่าหัวข้อที่กำลังดูอยู่ (ใช้ในเมนู) */
export function useActiveSection(): SectionId {
  return useSyncExternalStore(subscribeActive, getActiveSection, getServerActiveSection);
}

/** ติดตามการเลื่อนหน้า แล้วอัปเดตหัวข้อที่ active — เรียกครั้งเดียวที่ <ScrollSpy /> */
export function useScrollSpyListener(): void {
  useEffect(() => {
    const spy = () => {
      if (isScrollLocked()) return;
      const line = window.innerHeight * 0.45;
      let current: SectionId = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveSection(current);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        spy();
        ticking = false;
      });
    };
    const onScrollEnd = () => {
      unlockScroll();
      spy();
    };

    spy();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const hasScrollEnd = "onscrollend" in window;
    if (hasScrollEnd) window.addEventListener("scrollend", onScrollEnd);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (hasScrollEnd) window.removeEventListener("scrollend", onScrollEnd);
    };
  }, []);
}
