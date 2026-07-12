'use client'
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/utils/axios";

export interface ProjectResult {
  title: string;
}

export interface Project {
  id: number;
  company: string;
  year: string;
  title: string;
  results: ProjectResult[];
  link: string;
  image: string;
}

interface ProjectsState {
  projects: Project[];
  /** Veri geldi, hata aldı veya bekleme üst sınırı doldu — sayfa gösterilebilir */
  ready: boolean;
}

const ProjectsContext = createContext<ProjectsState>({ projects: [], ready: false });

/** Soğuk başlayan backend'de bile ziyaretçiyi sonsuza dek bekletme */
const MAX_WAIT_MS = 8000;

export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fallback = setTimeout(() => setReady(true), MAX_WAIT_MS);
    api.get<Project[]>("/projects")
      .then(({ data }) => setProjects(data))
      .catch((err) => console.error("Projeler yüklenemedi:", err))
      .finally(() => {
        clearTimeout(fallback);
        setReady(true);
      });
    return () => clearTimeout(fallback);
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, ready }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
