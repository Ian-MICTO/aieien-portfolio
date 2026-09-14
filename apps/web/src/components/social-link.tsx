import type { LucideIcon } from "lucide-react";

interface SocialLinkProps {
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  label?: React.ReactNode;
  link: string;
  className?: string;
}

export function SocialLink({
  icon: Icon,
  label,
  link,
  className = "",
}: SocialLinkProps) {
  return (
    <div className={className}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center font-supreme text-sm sm:text-base text-black hover:text-cyan-500 transition-colors duration-200"
      >
        {Icon && (
          <div className="size-6 sm:size-7 flex items-center justify-center p-1 shrink-0">
            <Icon className="size-full fill-current" />
          </div>
        )}
        <span className="font-supreme tracking-[0.02em]">{label}</span>
      </a>
    </div>
  );
}
