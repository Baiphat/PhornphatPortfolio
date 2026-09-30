"use client";

import { useEffect, useRef, useState } from "react";
import { certificates } from "@/data/certificates";
import { d } from "@/lib/d";

export function CertificateGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = activeIndex !== null;
  const activeCertificate = activeIndex === null ? null : certificates[activeIndex];

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
      <div className="grid">
        {certificates.map((certificate, index) => (
          <article key={certificate.id} className="card spot rv" style={d(`${index * 0.1}s`)}>
            <div className="cimg">
              <button className="cimg-button" type="button" onClick={() => openViewer(index)} aria-label={`View certificate: ${certificate.title}`}>
                <img src={certificate.image} alt={certificate.title} loading="lazy" />
              </button>
            </div>
            <div className="cbody">
              <h3>{certificate.title}</h3>
              <p className="meta">{certificate.issuer} · {certificate.year}</p>
              <p className="desc">{certificate.description}</p>
              <div className="tags">
                {certificate.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
                {certificate.tags.length > 2 && <span>+{certificate.tags.length - 2} more</span>}
              </div>
              {certificate.verifyUrl && (
                <a className="btn sm shine verify-link" href={certificate.verifyUrl} target="_blank" rel="noopener noreferrer">
                  Verify <span className="verify-icon" aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {activeCertificate && activeIndex !== null && (
        <div
          className="cert-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={activeCertificate.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <div className="cert-viewer-header">
            <strong>{activeCertificate.title}</strong>
            <span>{activeIndex + 1} of {certificates.length}</span>
          </div>
          <button ref={closeButtonRef} className="cert-viewer-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Close certificate viewer">×</button>

          <div className="cert-viewer-content">
            <button className="cert-viewer-nav" type="button" onClick={() => navigate(-1)} aria-label="Previous certificate">‹</button>
            <div className="cert-viewer-stage">
              <img
                src={activeCertificate.image}
                alt={activeCertificate.title}
                style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
              />
            </div>
            <button className="cert-viewer-nav" type="button" onClick={() => navigate(1)} aria-label="Next certificate">›</button>
          </div>

          <div className="cert-viewer-toolbar" aria-label="Certificate image controls">
            <button className="cert-viewer-control" type="button" onClick={() => setZoom((current) => Math.max(.5, current - .25))} disabled={zoom <= .5} aria-label="Zoom out">−</button>
            <span className="cert-viewer-zoom" aria-live="polite">{Math.round(zoom * 100)}%</span>
            <button className="cert-viewer-control" type="button" onClick={() => setZoom((current) => Math.min(3, current + .25))} disabled={zoom >= 3} aria-label="Zoom in">+</button>
            <span className="cert-viewer-separator" aria-hidden="true" />
            <button className="cert-viewer-control" type="button" onClick={() => { setZoom(1); setRotation(0); }} aria-label="Reset image">↺</button>
            <button className="cert-viewer-control" type="button" onClick={() => setRotation((current) => (current + 90) % 360)} aria-label="Rotate clockwise">⟳</button>
            <a className="cert-viewer-control" href={activeCertificate.image} download={`certificate-${activeCertificate.id}.png`} aria-label="Download certificate">↓</a>
            {activeCertificate.verifyUrl && (
              <>
                <span className="cert-viewer-separator" aria-hidden="true" />
                <a className="cert-viewer-verify" href={activeCertificate.verifyUrl} target="_blank" rel="noopener noreferrer">Verify ↗</a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}