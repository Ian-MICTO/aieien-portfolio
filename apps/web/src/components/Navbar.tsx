import Menu from "./Menu.tsx";
import { useState, type JSX } from "react";

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* THE VERTICAL SPINE (Desktop) / TOP BAR (Mobile) */}
      <nav className="fixed top-0 left-0 border-b-2 border-black bg-white z-[110] flex w-full justify-between md:flex-col-reverse md:h-full md:w-15 md:border-r-2 md:pb-9">
        <span className="hidden md:block md:-rotate-90 md:whitespace-nowrap text-black">
          Ai Eien Art Portfolio
        </span>
        <div className="flex justify-center items-center">
          <span className="text-black text-4xl font-bold pl-3 md:pl-0 md:-rotate-90 md:whitespace-nowrap">
            ETERNAL LOVE
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className={`group flex gap-0.5 flex-col py-2 px-4 justify-center cursor-pointer transition-all duration-200 ease-in-out hover:gap-1 md:hover:gap-2 md:items-center md:gap-1
             md:px-0 md:py-0 md:h-30 md:mb-12 border-l-2 border-black md:border-r-0 md:border-l-0 md:border-b-2`}
        >
          <span className="size-1 md:size-1.5 bg-black rounded-full transition-transform duration-500"></span>
          <span className="size-1 md:size-1.5 bg-black rounded-full transition-transform duration-500"></span>
          <span className="size-1 md:size-1.5 bg-black rounded-full transition-transform duration-500"></span>
        </button>
      </nav>

      {/* BACKDROP OVERLAY */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-95 transition-opacity duration-300 md:left-15 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* THE SLIDING MENU PANEL */}
      <div
        className={`fixed top-0 left-0 md:left-15 w-[85vw] sm:w-[70vw] md:w-95 lg:w-105 max-w-full bg-white z-100 h-screen transition-transform duration-300 ease-in-out border-r-2 border-black shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Menu onClose={() => setIsOpen(false)} />
      </div>
    </>
  );
}
