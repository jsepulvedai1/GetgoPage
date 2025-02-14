/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Navbar from "./components/navbar";
import { motion } from "framer-motion";
import SocialSidebar, { }  from "./components/social"
import StoreButtons from "./components/store";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-3 bg-[#f3fbff] bg-opacity-100 z-50 shadow-md">
        <Navbar />
      </header>
      <section
        className="relative w-full h-[80vh] md:h-[70vh] flex items-center justify-start px-6 md:px-12 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/im.png')" }}
      >
        <div className="w-full md:w-1/2 text-left justify-center pt-32 md:pt-48 ml-0">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white leading-tight uppercase mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Regístrate en minutos <br /> gana al instante
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-white mb-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Maneja con GetGo y convierte tu tiempo libre en dinero
          </motion.p>
        </div>
      </section>

      <div>
        <SocialSidebar />
      </div>
      <motion.section
        className="px-6 md:px-12 py-16 flex flex-col md:flex-row items-center gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* GIF animado */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img
            src="/images/Icon-WhyGetGo-GetGo.gif"
            alt="GIF GetGo"
            className="w-40 md:w-60 h-auto"
          />
        </motion.div>

        {/* Lista de Beneficios con animaciones */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            {
              icon: "/images/Percent-Icon.png",
              text: "Obtienes el 1% de cada carrera que realice tu referido, de manera perpetua.",
            },
            {
              icon: "/images/Money-Icon.png",
              text: "Tarifas competitivas y posibilidad de recibir ingresos recurrentes.",
            },
            {
              icon: "/images/Deal-Icon.png",
              text: "Relación con conductores más justa y rentable.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start mb-6"
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
              <p className="text-lg md:text-xl text-[#000080]">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      {/* QR Section */}
      <section className="px-6 md:px-12 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-bold bg-[#DBCF6E] text-[#000080] px-6 py-4 inline-block uppercase">
            Descarga Nuestra App
          </h3>
          <p className="text-lg md:text-xl text-[#000080] mt-4 max-w-lg mx-auto md:mx-0">
            Descargala ahora y comienza a disfrutar de todas sus ventajas. ¡Tu
            viaje empieza aqui!
          </p>
          <StoreButtons />
          <div className="hidden md:flex justify-center items-center mt-6 w-full">
            <Image
              src="/images/codigoQR.png"
              alt="QR Code"
              width={120}
              height={120}
              className="w-32 md:w-40 h-auto"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/images/phone-app.png"
            alt="App en Teléfono"
            width={400}
            height={400}
            className="w-60 md:w-80 h-auto"
          />
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#000080] text-white py-8 px-6 md:px-12 rounded-t-3xl text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <ul className="space-y-2 text-lg md:text-xl">
              <li>LA EMPRESA</li>
              <li>LEGAL</li>
              <li>LA APP</li>
            </ul>
          </div>
          <div>
            <div className="flex justify-center md:justify-end gap-4 mb-4">
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
            <p className="text-lg">
              Oficina Central Calle Paralelepípedo 9999, Santiago
            </p>
            <p className="text-lg">contacto@getgo.cl | (+56) 2 7575 2500</p>
            <p className="text-sm mt-2">
              Todos los derechos reservados GetGo® 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
