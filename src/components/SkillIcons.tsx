import type { ReactNode } from "react";

const img = (file: string, alt: string) => <img src={`/assets/icons/${file}`} alt={alt} width="42" height="42" />;

export const icons: Record<string, ReactNode> = {
  TypeScript: img("Frame-7.png", "TypeScript"),
  "Next.JS": img("Frame-1.png", "Next.js"),
  TailwindCSS: img("Frame-8.png", "Tailwind CSS"),
  React: img("Frame-10.png", "React"),
  Figma: img("Frame-3.png", "Figma"),
  Photoshop: img("Frame-4.png", "Photoshop"),
  Canva: img("Frame-5.png", "Canva"),
  Framer: img("Frame-6.png", "Framer"),
  "Premiere Pro": img("Frame-9.png", "Premiere Pro"),
  "Davinci Resolve": img("Frame.png", "DaVinci Resolve"),
  "After effects": img("Frame-2.png", "After Effects"),
};
