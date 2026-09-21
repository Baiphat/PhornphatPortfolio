"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { messages, type Lang, type Messages } from "@/data/i18n";

const STORAGE_KEY = "site_lang";

interface LanguageContextValue {
  lang: Lang;
  t: Messages;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // เริ่มที่ EN เสมอ (ตรงกับ HTML ที่เซิร์ฟเวอร์ส่งมา) แล้วค่อยอ่านค่าที่เคยเลือกไว้หลังโหลดเสร็จ
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "th") setLang(saved);
    } catch {
      /* ถ้าอ่าน localStorage ไม่ได้ (เช่นโหมดส่วนตัวบางแบบ) ก็ใช้ EN ต่อไป */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    const next: Lang = lang === "en" ? "th" : "en";
    setLang(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ไม่เป็นไร แค่จะไม่จำภาษาไว้ */
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: messages[lang], toggle }),
    [lang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang ต้องใช้ภายใน <LanguageProvider>");
  return ctx;
}
