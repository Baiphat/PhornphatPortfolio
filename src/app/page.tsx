import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Certificates } from "@/components/Certificates";

export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
