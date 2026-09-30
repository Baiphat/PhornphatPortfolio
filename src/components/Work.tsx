"use client";
import { useState } from "react";
import { d } from "@/lib/d";

const projects: { id: string; name: string; cat: string; image?: string; href?: string }[] = [
  { id: "project-website-1", name: "Project 1", cat: "Website" },
  { id: "project-visual-1", name: "Project 2", cat: "Project" },
  { id: "project-other-1", name: "Project 3", cat: "nn." },
];
const cats = ["All", "Website", "Project", "nn."];

export function Work() {
  const [f, setF] = useState("All");
  const list = projects.filter((p) => f === "All" || p.cat === f);
  return (
    <section id="work" className="sec">
      <div className="wrap">
        <h2 className="grad rv">Work</h2>
        <p className="sub rv" style={d(".08s")}>Everything I’ve ever done</p>
        <div className="chips rv" style={d(".14s")} role="tablist">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={f === c} className={f === c ? "on" : ""} onClick={() => setF(c)}>{c}</button>
          ))}
        </div>
        <div className="grid work-grid" key={f}>
          {list.map((p, i) => (
            <a key={p.id} href={p.href ?? "#work"} className="wcard spot pop" style={d(`${i * 0.08}s`)}>
              {p.image && <img src={p.image} alt={p.name} loading="lazy" />}
              <span className="wlabel">{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
