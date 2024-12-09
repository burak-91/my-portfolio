'use client'
import Card from "@/components/Card";
import SectionHeader from "@/components/SectionHeader";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import JavaScriptIcon from "@/assets/icons/square-js.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import CSSIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import JavaIcon from "@/assets/icons/java-icon.svg";
import GithubIcon from "@/assets/icons/github.svg";
import GitIcon from "@/assets/icons/git.svg";
import mapImage from "@/assets/images/map.png";
import smileMemoji from "@/assets/images/memoji-smile.png";
import CardHeader from "@/components/CardHeader";
import ToolboxItems from "@/components/ToolboxItems";
import { motion } from "framer-motion";
import { useRef } from "react";

const toolBoxItems = [
  {
    title: "JavaScript",
    iconType: JavaScriptIcon,
  },
  {
    title: "React",
    iconType: ReactIcon,
  },

  {
    title: "CSS3",
    iconType: CSSIcon,
  },
  {
    title: "HTML5",
    iconType: HTMLIcon,
  },

  {
    title: "Java",
    iconType: JavaIcon,
  },
  {
    title: "Github",
    iconType: GithubIcon,
  },
  {
    title: "Git",
    iconType: GitIcon,
  },
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
  const constraiontRef = useRef()
  return (
    <div className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimps Into My World"
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
            <Card className="h-[320px]  md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description=" Explore the technologies and tools I use to craft exceptional
                digital experiences."
                className=""
              />
              <ToolboxItems items={toolBoxItems} className="" itemsWraperClassName="animate-move-left [animation-duration:50s]" />
              <ToolboxItems
                items={toolBoxItems}
                itemsWraperClassName="animate-move-right [animation-duration:35s] "
                className="mt-6"
              />
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
