"use client";

import { useEffect, useRef, useState } from "react";
import { certificates, localizeCertificate } from "@/data/certificates";
import { useLanguage } from "@/components/LanguageProvider";
import { messages } from "@/lib/i18n";
import { d } from "@/lib/d";

export function CertificateGallery() {
  const { language } = useLanguage();
  const t = messages[language];
  const [showAll, setShowAll] = useState(false);
  const [hasShownMore, setHasShownMore] = useState(false);
  const [expandedTagCertificates, setExpandedTagCertificates] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = activeIndex !== null;
  const activeCertificate = activeIndex === null ? null : certificates[activeIndex];
  const activeContent = activeCertificate ? localizeCertificate(activeCertificate, language) : null;
  const featuredCertificate = certificates.find((certificate) => certificate.featured);
  const featuredContent = featuredCertificate ? localizeCertificate(featuredCertificate, language) : null;
  const featuredIndex = featuredCertificate ? certificates.indexOf(featuredCertificate) : -1;
  const galleryCertificates = certificates.filter((certificate) => certificate.id !== featuredCertificate?.id);
  const initialGalleryCount = featuredCertificate ? 5 : 6;
  const visibleCertificates = showAll ? galleryCertificates : galleryCertificates.slice(0, initialGalleryCount);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowRight") {
        setActiveIndex((current) => current === null ? current : (current + 1) % certificates.length);
        setZoom(1);
        setRotation(0);
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((current) => current === null ? current : (current - 1 + certificates.length) % certificates.length);
        setZoom(1);
        setRotation(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen]);

  const openViewer = (index: number) => {
    setZoom(1);
    setRotation(0);
    setActiveIndex(index);
  };

  const navigate = (direction: number) => {
    setActiveIndex((current) => current === null ? current : (current + direction + certificates.length) % certificates.length);
    setZoom(1);
    setRotation(0);
  };

  return (
    <>
      {featuredCertificate && featuredContent && (
        <article className="wfeatured cert-featured spot pop">
          <div className="wfeatured-media">
            <button className="cert-featured-image" type="button" onClick={() => openViewer(featuredIndex)} aria-label={`${t.certificates.view}: ${featuredContent.title}`}>
              <img src={featuredCertificate.image} alt={featuredContent.title} loading="lazy" />
            </button>
          </div>
          <div className="wfeatured-content">
            <span className="wfeatured-kicker">{t.certificates.featured} · {featuredCertificate.year}</span>
            <h3>{featuredContent.title}</h3>
            <p>{featuredContent.issuer}</p>
            <p>{featuredContent.description}</p>
            {featuredContent.tags.length > 0 && (
              <p className="wfeatured-tags">{featuredContent.tags.join(" · ")}</p>
            )}
            <div className="wfeatured-links">
              <button className="project-action" type="button" onClick={() => openViewer(featuredIndex)}>{t.certificates.view}</button>
              {featuredCertificate.verifyUrl && (
                <a href={featuredCertificate.verifyUrl} target="_blank" rel="noopener noreferrer">{t.certificates.verify} ↗</a>
              )}
            </div>
          </div>
        </article>
      )}
      <div className="grid" id="certificate-grid">
        {visibleCertificates.map((certificate, index) => {
          const certificateIndex = certificates.indexOf(certificate);
          const content = localizeCertificate(certificate, language);
          const tagsExpanded = expandedTagCertificates.includes(certificate.id);
          const visibleTags = tagsExpanded ? content.tags : content.tags.slice(0, 2);

          return (
            <article key={certificate.id} className={`card spot rv${hasShownMore ? " in" : ""}`} style={d(`${index * 0.1}s`)}>
              <div className="cimg">
                <button className="cimg-button" type="button" onClick={() => openViewer(certificateIndex)} aria-label={`${t.certificates.view}: ${content.title}`}>
                  <img src={certificate.image} alt={content.title} loading="lazy" />
                </button>
              </div>
              <div className="cbody">
                <h3>{content.title}</h3>
                <p className="meta">{content.issuer} · {certificate.year}</p>
                <p className="desc">{content.description}</p>
                <div className="tags" id={`certificate-tags-${certificate.id}`}>
                  {visibleTags.map((tag) => <span key={tag}>{tag}</span>)}
                  {content.tags.length > 2 && (
                    <button
                      className="tag-toggle"
                      type="button"
                      aria-expanded={tagsExpanded}
                      aria-controls={`certificate-tags-${certificate.id}`}
                      onClick={() => setExpandedTagCertificates((current) => tagsExpanded ? current.filter((id) => id !== certificate.id) : [...current, certificate.id])}
                    >
                      {tagsExpanded ? t.certificates.tagsLess : `+${content.tags.length - 2} ${t.certificates.tagsMore}`}
                    </button>
                  )}
                </div>
                {certificate.verifyUrl && (
                  <a className="btn sm shine verify-link" href={certificate.verifyUrl} target="_blank" rel="noopener noreferrer">
                    {t.certificates.verify} <span className="verify-icon" aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {galleryCertificates.length > initialGalleryCount && (
        <button
          className="btn shine certificate-more"
          type="button"
          aria-expanded={showAll}
          aria-controls="certificate-grid"
          onClick={() => {
            setShowAll((current) => !current);
            setHasShownMore(true);
          }}
        >
          {showAll ? t.certificates.less : t.certificates.more}
        </button>
      )}

      {activeCertificate && activeIndex !== null && activeContent && (
        <div
          className="cert-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={activeContent.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <div className="cert-viewer-header">
            <strong>{activeContent.title}</strong>
            <span>{activeIndex + 1} / {certificates.length}</span>
          </div>
          <button ref={closeButtonRef} className="cert-viewer-close" type="button" onClick={() => setActiveIndex(null)} aria-label={t.certificates.close}>×</button>

          <div className="cert-viewer-content">
            <button className="cert-viewer-nav" type="button" onClick={() => navigate(-1)} aria-label={t.certificates.previous}>‹</button>
            <div className="cert-viewer-stage">
              <img
                src={activeCertificate.image}
                alt={activeContent.title}
                style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
              />
            </div>
            <button className="cert-viewer-nav" type="button" onClick={() => navigate(1)} aria-label={t.certificates.next}>›</button>
          </div>

          <div className="cert-viewer-toolbar" aria-label={t.certificates.toolbar}>
            <button className="cert-viewer-control" type="button" onClick={() => setZoom((current) => Math.max(.5, current - .25))} disabled={zoom <= .5} aria-label={t.certificates.zoomOut}>−</button>
            <span className="cert-viewer-zoom" aria-live="polite">{Math.round(zoom * 100)}%</span>
            <button className="cert-viewer-control" type="button" onClick={() => setZoom((current) => Math.min(3, current + .25))} disabled={zoom >= 3} aria-label={t.certificates.zoomIn}>+</button>
            <span className="cert-viewer-separator" aria-hidden="true" />
            <button className="cert-viewer-control" type="button" onClick={() => { setZoom(1); setRotation(0); }} aria-label={t.certificates.reset}>↺</button>
            <button className="cert-viewer-control" type="button" onClick={() => setRotation((current) => (current + 90) % 360)} aria-label={t.certificates.rotate}>⟳</button>
            <a className="cert-viewer-control" href={activeCertificate.image} download={`certificate-${activeCertificate.id}.png`} aria-label={t.certificates.download}>↓</a>
            {activeCertificate.verifyUrl && (
              <>
                <span className="cert-viewer-separator" aria-hidden="true" />
                <a className="cert-viewer-verify" href={activeCertificate.verifyUrl} target="_blank" rel="noopener noreferrer">{t.certificates.verify} ↗</a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}