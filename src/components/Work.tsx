"use client";
import { useState } from "react";
import { d } from "@/lib/d";
import { localizeProject, projects } from "@/data/projects";
import { useLanguage } from "@/components/LanguageProvider";
import { messages } from "@/lib/i18n";

export function Work() {
  const { language } = useLanguage();
  const t = messages[language];
  const [f, setF] = useState("All");
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);
  const cats = ["All", ...new Set(projects.map((project) => project.cat))];
  const list = projects.filter((p) => f === "All" || p.cat === f);
  const featuredProject = list.find((project) => project.featured);
  const featuredContent = featuredProject ? localizeProject(featuredProject, language) : null;
  const cardProjects = list.filter((project) => project.id !== featuredProject?.id);
  const categoryLabel = (category: string) => {
    if (category === "All") return t.work.all;
    if (category === "Website") return t.work.website;
    if (category === "Project") return t.work.project;
    return t.work.school;
  };

  return (
    <section id="work" className="sec">
      <div className="wrap">
        <h2 className="grad rv">{t.work.title}</h2>
        <p className="sub rv" style={d(".08s")}>{t.work.subtitle}</p>
        <div className="chips rv" style={d(".14s")} role="tablist">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={f === c} className={f === c ? "on" : ""} onClick={() => setF(c)}>{categoryLabel(c)}</button>
          ))}
        </div>
        {featuredProject && featuredContent && (
          <article className="wfeatured spot pop">
            <div className="wfeatured-media">
              {featuredProject.video ? (
                <video src={featuredProject.video} poster={featuredProject.image} autoPlay muted loop playsInline preload="metadata" aria-label={`${t.work.preview}: ${featuredContent.name}`} />
              ) : featuredProject.image ? (
                <img src={featuredProject.image} alt={featuredContent.name} loading="lazy" />
              ) : null}
            </div>
            <div className="wfeatured-content">
              <span className="wfeatured-kicker">{t.work.featured} · {featuredContent.cat}</span>
              <h3>{featuredContent.name}</h3>
              {featuredContent.description && <p>{featuredContent.description}</p>}
              {featuredContent.role && <p><strong>{t.work.role}</strong> {featuredContent.role}</p>}
              {featuredContent.result && <p><strong>{t.work.result}</strong> {featuredContent.result}</p>}
              {featuredContent.contributions && featuredContent.contributions.length > 0 && (
                <p><strong>{t.work.contributions}</strong> {featuredContent.contributions.join(" · ")}</p>
              )}
              {featuredContent.tags && featuredContent.tags.length > 0 && (
                <p className="wfeatured-tags">{featuredContent.tags.join(" · ")}</p>
              )}
              {featuredContent.contributors && featuredContent.contributors.length > 0 && (
                <div className="wfeatured-contributors" aria-label={t.work.contributors}>
                  {featuredContent.contributors.map((person) => (
                    <a key={person.instagramUrl} href={person.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t.work.instagramProfile} ${person.name}`}>
                      <img src="/assets/icons/instagram-2-1-logo-svgrepo-com.svg" alt="" loading="lazy" />
                      {person.name}
                    </a>
                  ))}
                </div>
              )}
              <div className="wfeatured-links">
                {(featuredProject.demoUrl ?? featuredProject.href) && (
                  <a className="project-action" href={featuredProject.demoUrl ?? featuredProject.href} target="_blank" rel="noopener noreferrer">
                    <span className="project-action-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 4h6v6" />
                        <path d="M20 4 10 14" />
                        <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
                      </svg>
                    </span>{featuredContent.linkLabel ?? t.work.openProject}
                  </a>
                )}
                {featuredProject.sourceUrl && (
                  <a className="project-action" href={featuredProject.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <span className="project-action-icon is-code" aria-hidden="true">&lt;/&gt;</span>{t.work.sourceCode}
                  </a>
                )}
              </div>
            </div>
          </article>
        )}
        <div className="grid work-grid" key={f}>
          {cardProjects.map((p, i) => {
            const content = localizeProject(p, language);
            const isExpanded = expandedProjects.includes(p.id);
            const hasMoreDetails = Boolean(content.description || content.tags?.length || content.role || content.contributions?.length || content.contributors?.length);

            return (
              <article key={p.id} className="wcard spot pop" style={d(`${i * 0.08}s`)}>
                <div className="wmedia-frame">
                  {p.video ? (
                    <video className="wmedia" src={p.video} poster={p.image} autoPlay muted loop playsInline preload="metadata" aria-label={`${t.work.preview}: ${content.name}`} />
                  ) : p.image ? (
                    <img className="wmedia" src={p.image} alt={content.name} loading="lazy" />
                  ) : null}
                </div>
                <a className="wproject-link" href={p.href ?? "#work"} aria-label={`${t.work.viewProject}: ${content.name}`} />
                <div className="wlabel">
                  <span className="wcategory">{content.cat}</span>
                  <span className="wtitle">{content.name}</span>
                  {content.description && <span className={`wdescription${isExpanded ? " is-expanded" : ""}`}>{content.description}</span>}
                  {(p.demoUrl ?? p.href) || p.sourceUrl ? (
                    <span className="wproject-actions">
                      {(p.demoUrl ?? p.href) && (
                        <a className="project-action" href={p.demoUrl ?? p.href} target="_blank" rel="noopener noreferrer">
                          <span className="project-action-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 4h6v6" />
                              <path d="M20 4 10 14" />
                              <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
                            </svg>
                          </span>{content.linkLabel ?? t.work.openProject}
                        </a>
                      )}
                      {p.sourceUrl && (
                        <a className="project-action" href={p.sourceUrl} target="_blank" rel="noopener noreferrer">
                          <span className="project-action-icon is-code" aria-hidden="true">&lt;/&gt;</span>{t.work.sourceCode}
                        </a>
                      )}
                    </span>
                  ) : null}
                  {hasMoreDetails && (
                    <button
                      className="wdetails-toggle"
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => setExpandedProjects((current) => isExpanded ? current.filter((id) => id !== p.id) : [...current, p.id])}
                    >
                      {isExpanded ? t.work.seeLess : t.work.seeMore}
                      <span className="wdetails-chevron" aria-hidden="true" />
                    </button>
                  )}
                  {isExpanded && (
                    <div className="wdetails">
                      {content.tags && content.tags.length > 0 && <span className="wtags">{content.tags.join(" · ")}</span>}
                      {content.role && <span className="wrole">{t.work.role}: {content.role}</span>}
                      {content.contributions && content.contributions.length > 0 && (
                        <span className="wcontributions">{t.work.contributions}: {content.contributions.join(" · ")}</span>
                      )}
                      {content.contributors && content.contributors.length > 0 && (
                        <span className="wcontributors" aria-label={t.work.contributors}>
                          {content.contributors.map((person) => (
                            <a key={person.instagramUrl} className="wcontributor" href={person.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t.work.instagramProfile} ${person.name}`}>
                              <img src="/assets/icons/instagram-2-1-logo-svgrepo-com.svg" alt="" loading="lazy" />
                              <span>{person.name}</span>
                            </a>
                          ))}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
