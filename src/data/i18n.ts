/*
  ข้อความ 2 ภาษา — เพิ่ม/แก้ข้อความที่นี่
  ถ้าเพิ่ม key ใน en แล้วลืมเพิ่มใน th TypeScript จะแจ้ง error ให้ทันที
*/
export const LANGS = ["en", "th"] as const;
export type Lang = (typeof LANGS)[number];

const en = {
  navHome: "Home",
  navAbout: "About me",
  navSkills: "Skills",
  navContact: "Contact",
  heroHello: "Hello, I’m",
  tagline:
    "A Web UX/UI & Graphic Designer crafting seamless digital experiences and visually compelling solutions",
  btnAbout: "About me",
  btnContact: "Contact",
  aboutTitle: "About me",
  labelName: "Name :",
  labelNickname: "Nickname :",
  labelAge: "Age :",
  labelEducation: "Education :",
  skillsTitle: "Skills",
  contactTitle: "Contact",
  btnCopy: "Copy",
  btnCopied: "Copied!",
  btnCopyFailed: "Failed",
  footerSub: "I LOVE CLAUDE",
  ageSuffix: "years",
};

export type MessageKey = keyof typeof en;
export type Messages = Record<MessageKey, string>;

const th: Messages = {
  navHome: "หน้าแรก",
  navAbout: "เกี่ยวกับฉัน",
  navSkills: "ทักษะ",
  navContact: "ติดต่อ",
  heroHello: "สวัสดีครับ, ผม",
  tagline:
    "นักออกแบบ Web UX/UI & Graphic Design ผู้สร้างสรรค์ประสบการณ์ดิจิทัลที่ลื่นไหล พร้อมโซลูชันงานดีไซน์ที่โดดเด่นสะดุดตา",
  btnAbout: "เกี่ยวกับฉัน",
  btnContact: "ติดต่อฉัน",
  aboutTitle: "เกี่ยวกับฉัน",
  labelName: "ชื่อ :",
  labelNickname: "ชื่อเล่น :",
  labelAge: "อายุ :",
  labelEducation: "โรงเรียน :",
  skillsTitle: "ทักษะ",
  contactTitle: "ช่องทางติดต่อ",
  btnCopy: "คัดลอก",
  btnCopied: "คัดลอกแล้ว!",
  btnCopyFailed: "ไม่สำเร็จ",
  footerSub: "ออกแบบและพัฒนาด้วยความตั้งใจ",
  ageSuffix: "ปี",
};

export const messages: Record<Lang, Messages> = { en, th };
