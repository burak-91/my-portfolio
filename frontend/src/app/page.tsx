import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { ExperienceSection } from "@/sections/Experience";
import { ApproachSection } from "@/sections/Approach";
import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <div className="">
      <Header />
      <HeroSection />
      <ProjectsSection />
      <TapeSection />
      <ExperienceSection />
      <ApproachSection />
      <AboutSection/>
      <ContactSection/>
      <Footer/>
    </div>
  );
}
