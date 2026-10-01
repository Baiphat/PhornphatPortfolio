import type { Language } from "@/lib/i18n";

export type ProjectTranslation = {
  name?: string;
  cat?: string;
  description?: string;
  role?: string;
  contributions?: string[];
  result?: string;
  tags?: string[];
  linkLabel?: string;
};

export type Project = {
  id: string;
  name: string;
  cat: string;
  image?: string;
  video?: string;
  description?: string;
  tags?: string[];
  role?: string;
  contributions?: string[];
  result?: string;
  featured?: boolean;
  linkLabel?: string;
  demoUrl?: string;
  sourceUrl?: string;
  contributors?: {
    name: string;
    instagramUrl: string;
  }[];
  translations?: Partial<Record<Language, ProjectTranslation>>;
  href?: string;
};

export function localizeProject(project: Project, language: Language): Project {
  return { ...project, ...project.translations?.[language] };
}

export const projects: Project[] = [
  {
    id: "project-website-1",
    name: "Phornphat Portfolio Website",
    cat: "Website",
    image: "/assets/projects/portfolio-website.png",
    sourceUrl: "https://github.com/Baiphat/PhornphatPortfolio",
    href: "https://phornphat.vercel.app/",
    translations: {
      th: { cat: "เว็บไซต์", linkLabel: "เข้าเว็บไซต์" },
      en: { cat: "Website", linkLabel: "Visit website" },
    },
  },
  {
    id: "project-visual-1",
    name: "Fractured Sanity Hamster Hub",
    cat: "Project",
    featured: true,
    video: "/assets/projects/fractured-sanity.mp4",
    role: "Modeler, Texture Artist, Scriptor, and UI Designer",
    contributions: ["3D Modeling", "Texturing", "Scripting", "UI Design"],
    image: "/assets/projects/fractured-sanity.png",
    href: "https://www.roblox.com/games/100979745362137/Fractured-Sanity",
    translations: {
      th: {
        cat: "โปรเจกต์",
        linkLabel: "เล่นบน Roblox",
        role: "ทำโมเดล 3D, texture, scripting และออกแบบ UI",
        contributions: ["ทำโมเดล 3D", "ทำ texture", "เขียนสคริปต์", "ออกแบบ UI"],
      },
      en: {
        cat: "Project",
        linkLabel: "Play on Roblox",
        role: "3D modeler, texture artist, scripter, and UI designer",
      },
    },
    contributors: [
      {
        name: "nxbulapp_",
        instagramUrl: "https://www.instagram.com/nxbulapp_/",
      },
      {
        name: "0_Kentawow_0",
        instagramUrl: "https://www.instagram.com/0_Kentawow_0/",
      },
      {
        name: "kxng_chxturxt",
        instagramUrl: "https://www.instagram.com/kxng_chxturxt/",
      },
    ],
  },
  {
    id: "project-กท.-1",
    name: "เว็บลงทะเบียนชุมนุม",
    description: "พัฒนาโดยกลุ่มนักเรียนพัฒนาระบบเทคโนโลยีสารสนเทศ",
    cat: "nn.",
    image: "/assets/projects/clubsntun.png",
    href: "https://clubs.ntuniso.net/",
    translations: {
      th: { cat: "งานโรงเรียน", linkLabel: "เข้าเว็บไซต์" },
      en: {
        name: "School Club Registration Website",
        cat: "School project",
        linkLabel: "Visit website",
        description: "Built with the school's Student IT Development Group.",
      },
    },
    contributors: [
      {
        name: "ntuniso",
        instagramUrl: "https://www.instagram.com/ntuniso/",
      },
    ],
  },
  {
    id: "project-กท.-2",
    name: "เว็ปแจ้งปัญหาอุปกรณ์ชำรุดและเหตุผิดระเบียบ",
    description: "พัฒนาโดยกลุ่มนักเรียนพัฒนาระบบเทคโนโลยีสารสนเทศ",
    cat: "nn.",
    image: "/assets/projects/fondue.png",
    href: "https://fondue.ntuniso.net/",
    translations: {
      th: { cat: "งานโรงเรียน", linkLabel: "เข้าเว็บไซต์" },
      en: {
        name: "School Issue Reporting Website",
        cat: "School project",
        linkLabel: "Visit website",
        description: "Built with the school's Student IT Development Group.",
      },
    },
    contributors: [
      {
        name: "ntuniso",
        instagramUrl: "https://www.instagram.com/ntuniso/",
      },
    ],
  },
];