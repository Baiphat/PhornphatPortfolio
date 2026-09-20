"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { site } from "@/data/site";

type CopyState = "idle" | "done" | "failed";

const address = `${site.email.user}@${site.email.domain}`;
// ข้อความที่เซิร์ฟเวอร์ส่งให้ก่อน (ยังไม่ใช่อีเมลจริง) — อีเมลจริงจะประกอบหลังหน้าเว็บโหลดบนเบราว์เซอร์
const maskedAddress = `${site.email.user} [at] ${site.email.domain.replace(".", " [dot] ")}`;

export function Contact() {
  const { t } = useLang();
  const [mail, setMail] = useState<string | null>(null);
  const [canCopy, setCanCopy] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setMail(address);
    setCanCopy(Boolean(navigator.clipboard) && window.isSecureContext);
    return () => clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    let next: CopyState = "done";
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      next = "failed";
    }
    setCopyState(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState("idle"), 1800);
  };

  const copyLabel =
    copyState === "done" ? t.btnCopied : copyState === "failed" ? t.btnCopyFailed : t.btnCopy;

  return (
    <section id="contact" className="sec contact" aria-labelledby="contact-title">
      <div className="stage">
        <h2 id="contact-title" className="outline sec-title contact__title">
          {t.contactTitle}
        </h2>

        <div className="contact__panel">
          <div className="contact__cards">
            {/* Instagram */}
            <article className="link-card">
              <div className="link-card__icon-box">
                <img
                  className="link-card__icon"
                  src="/assets/icons/instagram.svg"
                  width={32}
                  height={32}
                  alt="Instagram"
                />
              </div>
              <div className="link-card__body">
                <span className="link-card__label">Instagram</span>
                <a
                  className="link-card__value"
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.instagram.handle}
                </a>
              </div>
            </article>

            {/* Email */}
            <article className="link-card">
              <div className="link-card__top-row">
                <div className="link-card__icon-box">
                  <img
                    className="link-card__icon link-card__icon--mail"
                    src="/assets/icons/gmail.svg"
                    width={32}
                    height={26}
                    alt="Gmail"
                  />
                </div>
                {canCopy && (
                  <button
                    type="button"
                    className={copyState === "done" ? "copy is-done" : "copy"}
                    aria-live="polite"
                    onClick={copy}
                  >
                    {copyLabel}
                  </button>
                )}
              </div>
              <div className="link-card__body">
                <span className="link-card__label">Email</span>
                <p className="link-card__value">{mail ?? maskedAddress}</p>
                <a className="sr-only" href={mail ? `mailto:${mail}` : "#contact"}>
                  Email
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
