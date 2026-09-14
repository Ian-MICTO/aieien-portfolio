interface HeaderProps {
  chapter: string;
  label: string;
  caption: string;
  className?: string;
}

export function Header({
  chapter,
  label,
  caption,
  className = "",
}: HeaderProps) {
  return (
    <div
      className={`relative z-10 px-4 sm:px-6 pt-16 md:pt-4 pb-3 sm:pb-4 flex items-center justify-between shrink-0 bg-transparent ${className}`}
    >
      <div className="flex items-center gap-3 pointer-events-auto">
        <span className="text-xs font-mono font-bold tracking-widest uppercase bg-black text-white px-2 py-0.5">
          {chapter}
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide uppercase">
          {label}
        </h2>
      </div>
      <span className="z-10 text-xs font-mono text-neutral-500 uppercase tracking-wide hidden sm:inline pointer-events-auto">
        {caption}
      </span>
    </div>
  );
}
