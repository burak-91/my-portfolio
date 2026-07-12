'use client'
import { useEffect, useState } from "react";
import { useProjects } from "@/context/ProjectsContext";

/** Veriler hazır olana dek tüm sayfayı kaplayan yükleme ekranı; hazır olunca yumuşakça kaybolur. */
export const PageLoader = () => {
  const { ready } = useProjects();
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (ready) {
      const t = setTimeout(() => setGone(true), 600);
      return () => clearTimeout(t);
    }
  }, [ready]);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-gray-900 flex flex-col items-center justify-center gap-6 transition-opacity duration-500 ${
        ready ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={ready}
    >
      <div className="relative">
        <div className="size-16 rounded-full border-4 border-white/10 border-t-emerald-300 animate-spin" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-sky-400/60 animate-spin [animation-duration:1.6s]" />
      </div>
      <div className="text-center">
        <div className="font-serif text-2xl bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
          Burak Eröksüz
        </div>
        <div className="text-sm text-white/40 mt-1">Loading portfolio…</div>
      </div>
    </div>
  );
};
