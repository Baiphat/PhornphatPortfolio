import { d } from "@/lib/d";

const stats = [[10, "Game Dev"], [2, "Project"], [5, "Web Design"]] as const;

export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="wrap hero-in">
        <div>
          <p className="hi rise" style={d(".05s")}>Hi I’m</p>
          <h1 className="grad rise" style={d(".15s")}>Phornphat</h1>
          <p className="lead rise" style={d(".3s")}>A Frontend Developer &amp; UX/UI Designer crafting seamless digital experiences, with a passion for game dev and hardware circuits</p>
          <div className="win stats rise" style={d(".45s")}>
            <div className="wbar"><span className="dots"><i /><i /><i /></span></div>
            <div className="stat-row">
              {stats.map(([n, l]) => (
                <div key={l}><b data-count={n}>0+</b><span>{l}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="photo rise" style={d(".3s")}>
          <div className="disc" />
          <div className="cut"><img src="/assets/img/hero.png" alt="Phornphat" /></div>
        </div>
      </div>
    </section>
  );
}
