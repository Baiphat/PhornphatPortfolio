"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { messages } from "@/lib/i18n";

export function Nav() {
  const { language, setLanguage } = useLanguage();
  const t = messages[language];
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      document.documentElement.dataset.theme = savedTheme;
      setTheme(savedTheme);
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", savedTheme === "light" ? "#e8ebee" : "#0e0e0e");
    }
    const f = () => setScrolled(scrollY > 20);
    f();
    addEventListener("scroll", f, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    ["home", "about", "skills", "certificates", "work"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { removeEventListener("scroll", f); io.disconnect(); };
  }, []);

  useLayoutEffect(() => {
    const navElement = navRef.current;
    if (!navElement) return;

    const updateIndicator = () => {
      const activeLink = navElement.querySelector<HTMLElement>(`a[href="#${active}"]`);
      if (!activeLink) return;

      const navBounds = navElement.getBoundingClientRect();
      const linkBounds = activeLink.getBoundingClientRect();
      navElement.style.setProperty("--nav-active-x", `${linkBounds.left - navBounds.left - navElement.clientLeft}px`);
      navElement.style.setProperty("--nav-active-y", `${linkBounds.top - navBounds.top - navElement.clientTop}px`);
      navElement.style.setProperty("--nav-active-width", `${linkBounds.width}px`);
      navElement.style.setProperty("--nav-active-height", `${linkBounds.height}px`);
      navElement.classList.add("indicator-ready");
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [active, language, open]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", nextTheme === "light" ? "#e8ebee" : "#0e0e0e");
    setTheme(nextTheme);
  };
  return (
    <>
      <a href="#main" className="skip">{t.nav.skip}</a>
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="nav-in">
          <a href="#home" className="logo"><img src="/assets/logo.png" alt="Phornphat" /></a>
          <nav ref={navRef} className={open ? "open" : ""} aria-label={t.nav.navLabel}>
            <span className="nav-active-indicator" aria-hidden="true" />
            {[
              ["home", t.nav.home],
              ["about", t.nav.about],
              ["skills", t.nav.skills],
              ["certificates", t.nav.certificates],
              ["work", t.nav.work],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? "on" : ""} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </nav>
          <a href="#contact" className="btn shine">{t.nav.contact}</a>
          <div className="language-toggle" data-language={language} role="group" aria-label={t.nav.language}>
            {(["th", "en"] as const).map((option) => (
              <button key={option} type="button" className={language === option ? "on" : ""} aria-pressed={language === option} onClick={() => setLanguage(option)}>
                {option.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? t.nav.themeLight : t.nav.themeDark} title={theme === "dark" ? t.nav.themeLight : t.nav.themeDark}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {theme === "dark" ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2m-3.05-6.95-1.42 1.42M6.47 17.53l-1.42 1.42m12.9 0-1.42-1.42M6.47 6.47 5.05 5.05" /></> : <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />}
            </svg>
          </button>
          <button className="burger" aria-label={open ? t.nav.menuClose : t.nav.menuOpen} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
        </div>
      </header>
    </>
  );
}
