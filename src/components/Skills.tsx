import { d } from "@/lib/d";
import { icons } from "./SkillIcons";

const rows = [
  ["Development", ["TypeScript", "Next.JS", "TailwindCSS", "React"]],
  ["UI / UX Design", ["Figma", "Photoshop", "Canva", "Framer"]],
  ["Video Editor", ["Premiere Pro", "Davinci Resolve", "After effects"]],
] as const;

export function Skills() {
  return (
    <section id="skills" className="sec">
      <div className="wrap">
        <h2 className="grad rv">SKILLS</h2>
        <p className="sub rv" style={d(".08s")}>All the tools I use for my work</p>
        <div className="skill-rows">
          {rows.map(([label, items], r) => (
            <div className="skill-row" key={label}>
              <h3 className="rv" style={d(`${r * 0.1}s`)}>{label}</h3>
              <div className="tiles">
                {items.map((n, i) => (
                  <div key={n} className="tile spot rv" style={d(`${r * 0.1 + i * 0.07}s`)}>
                    <span className="skill-mark">{icons[n]}</span>
                    <span className="skill-name">{n}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
