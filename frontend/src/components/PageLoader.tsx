'use client'
import { useEffect, useState } from "react";
import { useProjects } from "@/context/ProjectsContext";

/** Veriler hazır olana dek tüm sayfayı kaplayan yükleme ekranı; hazır olunca yumuşakça kaybolur. */
export const PageLoader = () => {
  const { ready } = useProjects();
  const [gone, setGone] = useState(false);

  // Sayfa her zaman en üstten (hero) başlasın; tarayıcının
  // "kaldığın yerden devam" scroll restorasyonunu devre dışı bırak.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // Yükleme sürerken kaydırmayı kilitle
  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [ready]);

  useEffect(() => {
    if (ready) {
      window.scrollTo(0, 0);
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
    </div>
  );
};
