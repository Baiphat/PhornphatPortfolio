"use client";

import { useLang } from "@/components/LanguageProvider";
import { site } from "@/data/site";
import { goTo } from "@/lib/scroll";

export function Hero() {
  const { t } = useLang();

  return (
    <section id="home" className="sec hero" aria-labelledby="hero-title">
      <div className="stage">
        <div className="hero__text">
          <h1 id="hero-title" className="hero__title">
            <span className="outline hero__hello">{t.heroHello}</span>
            <span className="hero__name">{site.firstName}</span>
          </h1>
          <p className="hero__lead">{t.tagline}</p>
          <div className="hero__actions">
            <a className="btn" href="#about" onClick={goTo("about")}>
              {t.btnAbout}
            </a>
            <a className="btn" href="#contact" onClick={goTo("contact")}>
              {t.btnContact}
            </a>
          </div>
        </div>
        <img
          className="hero__photo"
          src="/assets/img/home.webp"
          width={613}
          height={727}
          alt="Phornphat holding a trophy and wearing a 10K mini-marathon medal"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
