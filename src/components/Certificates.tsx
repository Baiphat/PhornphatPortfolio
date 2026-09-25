"use client";

import { useState } from "react";
import { certificates, type Certificate } from "@/data/certificates";
import { useLang } from "@/components/LanguageProvider";
import { ExternalLinkIcon, GradCapIcon } from "@/components/Icons";

const VISIBLE_COUNT = 3;

export function Certificates() {
  const { t } = useLang();
  const [active, setActive] = useState<Certificate | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? certificates : certificates.slice(0, VISIBLE_COUNT);
  const hasMore = certificates.length > VISIBLE_COUNT;

  return (
    <section id="certificates" className="sec certificates" aria-labelledby="certificates-title">
      <div className="stage">
        <div className="certificates__head">
          <h2 id="certificates-title" className="outline sec-title certificates__title">
            {t.certificatesTitle}
          </h2>
          <span className="certificates__badge">
            <GradCapIcon />
            {t.certificatesBadge}
          </span>
        </div>
        <p className="certificates__subtitle">{t.certificatesSubtitle}</p>

        <div className="certificates__grid">
          {visible.map((cert) => (
            <article key={cert.id} className="cert">
              <button
                type="button"
                className="cert__frame"
                onClick={() => setActive(cert)}
                aria-label={`${cert.title} — ${cert.issuer}`}
              >
                <img className="cert__img" src={cert.image} alt={cert.title} loading="lazy" />
                <span className="cert__shine" aria-hidden="true" />
              </button>

              <div className="cert__body">
                <h3 className="cert__name">{cert.title}</h3>
                <p className="cert__issuer">
                  <strong>{cert.issuer}</strong> · {cert.year}
                </p>
                <p className="cert__desc">{cert.description}</p>

                {cert.tags.length > 0 && (
                  <ul className="cert__tags">
                    {cert.tags.slice(0, 2).map((tag) => (
                      <li key={tag} className="tag">{tag}</li>
                    ))}
                    {cert.tags.length > 2 && (
                      <li className="tag tag--more">+{cert.tags.length - 2} more</li>
                    )}
                  </ul>
                )}

                {cert.verifyUrl && (
                  <a className="cert__verify" href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLinkIcon /> {t.certificatesVerify}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {hasMore && (
          <button type="button" className="certificates__more" onClick={() => setShowAll((v) => !v)}>
            {showAll ? t.certificatesShowLess : t.certificatesShowAll}
          </button>
        )}
      </div>

      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <button type="button" className="lightbox__close" aria-label="Close" onClick={() => setActive(null)}>×</button>
          <img className="lightbox__img" src={active.image} alt={active.title} onClick={(e) => e.stopPropagation()} />
          <p className="lightbox__caption">{active.title} — {active.issuer} ({active.year})</p>
        </div>
      )}
    </section>
  );
}