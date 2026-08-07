/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  ShieldCheck, 
  Wallet, 
  Headphones, 
  Gift, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  DollarSign,
  Zap
} from "lucide-react";

export default function Conductores() {
  const [weeklyHours, setWeeklyHours] = useState(25);

  // Estimación de ganancias promedio para conductores en Chile
  const estimatedWeeklyEarnings = weeklyHours * 13500;
  const estimatedMonthlyEarnings = estimatedWeeklyEarnings * 4;

  const storeLinks = {
    apple: "https://apps.apple.com/cl/app/id6748690795",
    google: "https://play.google.com/store/apps/details?id=com.getgoapp.pasajero"
  };

  const driverBenefits = [
    {
      icon: <DollarSign className="w-8 h-8 text-[#db2392]" />,
      title: "Comisiones más bajas",
      description: "Nos aseguramos de que te quedes con la mayor parte del dinero de cada viaje. Sin cobros sorpresa ni comisiones abusivas."
    },
    {
      icon: <Gift className="w-8 h-8 text-[#000080]" />,
      title: "Bonos por Referidos",
      description: "Gana dinero extra invitando a otros conductores a unirse a la plataforma y por recomendar pasajeros."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#db2392]" />,
      title: "Viajes 100% Seguros",
      description: "Todos los pasajeros registrados están verificados con su identidad. Monitoreo por GPS y botón SOS 24/7 en la app."
    },
    {
      icon: <Wallet className="w-8 h-8 text-[#000080]" />,
      title: "Pagos Puntuales",
      description: "Recibe tus ganancias netas semanales directo en tu cuenta bancaria o cuenta RUT de forma garantizada."
    },
    {
      icon: <Clock className="w-8 h-8 text-[#db2392]" />,
      title: "Flexibilidad Total",
      description: "Sé tu propio jefe. Tú decides los días, horarios y la cantidad de horas que deseas conectarte a manejar."
    },
    {
      icon: <Headphones className="w-8 h-8 text-[#000080]" />,
      title: "Soporte Humano en Chile",
      description: "Contamos con un equipo local listo para atender tus dudas y darte asistencia rápida cuando estés en la ruta."
    }
  ];

  const requirements = [
    {
      num: "01",
      title: "Cédula de Identidad",
      desc: "Carnet chileno vigente (titular)."
    },
    {
      num: "02",
      title: "Licencia de Conducir",
      desc: "Licencia Clase A2 o Clase B chilena al día."
    },
    {
      num: "03",
      title: "Certificado de Antecedentes",
      desc: "Sin anotaciones relativas a delitos."
    },
    {
      num: "04",
      title: "Documentación del Vehículo",
      desc: "Padrón, Permiso de Circulación y SOAP al día."
    }
  ];

  const driverTestimonials = [
    {
      text: '"Llevo 6 meses manejando en GetGo. La diferencia en la comisión se nota de inmediato al final del mes. Los pagos llegan siempre el día exacto."',
      name: "Rodrigo M.",
      city: "Santiago",
      time: "Conductor GetGo Comfort",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    {
      text: '"Lo que más me gusta es el programa de referidos. He invitado a 4 colegas del gremio y recibo bonos extra todos los meses."',
      name: "Gonzalo V.",
      city: "Concepción",
      time: "Conductor GetGo Car",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f9fd] text-slate-900 font-sans selection:bg-pink-100 selection:text-[#db2392]">
      


      {/* HERO SECTION FOR DRIVERS */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 bg-gradient-to-b from-[#f4f9fd] via-[#eaf4fc] to-white relative overflow-hidden">
        
        {/* Ambient Glowing Blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-blue-300/30 via-pink-200/20 to-cyan-200/30 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 text-left">
            
            <div className="inline-flex items-center gap-2.5 bg-white/90 backdrop-blur-md text-[#000080] px-4 py-2 rounded-full text-xs md:text-sm font-extrabold mb-6 border border-blue-200/80 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#db2392] animate-ping"></span>
              <span>Conductores Socios GetGo 🇨🇱</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#000080] leading-[1.12] tracking-tight mb-6">
              Maneja con GetGo y <span className="text-gradient-pink">toma el control</span> de tus ingresos.
            </h1>

            <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed max-w-xl mb-8">
              La plataforma de movilidad en Chile pensada para el conductor: las comisiones más competitivas del mercado, soporte humano local y ganancias garantizadas.
            </p>

            {/* Quick Benefits Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-8 max-w-lg">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-blue-100 shadow-sm">
                <Zap size={18} className="text-[#db2392] shrink-0" />
                <span className="text-xs font-black text-[#000080]">Menos comisión por viaje</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-blue-100 shadow-sm">
                <Wallet size={18} className="text-[#000080] shrink-0" />
                <span className="text-xs font-black text-[#000080]">Pagos semanales puntuales</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-blue-100 shadow-sm">
                <ShieldCheck size={18} className="text-[#db2392] shrink-0" />
                <span className="text-xs font-black text-[#000080]">Botón SOS y GPS 24/7</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-blue-100 shadow-sm">
                <Gift size={18} className="text-[#000080] shrink-0" />
                <span className="text-xs font-black text-[#000080]">Bonos por referir colegas</span>
              </div>
            </div>

            {/* Download and Register Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={storeLinks.google}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#db2392] to-[#ff46b0] hover:from-[#b81b7a] hover:to-[#db2392] text-white px-7 py-4 rounded-full font-black text-sm shadow-pink-glow transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Sparkles size={18} />
                <span>Registrarme como Conductor</span>
              </a>
            </div>

          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <div className="relative w-full max-w-[420px] bg-white p-4 rounded-3xl border border-blue-100 shadow-2xl overflow-hidden group">
              <div className="relative h-[380px] w-full rounded-2xl overflow-hidden mb-4">
                <Image
                  src="/images/header-pasajeros-banner.png"
                  alt="Conductor GetGo Chile"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000080]/80 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="bg-[#db2392] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full mb-1 inline-block">
                    Conductor Socio
                  </span>
                  <p className="font-black text-lg">Maneja a tu ritmo y gana más</p>
                  <p className="text-xs text-blue-100 font-medium">Únete a la comunidad de transporte líder en Chile</p>
                </div>
              </div>

              {/* Stat Highlight Card */}
              <div className="bg-gradient-to-r from-[#000080] to-blue-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
                <div>
                  <p className="text-[10px] text-blue-200 font-bold uppercase">Comisión Promedio</p>
                  <p className="text-2xl font-black text-[#f7da3a]">Solo 15%</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-blue-200 font-bold uppercase">Satisfacción</p>
                  <p className="text-2xl font-black text-white">4.9 / 5.0 ⭐</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* BENEFICIOS DESTACADOS GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-[#db2392] uppercase bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100">
              Ventajas Exclusivas
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#000080] mt-3 tracking-tight">
              ¿Por qué elegir GetGo Conductor?
            </h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base mt-2">
              Diseñamos nuestra aplicación pensando en lo que verdaderamente le importa a un conductor en Chile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {driverBenefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-[#f4f9fd] rounded-3xl p-8 border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 border border-blue-100 shadow-sm group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>

                  <h3 className="text-xl font-black text-[#000080] mb-2 group-hover:text-[#db2392] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SIMULADOR DE GANANCIAS PARA CONDUCTORES */}
      <section className="py-20 bg-[#f4f9fd] border-t border-blue-100/80">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="bg-white rounded-[40px] p-8 md:p-14 border border-blue-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Calculator Controls */}
            <div className="lg:col-span-7">
              <span className="text-xs font-black tracking-widest text-[#000080] uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-4 inline-block">
                Simulador de Ingresos
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#000080] tracking-tight mb-3">
                Calcula cuánto podrías ganar
              </h2>
              <p className="text-slate-500 text-sm font-medium mb-8">
                Elige la cantidad de horas semanales que te gustaría manejar y mira tu estimación mensual aproximada.
              </p>

              {/* Range Slider */}
              <div className="mb-8 bg-[#f4f9fd] p-6 rounded-2xl border border-blue-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black text-[#000080] uppercase">Horas a la semana</span>
                  <span className="bg-white text-[#db2392] font-black text-2xl px-5 py-1.5 rounded-xl border border-pink-200 shadow-sm">
                    {weeklyHours} hrs
                  </span>
                </div>

                <input 
                  type="range" 
                  min="10" 
                  max="50" 
                  step="5"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#db2392]"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-extrabold mt-3">
                  <span>10 hrs (Part-time)</span>
                  <span>50 hrs (Full-time)</span>
                </div>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#000080] via-blue-900 to-[#000080] text-white rounded-3xl p-8 shadow-2xl border border-blue-900 flex flex-col justify-between min-h-[300px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div>
                <p className="text-xs text-blue-200 font-bold uppercase tracking-wider mb-1">Ingreso semanal estimado</p>
                <p className="text-3xl font-black text-[#f7da3a] tracking-tight mb-6">
                  ${estimatedWeeklyEarnings.toLocaleString('es-CL')} CLP
                </p>

                <p className="text-xs text-blue-200 font-bold uppercase tracking-wider mb-1">Proyección mensual aproximada</p>
                <p className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  ${estimatedMonthlyEarnings.toLocaleString('es-CL')} CLP
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-blue-800 flex items-center justify-between text-xs text-blue-100 font-medium">
                <span>*Estimación basada en promedios de la red GetGo Chile.</span>
                <TrendingUp size={24} className="text-[#f7da3a] shrink-0" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* REQUISITOS PARA REGISTRARSE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-[#000080] uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
              Requisitos Simples
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#000080] mt-3 tracking-tight">
              Lo que necesitas para comenzar
            </h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base mt-2">
              Proceso de verificación rápido y 100% digital desde tu teléfono.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((req, idx) => (
              <div 
                key={idx} 
                className="bg-[#f4f9fd] rounded-3xl p-7 border border-blue-100/90 shadow-sm flex flex-col items-start relative group hover:shadow-lg transition-all"
              >
                <span className="font-black text-3xl text-slate-300 group-hover:text-[#db2392] transition-colors mb-4 block">
                  {req.num}
                </span>
                <h3 className="font-black text-[#000080] text-lg mb-2">
                  {req.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {req.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TESTIMONIOS CONDUCTORES */}
      <section className="py-20 bg-[#f4f9fd] border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-[#db2392] uppercase bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100">
              Experiencias Reales
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#000080] mt-3 tracking-tight">
              Lo que dicen nuestros conductores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {driverTestimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-blue-100 shadow-md flex flex-col justify-between">
                <p className="text-slate-800 font-semibold text-base md:text-lg italic leading-relaxed mb-6">
                  {testimonial.text}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#db2392]"
                  />
                  <div>
                    <p className="font-black text-[#000080] text-base">{testimonial.name}</p>
                    <p className="text-xs text-slate-400 font-bold">{testimonial.city} • {testimonial.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#000080] via-blue-900 to-[#000080] text-white rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl border border-blue-900">
            
            <div className="max-w-xl text-center md:text-left z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                ¡Empieza a manejar hoy!
              </h2>
              <p className="text-blue-100 text-base md:text-lg font-medium leading-relaxed">
                Descarga la aplicación oficial de Conductor GetGo y completa tu registro en pocos minutos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto z-10">
              <a 
                href={storeLinks.google}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-950 hover:bg-slate-900 text-white px-7 py-4 rounded-2xl flex items-center justify-center gap-3.5 shadow-xl border border-slate-800 transition-all transform hover:-translate-y-1 font-extrabold"
              >
                <Sparkles size={20} className="text-[#db2392]" />
                <span>Descargar App Conductor</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#000080] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10 text-center">
          
          <Link href="/">
            <Image
              src="/images/GetGo_Logo-Negative.png"
              alt="GetGo Logo Negative"
              width={150}
              height={50}
              className="w-36 h-auto opacity-95 hover:scale-105 transition-transform"
            />
          </Link>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-blue-100">
            <Link href="/" className="hover:text-[#f7da3a] transition-colors">Inicio</Link>
            <Link href="/conductores" className="text-[#f7da3a] transition-colors">Conductores</Link>
            <Link href="/about-us" className="hover:text-[#f7da3a] transition-colors">Nosotros</Link>
            <Link href="/#referidos" className="hover:text-[#f7da3a] transition-colors">Programa de Referidos</Link>
          </div>

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
