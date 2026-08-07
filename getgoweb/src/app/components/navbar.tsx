"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import ContactForm from "../contact-us/contact-us-form";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <header className="fixed top-0 left-0 w-full bg-white/85 backdrop-blur-xl z-50 border-b border-blue-100/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/GetGo_Logotype.png"
            alt="GetGo Logo"
            width={160}
            height={50}
            className="w-32 sm:w-40 h-auto group-hover:scale-105 transition-transform duration-200"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-[#000080]">
          <Link 
            href={isHome ? "#pasajeros" : "/#pasajeros"} 
            className="hover:text-[#db2392] transition-colors flex items-center gap-1"
          >
            Pasajeros
          </Link>
          
          <Link 
            href="/conductores" 
            className={`transition-colors flex items-center gap-1 ${pathname === "/conductores" ? "text-[#db2392]" : "hover:text-[#db2392]"}`}
          >
            Conductores
          </Link>

          <Link 
            href={isHome ? "#referidos" : "/#referidos"} 
            className="hover:text-[#db2392] transition-colors flex items-center gap-1"
          >
            Referidos <span className="bg-pink-100 text-[#db2392] text-[10px] px-2 py-0.5 rounded-full font-extrabold shadow-xs">Gana $</span>
          </Link>

          <Link 
            href={isHome ? "#servicios" : "/#servicios"} 
            className="hover:text-[#db2392] transition-colors"
          >
            Servicios
          </Link>

          <Link 
            href="/about-us" 
            className={`transition-colors ${pathname === "/about-us" ? "text-[#db2392]" : "hover:text-[#db2392]"}`}
          >
            Nosotros
          </Link>
        </nav>

        {/* Download App Button & Contact */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setIsFormOpen(true)}
            className="text-xs font-bold text-[#000080] hover:text-[#db2392] transition-colors"
          >
            Contacto
          </button>

          <Link 
            href={isHome ? "#descargar" : "/#descargar"} 
            className="bg-gradient-to-r from-[#db2392] to-[#ff46b0] hover:from-[#b81b7a] hover:to-[#db2392] text-white px-6 py-2.5 rounded-full text-sm font-black shadow-pink-glow hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Sparkles size={16} />
            <span>Descargar app</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#000080] hover:text-[#db2392] rounded-xl hover:bg-blue-50 transition-colors"
          aria-label="Menú principal"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-blue-100 px-6 py-6 flex flex-col gap-4 text-[#000080] font-bold shadow-xl"
          >
            <Link 
              href={isHome ? "#pasajeros" : "/#pasajeros"} 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-2 border-b border-gray-100"
            >
              Pasajeros
            </Link>

            <Link 
              href="/conductores" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-2 border-b border-gray-100"
            >
              Conductores
            </Link>

            <Link 
              href={isHome ? "#referidos" : "/#referidos"} 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-2 border-b border-gray-100 flex justify-between items-center"
            >
              <span>Programa de Referidos</span>
              <span className="bg-pink-100 text-[#db2392] text-xs px-2.5 py-0.5 rounded-full font-black">Gana $</span>
            </Link>

            <Link 
              href={isHome ? "#servicios" : "/#servicios"} 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-2 border-b border-gray-100"
            >
              Servicios
            </Link>

            <Link 
              href="/about-us" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-2 border-b border-gray-100"
            >
              Nosotros
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsFormOpen(true);
              }}
              className="py-2 text-left border-b border-gray-100 text-[#000080]"
            >
              Contáctanos
            </button>

            <Link 
              href={isHome ? "#descargar" : "/#descargar"} 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 bg-gradient-to-r from-[#db2392] to-[#ff46b0] text-white text-center py-3.5 rounded-full font-black shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              <span>Descargar GetGo</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <ContactForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
    </header>
  );
};

export default Navbar;
