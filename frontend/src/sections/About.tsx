'use client'
import Card from "@/components/Card";
import SectionHeader from "@/components/SectionHeader";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import mapImage from "@/assets/images/map2.png";
import smileMemoji from "@/assets/images/memoji-smile.png";
import CardHeader from "@/components/CardHeader";
import { motion } from "framer-motion";
import { useRef } from "react";

const toolbox = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { label: "Backend", items: ["Java", "Spring Boot", "PostgreSQL", "REST APIs"] },
  { label: "Mobile", items: ["React Native", "Expo"] },
  { label: "AI", items: ["OpenAI API", "Claude API", "AI-Assisted Development"] },
  { label: "Tools", items: ["Git & GitHub", "Docker", "Maven", "Vercel & Railway"] },
];

const hobbies = [
  {
    title: "Snowboarding",
    emoji: "🏂",
    left: "5%",
    top: "5%",
  },
  {
    title: "Gaming",
    emoji: "🎮",
    left: "63%",
    top: "5%",
  },
  {
    title: "Cycling",
    emoji: "🚴",
    left: "1%",
    top: "35%",
  },
  {
    title: "Fitness",
    emoji: "🏋️‍♂️",
    left: "55%",
    top: "40%",
  },
  {
    title: "Reading",
    emoji: "📚",
    left: "7%",
    top: "60%",
  },
  {
    title: "Photography",
    emoji: "📸",
    left: "50%",
    top: "70%",
  },
  {
    title:"Music",
    emoji: "🎶",
    left:"30%",
    top: "30%",
  }
];

export const AboutSection = () => {
  const constraiontRef = useRef(null);
  return (
    <div id="about" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse Into My World"
          description="Learn more about who I am, what I do, and what inspires me."
        />

        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader
                title="My Reads"
                description="Explore the books shaping my perspective."
              />
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage} alt="Book cover" />
              </div>
            </Card>
            <Card className="md:col-span-3 lg:col-span-2 pb-6">
              <CardHeader
                title="My Toolbox"
                description="The stack I use to ship complete products — web, mobile and AI."
              />
              <div className="px-6 mt-4 flex flex-col gap-3">
                {toolbox.map((category) => (
                  <div key={category.label} className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5">
                    <span className="w-20 shrink-0 text-[11px] font-semibold uppercase tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
                      {category.label}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                title="Beyond the Code"
                description="Explore my interests and hobbies beyond the digital realm."
                className="px-6 py-6"
              />
              <div className="relative flex-1" ref={constraiontRef}>
                {hobbies.map((item) => (
                  <motion.div
                    key={item.title}
                    className="inline-flex items-center gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute"
                    style={{ left: item.left, top: item.top }}
                    drag
                    dragConstraints={constraiontRef}
                  >
                    <span className="font-medium text-gray-950">
                      {item.title}
                    </span>
                    <span>{item.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card className="h-[320px] p-0 md:col-span-2 lg:col-span-1">
              <Image
                src={mapImage}
                alt="map"
                className="h-full w-full object-cover object-left-top"
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full
           
             after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after: outline-gray-950/30"
              >
                <div className="absolute inset-0 rounded-full   bg-gradient-to-r from-emerald-300 to-sky-400 -z-20 animate-ping [animation-duration:2s]"></div>
                <div className="absolute inset-0 rounded-full   bg-gradient-to-r from-emerald-300 to-sky-400 -z-10 "></div>
                <Image
                  src={smileMemoji}
                  alt="smiling memoji"
                  className="size-20"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
