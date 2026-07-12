import GithubIcon from "@/assets/icons/github.svg";
import LikedinIcon from "@/assets/icons/linkedin.svg";
import InstagramIcon from "@/assets/icons/instagram.svg";
import TechIcon from "@/components/TechIcon";

const footerLinks = [
  {
    title: "Linkedin",
    href: "https://www.linkedin.com/in/burak-eroksuz-91brk06",
    iconType: LikedinIcon,
  },
  {
    title: "Github",
    href: "https://github.com/burak-91",
    iconType: GithubIcon,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/burakerksz",
    iconType: InstagramIcon,
  },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-x-clip">
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>
      <div className="container relative z-10">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
          <div className="text-white/40">&copy; 2026 Burak Eröksüz. All rights reserved.</div>
          <nav className="flex flex-col md:flex-row items-center gap-8">
            {footerLinks.map((link) => (
              <a 
                href={link.href}
                key={link.title}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 cursor-pointer hover:text-white/80 transition-colors"
              >
                <span className="font-semibold">{link.title}</span>
                <TechIcon className="size-4" component={link.iconType} />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
