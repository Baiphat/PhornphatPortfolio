/* ดาวร่วงพื้นหลัง — ตำแหน่ง/ขนาด/ความเร็วของแต่ละดวงกำหนดใน globals.css (.s1 – .s15) */
const STAR_COUNT = 15;

export function StarField() {
  return (
    <div className="stars" aria-hidden="true">
      {Array.from({ length: STAR_COUNT }, (_, i) => (
        <i key={i} className={`star s${i + 1}`} />
      ))}
    </div>
  );
}
