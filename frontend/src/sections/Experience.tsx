import SectionHeader from "@/components/SectionHeader";
import Card from "@/components/Card";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";

// TODO(Burak): Aşağıdaki bilgileri kendi gerçek deneyiminle doğrula/düzenle
// (sektör, süre, sorumluluklar). Şirket adı bilinçli olarak verilmiyor (NDA).
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
          eyebrow="Professional Experience"
          title="Where I've Built Things"
          description="Hands-on experience shipping production software in a professional team environment."
        />
        <div className="mt-12 lg:mt-20 flex flex-col gap-8 max-w-3xl mx-auto">
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
              <ul className="flex flex-col gap-3 mt-4">
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
