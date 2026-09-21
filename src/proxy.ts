import { NextResponse, type NextRequest } from "next/server";

/*
  Content-Security-Policy แบบ nonce — สร้างรหัสใหม่ทุกครั้งที่มีคนเข้าเว็บ
  สคริปต์ที่ไม่มี nonce ตรงกัน (เช่นโค้ดที่ใครแอบฝังเข้ามา) จะถูกเบราว์เซอร์บล็อก

  หมายเหตุ: Next.js 16 ใช้ชื่อไฟล์ proxy.ts (Next.js 15 ใช้ middleware.ts และชื่อฟังก์ชัน middleware)
*/
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const csp = [
    "default-src 'self'",
    // dev ต้องใช้ 'unsafe-eval' (React ใช้ตอน debug) ตอนใช้งานจริงไม่ต้อง
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    // dev ใช้ inline style ได้เพื่อให้ hot-reload ทำงาน ส่วนของจริงใช้ nonce
    isDev ? "style-src 'self' 'unsafe-inline'" : `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      // ข้ามไฟล์ static, รูป, ฟอนต์ ที่ไม่ต้องใส่ CSP และคำขอ prefetch
      source: "/((?!api|_next/static|_next/image|favicon.ico|assets/).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
