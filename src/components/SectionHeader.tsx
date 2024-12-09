import React from "react";

const SectionHeader = ({
  title,
  eyebrow,
  description,
}: {
  title: string;
  eyebrow: string;
  description: string;
}) => {
  return (
    <>
      <div className="flex justify-center ">
        <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-center bg-clip-text text-transparent lg:text-2xl">
          {eyebrow}
        </p>
      </div>

      <h2 className="font-serif text-3xl md:text-5xl text-center max-w-md mx-auto mt-6">
        {title}
      </h2>
      <p className="text-center text-white/60 md:text-lg lg:text-xl mt-4 max-w-md mx-auto">
        {description}
      </p>
    </>
  );
};

export default SectionHeader;
