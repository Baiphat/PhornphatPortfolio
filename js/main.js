(() => {
  "use strict";

  const data = window.SITE_DATA || {};
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let currentLang = localStorage.getItem("site_lang") || "en";

  function calcAge(birth) {
    if (!birth || !birth.year || !birth.month) return null;
    const now = new Date();
    let age = now.getFullYear() - birth.year;
    const monthNow = now.getMonth() + 1;
    const passed = birth.day
      ? monthNow > birth.month || (monthNow === birth.month && now.getDate() >= birth.day)
      : monthNow >= birth.month;
    if (!passed) age -= 1;
    return age;
  }

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("site_lang", lang);
    const i18n = data.i18n ? data.i18n[lang] : {};

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (i18n[key]) {
        el.textContent = i18n[key];
      }
    });

    const taglineEl = document.querySelector('[data-bind="tagline"]');
    if (taglineEl && i18n.tagline) {
      taglineEl.textContent = i18n.tagline;
    }

    const ageVal = calcAge(data.birth);
    const ageEl = document.querySelector('[data-bind="age"]');
    if (ageEl && ageVal !== null) {
      ageEl.textContent = `${ageVal} ${i18n.ageSuffix || 'years'}`;
    }

    const langLabel = document.getElementById("lang-label");
    if (langLabel) {
      langLabel.textContent = lang === "en" ? "TH" : "EN";
    }

    const activeNav = document.querySelector(".nav__links a.is-active");
    if (activeNav) moveBar(activeNav, true);
  }

  const langBtn = document.getElementById("lang-btn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const nextLang = currentLang === "en" ? "th" : "en";
      applyLanguage(nextLang);
    });
  }

  const values = { ...data };
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.dataset.bind;
    if (key !== "tagline" && key !== "age" && typeof values[key] === "string" && values[key]) {
      el.textContent = values[key];
    }
  });

  if (data.email && data.email.user && data.email.domain) {
    const address = data.email.user + "@" + data.email.domain;
    const link = document.querySelector("[data-mail]");
    const text = document.querySelector("[data-mail-text]");
    if (link && text) {
      link.setAttribute("href", "mailto:" + address);
      text.textContent = address;
    }
  }

  const copyBtn = document.querySelector("[data-copy]");
  if (copyBtn && data.email && data.email.user && navigator.clipboard && window.isSecureContext) {
    const address = data.email.user + "@" + data.email.domain;
    let timer;
    copyBtn.hidden = false;
    copyBtn.addEventListener("click", async () => {
      const i18n = data.i18n ? data.i18n[currentLang] : {};
      let label = i18n.btnCopied || "Copied!";
      try { await navigator.clipboard.writeText(address); } catch (_) { label = "Failed"; }
      copyBtn.textContent = label;
      copyBtn.classList.toggle("is-done", label === (i18n.btnCopied || "Copied!"));
      clearTimeout(timer);
      timer = setTimeout(() => { 
        copyBtn.textContent = i18n.btnCopy || "Copy"; 
        copyBtn.classList.remove("is-done"); 
      }, 1800);
    });
  }

  const navLinks = Array.from(document.querySelectorAll(".nav__links a"));
  const bar = document.querySelector(".nav__bar");
  const sections = navLinks
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);

  let current = null;
  let lockUntil = 0;

  function moveBar(a, instant) {
    if (!bar || !a) return;
    const parent = a.parentElement.getBoundingClientRect();
    const box = a.getBoundingClientRect();
    const x = box.left - parent.left + box.width / 2 - bar.offsetWidth / 2;
    if (instant) bar.classList.add("no-anim");
    bar.style.transform = "translateX(" + x.toFixed(1) + "px)";
    if (instant) {
      bar.getBoundingClientRect();
      bar.classList.remove("no-anim");
    }
  }

  function setActive(id, instant) {
    if (id === current && !instant) return;
    current = id;
    navLinks.forEach((a) => {
      const on = a.getAttribute("href") === "#" + id;
      a.classList.toggle("is-active", on);
      if (on) {
        a.setAttribute("aria-current", "true");
        moveBar(a, instant);
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  function spy() {
    if (performance.now() < lockUntil) return;
    const line = window.innerHeight * 0.45;
    let id = sections[0].id;
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= line) id = s.id;
    }
    setActive(id);
  }

  navLinks.concat(Array.from(document.querySelectorAll('a.btn[href^="#"]'))).forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lockUntil = performance.now() + 1200;
      setActive(id);
      target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", "#" + id);
    });
  });

  if ("onscrollend" in window) {
    window.addEventListener("scrollend", () => { lockUntil = 0; spy(); });
  }

  const fadeEls = Array.from(document.querySelectorAll("[data-fade]"));
  function updateFade() {
    const vh = window.innerHeight;
    fadeEls.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, -top / (vh * 0.8)));
      el.style.setProperty("--p", p.toFixed(3));
      el.classList.toggle("is-fading", p > 0.001);
    });
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      spy();
      updateFade();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    const a = navLinks.find((l) => l.classList.contains("is-active"));
    if (a) moveBar(a, true);
    onScroll();
  });

  const init = () => { 
    lockUntil = 0; 
    applyLanguage(currentLang);
    spy(); 
    setActive(current || sections[0].id, true); 
    updateFade(); 
  };
  init();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(init);
  window.addEventListener("load", init);
})();