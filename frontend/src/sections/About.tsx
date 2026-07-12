'use client'
import Card from "@/components/Card";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import mapImage from "@/assets/images/map2.png";
import smileMemoji from "@/assets/images/memoji-smile.png";
import CardHeader from "@/components/CardHeader";

const toolbox = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { label: "Backend", items: ["Java", "Spring Boot", "PostgreSQL", "REST APIs"] },
  { label: "Mobile", items: ["React Native", "Expo"] },
  { label: "AI", items: ["LLM Integration", "Prompt Engineering", "Vibe Coding", "Claude Code", "ChatGPT"] },
  { label: "Tools", items: ["Git & GitHub", "Docker", "Figma", "Jira", "Postman", "Vercel & Railway"] },
];

export const AboutSection = () => {
  return (
    <div id="about" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse Into My World"
          description="Learn more about who I am, what I do, and what inspires me."
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
          {/* Toolbox */}
          <Card className="md:col-span-3 lg:col-span-2 pb-6">
            <CardHeader
              title="My Toolbox"
              description="The stack I use to ship complete products — web, mobile and AI."
            />
            <div className="px-6 mt-4 flex flex-col gap-3">
              {toolbox.map((category) => (
                <div key={category.label} className="flex items-start gap-x-2">
                  <span className="w-20 shrink-0 pt-1 text-[11px] font-semibold uppercase tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
                    {category.label}
                  </span>
                  <div className="flex-1 min-w-0 flex flex-wrap gap-1.5">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs text-white/80 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Genişletilmiş harita */}
          <Card className="md:col-span-2 lg:col-span-1 p-0 relative min-h-[320px]">
            <Image
              src={mapImage}
              alt="Ankara map"
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full
             after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-sky-400 -z-10"></div>
              <Image src={smileMemoji} alt="smiling memoji" className="size-20" />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-950/70 backdrop-blur px-4 py-1.5 rounded-full text-sm text-white/80 whitespace-nowrap">
              📍 Ankara, Türkiye
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
