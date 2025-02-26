/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Navbar from "./components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import SocialSidebar from "./components/social";
import StoreButtons from "./components/store";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  display: "swap",
});

export default function Home() {
  const messages = [
    {
      title: "GetGo Car / Ejecutivo",
      text: "Este servicio conecta a pasajeros con conductores particulares en autos estándar, asegurando un traslado eficiente, seguro y confortable.",
      image: "/images/Icon-GetGoCar.png",
    },
    {
      title: "GetGo Taxi",
      text: "Si prefieres un taxi tradicional con la seguridad y facilidad de una app, GetGo Taxi es tu mejor opción. Conecta con taxistas registrados y certificados",
      image: "/images/Icon-GetGoTaxi.png",
    },
    {
      title: "GetGo XL",
      text: "Para quienes necesitan mayor capacidad, GetGo XL ofrece vehículos más amplios, ideales para grupos, familias o traslados con equipaje extra",
      image: "/images/Icon-GetGoXL.png",
    },
    {
      title: "GetGo Mujer",
      text: "Con GetGo Mujer, ofrecemos una opción de transporte exclusiva para mujeres, con conductoras verificadas para mayor seguridad y tranquilidad en cada viaje",
      image: "/images/Icon-GetGoMujer.png",
    },
    {
      title: "Gana dinero por compartir",
      text: "Con GetGo, cada conexión cuenta. A través del sistema de referidos, puedes ganar dinero simplemente compartiendo tu código con amigos y conocidos. Cada vez que alguien se registra y viaja con GetGo, tú recibes un porcentaje de sus carreras.",
      image: "/images/Icon-GetGoReferrals.png",
    },
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
  };

  return (
    <div>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-3 bg-[#f3fbff] bg-opacity-100 z-50 shadow-md">
        <Navbar />
      </header>
      <br></br>
      <br></br>
      <section className={`${montserrat.className} hidden md:block relative w-full h-[80vh] md:h-[70vh] flex items-center justify-start px-6 md:px-12 bg-cover bg-center`}
        style={{ backgroundImage: "url('/images/im.png')" }}
      >
        <div className="w-full md:w-1/2 text-left flex justify-center pt-20 md:pt-32 ml-0">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white leading-tight uppercase mb-6 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <br></br>
            Regístrate en minutos <br />
            <span className="text-4xl md:text-6xl text-white">gana al instante</span><br />
            <span className="text-4xl md:text-lg text-white">maneja con GetGo y convierte tu tiempo en dinero</span>
          </motion.h2>
        </div>
      </section>
      <section
        className={`${montserrat.className} block md:hidden relative w-full h-[80vh] md:h-[70vh] flex items-center justify-start px-6 md:px-12 bg-cover bg-center`}
        style={{ backgroundImage: "url('/images/im5.png')" }}
      >
        <div className="w-full md:w-1/2 text-left flex justify-center pt-10 md:pt-40 ml-0">
          <motion.h2
            className="text-xl md:text-5xl font-bold text-white leading-tight uppercase mb-6 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >

            Regístrate en minutos <br />
            <span className="text-4xl md:text-6xl text-white">gana al instante</span><br />
            <span className="text-xl md:text-sm text-white">maneja con GetGo y convierte tu tiempo en dinero</span>
          </motion.h2>
        </div>
      </section>

      <div className="hidden md:block">
        <SocialSidebar />
      </div>
      <motion.section
        className="px-6 md:px-12 py-16 flex flex-col md:flex-row items-center gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Lista de Beneficios con animaciones*/}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h3
            className="text-2xl md:text-5xl font-bold text-[#000080] text-center mb-6 "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            ¿Por qué GetGo?
          </motion.h3><br></br>
          {[
            {
              icon: "/images/Icon-GetGo_Arrow.png",
              text: "Obtienes el 1% de cada carrera que realice tu referido, de manera perpetua.",
            },
            {
              icon: "/images/Icon-GetGo_Arrow.png",
              text: "Tarifas competitivas y posibilidad de recibir ingresos recurrentes.",
            },
            {
              icon: "/images/Icon-GetGo_Arrow.png",
              text: "Relación con conductores más justa y rentable.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Image
                src={item.icon}
                alt="Icono"
                width={35}
                height={35}
                className="mr-2"
              />
              <p className="text-lg md:text-2xl text-[#000080] ">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* GIF animado (ahora al final) */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img
            src="/images/Icon-WhyGetGo-GetGo.gif"
            alt="GIF GetGo"
            className="w-full md:w-80 max-w-full h-auto"
          />
        </motion.div>
      </motion.section>

      <div className="bg-[#db2392] text-white py-8 px-6 md:px-12 text-center md:text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
          Conoce nuestro sistema de referidos
        </h2>
        <br></br>
        <a
          href="/nuestro-sistema"
          className="inline-block bg-white text-[#db2392] py-4 px-7 rounded-lg text-lg font-bold hover:bg-gray-200 transition "
        >
          CONOCE NUESTRO SISTEMA
        </a>
      </div>
      {/* Carrusel - Agregado antes de la sección QR */}
      <section className="py-16 px-6 md:px-12 bg-[#f3fbff] text-center"> {/* Cambiar bg-gray-100 a bg-white */}
        <h2 className="text-2xl md:text-4xl font-bold text-[#000080] mb-6">A DONDE VAYAS, NOS MOVEMOS CONTIGO</h2>
        <div className="relative w-full max-w-lg mx-auto overflow-hidden">
          {/* Botón Izquierdo */}

          {/* Contenido del Carrusel */}
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center px-6"
              >
                <br></br>
                <br></br>
                {/* Título del mensaje agregado aquí */}
                <h2 className="text-2xl md:text-3xl font-semibold text-[#000080] mb-4">{messages[index].title}</h2>
                <Image src={messages[index].image} alt="Ícono" width={200} height={200} />
                <p className="text-lg md:text-xl text-[#000080] mt-4">{messages[index].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Botón Derecho */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition"
            onClick={nextSlide}
            style={{ opacity: 0.7 }}
          >
            <Image
              src="/images/Icon-ArrowSliderRight-GetGoWeb.png"
              alt="Flecha izquierda"
              width={40}
              height={40}
            />
            <ArrowRight size={1} />
          </button>
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            onClick={prevSlide}
            style={{ opacity: 0.7 }}
          >
            <Image
              src="/images/Icon-ArrowSliderLeft-GetGoWeb.png"
              alt="Flecha izquierda"
              width={40}
              height={40}
            />
            <ArrowLeft size={1} />
          </button>
        </div>
      </section>

      {/* QR Section */}
      <section className="px-6 md:px-12 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 text-center md:md:justify-center">
          <h3 className="text-2xl md:text-5xl font-bold bg-[#f7da3a] text-[#000080] px-6 py-2 inline-block uppercase ">
            Descarga Nuestra App
          </h3>
          <p className="text-lg md:text-xl text-[#000080] mt-4 max-w-lg mx-auto md:justify-center ">
            Descargala ahora y comienza a disfrutar de todas sus ventajas.<br />
            <span className="text-xl font-bold italic max-w-lg mx-auto whitespace-nowrap"> ¡Tu viaje empieza aqui!</span>
          </p>

        </div>
        <div className="hidden md:block ">
          <StoreButtons />
        </div>
        <div className="block md:hidden ">
          <StoreButtons />
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#000080] text-white py-8 px-6 md:px-12 rounded-t-3xl text-center">
        <div className="mb-6">
          <ul className="flex justify-center space-x-6 text-lg md:text-xl">
            <li>LA EMPRESA - </li>
            <li> LEGAL - </li>
            <li> LA APP</li>
          </ul>
        </div>

        <div className="mb-4">
          <div className="flex justify-center gap-6">
            {["lin", "insta", "f", "x"].map((social, index) => (
              <a
                key={index}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/images/${social}.png`}
                  alt={social}
                  width={30}
                  height={30}
                  className="w-6 h-6 cursor-pointer"
                />
              </a>
            ))}
          </div>
        </div>

        <p className="text-sm mt-2">
          Todos los derechos reservados GetGo® 2024
        </p>
      </footer>
      <div className={`${montserrat.className}`}></div>
    </div>
  );
}
