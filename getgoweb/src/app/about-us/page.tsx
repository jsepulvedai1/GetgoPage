/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Compass, HeartHandshake, Sparkles, Target, Award } from "lucide-react";

export default function AboutUs() {
  const objectives = [
    {
      iconPath: "/icons/Icon-Obj1-GetGo.png",
      lucideFallback: <Sparkles className="w-8 h-8 text-[#db2392]" />,
      title: "Soluciones Innovadoras",
      description: "Proporcionar soluciones de transporte personalizadas e innovadoras que conecten a las personas de forma segura y eficiente."
    },
    {
      iconPath: "/icons/Icon-Obj5-GetGo.png",
      lucideFallback: <HeartHandshake className="w-8 h-8 text-[#000080]" />,
      title: "Socios Sostenibles",
      description: "Inspirar y apoyar a nuestros conductores socios para que construyan negocios prósperos, dignos y sostenibles."
    },
    {
      iconPath: "/icons/Icon-Obj6-GetGo.png",
      lucideFallback: <Award className="w-8 h-8 text-[#db2392]" />,
      title: "Beneficios Únicos",
      description: "Entregar incentivos y beneficios reales tanto para conductores socios como para los pasajeros que nos eligen día a día."
    },
    {
      iconPath: "/icons/Icon-Obj2-GetGo.png",
      lucideFallback: <ShieldCheck className="w-8 h-8 text-[#000080]" />,
      title: "Transporte Confiable",
      description: "Ofrecer servicios de transporte con los más altos estándares de puntualidad, limpieza, comodidad y seguridad."
    },
    {
      iconPath: "/icons/Icon-Obj3-GetGo.png",
      lucideFallback: <Compass className="w-8 h-8 text-[#db2392]" />,
      title: "Seguridad Garantizada",
      description: "Mantener una plataforma moderna con monitoreo continuo para resguardar la tranquilidad de cada usuario en todo momento."
    },
    {
      iconPath: "/icons/Icon-Obj4-GetGo.png",
      lucideFallback: <Target className="w-8 h-8 text-[#000080]" />,
      title: "Experiencia Diferenciada",
      description: "Sorprender con una propuesta de valor única en Chile, recompensando la fidelidad y creando comunidad."
    }
  ];

  return (
    <div className="bg-[#f4f9fd] min-h-screen text-slate-900 font-sans selection:bg-pink-100 selection:text-[#db2392]">

      {/* HERO SECTION */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-24 bg-gradient-to-b from-[#f4f9fd] via-[#eaf4fc] to-white relative overflow-hidden text-center px-6">

        {/* Ambient Glowing Light */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-200/40 via-pink-200/20 to-cyan-200/30 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">

          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md text-[#000080] px-4 py-2 rounded-full text-xs md:text-sm font-extrabold mb-6 border border-blue-200/80 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#db2392] animate-ping"></span>
            <span>Sobre Nosotros 🇨🇱</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#000080] leading-[1.12] tracking-tight mb-6">
            Nuestra misión es hacer que <span className="text-gradient-pink">cada viaje cuente</span>.
          </h1>

          <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Somos la plataforma de movilidad chilena creada para conectar a personas y ciudades con tarifas transparentes, máxima seguridad y recompensas reales por cada comunidad que construimos.
          </p>

        </div>
      </section>

      {/* MISIÓN & VISIÓN SECTION */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

            {/* Card Misión */}
            <div className="bg-[#f4f9fd] rounded-3xl p-8 border border-blue-100/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="relative h-60 w-full mb-6 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="/images/header-pasajeros-banner.png"
                    alt="GetGo Movilidad Misión"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000080]/60 via-transparent to-transparent"></div>
                  <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-[#000080] font-black text-xs px-3 py-1.5 rounded-full border border-blue-100">
                    Nuestra Misión
                  </span>
                </div>

                <h2 className="text-2xl font-black text-[#000080] mb-3">
                  Conectar personas con seguridad y puntualidad
                </h2>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  "Conectar con personas para transportar con seguridad, eficiencia y puntualidad, entregando un servicio confiable que beneficie a pasajeros y conductores."
                </p>
              </div>
            </div>

            {/* Card Visión */}
            <div className="bg-[#f4f9fd] rounded-3xl p-8 border border-blue-100/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="relative h-60 w-full mb-6 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="/images/imagebar_reverse.webp"
                    alt="GetGo Visión Latinoamérica"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000080]/60 via-transparent to-transparent"></div>
                  <span className="absolute bottom-4 left-4 bg-[#db2392] text-white font-black text-xs px-3 py-1.5 rounded-full shadow-sm">
                    Nuestra Visión
                  </span>
                </div>

                <h2 className="text-2xl font-black text-[#000080] mb-3">
                  Liderar el transporte inteligente en la región
                </h2>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  "Liderar el transporte por aplicación en Latinoamérica, poniendo la seguridad, innovación y tecnología al servicio de nuestros socios y de un futuro más conectado.”
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* LOS OBJETIVOS QUE NOS GUÍAN */}
      <section className="py-20 px-6 bg-[#f4f9fd] border-t border-blue-100/80">
        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black tracking-widest text-[#db2392] uppercase bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100">
              Nuestros Valores
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#000080] mt-3 tracking-tight">
              Los objetivos que nos guían
            </h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base mt-2">
              Principios fundamentales que impulsan cada decisión en GetGo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {objectives.map((obj, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start group"
              >
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-[#f4f9fd] flex items-center justify-center mb-6 border border-blue-100 shadow-sm group-hover:scale-110 transition-transform">
                  <Image
                    src={obj.iconPath}
                    alt={obj.title}
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-xl font-black text-[#000080] mb-2 group-hover:text-[#db2392] transition-colors">
                  {obj.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {obj.description}
                </p>
              </div>
            ))}
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
            <Link href="/about-us" className="text-[#f7da3a] transition-colors">Nosotros</Link>
            <Link href="/#pasajeros" className="hover:text-[#f7da3a] transition-colors">Pasajeros</Link>
            <Link href="/#conductores" className="hover:text-[#f7da3a] transition-colors">Conductores</Link>
            <Link href="/#referidos" className="hover:text-[#f7da3a] transition-colors">Programa de Referidos</Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {[
              { name: "TikTok", icon: "tiktok", link: "https://www.tiktok.com/@getgo.cl" },
              { name: "Instagram", icon: "insta", link: "https://www.instagram.com/getgo.cl" },
              { name: "Facebook", icon: "f", link: "https://www.facebook.com/getgo.cl" },
              { name: "Twitter/X", icon: "x", link: "https://x.com/getgo.cl" },
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