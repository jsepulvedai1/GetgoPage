/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Wallet, 
  Headphones, 
  Smartphone, 
  UserPlus, 
  Car, 
  Gift, 
  TrendingUp, 
  Menu,
  X,
  Sparkles,
  MapPin,
  Share2,
  Coins
} from "lucide-react";

export default function Home() {
  const [friendsCount, setFriendsCount] = useState(15);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<'car' | 'comfort'>('car');

  const estimatedEarnings = friendsCount * 2500;

  const storeLinks = {
    apple: "https://apps.apple.com/cl/app/id6748690795",
    google: "https://play.google.com/store/apps/details?id=com.getgoapp.pasajero"
  };

  const testimonials = [
    {
      text: '"Invité a 15 amigos y ya he ganado más de $60.000. Excelente app, súper transparente y los pagos llegan al instante 🙌"',
      name: "Martín R.",
      city: "Concepción",
      earned: "$60.000",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
    },
    {
      text: '"La uso todos los días para ir al trabajo. El servicio es impecable y además gano dinero extra por mis conocidos."',
      name: "Carla L.",
      city: "Santiago",
      earned: "$45.500",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
    },
    {
      text: '"GetGo tiene el mejor programa de referidos de Chile. Pagos puntuales, tarifas claras y autos impecables."',
      name: "Javier P.",
      city: "Valparaíso",
      earned: "$32.000",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80"
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-[#f4f9fd] text-slate-900 font-sans selection:bg-pink-100 selection:text-[#db2392]">
      
      {/* NAVBAR GLASS HEADER */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-blue-100/60 shadow-sm transition-all duration-300">
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
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#000080]">
            <a href="#pasajeros" className="hover:text-[#db2392] transition-colors flex items-center gap-1">
              Pasajeros
            </a>
            <a href="#conductores" className="hover:text-[#db2392] transition-colors flex items-center gap-1">
              Conductores
            </a>
            <a href="#referidos" className="hover:text-[#db2392] transition-colors flex items-center gap-1">
              Referidos <span className="bg-pink-100 text-[#db2392] text-[10px] px-2 py-0.5 rounded-full font-bold">Gana $</span>
            </a>
            <a href="#servicios" className="hover:text-[#db2392] transition-colors">Servicios</a>
            <a href="/about-us" className="hover:text-[#db2392] transition-colors">Nosotros</a>
          </nav>

          {/* Download App Button */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="#descargar" 
              className="bg-gradient-to-r from-[#db2392] to-[#ff46b0] hover:from-[#b81b7a] hover:to-[#db2392] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-pink-glow hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Sparkles size={16} />
              <span>Descargar app</span>
            </a>
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

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-blue-100 px-6 py-6 flex flex-col gap-4 text-[#000080] font-semibold shadow-xl"
            >
              <a href="#pasajeros" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">Pasajeros</a>
              <a href="#conductores" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">Conductores</a>
              <a href="#referidos" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100 flex justify-between items-center">
                <span>Programa de Referidos</span>
                <span className="bg-pink-100 text-[#db2392] text-xs px-2.5 py-0.5 rounded-full font-bold">Gana $</span>
              </a>
              <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gray-100">Servicios</a>
              <a href="/about-us" onClick={() => setMobileMenuOpen(false)} className="py-2">Nosotros</a>
              <a 
                href="#descargar" 
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 bg-gradient-to-r from-[#db2392] to-[#ff46b0] text-white text-center py-3 rounded-full font-bold shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles size={18} />
                <span>Descargar GetGo</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-[#f4f9fd] via-[#eaf4fc] to-white relative overflow-hidden">
        
        {/* Decorative Glowing Blobs */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-blue-300/30 via-pink-200/20 to-cyan-200/30 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-5 w-[350px] h-[350px] bg-[#db2392]/15 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column Text */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Country Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-md text-[#000080] px-4 py-2 rounded-full text-xs md:text-sm font-bold mb-6 border border-blue-200/80 shadow-sm hover:shadow transition-all"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#db2392] animate-ping"></span>
              <span className="text-slate-800">La app de movilidad hecha en Chile 🇨🇱</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#000080] leading-[1.12] tracking-tight mb-6"
            >
              Muévete por Chile y <span className="text-gradient-pink">gana</span> con cada invitación.
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed max-w-lg mb-8"
            >
              Viaja seguro, rápido y al mejor precio. Además, acumula recompensas en tu saldo por cada amigo que realice su primer viaje.
            </motion.p>

            {/* Store Download Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              id="descargar" 
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8"
            >
              
              {/* Google Play Button */}
              <a 
                href={storeLinks.google}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 hover:bg-slate-900 text-white px-6 py-3.5 rounded-2xl flex items-center justify-center gap-3.5 shadow-xl shadow-slate-950/15 hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-slate-800 group"
              >
                <svg viewBox="0 0 512 512" className="w-7 h-7 shrink-0 transition-transform group-hover:scale-110">
                  <path fill="#EA4335" d="M26.4 17.5c-4 4.5-6.4 11.2-6.4 19.8v437.4c0 8.6 2.4 15.3 6.4 19.8l1.1 1.1L279.7 243.3 27.5 16.4l-1.1 1.1z"/>
                  <path fill="#FBBC04" d="M363.8 327.4l-84.1-84.1v-3.7l84.1-84.1 1.1.6 99.7 56.7c28.5 16.2 28.5 42.7 0 58.9l-99.7 56.7-1.1-.6z"/>
                  <path fill="#4285F4" d="M279.7 243.3L26.4 495.6c9.3 9.9 24.6 11.1 41.5 1.5l295.9-168.3-84.1-85.5z"/>
                  <path fill="#34A853" d="M279.7 243.3L363.8 159 67.9 14.9C51 5.3 35.7 6.5 26.4 16.4l253.3 226.9z"/>
                </svg>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">DISPONIBLE EN</span>
                  <span className="text-base font-extrabold tracking-tight">Google Play</span>
                </div>
              </a>
              
              {/* App Store Button */}
              <a 
                href={storeLinks.apple}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 hover:bg-slate-900 text-white px-6 py-3.5 rounded-2xl flex items-center justify-center gap-3.5 shadow-xl shadow-slate-950/15 hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-slate-800 group"
              >
                <svg viewBox="0 0 170 170" className="w-7 h-7 fill-white shrink-0 transition-transform group-hover:scale-110">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.9-14.4-6.07-3.69-3.04-7.69-7.85-12.01-14.43-5.26-8.02-9.4-16.92-12.43-26.7-3.03-9.78-4.55-19.14-4.55-28.08 0-12.74 3.09-23.32 9.27-31.75 6.18-8.43 14.07-12.7 23.68-12.83 4.58 0 9.56 1.15 14.94 3.44 5.38 2.29 9.17 3.44 11.37 3.44 1.95 0 5.8-1.22 11.55-3.66 5.75-2.44 10.66-3.57 14.73-3.39 10.29.5 18.73 4.3 25.32 11.4-9.15 5.53-13.62 13.15-13.41 22.86.21 7.64 3.12 14.15 8.73 19.53 5.61 5.38 12.38 8.43 20.31 9.15-1.95 5.66-4.37 11.27-7.26 16.83zM119.22 31.06c0-6.18 2.29-12.04 6.87-17.58 4.58-5.54 10.19-8.73 16.83-9.57.13.91.2 1.76.2 2.55 0 6.05-2.31 11.96-6.93 17.73-4.62 5.77-10.28 8.98-16.97 9.63-.07-.63-.1-1.2-.1-1.76z"/>
                </svg>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">Consíguelo en el</span>
                  <span className="text-base font-extrabold tracking-tight">App Store</span>
                </div>
              </a>

            </motion.div>

            {/* Ratings & Trust badge */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-blue-100 shadow-sm"
            >
              <div className="flex text-[#f7da3a] gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-[#000080]">
                4.8 en Play Store y App Store
              </span>
            </motion.div>

          </div>

          {/* Right Column - Premium Smartphone Mockup & Floating Cards */}
          <div className="lg:col-span-6 relative flex justify-center items-center mt-8 lg:mt-0 min-h-[550px]">
            
            {/* Ambient Shadow Ring */}
            <div className="absolute w-[300px] h-[500px] bg-gradient-to-b from-[#db2392]/20 to-[#000080]/30 rounded-[50px] blur-2xl transform rotate-3"></div>

            {/* Main Smartphone Graphic Frame */}
            <motion.div 
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative z-10 w-[280px] sm:w-[325px] bg-[#000080] p-3.5 rounded-[50px] shadow-2xl border-4 border-blue-900/90 glow-blue"
            >
              {/* Dynamic Island Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-end px-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-900 border border-slate-700"></span>
              </div>

              {/* Phone Screen Mockup */}
              <div className="bg-slate-50 rounded-[40px] overflow-hidden aspect-[9/18] relative flex flex-col justify-between p-4 text-xs font-sans shadow-inner border border-slate-200">
                
                {/* Header App Bar */}
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-blue-50 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#000080] text-white flex items-center justify-center font-black text-xs shadow-md">
                      C
                    </div>
                    <div>
                      <p className="font-extrabold text-[#000080] leading-tight">Hola, Camila 👋</p>
                      <p className="text-[10px] text-slate-400 font-medium">¿A dónde vamos hoy?</p>
                    </div>
                  </div>
                  <span className="bg-blue-50 p-2 rounded-full text-[#000080] font-bold">📍</span>
                </div>

                {/* Map View Representation */}
                <div className="my-auto relative h-52 rounded-2xl bg-blue-100/50 overflow-hidden flex items-center justify-center border border-blue-200/60 shadow-inner">
                  {/* Grid Lines Map Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#000080_1.5px,transparent_1.5px)] [background-size:18px_18px] opacity-25"></div>
                  
                  {/* Route path glow */}
                  <div className="w-28 h-28 border-2 border-dashed border-[#db2392] rounded-full flex items-center justify-center relative animate-spin-slow">
                    <span className="w-4 h-4 rounded-full bg-[#db2392] absolute -top-2 shadow-lg shadow-pink-500/50 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    </span>
                    <span className="w-4 h-4 rounded-full bg-[#000080] absolute -bottom-2 shadow-lg shadow-blue-500/50"></span>
                  </div>

                  <div className="absolute bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg text-[10px] font-extrabold text-[#000080] flex items-center gap-1.5 border border-blue-100">
                    <MapPin size={12} className="text-[#db2392]" />
                    <span>Av. Providencia 123</span>
                  </div>
                </div>

                {/* Car Selector Options */}
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-blue-50 flex flex-col gap-2">
                  
                  <button 
                    onClick={() => setSelectedVehicle('car')}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${selectedVehicle === 'car' ? 'bg-pink-50/80 border-[#db2392] shadow-sm' : 'border-gray-100 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Image src="/images/Icon-GetGoCar.png" width={32} height={22} alt="GetGo Car" className="object-contain" />
                      <div>
                        <p className="font-extrabold text-[#000080] text-[11px]">GetGo Car</p>
                        <p className="text-[9px] text-slate-500 font-medium">Llega en 3 min</p>
                      </div>
                    </div>
                    <span className="font-black text-[#db2392] text-xs">$2.500</span>
                  </button>

                  <button 
                    onClick={() => setSelectedVehicle('comfort')}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${selectedVehicle === 'comfort' ? 'bg-pink-50/80 border-[#db2392] shadow-sm' : 'border-gray-100 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Image src="/images/Icon-GetGoTaxi.png" width={32} height={22} alt="GetGo Comfort" className="object-contain" />
                      <div>
                        <p className="font-extrabold text-slate-800 text-[11px]">GetGo Comfort</p>
                        <p className="text-[9px] text-slate-400 font-medium">Llega en 5 min</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#000080] text-xs">$3.200</span>
                  </button>

                </div>

              </div>
            </motion.div>

            {/* Floating Card 1: Top Right */}
            <motion.div 
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -top-6 -right-2 sm:right-2 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl z-20 border border-pink-100 flex flex-col gap-1.5 max-w-[220px] animate-float-slow"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#000080]">
                <Sparkles size={14} className="text-[#db2392]" />
                <span>¡Tu amigo realizó su primer viaje!</span>
              </div>
              <span className="text-2xl font-black text-[#db2392] tracking-tight">+$2.500</span>
              <div className="border-t border-slate-100 pt-2 mt-0.5 flex justify-between items-center text-[10px]">
                <span className="text-slate-400 font-medium">Saldo total</span>
                <span className="font-black text-[#000080] text-xs">$18.000 CLP</span>
              </div>
            </motion.div>

            {/* Floating Card 2: Bottom Left */}
            <motion.div 
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-2 -left-2 sm:left-2 bg-[#000080] text-white p-4 rounded-2xl shadow-2xl z-20 border border-blue-700/80 flex flex-col gap-1 min-w-[210px] animate-float-reverse"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-blue-200 font-semibold uppercase tracking-wider">Has invitado</span>
                <Coins size={14} className="text-[#f7da3a]" />
              </div>
              <span className="text-xl font-black text-white">24 amigos</span>
              
              <div className="my-1.5 border-t border-blue-700/80"></div>

              <span className="text-[10px] text-blue-200 font-semibold">Ganancias totales</span>
              <span className="text-2xl font-black text-[#f7da3a] tracking-tight">$96.000 CLP</span>

              {/* Avatars */}
              <div className="flex items-center mt-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="w-6 h-6 rounded-full border-2 border-[#000080] bg-slate-300 flex items-center justify-center text-[9px] font-bold text-slate-700">M</div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#000080] bg-pink-400 flex items-center justify-center text-[9px] font-bold text-white">C</div>
                  <div className="w-6 h-6 rounded-full border-2 border-[#000080] bg-blue-400 flex items-center justify-center text-[9px] font-bold text-white">J</div>
                </div>
                <span className="text-[10px] font-extrabold text-[#f7da3a] ml-2.5">+21 más</span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* EMPRESAS QUE CONFIAN EN NOSOTROS */}
      <section className="border-y border-blue-100/70 bg-white py-9">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs md:text-sm font-extrabold text-[#000080] tracking-wide max-w-[180px] leading-tight text-center md:text-left uppercase">
            Confían en nuestra plataforma
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 sm:gap-12 md:gap-16 opacity-80 hover:opacity-100 transition-opacity">
            <span className="text-2xl font-black text-blue-900 italic tracking-tighter hover:scale-105 transition-transform cursor-pointer">lider</span>
            <span className="text-2xl font-extrabold text-cyan-600 tracking-tight hover:scale-105 transition-transform cursor-pointer">sura</span>
            <span className="text-2xl font-black text-[#000080] tracking-tighter hover:scale-105 transition-transform cursor-pointer">Bci</span>
            <span className="text-2xl font-black text-blue-950 tracking-wider hover:scale-105 transition-transform cursor-pointer">COPEC</span>
            <span className="text-2xl font-bold text-emerald-600 tracking-tight hover:scale-105 transition-transform cursor-pointer">falabella</span>
            <span className="text-lg font-black text-rose-700 tracking-widest hover:scale-105 transition-transform cursor-pointer">LATAM</span>
          </div>
        </div>
      </section>

      {/* ¿CÓMO FUNCIONA? */}
      <section id="pasajeros" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-[#db2392] uppercase bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100">
              Paso a Paso
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#000080] mt-4 tracking-tight">
              ¿Cómo funciona GetGo?
            </h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base mt-2">
              Comenzar a viajar y ganar recompensas es rápido y sencillo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {[
              {
                icon: <Smartphone size={26} className="text-[#000080]" />,
                num: "01",
                title: "Descarga la app",
                desc: "Disponible gratis en Google Play y App Store. Crea tu cuenta en menos de 1 minuto."
              },
              {
                icon: <UserPlus size={26} className="text-[#db2392]" />,
                num: "02",
                title: "Invita a tus amigos",
                desc: "Comparte tu código único por WhatsApp, redes sociales o en persona."
              },
              {
                icon: <Car size={26} className="text-[#000080]" />,
                num: "03",
                title: "Ellos realizan su viaje",
                desc: "Tu invitado realiza su primer recorrido seguro con nuestros conductores."
              },
              {
                icon: <Wallet size={26} className="text-[#db2392]" />,
                num: "04",
                title: "¡Tú ganas en saldo!",
                desc: "Recibes $2.500 CLP directamente en tu saldo GetGo para futuros viajes."
              }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className="bg-[#f4f9fd] rounded-3xl p-7 border border-blue-100/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start relative group"
              >
                {/* Step Number Badge */}
                <span className="absolute top-6 right-6 font-black text-2xl text-slate-300 group-hover:text-[#db2392] transition-colors">
                  {step.num}
                </span>

                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 border border-blue-100 shadow-md group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>

                <h3 className="font-black text-[#000080] text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* PROGRAMA DE REFERIDOS (CARD + STATS) */}
      <section id="referidos" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Main Container */}
          <div className="bg-gradient-to-br from-[#f4f9fd] via-[#eaf4fc] to-[#f4f9fd] rounded-[40px] p-8 md:p-14 border border-blue-100/90 shadow-lg relative overflow-hidden">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/30 blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Left Column */}
              <div className="lg:col-span-6">
                <span className="text-[11px] font-black tracking-widest text-[#000080] uppercase bg-white px-4 py-2 rounded-full mb-4 inline-block border border-blue-200/80 shadow-sm">
                  Programa de Referidos GetGo
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#000080] leading-tight mb-4 tracking-tight">
                  Invita a tus amigos.<br />
                  <span className="text-gradient-pink">Tú ganas siempre.</span>
                </h2>

                <p className="text-slate-600 text-base md:text-lg font-medium mb-8 max-w-md">
                  Por cada persona que se registre con tu código y complete su primer viaje, recibes dinero directo a tu saldo.
                </p>

                <a 
                  href="#calculadora" 
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#db2392] to-[#ff46b0] hover:from-[#b81b7a] hover:to-[#db2392] text-white px-7 py-4 rounded-full font-extrabold text-sm shadow-pink-glow transition-all transform hover:-translate-y-0.5 mb-10"
                >
                  <span>Calcula tus ganancias</span>
                  <ChevronRight size={18} />
                </a>

                {/* 3 Step Flow Subcards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#000080] flex items-center justify-center font-bold mb-3">
                      <Share2 size={20} />
                    </div>
                    <h4 className="font-extrabold text-xs text-[#000080] mb-1">1. Comparte tu código</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Vía WhatsApp, Instagram o Link directo.</p>
                  </div>

                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#db2392] flex items-center justify-center font-bold mb-3">
                      <Car size={20} />
                    </div>
                    <h4 className="font-extrabold text-xs text-[#000080] mb-1">2. Tu amigo viaja</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Realiza su primer viaje en la plataforma.</p>
                  </div>

                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-3">
                      <Gift size={20} />
                    </div>
                    <h4 className="font-extrabold text-xs text-[#000080] mb-1">3. Recompensa lista</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Acreditada de inmediato a tu app.</p>
                  </div>

                </div>
              </div>

              {/* Right Column - Smartphone Preview */}
              <div className="lg:col-span-6 flex justify-center relative">
                
                <div className="w-[260px] sm:w-[290px] bg-[#000080] p-3.5 rounded-[45px] shadow-2xl border-4 border-blue-900 glow-blue">
                  <div className="bg-white rounded-[35px] p-5 aspect-[9/18] flex flex-col justify-between text-xs font-sans">
                    
                    <div className="flex items-center justify-between font-extrabold text-[#000080] pb-3 border-b border-gray-100">
                      <span>Resumen de Referidos</span>
                      <span className="bg-pink-100 text-[#db2392] text-[9px] px-2 py-0.5 rounded-full font-bold">Activo</span>
                    </div>

                    <div className="bg-gradient-to-br from-[#db2392] to-[#b81b7a] text-white p-4 rounded-2xl shadow-lg">
                      <p className="text-[10px] text-pink-100 font-semibold">Ganancias totales acumuladas</p>
                      <p className="text-3xl font-black my-1 tracking-tight">$96.000 CLP</p>
                      <span className="text-[9px] text-pink-200 underline font-medium">Ver historial de retiros &gt;</span>
                    </div>

                    <div className="space-y-2.5">
                      <p className="font-extrabold text-[#000080] text-[11px]">Estadísticas del mes</p>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-[#f4f9fd] p-2.5 rounded-xl border border-blue-100">
                          <p className="text-[9px] text-slate-400 font-medium">Invitados</p>
                          <p className="font-black text-[#000080] text-base">24</p>
                        </div>
                        <div className="bg-[#f4f9fd] p-2.5 rounded-xl border border-blue-100">
                          <p className="text-[9px] text-slate-400 font-medium">Completados</p>
                          <p className="font-black text-[#000080] text-base">23</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 p-3 rounded-xl border border-pink-100 flex justify-between items-center">
                      <div>
                        <p className="text-[9px] text-pink-800 font-bold">Próxima recompensa</p>
                        <p className="font-black text-[#db2392]">$2.500 CLP</p>
                      </div>
                      <ChevronRight size={16} className="text-[#db2392]" />
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Stats Full Banner */}
          <div className="bg-[#000080] text-white rounded-3xl p-8 md:p-10 mt-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left shadow-2xl border border-blue-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <p className="text-3xl md:text-4xl font-black text-[#f7da3a] mb-1 tracking-tight">+28.000</p>
              <p className="text-xs text-blue-200 font-medium leading-snug">personas ya ganan<br />con referidos en Chile</p>
            </div>
            <div className="relative z-10">
              <p className="text-3xl md:text-4xl font-black text-[#f7da3a] mb-1 tracking-tight">$12.500.000+</p>
              <p className="text-xs text-blue-200 font-medium leading-snug">entregados en<br />recompensas reales</p>
            </div>
            <div className="relative z-10">
              <p className="text-3xl md:text-4xl font-black text-[#f7da3a] mb-1 tracking-tight">$2.500 CLP</p>
              <p className="text-xs text-blue-200 font-medium leading-snug">abono directo por<br />amigo invitado</p>
            </div>
            <div className="relative z-10">
              <p className="text-3xl md:text-4xl font-black text-[#f7da3a] mb-1 tracking-tight">100%</p>
              <p className="text-xs text-blue-200 font-medium leading-snug">transparencia y<br />pagos garantizados</p>
            </div>
          </div>

        </div>
      </section>

      {/* CALCULATOR & PROMOS */}
      <section id="calculadora" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Calculator */}
          <div className="lg:col-span-7 bg-[#f4f9fd] rounded-3xl p-8 md:p-10 border border-blue-100 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={20} className="text-[#db2392]" />
                <span className="text-xs font-black text-[#db2392] uppercase tracking-wider">Simulador interactivo</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-[#000080] mb-2 tracking-tight">
                ¿Cuánto puedes ganar invitando amigos?
              </h3>
              <p className="text-slate-500 text-sm font-medium mb-8">
                Desliza la barra para calcular tus ingresos estimados en saldo GetGo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
                
                {/* Slider Control */}
                <div className="sm:col-span-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-[#000080]">Amigos invitados</span>
                    <span className="bg-white text-[#000080] font-black text-xl px-4 py-1.5 rounded-xl border border-blue-200 shadow-sm">
                      {friendsCount}
                    </span>
                  </div>

                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={friendsCount}
                    onChange={(e) => setFriendsCount(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#db2392]"
                  />

                  <div className="flex justify-between text-[11px] text-slate-400 font-extrabold mt-2">
                    <span>1 amigo</span>
                    <span>50 amigos</span>
                  </div>
                </div>

                {/* Earnings Display Card */}
                <div className="sm:col-span-6 bg-gradient-to-br from-[#db2392] to-[#b81b7a] text-white rounded-2xl p-6 shadow-pink-glow relative overflow-hidden flex flex-col justify-between min-h-[170px]">
                  <div>
                    <p className="text-xs text-pink-100 font-bold mb-1 uppercase tracking-wider">Tus ganancias estimadas</p>
                    <p className="text-4xl font-black text-white tracking-tight">${estimatedEarnings.toLocaleString('es-CL')} CLP</p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-3 border-t border-pink-400/40">
                    <p className="text-[11px] text-pink-100 font-medium leading-tight">Sin límite de invitados. ¡Invita a más y gana más!</p>
                    <Coins size={28} className="text-[#f7da3a] shrink-0 ml-2" />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right: Promos Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#000080] to-blue-950 text-white rounded-3xl p-8 md:p-10 shadow-xl border border-blue-900 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#f7da3a] flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                <Gift size={32} />
              </div>

              <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                Bonos extra y promociones semanales
              </h3>
              <p className="text-blue-200 text-sm font-medium leading-relaxed mb-6">
                Además de tus ganancias por referidos, participa en desafíos semanales para multiplicar tu saldo y obtener viajes gratis.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <Sparkles size={22} className="text-[#f7da3a] shrink-0" />
              <p className="text-xs text-blue-100 font-bold">¡Activa tus notificaciones en la app para no perderte ningún bono!</p>
            </div>
          </div>

        </div>
      </section>

      {/* VIAJES PARA CADA MOMENTO (SERVICES) */}
      <section id="servicios" className="py-24 bg-[#f4f9fd] border-t border-blue-100/70">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14">
            <div>
              <span className="text-xs font-black tracking-widest text-[#000080] uppercase bg-white px-4 py-1.5 rounded-full border border-blue-200/80 shadow-sm">
                Nuestra Flota
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#000080] mt-3 tracking-tight">
                Viajes para cada momento
              </h2>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Elige la opción que mejor se adapte a tus necesidades de traslado.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 3 Fleet Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* GetGo Car */}
              <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="h-32 relative mb-4 group-hover:scale-105 transition-transform duration-300">
                    <Image src="/images/Icon-GetGoCar.png" alt="GetGo Car" fill className="object-contain" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    Más Económico
                  </span>
                  <h3 className="font-black text-[#000080] text-lg mt-3 mb-1">
                    GetGo Car
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mb-4">Autos modernos para tus trayectos diarios en la ciudad.</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-400 font-bold block">Tarifa estimada</span>
                  <p className="text-[#db2392] font-black text-lg">Desde $2.500 CLP</p>
                </div>
              </div>

              {/* GetGo Comfort */}
              <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="h-32 relative mb-4 group-hover:scale-105 transition-transform duration-300">
                    <Image src="/images/Icon-GetGoTaxi.png" alt="GetGo Comfort" fill className="object-contain" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    Mayor Comodidad
                  </span>
                  <h3 className="font-black text-[#000080] text-lg mt-3 mb-1">
                    GetGo Comfort
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mb-4">Modelos sedán de alta gama con máxima amplitud y confort.</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-400 font-bold block">Tarifa estimada</span>
                  <p className="text-[#db2392] font-black text-lg">Desde $3.200 CLP</p>
                </div>
              </div>

              {/* GetGo XL */}
              <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="h-32 relative mb-4 group-hover:scale-105 transition-transform duration-300">
                    <Image src="/images/Icon-GetGoXL.png" alt="GetGo XL" fill className="object-contain" />
                  </div>
                  <span className="text-[10px] font-bold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100">
                    Para Grupos
                  </span>
                  <h3 className="font-black text-[#000080] text-lg mt-3 mb-1">
                    GetGo XL
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mb-4">Vehículos espaciosos para hasta 6 pasajeros y equipaje.</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-400 font-bold block">Tarifa estimada</span>
                  <p className="text-[#db2392] font-black text-lg">Desde $4.500 CLP</p>
                </div>
              </div>

            </div>

            {/* Right Features List */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-7 border border-blue-100 shadow-sm flex flex-col gap-6">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#000080] flex items-center justify-center shrink-0 border border-blue-100">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-black text-[#000080] text-base mb-1">Viajes 100% seguros</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Conductores rigurosamente verificados y monitoreo en tiempo real por GPS.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#db2392] flex items-center justify-center shrink-0 border border-pink-100">
                  <Wallet size={24} />
                </div>
                <div>
                  <h4 className="font-black text-[#000080] text-base mb-1">Múltiples medios de pago</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Paga con tarjetas de débito/crédito, efectivo o mediante tu saldo de referidos.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0 border border-cyan-100">
                  <Headphones size={24} />
                </div>
                <div>
                  <h4 className="font-black text-[#000080] text-base mb-1">Soporte 24/7 en Chile</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Atención rápida y personalizada ante cualquier consulta o eventualidad.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* TESTIMONIALS & DRIVER CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-[#000080] uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
              Comunidad GetGo
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#000080] mt-3 tracking-tight">
              Ellos ya están ganando con GetGo
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Carousel Cards */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              
              <div className="bg-[#f4f9fd] rounded-3xl p-8 md:p-10 border border-blue-100 shadow-md relative min-h-[250px] flex flex-col justify-between">
                
                <p className="text-slate-800 font-semibold text-lg sm:text-xl italic leading-relaxed mb-8">
                  {testimonials[activeTestimonial].text}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-blue-100">
                  
                  <div className="flex items-center gap-3.5">
                    <img 
                      src={testimonials[activeTestimonial].avatar} 
                      alt={testimonials[activeTestimonial].name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#db2392] shadow-sm"
                    />
                    <div>
                      <p className="font-black text-[#000080] text-base">{testimonials[activeTestimonial].name}</p>
                      <p className="text-xs text-slate-400 font-bold">{testimonials[activeTestimonial].city}</p>
                    </div>
                  </div>

                  <div className="bg-pink-100 text-[#db2392] font-black text-xs px-4 py-2 rounded-full border border-pink-200 shadow-sm">
                    {testimonials[activeTestimonial].earned} ganados
                  </div>

                </div>

              </div>

              {/* Carousel Controls */}
              <div className="flex items-center justify-between mt-6 px-2">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={prevTestimonial}
                    className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#000080] hover:bg-blue-50 transition-colors shadow-sm"
                    aria-label="Anterior testimonio"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  
                  <button 
                    onClick={nextTestimonial}
                    className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#000080] hover:bg-blue-50 transition-colors shadow-sm"
                    aria-label="Siguiente testimonio"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>

                <span className="text-xs font-black text-slate-400">
                  {activeTestimonial + 1} de {testimonials.length}
                </span>
              </div>

            </div>

            {/* Right Side: Driver CTA Card with Store Badges */}
            <div id="conductores" className="lg:col-span-5 bg-gradient-to-br from-[#f4f9fd] via-white to-blue-50/50 rounded-3xl p-8 md:p-10 border border-blue-100 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-[#db2392] tracking-wider bg-pink-50 px-3 py-1 rounded-full border border-pink-100 mb-4 inline-block">
                  ¿Quieres ser Conductor Socio?
                </span>
                <h3 className="text-2xl font-black text-[#000080] mb-3 tracking-tight">
                  Maneja con GetGo y genera ingresos a tu propio ritmo
                </h3>
                <p className="text-slate-600 text-sm font-medium mb-8 leading-relaxed">
                  Excelentes tasas de comisión, soporte constante y pagos oportunos garantizados.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Google Play */}
                  <a 
                    href={storeLinks.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-950 hover:bg-slate-900 text-white px-5 py-3 rounded-xl flex items-center gap-3 shadow-md border border-slate-800 transition-transform hover:-translate-y-0.5"
                  >
                    <svg viewBox="0 0 512 512" className="w-5 h-5 shrink-0">
                      <path fill="#EA4335" d="M26.4 17.5c-4 4.5-6.4 11.2-6.4 19.8v437.4c0 8.6 2.4 15.3 6.4 19.8l1.1 1.1L279.7 243.3 27.5 16.4l-1.1 1.1z"/>
                      <path fill="#FBBC04" d="M363.8 327.4l-84.1-84.1v-3.7l84.1-84.1 1.1.6 99.7 56.7c28.5 16.2 28.5 42.7 0 58.9l-99.7 56.7-1.1-.6z"/>
                      <path fill="#4285F4" d="M279.7 243.3L26.4 495.6c9.3 9.9 24.6 11.1 41.5 1.5l295.9-168.3-84.1-85.5z"/>
                      <path fill="#34A853" d="M279.7 243.3L363.8 159 67.9 14.9C51 5.3 35.7 6.5 26.4 16.4l253.3 226.9z"/>
                    </svg>
                    <div className="flex flex-col text-left leading-tight">
                      <span className="text-[8px] text-slate-300 font-bold uppercase">DISPONIBLE EN</span>
                      <span className="text-xs font-black">Google Play</span>
                    </div>
                  </a>

                  {/* App Store */}
                  <a 
                    href={storeLinks.apple}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-950 hover:bg-slate-900 text-white px-5 py-3 rounded-xl flex items-center gap-3 shadow-md border border-slate-800 transition-transform hover:-translate-y-0.5"
                  >
                    <svg viewBox="0 0 170 170" className="w-5 h-5 fill-white shrink-0">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.9-14.4-6.07-3.69-3.04-7.69-7.85-12.01-14.43-5.26-8.02-9.4-16.92-12.43-26.7-3.03-9.78-4.55-19.14-4.55-28.08 0-12.74 3.09-23.32 9.27-31.75 6.18-8.43 14.07-12.7 23.68-12.83 4.58 0 9.56 1.15 14.94 3.44 5.38 2.29 9.17 3.44 11.37 3.44 1.95 0 5.8-1.22 11.55-3.66 5.75-2.44 10.66-3.57 14.73-3.39 10.29.5 18.73 4.3 25.32 11.4-9.15 5.53-13.62 13.15-13.41 22.86.21 7.64 3.12 14.15 8.73 19.53 5.61 5.38 12.38 8.43 20.31 9.15-1.95 5.66-4.37 11.27-7.26 16.83zM119.22 31.06c0-6.18 2.29-12.04 6.87-17.58 4.58-5.54 10.19-8.73 16.83-9.57.13.91.2 1.76.2 2.55 0 6.05-2.31 11.96-6.93 17.73-4.62 5.77-10.28 8.98-16.97 9.63-.07-.63-.1-1.2-.1-1.76z"/>
                    </svg>
                    <div className="flex flex-col text-left leading-tight">
                      <span className="text-[8px] text-slate-300 font-bold uppercase">Consíguelo en el</span>
                      <span className="text-xs font-black">App Store</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Image src="/images/Icon-GetGoCar.png" width={140} height={70} alt="GetGo App" className="object-contain" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#000080] via-blue-900 to-[#000080] text-white rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl border border-blue-900">
            
            {/* Background Lighting Details */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#db2392]/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-xl text-center md:text-left z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Viaja. Invita. Gana.
              </h2>
              <p className="text-blue-100 text-base md:text-lg font-medium leading-relaxed">
                Únete hoy a miles de usuarios que ya disfrutan de los mejores viajes y generan ganancias adicionales en Chile.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto z-10">
              {/* Google Play */}
              <a 
                href={storeLinks.google}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 hover:bg-slate-900 text-white px-6 py-3.5 rounded-2xl flex items-center justify-center gap-3.5 shadow-xl border border-slate-800 transition-all transform hover:-translate-y-1"
              >
                <svg viewBox="0 0 512 512" className="w-7 h-7 shrink-0">
                  <path fill="#EA4335" d="M26.4 17.5c-4 4.5-6.4 11.2-6.4 19.8v437.4c0 8.6 2.4 15.3 6.4 19.8l1.1 1.1L279.7 243.3 27.5 16.4l-1.1 1.1z"/>
                  <path fill="#FBBC04" d="M363.8 327.4l-84.1-84.1v-3.7l84.1-84.1 1.1.6 99.7 56.7c28.5 16.2 28.5 42.7 0 58.9l-99.7 56.7-1.1-.6z"/>
                  <path fill="#4285F4" d="M279.7 243.3L26.4 495.6c9.3 9.9 24.6 11.1 41.5 1.5l295.9-168.3-84.1-85.5z"/>
                  <path fill="#34A853" d="M279.7 243.3L363.8 159 67.9 14.9C51 5.3 35.7 6.5 26.4 16.4l253.3 226.9z"/>
                </svg>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[9px] text-slate-300 font-bold tracking-wider uppercase">DISPONIBLE EN</span>
                  <span className="text-base font-black tracking-tight">Google Play</span>
                </div>
              </a>
              
              {/* App Store */}
              <a 
                href={storeLinks.apple}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 hover:bg-slate-900 text-white px-6 py-3.5 rounded-2xl flex items-center justify-center gap-3.5 shadow-xl border border-slate-800 transition-all transform hover:-translate-y-1"
              >
                <svg viewBox="0 0 170 170" className="w-7 h-7 fill-white shrink-0">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.9-14.4-6.07-3.69-3.04-7.69-7.85-12.01-14.43-5.26-8.02-9.4-16.92-12.43-26.7-3.03-9.78-4.55-19.14-4.55-28.08 0-12.74 3.09-23.32 9.27-31.75 6.18-8.43 14.07-12.7 23.68-12.83 4.58 0 9.56 1.15 14.94 3.44 5.38 2.29 9.17 3.44 11.37 3.44 1.95 0 5.8-1.22 11.55-3.66 5.75-2.44 10.66-3.57 14.73-3.39 10.29.5 18.73 4.3 25.32 11.4-9.15 5.53-13.62 13.15-13.41 22.86.21 7.64 3.12 14.15 8.73 19.53 5.61 5.38 12.38 8.43 20.31 9.15-1.95 5.66-4.37 11.27-7.26 16.83zM119.22 31.06c0-6.18 2.29-12.04 6.87-17.58 4.58-5.54 10.19-8.73 16.83-9.57.13.91.2 1.76.2 2.55 0 6.05-2.31 11.96-6.93 17.73-4.62 5.77-10.28 8.98-16.97 9.63-.07-.63-.1-1.2-.1-1.76z"/>
                </svg>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[9px] text-slate-300 font-bold tracking-wider uppercase">Consíguelo en el</span>
                  <span className="text-base font-black tracking-tight">App Store</span>
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#000080] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10 text-center">
          
          <Image
            src="/images/GetGo_Logo-Negative.png"
            alt="GetGo Logo Negative"
            width={150}
            height={50}
            className="w-36 h-auto opacity-95"
          />

          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-blue-100">
            <a href="#pasajeros" className="hover:text-[#f7da3a] transition-colors">Pasajeros</a>
            <a href="#conductores" className="hover:text-[#f7da3a] transition-colors">Conductores</a>
            <a href="#referidos" className="hover:text-[#f7da3a] transition-colors">Programa de Referidos</a>
            <a href="#servicios" className="hover:text-[#f7da3a] transition-colors">Servicios</a>
            <a href="/about-us" className="hover:text-[#f7da3a] transition-colors">Nosotros</a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {[
              { name: "TikTok", icon: "tiktok", link: "https://www.tiktok.com/@getgo.chile" },
              { name: "Instagram", icon: "insta", link: "https://www.instagram.com/getgo.cl" },
              { name: "Facebook", icon: "f", link: "https://www.facebook.com/GetGoAppCL" },
              { name: "Twitter/X", icon: "x", link: "https://x.com/GetGoCL" },
            ].map((social, index) => (
              <a 
                key={index} 
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={social.name}
                className="bg-white/10 hover:bg-[#db2392] p-3.5 rounded-2xl transition-all duration-300 border border-white/10 shadow-sm"
              >
                <Image src={`/images/${social.icon}.png`} alt={social.name} width={20} height={20} className="w-5 h-5 invert brightness-0" />
              </a>
            ))}
          </div>

          <div className="border-t border-blue-900/90 w-full pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-blue-200/80 font-medium">
            <p>Todos los derechos reservados GetGo® 2026</p>
            <div className="flex gap-6 mt-4 md:mt-0 font-semibold">
              <a href="/legal" className="hover:text-white hover:underline transition-colors">Términos y condiciones</a>
              <a href="/legal" className="hover:text-white hover:underline transition-colors">Política de privacidad</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
