"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { messages } from "@/lib/i18n";
import { d } from "@/lib/d";
import { Win } from "./Win";

export function About() {
  const { language } = useLanguage();
  const t = messages[language];

  return (
    <section id="about" className="sec about">
      <div className="wrap about-in">
        <div className="photo rv">
          <div className="disc" />
          <div className="cut"><img src="/assets/img/about.png" alt="Phornphat" loading="lazy" /></div>
        </div>
        <div>
          <h2 className="grad rv">{t.about.title}</h2>
          <p className="sub rv" style={d(".08s")}>{t.about.subtitle}</p>
          <div className="about-grid">
            <Win title={t.about.name} className="full" style={d(".1s")}><p className="val">Phornphat Lepkhrut</p></Win>
            <Win title={t.about.nickname} style={d(".18s")}><p className="val">Phat</p></Win>
            <Win title={t.about.birthday} right={t.about.dateFormat} style={d(".24s")}><p className="val">{t.about.birthdayValue}</p></Win>
            <Win title={t.about.education} className="education" style={d(".3s")}><p className="val sm">{t.about.schoolName}</p></Win>
            <Win title={t.about.location} style={d(".36s")}><p className="val">{t.about.locationValue}</p></Win>
          </div>
        </div>
      </div>
      <div className="wrap journey-wrap">
        <div className="journey-head rv">
          <p className="journey-kicker">{t.about.journeyKicker}</p>
          <h3>{t.about.journeyTitle}</h3>
          <p>{t.about.journeyIntro}</p>
        </div>
        <div className="journey-list">
          {t.about.journeySteps.map((step, index) => (
            <article key={index} className="journey-step rv" style={d(`${(index + 1) * 0.08}s`)}>
              <span className="journey-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="journey-step-copy">
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
