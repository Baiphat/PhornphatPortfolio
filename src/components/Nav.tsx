"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { GlobeIcon } from "@/components/Icons";
import { useLang } from "@/components/LanguageProvider";
import { useActiveSection } from "@/hooks/useScrollSpy";
import type { MessageKey } from "@/data/i18n";
import { goTo, type SectionId } from "@/lib/scroll";

const NAV_ITEMS: { id: SectionId; label: MessageKey }[] = [
  { id: "home", label: "navHome" },
  { id: "about", label: "navAbout" },
  { id: "skills", label: "navSkills" },
  { id: "contact", label: "navContact" },
];

export function Nav() {
  const { lang, t, toggle } = useLang();
  const active = useActiveSection();

  const linkRefs = useRef<Partial<Record<SectionId, HTMLAnchorElement | null>>>({});
  const barRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef<SectionId>(active);
  activeRef.current = active;

  /** เลื่อนแถบขาวไปอยู่ใต้ลิงก์ที่ active (instant = ไม่ต้องมีแอนิเมชัน) */
  const moveBar = useCallback((instant: boolean) => {
    const bar = barRef.current;
    const link = linkRefs.current[activeRef.current];
    if (!bar || !link || !link.parentElement) return;
    const parent = link.parentElement.getBoundingClientRect();
    const box = link.getBoundingClientRect();
    const x = box.left - parent.left + box.width / 2 - bar.offsetWidth / 2;
    if (instant) bar.classList.add("no-anim");
    bar.style.transform = `translateX(${x.toFixed(1)}px)`;
    if (instant) {
      bar.getBoundingClientRect(); // บังคับให้ browser คำนวณก่อน แล้วค่อยเปิดแอนิเมชันกลับ
      bar.classList.remove("no-anim");
    }
  }, []);

  const firstRun = useRef(true);
  useLayoutEffect(() => {
    moveBar(firstRun.current);
    firstRun.current = false;
  }, [active, moveBar]);

  // ภาษาเปลี่ยน = ความกว้างข้อความเปลี่ยน → ย้ายแถบทันที
  useLayoutEffect(() => {
    moveBar(true);
  }, [lang, moveBar]);

  // ปรับตำแหน่งตอนย่อ/ขยายหน้าต่าง และตอนฟอนต์โหลดเสร็จ
  useEffect(() => {
    const onResize = () => moveBar(true);
    window.addEventListener("resize", onResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(onResize);
    }
    window.addEventListener("load", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, [moveBar]);

  return (
    <header className="nav">
      <div className="nav__inner">
        <nav className="nav__links" aria-label="Main">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              ref={(el) => {
                linkRefs.current[id] = el;
              }}
              href={`#${id}`}
              className={active === id ? "is-active" : undefined}
              aria-current={active === id ? "true" : undefined}
              onClick={goTo(id)}
            >
              {t[label]}
            </a>
          ))}
          <span ref={barRef} className="nav__bar" aria-hidden="true" />
        </nav>

        <button type="button" id="lang-btn" className="nav__lang-btn" aria-label="Switch Language" onClick={toggle}>
          <GlobeIcon />
          <span id="lang-label" className="nav__lang-label">
            {lang === "en" ? "TH" : "EN"}
          </span>
        </button>
      </div>
    </header>
  );
}
