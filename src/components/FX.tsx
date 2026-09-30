"use client";
import { useEffect, useRef } from "react";

export function FX() {
  const cursorGlowRef = useRef<HTMLDivElement>(null);

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
    document.addEventListener("mousemove", mv);
    window.addEventListener("scroll", updateCursorGlow, { passive: true });
    window.addEventListener("blur", hideCursorGlow);
    return () => {
      io.disconnect();
      document.removeEventListener("mousemove", mv);
      window.removeEventListener("scroll", updateCursorGlow);
      window.removeEventListener("blur", hideCursorGlow);
    };
  }, []);
  return <div ref={cursorGlowRef} className="cursor-glow" aria-hidden="true" />;
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
