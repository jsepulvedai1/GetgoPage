"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

const NavbarAbout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-3 bg-[#f3fbff] text-[#000080] z-50 shadow-md">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/images/GetGo_Logotype.png"
          alt="GetGo Logo"
          width={180}
          height={80}
          className="w-28 md:w-40 lg:w-48 h-auto min-w-[120px] md:min-w-[160px]"
        />
      </Link>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <Menu size={28} />
      </button>

      {/* Navigation Links */}
      <nav
        className={`${isOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-[#f3fbff] md:bg-transparent p-4 md:p-0  md:shadow-none`}
      >
        <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-lg font-semibold text-[#000080]">
          <Link href="/">
            <li className="hover:text-blue-400 cursor-pointer transition-all">
              Inicio
            </li>
          </Link>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className="hover:text-blue-400 cursor-pointer transition-all">
              Ayuda
            </li>
          </a>
        </ul>
      </nav>
    </header>
  );
};

export default NavbarAbout;
