"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import ContactForm from "../contact-us/contact-us-form";

const NavbarAbout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-3 bg-white/80 backdrop-blur-xl text-[#000080] z-50 border-b border-blue-100/60 shadow-sm transition-all duration-300">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/images/GetGo_Logotype.png"
          alt="GetGo Logo"
          width={180}
          height={80}
          className="w-28 md:w-40 lg:w-44 h-auto min-w-[120px] md:min-w-[160px] hover:scale-105 transition-transform"
        />
      </Link>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="md:hidden p-2 rounded-lg text-[#000080] hover:text-[#db2392] hover:bg-blue-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <Menu size={28} />
      </button>

      {/* Navigation Links */}
      <nav
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-white/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-6 md:p-0 shadow-lg md:shadow-none border-b md:border-none border-blue-100`}
      >
        <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm md:text-base font-bold text-[#000080] items-center">
          <Link href="/">
            <li className="hover:text-[#db2392] cursor-pointer transition-colors">
              Inicio
            </li>
          </Link>
          <Link href="/about-us">
            <li className="text-[#db2392] cursor-pointer transition-colors">
              Quienes Somos
            </li>
          </Link>
          <li className="hover:text-[#db2392] cursor-pointer transition-colors">
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="text-[#000080] hover:text-[#db2392] font-bold"
            >
              Contáctanos
            </button>
          </li>
        </ul>
        <ContactForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      </nav>
    </header>
  );
};

export default NavbarAbout;
