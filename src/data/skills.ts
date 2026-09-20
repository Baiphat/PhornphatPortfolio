/* ทักษะที่แสดงในหน้า Skills — เพิ่ม/ลบรายการที่นี่ */
export type CategoryIcon = "design" | "code";

export interface Skill {
  name: string;
  tag: string;
  icon: string; // path ใน /public
  alt: string;
  size: number; // ขนาดไอคอน (px)
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: CategoryIcon;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "design",
    title: "UX/UI & Graphic Design",
    icon: "design",
    skills: [
      { name: "Figma", alt: "Figma", tag: "UX/UI & Wireframing", icon: "/assets/icons/figma.svg", size: 36 },
      { name: "Canva", alt: "Canva", tag: "Graphic & Presentation", icon: "/assets/icons/canva.svg", size: 38 },
      { name: "Photoshop", alt: "Adobe Photoshop", tag: "Photo Editing & Banner", icon: "/assets/icons/photoshop.svg", size: 38 },
    ],
  },
  {
    id: "coding",
    title: "Coding & Development",
    icon: "code",
    skills: [
      { name: "HTML5 / CSS3", alt: "HTML5", tag: "Web Structure & Style", icon: "/assets/icons/html5.svg", size: 36 },
      { name: "C++", alt: "C++", tag: "Logic & Circuit Code", icon: "/assets/icons/cpp.svg", size: 36 },
      { name: "C Language", alt: "C Language", tag: "Embedded Systems", icon: "/assets/img/c-lang.webp", size: 36 },
      { name: "Lua", alt: "Lua", tag: "Scripting & Game Dev", icon: "/assets/icons/lua.svg", size: 38 },
    ],
  },
];
