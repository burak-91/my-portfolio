import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";

const principles = [
  {
    emoji: "💬",
    title: "Clear Communication",
    text: "Regular progress updates, honest timelines and no surprises — you always know where your project stands.",
  },
  {
    emoji: "🎯",
    title: "Pixel-Perfect Implementation",
    text: "Designs are translated into the browser faithfully — spacing, typography and interactions behave as intended.",
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
