import { d } from "@/lib/d";
import { Win } from "./Win";

export function About() {
  return (
    <section id="about" className="sec about">
      <div className="wrap about-in">
        <div className="photo rv">
          <div className="disc" />
          <div className="cut"><img src="/assets/img/about.png" alt="Phornphat" loading="lazy" /></div>
        </div>
        <div>
          <h2 className="grad rv">ABOUT ME</h2>
          <p className="sub rv" style={d(".08s")}>Everything you can know about me</p>
          <div className="about-grid">
            <Win title="username" className="full" style={d(".1s")}><p className="val">Phornphat Lepkhrut</p></Win>
            <Win title="Nickname" style={d(".18s")}><p className="val">Phat</p></Win>
            <Win title="Birthday" right="M/D/Y" style={d(".24s")}><p className="val">October 6, 2010</p></Win>
            <Win title="Education" className="education" style={d(".3s")}><p className="val sm">Nawamintrachinuthit Triamudomsuksanomklao</p></Win>
            <Win title="Live in" style={d(".36s")}><p className="val">Bangkok, TH</p></Win>
          </div>
        </div>
      </div>
    </section>
  );
}
