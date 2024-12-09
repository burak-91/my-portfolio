import { twMerge } from "tailwind-merge";

const TechIcon = ({ component,className }: { component: React.ElementType; className?: string }) => {
  const Component = component;

  return (
    <>
      <Component
        className={twMerge("size-10", className)}
        style={{ fill: "url(#techIconGradient)" }}
      />
      <svg className="size-0 absolute">
        <defs>
          <linearGradient id="techIconGradient">
            <stop offset="0%" stopColor="rgb(110 231 183)" />
            <stop offset="100%" stopColor="rgb(56 189 248)" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};

export default TechIcon;
