"use client";

import type { ReactNode } from "react";
import { CalendarIcon, GradCapIcon, NicknameIcon, UserIcon } from "@/components/Icons";
import { useLang } from "@/components/LanguageProvider";
import { site } from "@/data/site";
import { useScrollFade } from "@/hooks/useScrollFade";
import { calcAge } from "@/lib/age";

interface InfoCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div className="info-card">
      <div className="info-card__icon">{icon}</div>
      <div className="info-card__content">
        <span className="info-card__label">{label}</span>
        {/* อายุขึ้นกับเวลาปัจจุบัน จึงอาจต่างกันเล็กน้อยระหว่างเซิร์ฟเวอร์กับเบราว์เซอร์ */}
        <p className="info-card__value" suppressHydrationWarning>
          {value}
        </p>
      </div>
    </div>
  );
}

export function About() {
  const { t } = useLang();
  const ref = useScrollFade<HTMLElement>();
  const age = calcAge(site.birth);

  return (
    <section id="about" ref={ref} className="sec about" aria-labelledby="about-title">
      <div className="stage">
        <h2 id="about-title" className="outline sec-title about__title">
          {t.aboutTitle}
        </h2>

        <div className="about__container">
          <div className="about__grid about__grid--left">
            <InfoCard icon={<UserIcon />} label={t.labelName} value={site.fullName} />
            <InfoCard icon={<NicknameIcon />} label={t.labelNickname} value={site.nickname} />
          </div>

          <div className="about__hero">
            <div className="about__photo-glow" />
            <img
              className="about__photo"
              src="/assets/img/about.webp"
              width={426}
              height={553}
              alt="Phornphat Lepkhrut"
            />
          </div>

          <div className="about__grid about__grid--right">
            <InfoCard icon={<CalendarIcon />} label={t.labelAge} value={`${age} ${t.ageSuffix}`} />
            <InfoCard icon={<GradCapIcon />} label={t.labelEducation} value={site.education} />
          </div>
        </div>
      </div>
    </section>
  );
}
