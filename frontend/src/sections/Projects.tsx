'use client'
import { useState } from "react";
import Image from "next/image";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";
import { useProjects, Project } from "@/context/ProjectsContext";

// Vitrin: admin sıralamasındaki ilk N proje büyük kart olarak gösterilir
const FEATURED_COUNT = 2;
// Grid başlangıçta lg'de tek satır gösterir; kalanı "Show More" ile açılır
const INITIAL_GRID_COUNT = 3;

const FeaturedProjectCard = ({ project }: { project: Project }) => (
  <Card className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:px-20 lg:pt-16">
    <div className="lg:grid lg:grid-cols-2 lg:gap-16">
      <div className="lg:pb-16">
        <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
          <span>{project.company}</span>
          <span>&bull;</span>
          <span>{project.year}</span>
        </div>

        <h3 className="font-serif text-2xl md:text-4xl mt-2 md:mt-5">
          {project.title}
        </h3>
        <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
        <ul className="flex flex-col gap-4 mt-4 md:mt-5">
          {project.results.map((result) => (
            <li
              key={result.title}
              className="flex gap-2 text-sm text-white/50 md:text-base"
            >
              <CheckCircleIcon className="size-5 md:size-6" />
              <span>{result.title}</span>
            </li>
          ))}
        </ul>
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          <button className="bg-white text-gray-950 h-12 w-full md:w-auto rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8 px-6">
            <span>View Project</span>
            <ArrowUpRightIcon className="size-4" />
          </button>
        </a>
      </div>
      <div className="relative mt-6 -mx-8 md:mx-0 md:mt-8 lg:mt-0">
        <Image
          src={project.image}
          alt={project.title}
          width={1400}
          height={900}
          className="w-full lg:absolute lg:h-full lg:w-auto lg:max-w-none"
        />
      </div>
    </div>
  </Card>
);

const ProjectGridCard = ({ project }: { project: Project }) => (
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    className="group h-full"
  >
    <Card className="h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
      <div className="overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={450}
          className="w-full aspect-video object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 gap-3 px-5 pt-4 pb-5 md:px-6 md:pb-6">
        <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-xs text-transparent bg-clip-text">
          <span>{project.company}</span>
          <span>&bull;</span>
          <span>{project.year}</span>
        </div>
        <h4 className="font-serif text-xl">{project.title}</h4>
        <ul className="flex flex-col gap-2">
          {project.results.slice(0, 2).map((result) => (
            <li key={result.title} className="flex gap-2 text-sm text-white/50">
              <CheckCircleIcon className="size-5 flex-none" />
              <span>{result.title}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-2 inline-flex items-center gap-2 text-sm font-semibold">
          <span>View Project</span>
          <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Card>
  </a>
);

export const ProjectsSection = () => {
  const { projects, ready } = useProjects();
  const [showAll, setShowAll] = useState(false);

  // Veri gelene kadar (veya backend erişilemezse) bölümü gösterme
  if (!ready || projects.length === 0) return null;

  const featured = projects.slice(0, FEATURED_COUNT);
  const rest = projects.slice(FEATURED_COUNT);
  const visibleRest = showAll ? rest : rest.slice(0, INITIAL_GRID_COUNT);
  const hiddenCount = rest.length - INITIAL_GRID_COUNT;

  return (
    <div id="projects" className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured Projects"
          description="See how I transform concepts into engaging digital experiences."
        />
        <div className="flex flex-col mt-10 md:mt-20 gap-10 md:gap-16">
          {featured.map((project) => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </div>
        {rest.length > 0 && (
          <>
            <p className="uppercase font-semibold tracking-widest text-white/30 text-sm text-center mt-16 md:mt-20">
              More Projects
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
              {visibleRest.map((project) => (
                <ProjectGridCard key={project.id} project={project} />
              ))}
            </div>
            {hiddenCount > 0 && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  aria-expanded={showAll}
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-xl font-semibold border border-white/15 hover:bg-white/5 transition"
                >
                  <span>{showAll ? "Show Less" : `Show More (+${hiddenCount})`}</span>
                  <ArrowDownIcon
                    className={`size-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
