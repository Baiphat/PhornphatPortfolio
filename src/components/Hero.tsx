"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { messages } from "@/lib/i18n";
import { d } from "@/lib/d";

export function Hero() {
  const { language } = useLanguage();
  const t = messages[language];

  return (
    <section id="home" className="hero">
      <div className="wrap hero-in">
        <div>
          <p className="hi rise" style={d(".05s")}>{t.hero.greeting}</p>
          <h1 className="grad rise" style={d(".15s")}>Phornphat</h1>
          <p className="lead rise" style={d(".3s")}>{t.hero.lead}</p>
          <div className="hero-actions rise" style={d(".4s")}>
            <a className="btn shine hero-project-link" href="#work">
              <span className="hero-project-label">{t.hero.featuredProject}</span>
            </a>
          </div>
          <div className="win stats rise" style={d(".45s")}>
            <div className="wbar"><span className="dots"><i /><i /><i /></span></div>
            <div className="stat-row">
              {t.hero.stats.map((label, index) => (
                <div key={index}><b data-count={[10, 2, 5][index]}>0+</b><span>{label}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="photo rise" style={d(".3s")}>
          <div className="disc" />
          <div className="cut"><img src="/assets/img/hero.png" alt="Phornphat" /></div>
        </div>
      </div>
    </section>
  );
}
