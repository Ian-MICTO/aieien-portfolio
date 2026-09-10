import type { JSX, MouseEvent } from "react";
import type { MenuItem } from "../types/index";

interface MenuProps {
  onClose?: () => void;
}

export default function Menu({ onClose }: MenuProps): JSX.Element {
  const menuItems: MenuItem[] = [
    {
      id: "1",
      title: "About",
      href: "#about",
    },
    {
      id: "2",
      title: "Info",
      href: "#info",
    },
    {
      id: "3",
      title: "Style",
      href: "#style",
    },
    {
      id: "4",
      title: "Album",
      href: "#album",
    },
    {
      id: "5",
      title: "Connect",
      href: "#connect",
    },
    {
      id: "6",
      title: "Comments",
      href: "#comments",
    },
  ];

  const handleItemClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    onClose?.();
  };

  return (
    <div className="relative h-full w-full flex flex-col justify-between overflow-hidden bg-white pt-14 md:pt-0">
      {/* Halftone Effect Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [bg-size:8px_8px] pointer-events-none" />

      {/* Menu Links */}
      <div className="relative z-10 overflow-y-auto">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => handleItemClick(e, item.href)}
            className="flex border-b-2 border-black justify-between px-4 sm:px-6 py-3 sm:py-4 items-center group hover:bg-black hover:text-white transition-colors duration-150 cursor-pointer"
          >
            <h2 className="text-2xl sm:text-3xl uppercase tracking-normal">
              {item.title}
            </h2>
            <span className="text-xs sm:text-sm font-semibold tracking-wider font-mono opacity-60 group-hover:opacity-100">
              Ch. {item.id.padStart(2, "0")}
            </span>
          </a>
        ))}
      </div>

      {/* Footer Branding */}
      <div className="relative z-10 p-4 sm:p-6 border-t-2 border-black bg-white">
        <span className="text-xs sm:text-sm font-bold tracking-widest font-mono uppercase text-neutral-500">
          Volume 01
        </span>
        <a
          href="#home"
          onClick={onClose}
          className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-wide mt-1 select-none hover:opacity-80 transition-opacity cursor-pointer"
        >
          Home
        </a>
      </div>
    </div>
  );
}
