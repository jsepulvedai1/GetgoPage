/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Montserrat } from 'next/font/google';
import WhatsAppButton from "./components/WhatsAppButton";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['900'],
  display: 'swap',
});

export default function Home() {
  return (
    <div className={`${montserrat.className} bg-cover bg-center min-h-screen`}>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-3 bg-[#f3fbff] bg-opacity-100 z-50">
        <Image
          src="/images/GetGo_Logo.png"
          alt="GetGo Logo"
          width={180}
          height={80}
          className="w-[10vw] h-auto"
        />
        <nav>
          <ul className="flex gap-6 text-[#000080] text-[1.5vw]">
            <Link href="/about-us">
              <li className="hover:text-blue-400 cursor-pointer transition-all">
                Quienes Somos
              </li>
            </Link>
            <li className="text-[#e63a8a] mx-2">|</li>
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
      <div>
        <h1 className="text-center text-2xl font-bold mt-10"></h1>
        <WhatsAppButton />
      </div>

      {/* Hero Section */}
      <section
        className="px-0 py-16 flex flex-col md:flex-row gap-8"
        style={{ paddingTop: "80px" }}
      >
        <div
          className="w-full h-80 text-left relative bg-cover bg-center flex justify-center items-center"
          style={{
            backgroundImage: "url('/images/im.png')",
            height: "68vh",
            margin: "0",
            padding: "0",
          }}
        >
          <div className="text-left w-full px-8">
            <h2 className="text-[2.5vw] font-bold text-white leading-tight mb-6 uppercase z-10">
              Regístrate en minutos <br /> gana al instante.
            </h2>
            <p className="text-[1vw] text-white mb-8 z-10">
              Maneja con GetGo y convierte tu tiempo libre en dinero
            </p>
          </div>
        </div>
      </section>
      {/* Why GetGo Section */}
      <p className="text-[2.5vw] text-[#000080] flex justify-center">
        ¿Por qué GetGo?
      </p>
      <section className="font-light px-8 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/images/Icon-WhyGetGo-GetGo.gif"
            alt="GIF de Icono GetGo"
            className="w-[15vw] h-auto"
          />
        </div>
        <div className="text-center md:text-left w-full md:w-1/2">
          <div className="flex items-start mb-6">
            <Image
              src="/images/Percent-Icon.png"
              alt="Icono"
              width={30}
              height={30}
              className="mr-2"
            />
            <p className="text-[1.5vw] text-[#000080]">
              Obtienes el 1% de cada carrera que realice tu referido, de manera
              perpetua.
            </p>
          </div>
          <div className="flex items-start mb-6">
            <Image
              src="/images/Money-Icon.png"
              alt="Icono"
              width={28}
              height={28}
              className="mr-2"
            />
            <p className="text-[1.5vw] text-[#000080]">
              Tarifas competitivas y posibilidad de recibir ingresos
              recurrentes.
            </p>
          </div>
          <div className="flex items-start mb-6">
            <Image
              src="/images/Deal-Icon.png"
              alt="Icono"
              width={45}
              height={45}
              className="mr-2"
            />
            <p className="text-[1.5vw] text-[#000080]">
              Relación con conductores más justa y rentable.
            </p>
          </div>
        </div>
      </section>

      {/* QR Section */}
      <section className="px-8 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="text-center justify-left w-full md:w-1/2 order-2 md:order-1 mx-auto">
          <h3 className="text-[2.5vw] font-bold bg-[#DBCF6E] text-[#000080] bg-opacity-80 px-9 py-5 inline-block uppercase bg-[#6ecedb]">
            Descarga Nuestra App
          </h3>
          <br />
          <br />
          <p className="text-[1.3vw] text-[#000080] mb-6 max-w-3xl mx-auto text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="flex justify-center md:justify-middle">
            <Image
              src="/images/codigoQR.png"
              alt="QR Code"
              width={120}
              height={120}
              className="w-[13vw] h-auto"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
          <Image
            src="/images/phone-app.png"
            alt="QR Code on Phone"
            width={500}
            height={500}
            className="w-[25vw] h-auto "
          />
        </div>
      </section>

      {/* Help Section */}
      <footer
        className="px-0 py-16 flex flex-col md:flex-row gap-8"
        style={{ paddingTop: "30px" }}
      >
        <div
          className="w-full text-left relative bg-cover bg-center flex justify-center items-center"
          style={{
            backgroundImage: "url('/images/Maqueta_Web-GetGo-V2_03.png')",
            height: "68vh",
            margin: "0",
            padding: "0",
          }}
        >
          <div className="flex flex-col justify-center items-center text-center z-10">
            <h3 className="text-[1.8vw] font-bold bg-[#F6E15E] text-[#001F4E] px-4 py-2 rounded-md mb-8 inline-block">
              ¿NECESITAS AYUDA?
            </h3>

            <p className="text-[#000080] text-[1.0vw] mb-2 z-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            </p>
            <p className="text-[#000080] text-[1.0vw] mb-10 z-10">
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="z-15">
              <Image
                src="/images/GetGo_Logo.png"
                alt="GetGo Logo"
                width={200}
                height={100}
                className="w-[18vw] h-auto mx-auto"
              />
            </div>
          </div>
        </div>
      </footer>
      <footer className="bg-customBlue text-white py-8 px-4  rounded-t-2xl">
        <div className="flex justify-between items-start">
          {/* Menú de enlaces */}
          <div>
            <ul className="space-y-2 text-2xl justify-right">
              <li>LA EMPRESA</li>
              <li>LEGAL</li>
              <li>LA APP</li>
            </ul>
          </div>

          {/* Íconos de redes sociales encima de texto de contacto */}
          <div className=" text-right ml-auto">
            <div className="flex justify-end gap-4 mb-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/linkedIn-icon_1.png"
                  alt="LinkedIn"
                  className="w-6 h-6 cursor-pointer"
                  width={500}
                  height={500}
                />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/instagram-icon.png"
                  alt="Instagram"
                  className="w-6 h-6 cursor-pointer"
                  width={500}
                  height={500}
                />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/facebook-Icon.png"
                  alt="Facebook"
                  className="w-6 h-6 cursor-pointer"
                  width={500}
                  height={500}
                />
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/x-icon.png"
                  alt="Twitter/X"
                  className="w-6 h-6 cursor-pointer"
                  width={500}
                  height={500}
                />
              </a>
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
