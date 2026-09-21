"use client";

import { useScrollSpyListener } from "@/hooks/useScrollSpy";

/** ไม่แสดงอะไร ทำหน้าที่ติดตามการเลื่อนหน้าเพื่ออัปเดตเมนู */
export function ScrollSpy() {
  useScrollSpyListener();
  return null;
}
