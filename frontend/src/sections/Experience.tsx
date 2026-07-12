import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";

const capabilities = [
  {
    icon: "🌐",
    title: "Web Applications",
    text: "End-to-end products: Spring Boot REST APIs paired with React & Next.js frontends, from database design to pixel-perfect UI.",
  },
  {
    icon: "📱",
    title: "Mobile Apps",
    text: "Cross-platform iOS & Android apps built with React Native and Expo, talking to the same secure APIs as the web.",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    text: "LLM-powered features with OpenAI & Claude APIs — chat, automation and smart workflows — plus AI-assisted delivery for faster shipping.",
  },
];

// TODO(Burak): Rol detaylarını kendi gerçek deneyiminle doğrula/düzenle.
const experiences = [
  {
    role: "Software Developer",
    context: "Enterprise Web Applications",
    period: "Current Role",
    description:
      "Working as a developer on production web applications used in day-to-day business operations.",
    highlights: [
      { title: "Backend development with Java & Spring Boot" },
      { title: "Frontend features with React and modern JavaScript" },
      { title: "Relational database design and queries with PostgreSQL" },
      { title: "Collaborating in an agile team with code reviews and version control" },
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <div id="experience" className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="What I Do"
          title="Web, Mobile & AI — End to End"
          description="One developer, the whole product: backend, frontend, mobile app and the AI features that tie them together."
        />

        {/* Yetkinlik kartları */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 lg:mt-20">
          {capabilities.map((capability) => (
            <Card key={capability.title} className="p-8">
              <div className="size-12 rounded-xl bg-gradient-to-br from-emerald-300/15 to-sky-400/15 border border-emerald-300/20 inline-flex items-center justify-center text-2xl">
                {capability.icon}
              </div>
              <h3 className="font-serif text-xl mt-5">{capability.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed mt-3">{capability.text}</p>
            </Card>
          ))}
        </div>

        {/* Profesyonel deneyim */}
        <div className="mt-8 flex flex-col gap-8 max-w-3xl mx-auto lg:max-w-none">
          {experiences.map((experience) => (
            <Card key={experience.role} className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h3 className="font-serif text-2xl">{experience.role}</h3>
                  <p className="text-white/50 mt-1">{experience.context}</p>
                </div>
                <span className="bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text font-bold uppercase tracking-widest text-sm">
                  {experience.period}
                </span>
              </div>
              <hr className="border-t-2 border-white/5 mt-4" />
              <p className="mt-4 text-white/70">{experience.description}</p>
              <ul className="grid md:grid-cols-2 gap-3 mt-4">
                {experience.highlights.map((highlight) => (
                  <li
                    key={highlight.title}
                    className="flex gap-2 text-sm md:text-base text-white/50"
                  >
                    <CheckCircleIcon className="size-5 md:size-6 flex-shrink-0" />
                    <span>{highlight.title}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
