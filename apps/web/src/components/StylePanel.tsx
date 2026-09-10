import type { ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface StylePanelProps {
  title: string;
  description?: string;
  className?: string;
  clipPath?: string;
  children: ReactNode;
}

export default function StylePanel({
  title,
  description = "Detailed manga panel breakdown and notes.",
  className = "",
  clipPath,
  children,
}: StylePanelProps) {
  return (
    <Dialog>
      {/* 1. Clickable Outer Slanted Trigger with Black Ink Border */}
      <DialogTrigger
        className={`group relative bg-black overflow-hidden p-0.5 cursor-pointer text-left border-0 focus:outline-none select-none block ${className}`}
        style={clipPath ? { clipPath, WebkitClipPath: clipPath } : undefined}
      >
        {/* 2. Inner White Container clipped with the same path */}
        <div
          className="w-full h-full bg-white overflow-hidden relative"
          style={clipPath ? { clipPath, WebkitClipPath: clipPath } : undefined}
        >
          {children}
        </div>
      </DialogTrigger>

      {/* 3. Modal popup */}
      <DialogContent className="bg-white border-2 border-black rounded-none shadow-[8px_8px_0px_#000] p-6 max-w-lg">
        <DialogHeader>
          <span className="text-xs font-mono font-bold tracking-widest uppercase bg-black text-white px-2 py-0.5 w-max mb-1">
            Art Style Production
          </span>
          <DialogTitle className="text-2xl font-bold uppercase font-sans tracking-tight">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm font-mono text-neutral-600 mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
