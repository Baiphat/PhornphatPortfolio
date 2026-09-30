import { About } from "@/components/About";
import { Certificates } from "@/components/Certificates";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";

export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Certificates />
        <Work />
      </main>
      <Footer />
    </>
  );
}
