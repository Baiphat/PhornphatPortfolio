"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { messages } from "@/lib/i18n";
import { d } from "@/lib/d";
import { CertificateGallery } from "./CertificateGallery";

export function Certificates() {
  const { language } = useLanguage();
  const t = messages[language];

  return (
    <section id="certificates" className="sec">
      <div className="wrap">
        <h2 className="grad rv">{t.certificates.title}</h2>
        <p className="sub rv" style={d(".08s")}>{t.certificates.subtitle}</p>
        <CertificateGallery />
      </div>
    </section>
  );
}
