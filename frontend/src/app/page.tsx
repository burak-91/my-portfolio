import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { ExperienceSection } from "@/sections/Experience";
import { ApproachSection } from "@/sections/Approach";
import { AboutSection } from "@/sections/About";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { ProjectsProvider } from "@/context/ProjectsContext";
import { PageLoader } from "@/components/PageLoader";

export default function Home() {
  return (
    <ProjectsProvider>
      <PageLoader />
      <Header />
      <HeroSection />
      <ProjectsSection />
      <TapeSection />
      <ExperienceSection />
      <ApproachSection />
      <AboutSection/>
      <ContactSection/>
      <Footer/>
    </ProjectsProvider>
  );
}
