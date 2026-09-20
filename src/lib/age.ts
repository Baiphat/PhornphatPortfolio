import type { SiteData } from "@/data/site";

/** คำนวณอายุจากปี/เดือน(/วัน)เกิด ถ้าไม่ใส่ day อายุจะเปลี่ยนวันที่ 1 ของเดือนเกิด */
export function calcAge(birth: SiteData["birth"], now: Date = new Date()): number {
  let age = now.getFullYear() - birth.year;
  const month = now.getMonth() + 1;
  const passed = birth.day
    ? month > birth.month || (month === birth.month && now.getDate() >= birth.day)
    : month >= birth.month;
  if (!passed) age -= 1;
  return age;
}
