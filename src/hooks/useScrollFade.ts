"use client";

import { useEffect, useRef } from "react";

/*
  ทำให้ section เบลอ/จางลงตอนเลื่อนออกจากหน้าจอ (ใช้กับส่วน About)
  ตั้งค่า CSS variable --p (0–1) และ class "is-fading" ให้ CSS ใน globals.css เอาไปใช้ต่อ
*/
export function useScrollFade<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const top = el.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, -top / (window.innerHeight * 0.8)));
      el.style.setProperty("--p", p.toFixed(3));
      el.classList.toggle("is-fading", p > 0.001);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}
