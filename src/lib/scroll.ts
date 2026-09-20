import type { MouseEvent } from "react";

/*
  ตัวกลางเก็บ "หัวข้อที่กำลังดูอยู่" (ใช้ร่วมกันระหว่างเมนู ปุ่มใน Hero และตัวจับการเลื่อน)
  ใช้ร่วมกับ useSyncExternalStore ใน hooks/useScrollSpy.ts
*/
export const SECTION_IDS = ["home", "about", "skills", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

let active: SectionId = "home";
let lockUntil = 0; // ตอนกดเมนู ล็อกไว้ชั่วคราว ไม่ให้แถบขาวกระโดดผ่านหัวข้อระหว่างทาง
const listeners = new Set<() => void>();

export function subscribeActive(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
export const getActiveSection = (): SectionId => active;
export const getServerActiveSection = (): SectionId => "home";

export function setActiveSection(id: SectionId): void {
  if (id === active) return;
  active = id;
  listeners.forEach((l) => l());
}

export function isScrollLocked(): boolean {
  return performance.now() < lockUntil;
}
export function unlockScroll(): void {
  lockUntil = 0;
}

const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function scrollToSection(id: SectionId): void {
  const target = document.getElementById(id);
  if (!target) return;
  lockUntil = performance.now() + 1200;
  setActiveSection(id);
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  history.replaceState(null, "", `#${id}`);
}

/** ใช้เป็น onClick ของลิงก์ #หัวข้อ  เช่น <a href="#about" onClick={goTo("about")}> */
export const goTo =
  (id: SectionId) =>
  (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    scrollToSection(id);
  };
