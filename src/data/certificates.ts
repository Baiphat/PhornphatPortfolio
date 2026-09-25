export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  tags: string[];
  verifyUrl?: string;
  image: string;
}

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "การอบรมเชิงปฏิบัตรการ “การควบคุมมอเตอร์และปั๊มนํ้าด้วย IOT”",
    issuer: "คณะเทคโนโลยีอุตสาหกรรม มหาวิทยาลัยราชภัฏพระนคร",
    year: "2026",
    description: "จากการอบรมเชิงปฏิบัติการนี้ ผู้เข้าร่วมจะได้เรียนรู้เกี่ยวกับการควบคุมมอเตอร์และปั๊มนํ้าผ่านเทคโนโลยี Internet of Things (IoT) โดยมีการสอนทฤษฎีและการปฏิบัติจริงในการสร้างระบบควบคุมที่สามารถตรวจสอบและจัดการอุปกรณ์จากระยะไกลได้",
    tags: ["IOT", "ESP32", "C Language", "Arduino IDE"],
    verifyUrl: "https://e-cert.ntuniso.net/",
    image: "/assets/certificates/cert-1.jpg",
  },
  {
    id: "cert-2",
    title: "Game Pee Blox Camp",
    issuer: "Hamster Hub",
    year: "2026",
    description: "ได้เรียนรู้การพัฒนาเกมผีด้วย Roblox Studio พร้อมทั้งฝึกทักษะการออกแบบเกม การเขียนโค้ด และการทำงานร่วมกันในทีม เพื่อสร้างประสบการณ์การเล่นเกมที่น่าสนใจและมีคุณภาพ",
    tags: ["Hamster Hub", "Roblox studio", "Lua", "Game Development"],
    verifyUrl: "https://e-cert.ntuniso.net/",
    image: "/assets/certificates/cert-2.jpg",
  },
  {
    id: "cert-3",
    title: "กลุ่มนักเรียนพัฒนาระบบเทคโนโลยีสารสนเทศ",
    issuer: "โรงเรียนนวมินทราชูทิศ เตรียมอุดมศึกษาน้อมเกล้า",
    year: "2026",
    description: "ได้ปฏิบัติหน้าที่ในตำแหน่งนักออกแบบกราฟิก และพัฒนาระบบเทคโนโลยีสารสนเทศ โดยมีส่วนร่วมในการสร้างสรรค์งานออกแบบกราฟิกและพัฒนาระบบที่เกี่ยวข้องกับเทคโนโลยีสารสนเทศ เพื่อสนับสนุนการเรียนรู้และการทำงานของกลุ่มนักเรียน",
    tags: ["Graphic Design", "กท.", "Technology", "โรงเรียนนวมินทราชูทิศ เตรียมอุดมศึกษาน้อมเกล้า"],
    image: "/assets/certificates/cert-3.jpg",
  },
];