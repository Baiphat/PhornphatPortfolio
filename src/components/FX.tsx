"use client";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { messages } from "@/lib/i18n";

export function FX() {
  const { language } = useLanguage();
  const t = messages[language];
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          io.unobserve(el);
          if (el.dataset.count) count(el);
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".rv,[data-count]").forEach((el) => io.observe(el));
    let mouseX = -1;
    let mouseY = -1;

    const updateScrollProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1) : 0;
      const button = scrollTopRef.current;
      if (!button) return;

      button.style.setProperty("--scroll-offset", `${125.66 * (1 - progress)}`);
      button.classList.toggle("is-visible", window.scrollY > 120);
    };

    const updateCursorGlow = () => {
      const cursorGlow = cursorGlowRef.current;
      const home = document.querySelector<HTMLElement>("#home");
      const bounds = home?.getBoundingClientRect();
      const overHome = bounds && mouseX >= bounds.left && mouseX <= bounds.right && mouseY >= bounds.top && mouseY <= bounds.bottom;

      if (!cursorGlow || !overHome) {
        cursorGlow?.classList.remove("active");
        return;
      }

      cursorGlow.style.setProperty("--cursor-x", `${mouseX}px`);
      cursorGlow.style.setProperty("--cursor-y", `${mouseY}px`);
      cursorGlow.classList.add("active");
    };

    const mv = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateCursorGlow();
      const t = (e.target as HTMLElement).closest<HTMLElement>(".spot");
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", e.clientX - r.left + "px");
      t.style.setProperty("--my", e.clientY - r.top + "px");
    };
    const hideCursorGlow = () => cursorGlowRef.current?.classList.remove("active");
    const handleScroll = () => {
      updateCursorGlow();
      updateScrollProgress();
    };
    document.addEventListener("mousemove", mv);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });
    window.addEventListener("blur", hideCursorGlow);
    updateScrollProgress();
    return () => {
      io.disconnect();
      document.removeEventListener("mousemove", mv);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollProgress);
      window.removeEventListener("blur", hideCursorGlow);
    };
  }, []);
  return (
    <>
      <div ref={cursorGlowRef} className="cursor-glow" aria-hidden="true" />
      <button
        ref={scrollTopRef}
        className="scroll-top"
        type="button"
        aria-label={t.backToTop}
        title={t.backToTop}
        onClick={() => {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            window.scrollTo(0, 0);
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle className="scroll-top-track" cx="24" cy="24" r="20" />
          <circle className="scroll-top-progress" cx="24" cy="24" r="20" transform="rotate(-90 24 24)" />
        </svg>
        <span aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </span>
      </button>
    </>
  );
}

function count(el: HTMLElement) {
  const n = Number(el.dataset.count);
  const t0 = performance.now() + 900; // รอให้แสง intro เลื่อนผ่านก่อน
  const f = (t: number) => {
    const p = Math.min(Math.max((t - t0) / 1400, 0), 1);
    el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))) + "+";
    if (p < 1) requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
}
