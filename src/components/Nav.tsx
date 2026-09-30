"use client";
import { useEffect, useState } from "react";

const links = [["home", "Home"], ["about", "About me"], ["skills", "Skills"], ["certificates", "Certificates"], ["work", "Work"]];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
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
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { removeEventListener("scroll", f); io.disconnect(); };
  }, []);
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", nextTheme === "light" ? "#e8ebee" : "#0e0e0e");
    setTheme(nextTheme);
  };
  return (
    <header className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="nav-in">
        <a href="#home" className="logo"><img src="/assets/logo.png" alt="Phornphat" /></a>
        <nav className={open ? "open" : ""}>
          {links.map(([id, l]) => (
            <a key={id} href={"#" + id} className={active === id ? "on" : ""} onClick={() => setOpen(false)}>{l}</a>
          ))}
        </nav>
        <a href="#contact" className="btn shine">Contact</a>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            {theme === "dark" ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2m-3.05-6.95-1.42 1.42M6.47 17.53l-1.42 1.42m12.9 0-1.42-1.42M6.47 6.47 5.05 5.05" /></> : <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />}
          </svg>
        </button>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
      </div>
    </header>
  );
}
