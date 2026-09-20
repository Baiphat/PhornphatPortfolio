# Phornphat — เว็บแนะนำตัว

เว็บ HTML + CSS + JS ล้วน (ไม่มี framework, ไม่มีไลบรารีภายนอก) ฟอนต์ LINE Seed Sans TH

## แก้ข้อมูล
แก้ที่ `js/data.js` ไฟล์เดียว (ชื่อ, ชื่อเล่น, สถานศึกษา, ปีเดือนเกิดสำหรับคำนวณอายุ, IG, อีเมล)
ส่วนที่ไม่ใช่ข้อมูล เช่น ไอคอนทักษะ อยู่ใน `index.html` (หมวด Skills) และไฟล์ภาพอยู่ใน `assets/`

## ดูผลบนเครื่อง
เปิด `index.html` ได้เลย หรือรัน `python3 -m http.server 8000` แล้วเข้า http://localhost:8000

## เอาขึ้นเว็บ (GitHub → Cloudflare Pages)
1. สร้าง repo บน GitHub แล้วอัปโหลดทั้งโฟลเดอร์นี้ (เปิด 2FA ของบัญชีก่อน)
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git → เลือก repo
3. Build command: ว่างไว้ / Output directory: `/` (ราก) → Deploy
4. ทุกครั้งที่ push ขึ้น GitHub เว็บจะอัปเดตเอง

ไฟล์ `_headers` จะถูก Cloudflare Pages ใช้ตั้งค่า security headers ให้อัตโนมัติ

## ความปลอดภัยที่ทำไว้
- ไม่มี inline script / inline style และไม่โหลดอะไรจากภายนอก → ใช้ Content-Security-Policy แบบเข้มได้ (ทั้งใน `_headers` และ meta ใน `index.html`)
- ลิงก์ภายนอกใช้ `rel="noopener noreferrer"`
- อีเมลถูกประกอบด้วย JS จากข้อมูลแยก 2 ส่วน ลดการโดนบอทเก็บ
- ไม่มีฟอร์ม ไม่มี backend ไม่มี API key
