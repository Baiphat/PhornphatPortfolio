/*
  ข้อมูลส่วนตัวของเว็บ — แก้ที่ไฟล์นี้ (ชื่อ, ชื่อเล่น, โรงเรียน, ปีเดือนเกิด, IG, อีเมล)
  ข้อความสองภาษา (EN/TH) อยู่ที่ src/data/i18n.ts
*/
export interface SiteData {
  firstName: string;
  fullName: string;
  nickname: string;
  education: string;
  /** ใช้คำนวณอายุอัตโนมัติ (ปี ค.ศ.) ใส่ day เฉพาะเมื่ออยากให้อายุเปลี่ยนตรงวันเกิดเป๊ะ */
  birth: { year: number; month: number; day?: number };
  instagram: { handle: string; url: string };
  /** แยกอีเมลเป็น 2 ส่วน เพื่อลดโอกาสโดนบอทเก็บไปส่งสแปม */
  email: { user: string; domain: string };
}

export const site: SiteData = {
  firstName: "Phornphat",
  fullName: "Phornphat Lepkhrut",
  nickname: "Phat",
  education: "Nawamin Triamnom",
  birth: { year: 2010, month: 10 },
  instagram: {
    handle: "@nxbulapp_",
    url: "https://www.instagram.com/nxbulapp_/",
  },
  email: { user: "Phatengkub", domain: "gmail.com" },
};
