/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Montserrat } from "next/font/google";
import WhatsAppButton from "./components/WhatsAppButton";
import Navbar from "./components/navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

export default function Home() {
  return (
    <div className={`${montserrat.className} bg-cover bg-center min-h-screen`}>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-3 bg-[#f3fbff] bg-opacity-100 z-50 shadow-md">
        <Image
          src="/images/GetGo_Logo.png"
          alt="GetGo Logo"
          width={190}
          height={90}
          className="w-24 md:w-40 h-auto"
        />
        <Navbar />
      </header>

      {/* Hero Section */}
      <section
        className="relative w-full h-[80vh] md:h-[70vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-12 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/im.png')" }}
      >
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight uppercase mb-6">
            Regístrate en minutos <br /> gana al instante.
          </h2>
          <p className="text-lg md:text-xl text-white mb-8">
            Maneja con GetGo y convierte tu tiempo libre en dinero
          </p>
          <WhatsAppButton />
        </div>
      </section>

      {/* Why GetGo Section */}
      <section className="px-6 md:px-12 py-16 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/images/Icon-WhyGetGo-GetGo.gif"
            alt="GIF GetGo"
            className="w-40 md:w-60 h-auto"
          />
        </div>
        <div className="w-full md:w-1/2">
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
            <div key={index} className="flex items-start mb-6">
              <Image
                src={item.icon}
                alt="Icono"
                width={35}
                height={35}
                className="mr-2"
              />
              <p className="text-lg md:text-xl text-[#000080]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QR Section */}
      <section className="px-6 md:px-12 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-bold bg-[#DBCF6E] text-[#000080] px-6 py-4 inline-block uppercase">
            Descarga Nuestra App
          </h3>
          <p className="text-lg md:text-xl text-[#000080] mt-4 max-w-lg mx-auto md:mx-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex justify-center md:justify-start mt-6">
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
      <footer className="bg-customBlue text-white py-8 px-6 md:px-12 rounded-t-2xl text-center md:text-left">
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
