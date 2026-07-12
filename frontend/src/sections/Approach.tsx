import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";

const principles = [
  {
    emoji: "⚡",
    title: "24-Hour Response",
    text: "Every message answered within 24 hours — usually much faster. You'll never be left wondering where your project stands.",
  },
  {
    emoji: "🔁",
    title: "30-Day Revision Support",
    text: "Every delivery includes 30 days of free revisions — we polish the details together until it feels exactly right.",
  },
  {
    emoji: "🛡️",
    title: "1-Year Free Bug Fixes",
    text: "If anything I built breaks within a year of launch, I fix it free of charge. Post-launch is not goodbye.",
  },
  {
    emoji: "🏗️",
    title: "Clean Architecture",
    text: "Layered, documented codebases — typed APIs, clear service boundaries, environment-based config. Code your next developer will thank you for.",
  },
  {
    emoji: "🎯",
    title: "Pixel-Perfect & Responsive",
    text: "Designs land in the browser exactly as intended, built mobile-first and tested across screen sizes.",
  },
  {
    emoji: "🚀",
    title: "Performance First",
    text: "Fast load times, optimized assets and clean rendering paths. A site that feels instant keeps visitors engaged.",
  },
];

export const ApproachSection = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          title="How I Work"
          eyebrow="My Guarantees"
          description="Concrete commitments, not vague promises — this is what working with me looks like."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 lg:mt-20">
          {principles.map((principle) => (
            <Card key={principle.title} className="p-7">
              <div className="flex items-center gap-4">
                <div className="size-11 shrink-0 rounded-xl bg-gradient-to-br from-emerald-300/15 to-sky-400/15 border border-emerald-300/20 flex items-center justify-center text-xl">
                  {principle.emoji}
                </div>
                <h3 className="font-semibold text-lg">{principle.title}</h3>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mt-4">{principle.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
