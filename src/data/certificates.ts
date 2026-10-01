import type { Language } from "@/lib/i18n";

type CertificateTranslation = {
  title?: string;
  issuer?: string;
  description?: string;
  tags?: string[];
};

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  image: string;
  featured?: boolean;
  verifyUrl?: string;
  tags: string[];
  translations?: Partial<Record<Language, CertificateTranslation>>;
};

export function localizeCertificate(certificate: Certificate, language: Language): Certificate {
  return { ...certificate, ...certificate.translations?.[language] };
}

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "การอบรมเชิงปฏิบัตรการ “การควบคุมมอเตอร์และปั๊มนํ้าด้วย IOT”",
    issuer: "คณะเทคโนโลยีอุตสาหกรรม มหาวิทยาลัยราชภัฏพระนคร",
    year: "2026",
    description: "จากการอบรมเชิงปฏิบัติการนี้ ผู้เข้าร่วมจะได้เรียนรู้เกี่ยวกับการควบคุมมอเตอร์และปั๊มนํ้าผ่านเทคโนโลยี Internet of Things (IoT) โดยมีการสอนทฤษฎีและการปฏิบัติจริงในการสร้างระบบควบคุมที่สามารถตรวจสอบและจัดการอุปกรณ์จากระยะไกลได้",
    image: "/assets/certificates/ratchapat.jpg",
    verifyUrl: "https://e-cert.ntuniso.net/",
    tags: ["IOT", "ESP32", "C Language", "Arduino IDE"],
    translations: {
      th: {
        title: "อบรมการควบคุมมอเตอร์และปั๊มน้ำด้วย IoT",
        tags: ["IoT", "ESP32", "ภาษา C", "Arduino IDE"],
      },
      en: {
        title: "Motor and Water Pump Control with IoT",
        issuer: "Faculty of Industrial Technology, Phranakhon Rajabhat University",
        description: "Hands-on training in controlling motors and water pumps with IoT, including remote monitoring and operation.",
        tags: ["IoT", "ESP32", "C", "Arduino IDE"],
      },
    },
  },
  {
    id: "cert-2",
    title: "Game Pee Blox Camp",
    issuer: "Hamster Hub",
    year: "2026",
    description: "ได้เรียนรู้การพัฒนาเกมผีด้วย Roblox Studio พร้อมทั้งฝึกทักษะการออกแบบเกม การเขียนโค้ด และการทำงานร่วมกันในทีม เพื่อสร้างประสบการณ์การเล่นเกมที่น่าสนใจและมีคุณภาพ",
    image: "/assets/certificates/gamepee.jpg",
    verifyUrl: "https://e-cert.ntuniso.net/",
    tags: ["Hamster Hub", "Roblox studio", "Lua", "Game Development"],
    translations: {
      th: { tags: ["Hamster Hub", "Roblox Studio", "Lua", "พัฒนาเกม"] },
      en: {
        description: "Learned to build a horror game in Roblox Studio while practicing game design, coding, and teamwork.",
        tags: ["Hamster Hub", "Roblox Studio", "Lua", "Game development"],
      },
    },
  },
  {
    id: "cert-3",
    title: "กลุ่มนักเรียนพัฒนาระบบเทคโนโลยีสารสนเทศ",
    issuer: "โรงเรียนนวมินทราชูทิศ เตรียมอุดมศึกษาน้อมเกล้า",
    year: "2026",
    description: "ได้ปฏิบัติหน้าที่ในตำแหน่งนักออกแบบกราฟิก และพัฒนาระบบเทคโนโลยีสารสนเทศ โดยมีส่วนร่วมในการสร้างสรรค์งานออกแบบกราฟิกและพัฒนาระบบที่เกี่ยวข้องกับเทคโนโลยีสารสนเทศ เพื่อสนับสนุนการเรียนรู้และการทำงานของกลุ่มนักเรียน",
    image: "/assets/certificates/graphic.jpg",
    tags: ["Graphic Design", "กท.", "Technology", "โรงเรียนนวมินทราชูทิศ เตรียมอุดมศึกษาน้อมเกล้า"],
    translations: {
      th: { tags: ["ออกแบบกราฟิก", "กท.", "เทคโนโลยี", "โรงเรียนนวมินทราชูทิศ เตรียมอุดมศึกษาน้อมเกล้า"] },
      en: {
        title: "Student Information Technology Development Group",
        issuer: "Nawamintrachinuthit Triamudomsuksanomklao School",
        description: "Served as a graphic designer and IT developer, contributing design work and technology systems to support the student group.",
        tags: ["Graphic design", "กท.", "Technology", "Student IT group"],
      },
    },
  },
  {
    id: "cert-4",
    title: "Samsung Solve for Tomorrow",
    issuer: "Samsung Thailand",
    year: "2026",
    featured: true,
    description: "ได้เข้าร่วมการแข่งขัน Samsung Solve for Tomorrow ซึ่งเป็นโครงการที่สนับสนุนให้นักเรียนและนักศึกษาได้พัฒนาความคิดสร้างสรรค์และทักษะการแก้ปัญหา โดยมีเป้าหมายในการสร้างสรรค์โซลูชันที่สามารถแก้ไขปัญหาสังคมและสิ่งแวดล้อมได้อย่างยั่งยืน",
    image: "/assets/certificates/sft.jpg",
    tags: ["Samsung Solve for Tomorrow", "Unrealistic team", "Technology", "Innovation"],
    translations: {
      th: { tags: ["Samsung Solve for Tomorrow", "Unrealistic Team", "เทคโนโลยี", "นวัตกรรม"] },
      en: {
        description: "Took part in Samsung Solve for Tomorrow, a program that encourages students to develop creative solutions to social and environmental challenges.",
        tags: ["Samsung Solve for Tomorrow", "Unrealistic Team", "Technology", "Innovation"],
      },
    },
  },
  {
    id: "cert-5",
    title: "เว็บลงทะเบียนชุมนุม (club.ntuniso.net)",
    issuer: "กลุ่มนักเรียนพัฒนาระบบเทคโนโลยีสารสนเทศ",
    year: "2026",
    description: "เป็นผู้ร่วมออกแบบและพัฒนาเว็บไซต์ลงทะเบียนชุมนุมสำหรับนักเรียน โดยมีหน้าที่ในการออกแบบส่วนติดต่อผู้ใช้ (UI) และประสบการณ์ผู้ใช้ (UX) เพื่อให้การลงทะเบียนชุมนุมเป็นไปอย่างราบรื่นและมีประสิทธิภาพ",
    image: "/assets/certificates/clubcer.jpg",
    tags: ["NTUNISO", "Web Development", "กท.", "Student Project"],
    translations: {
      th: { tags: ["NTUNISO", "พัฒนาเว็บไซต์", "กท.", "โปรเจกต์นักเรียน"] },
      en: {
        title: "School Club Registration Website",
        issuer: "Student IT Development Group",
        description: "Contributed to the UI/UX design and development of a website that helps students register for school clubs.",
        tags: ["NTUNISO", "Web development", "กท.", "Student project"],
      },
    },
  },
  {
    id: "cert-6",
    title: "เว็บแจ้งปัญหาอุปกรณ์ชำรุดและเหตุผิดระเบียบ (fondue.ntuniso.net)",
    issuer: "กลุ่มนักเรียนพัฒนาระบบเทคโนโลยีสารสนเทศ",
    year: "2026",
    description: "เป็นผู้ร่วมพัฒนาเว็บไซต์แจ้งปัญหาอุปกรณ์ชำรุดและเหตุผิดระเบียบสำหรับนักเรียน",
    image: "/assets/certificates/fondue.jpg",
    tags: ["NTUNISO", "Web Development", "กท.", "Student Project"],
    translations: {
      th: { tags: ["NTUNISO", "พัฒนาเว็บไซต์", "กท.", "โปรเจกต์นักเรียน"] },
      en: {
        title: "School Issue Reporting Website",
        issuer: "Student IT Development Group",
        description: "Contributed to a website where students can report damaged equipment and rule violations.",
        tags: ["NTUNISO", "Web development", "กท.", "Student project"],
      },
    },
  },
  {
    id: "cert-7",
    title: "เว็บเก็บเกียรติบัตรออนไลน์ (e-cert.ntuniso.net)",
    issuer: "กลุ่มนักเรียนพัฒนาระบบเทคโนโลยีสารสนเทศ",
    year: "2026",
    description: "เป็นผู้ร่วมพัฒนาเว็บไซต์เก็บเกียรติบัตรออนไลน์สำหรับนักเรียน",
    image: "/assets/certificates/ecert.jpg",
    tags: ["NTUNISO", "Web Development", "กท.", "Student Project"],
    translations: {
      th: { tags: ["NTUNISO", "พัฒนาเว็บไซต์", "กท.", "โปรเจกต์นักเรียน"] },
      en: {
        title: "Online Certificate Archive",
        issuer: "Student IT Development Group",
        description: "Contributed to an online platform for students to store and access their certificates.",
        tags: ["NTUNISO", "Web development", "กท.", "Student project"],
      },
    },
  },
  {
    id: "cert-8",
    title: "เว็บส่งแผนการเรียนการสอน (docs.ntuniso.net)",
    issuer: "กลุ่มนักเรียนพัฒนาระบบเทคโนโลยีสารสนเทศ",
    year: "2026",
    description: "เป็นผู้ร่วมพัฒนาเว็บไซต์ส่งแผนการเรียนการสอนสำหรับนักเรียน",
    image: "/assets/certificates/edocs.jpg",
    tags: ["NTUNISO", "Web Development", "กท.", "Student Project"],
    translations: {
      th: { tags: ["NTUNISO", "พัฒนาเว็บไซต์", "กท.", "โปรเจกต์นักเรียน"] },
      en: {
        title: "Lesson Plan Submission Website",
        issuer: "Student IT Development Group",
        description: "Contributed to a website for submitting and managing lesson plans.",
        tags: ["NTUNISO", "Web development", "กท.", "Student project"],
      },
    },
  },
];
