import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";
import { Fragment } from "react";

const principles = [
  {
    emoji: "💬",
    title: "Clear Communication",
    text: "Regular progress updates, honest timelines and no surprises. You will always know exactly where your project stands.",
  },
  {
    emoji: "🎯",
    title: "Pixel-Perfect Implementation",
    text: "Designs are translated into the browser faithfully — spacing, typography and interactions all behave the way they were intended to.",
  },
  {
    emoji: "⚡",
    title: "Performance First",
    text: "Fast load times, optimized assets and clean rendering paths. A site that feels instant keeps visitors engaged.",
  },
  {
    emoji: "🧱",
    title: "Maintainable Code",
    text: "Readable, well-structured code that the next developer — or future you — can pick up without a headache.",
  },
  {
    emoji: "📱",
    title: "Responsive by Default",
    text: "Every layout is built mobile-first and tested across screen sizes, so it looks sharp on any device.",
  },
  {
    emoji: "🤝",
    title: "Post-Launch Support",
    text: "Launch day is not goodbye. I stay available for fixes, tweaks and improvements after delivery.",
  },
];

export const ApproachSection = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          title="How I Work"
          eyebrow="My Approach"
          description="The principles I bring to every project, from first call to final delivery."
        />
        <div className="mt-12 lg:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4">
          <div className="flex flex-none gap-8 pr-8 animate-move-left [animation-duration:90s] hover:[animation-play-state:paused]">
            {[
              ...new Array(2).fill(0).map((_, index) => (
                <Fragment key={index}>
                  {principles.map((principle) => (
                    <Card
                      key={principle.title}
                      className="max-w-xs md:max-w-md p-6 md:p-8 hover:-rotate-3 transition duration-300"
                    >
                      <div className="flex gap-4 items-center">
                        <div className="size-14 bg-gray-700 inline-flex items-center justify-center rounded-full flex-shrink-0 text-2xl">
                          <span>{principle.emoji}</span>
                        </div>
                        <div className="font-semibold text-lg">
                          {principle.title}
                        </div>
                      </div>
                      <p className="mt-4 md:mt-6 text-sm md:text-base text-white/70">
                        {principle.text}
                      </p>
                    </Card>
                  ))}
                </Fragment>
              )),
            ]}
          </div>
        </div>
      </div>
    </div>
  );
};
