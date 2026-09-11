import type { ReactNode } from "react";

export interface WorkBoxProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string | null;
  alt?: string;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export default function WorkBox({
  title = "UNTITLED WORK",
  subtitle,
  imageUrl,
  alt,
  className = "",
  onClick,
  children,
}: WorkBoxProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col aspect-square w-full border-2 border-black bg-white overflow-hidden select-none cursor-pointer transition-all duration-300 hover:shadow-[6px_6px_0px_0px_#000] ${className}`}
    >
      {/* Centered Artwork Display (No Padding - image touches edges naturally by aspect ratio) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-white">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={alt || title}
            className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : children ? (
          children
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-mono text-neutral-400 bg-neutral-50">
            NO IMAGE
          </div>
        )}
      </div>

      {/* Smooth White Gradient Fog / Fade Overlay matching theme */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none bg-linear-to-t from-white via-white/85 via-45% to-transparent" />

      {/* Bottom Text Details directly on top of the Gradient Fog */}
      <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 z-10 flex flex-col justify-end pointer-events-none">
        <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-black line-clamp-1 leading-tight font-sans">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm font-mono text-neutral-600 mt-0.5 leading-tight">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
