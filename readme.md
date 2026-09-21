# Phornphat Portfolio (Next.js + TypeScript + Tailwind CSS)

เว็บแนะนำตัวหน้าเดียว ย้ายมาจากเวอร์ชัน HTML/CSS/JS เดิม หน้าตาและพฤติกรรมเหมือนเดิมทุกอย่าง
(สลับภาษา EN/TH, แถบเมนูเลื่อน, ดาวร่วง, การ์ด, ปุ่ม Copy, About เบลอตอนเลื่อนผ่าน)

## เริ่มใช้งาน
ต้องมี [Node.js](https://nodejs.org) 20.9 ขึ้นไป

```bash
npm install
npm run dev        # เปิด http://localhost:3000
npm run build      # ทดสอบ build + เช็ก TypeScript ก่อนขึ้นเว็บ
```

## แก้ข้อมูลตรงไหน
| อยากแก้ | ไฟล์ |
|---|---|
| ชื่อ, ชื่อเล่น, โรงเรียน, ปี/เดือนเกิด (คำนวณอายุ), IG, อีเมล | `src/data/site.ts` |
| ข้อความ EN/TH ทั้งหมด (เมนู, คำแนะนำตัว, ปุ่ม) | `src/data/i18n.ts` |
| รายการทักษะ/ไอคอน | `src/data/skills.ts` |
| รูป, ไอคอน | `public/assets/` |
| สี, ระยะ, แอนิเมชัน (สไตล์เดิมทั้งหมด) | `src/app/globals.css` |

## โครงสร้าง
```
src/
  app/          layout.tsx (ฟอนต์, metadata, โครงหน้า) · page.tsx · globals.css
  components/   Nav, Hero, About, Skills, Contact, Footer, StarField, LanguageProvider ...
  data/         site.ts · i18n.ts · skills.ts
  hooks/        useScrollSpy.ts · useScrollFade.ts
  lib/          age.ts · scroll.ts
  fonts/        LINE Seed Sans TH (โหลดผ่าน next/font จากโดเมนตัวเอง)
  proxy.ts      Content-Security-Policy แบบ nonce
next.config.ts  security headers อื่น ๆ
```

## Tailwind ใช้ยังไงในโปรเจกต์นี้
- ติดตั้ง Tailwind v4 แล้ว (`@tailwindcss/postcss`) และตั้ง token สีไว้ใน `@theme` ของ `globals.css`
  (`bg-navy-deep`, `text-navy`, `text-brand` ฯลฯ)
- **ปิด preflight** (reset ของ Tailwind) ไว้ เพราะ CSS เดิมมี reset ของตัวเอง ทำให้หน้าตาเหมือนเว็บเดิมทุกพิกเซล
  อยากเปิดให้เปลี่ยนสองบรรทัด `@import "tailwindcss/theme.css"` และ `.../utilities.css` เป็น `@import "tailwindcss";`
- `Footer` และลิงก์ "Skip to content" เขียนด้วย Tailwind utility ล้วน ส่วนที่เหลือยังเป็น class CSS เดิม
  (ระบบสเกล `--u` ของดีไซน์ 1920px และเอฟเฟกต์กระจก) แนะนำให้ย้ายทีละคอมโพเนนต์เมื่อพร้อม
  เพื่อไม่ให้หน้าตาเพี้ยนโดยไม่รู้ตัว

## ความปลอดภัย
- `src/proxy.ts` ตั้ง CSP แบบ nonce (สคริปต์ที่ไม่มี nonce ตรงกันจะถูกบล็อก) — Next.js 15 ให้เปลี่ยนชื่อไฟล์เป็น `middleware.ts` และชื่อฟังก์ชันเป็น `middleware`
- `layout.tsx` เรียก `await connection()` เพื่อให้หน้าเรนเดอร์ใหม่ทุกครั้ง (จำเป็นสำหรับ nonce)
- **อย่าใส่ `style={{...}}` ใน JSX** เพราะ CSP บล็อก inline style ให้ใช้ class (Tailwind หรือ CSS) แทน
- ไม่ใช้ `next/image` โดยตั้งใจ (มันใส่ inline style) รูปทั้งหมดใช้ `<img>` ธรรมดา และเป็น WebP อยู่แล้ว
- อีเมลถูกประกอบหลังหน้าโหลดบนเบราว์เซอร์ (`[at]` `[dot]` ก่อน) ลดการโดนบอทเก็บ
- เปิด Dependabot ใน GitHub (Settings → Advanced Security) ให้เตือนเมื่อแพ็กเกจมีช่องโหว่
- ตรวจผลที่ https://securityheaders.com

## ขึ้นเว็บด้วย Vercel
1. Vercel → โปรเจกต์ → Settings → Build and Deployment → **Framework Preset = Next.js**
   (ถ้าเคยตั้งเป็น Other ต้องเปลี่ยน) และปิด override ของ Output Directory / Build Command
2. ลบ `vercel.json` เก่า (header ตั้งใน `next.config.ts` และ `src/proxy.ts` แล้ว)
3. push ขึ้น GitHub — Vercel build ให้เอง
