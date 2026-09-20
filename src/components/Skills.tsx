"use client";

import { CategoryBadgeIcon } from "@/components/Icons";
import { useLang } from "@/components/LanguageProvider";
import { skillCategories } from "@/data/skills";

export function Skills() {
  const { t } = useLang();

  return (
    <section id="skills" className="sec skills" aria-labelledby="skills-title">
      <div className="stage">
        <h2 id="skills-title" className="outline sec-title skills__title">
          {t.skillsTitle}
        </h2>

        <div className="skills__grid">
          {skillCategories.map((category) => (
            <article key={category.id} className="skills-card">
              <div className="skills-card__header">
                <div className="skills-card__icon-badge">
                  <CategoryBadgeIcon name={category.icon} />
                </div>
                <h3 className="skills-card__title">{category.title}</h3>
              </div>

              <ul className="skills-card__list">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="skill-item">
                    <div className="skill-item__icon">
                      <img src={skill.icon} width={skill.size} height={skill.size} alt={skill.alt} />
                    </div>
                    <div className="skill-item__info">
                      <span className="skill-item__name">{skill.name}</span>
                      <span className="skill-item__tag">{skill.tag}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
