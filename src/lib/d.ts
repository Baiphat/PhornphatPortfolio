import type { CSSProperties } from "react";
/** ตั้งค่า delay ของ animation: style={d(".2s")} */
export const d = (s: string) => ({ "--d": s }) as CSSProperties;
