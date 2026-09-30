import type { CSSProperties, ReactNode } from "react";
/** การ์ดหน้าต่างมีจุด 3 สี เหมือนในดีไซน์ */
export function Win({ title, children, className = "", style, right }: { title?: string; children: ReactNode; className?: string; style?: CSSProperties; right?: string }) {
  return (
    <div className={`win spot rv ${className}`} style={style}>
      <div className="wbar"><span className="dots"><i /><i /><i /></span><span>{title}</span>{right && <em>{right}</em>}</div>
      <div className="wbody">{children}</div>
    </div>
  );
}
