/** NEXT_PUBLIC_MAINTENANCE=1 iken tüm site yerine gösterilen bekleme ekranı */
export const Maintenance = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6 text-center">
      <div className="size-16 rounded-2xl bg-gray-950 border border-white/10 flex items-center justify-center">
        <span className="font-serif text-3xl bg-gradient-to-br from-emerald-300 to-sky-400 text-transparent bg-clip-text">
          B
        </span>
      </div>
      <h1 className="font-serif text-3xl md:text-4xl text-white mt-8">
        Back soon.
      </h1>
      <p className="text-white/50 mt-3 max-w-sm">
        This portfolio is getting some upgrades and will be back online shortly.
      </p>
      <p className="text-white/25 text-sm mt-10">— Burak Eröksüz</p>
    </div>
  );
};
