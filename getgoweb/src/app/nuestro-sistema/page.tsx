/* eslint-disable react/no-unescaped-entities */
import { Montserrat } from "next/font/google";
import Image from "next/image";
import NavbarNuestroSistema from "./navbar-nuestro-sistema";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  display: "swap",
  preload: false, // ← evita errores si el CSS de preload no carga bien en cPanel
});

export default function AboutUs() {
    return (
      <div className={`${montserrat.className} bg-[#f8f9fd] min-h-screen`}>
        <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-3 bg-[#f3fbff] bg-opacity-100 z-50">
          <NavbarNuestroSistema />
        </header>
        {/* Sección Hero */}
        <br></br>
        <br />
        <br />
        <section className="mt-12 text-gray-800">
          <h2 className="text-4xl font-semibold text-center text-[#000080]">
            Gana con el Sistema de Referidos de GetGo
          </h2>
          <p className="mt-4 text-lg font-normal text-center max-w-2xl mx-auto">
            En <span className="font-black">GetGo</span>, recomendar es
            ganar. Genera ingresos extra de manera sencilla mientras ayudas a
            más personas a descubrir la mejor forma de moverse. ¡Sigue estos
            simples pasos y empieza a ganar hoy mismo!
          </p>

          <div className="mt-10 space-y-10 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <span className="text-xl text-green-500">✅</span>
              <div>
                <h3 className="text-xl font-bold text-[#000080] italic">
                  1. Regístrate en GetGo
                </h3>
                <p className="text-gray-600 font-normal">
                  Descarga la app, crea tu cuenta y accede al apartado de
                  referidos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-xl text-green-500 text-[#000080]">✅</span>
              <div>
                <h3 className="text-xl font-bold text-[#000080] italic">
                  2. Comparte tu código único
                </h3>
                <p className="text-gray-600 font-normal">
                  Encuentra tu código en la app y compártelo con amigos y
                  familiares por WhatsApp, redes sociales o como prefieras.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-xl text-green-500">✅</span>
              <div>
                <h3 className="text-xl font-bold text-[#000080] italic">
                  3. Tus referidos se registran y viajan
                </h3>
                <p className="text-gray-600 font-normal">
                  Cuando alguien usa tu código para registrarse y realiza su
                  primer viaje, ¡tú ganas!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-xl text-green-500">✅</span>
              <div>
                <h3 className="text-xl font-bold text-[#000080] italic">
                  4. Gana con cada viaje de tus referidos
                </h3>
                <p className="text-gray-600 font-normal">
                  Recibe un porcentaje de cada viaje completado por tus
                  referidos. ¡No es un bono único, es una ganancia recurrente!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-xl text-green-500">✅</span>
              <div>
                <h3 className="text-xl font-bold text-[#000080] italic">
                  5. Retira tus ganancias fácilmente
                </h3>
                <p className="text-gray-600 font-normal">
                  Tus comisiones se acumulan y puedes cobrarlas de forma
                  semanal o mensual según prefieras.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900">
              Empieza a ganar hoy mismo
            </h3>
            <p className="mt-2 text-lg font-semibold text-gray-600">
              Descarga GetGo, comparte tu código y genera ingresos con cada
              viaje. ¡Tu red puede hacer la diferencia!📲 
            </p>
          </div>
        </section>

        <section className="flex flex-col items-center text-center py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-5xl">
            <div className="relative flex justify-center md:col-span-2">
              <video width="600" controls>
                <source src="/video.mp4" type="video/mp4" />
                Tu navegador no soporta la etiqueta de video.
              </video>
            </div>
          </div>
        </section>

        <footer className="bg-[#000080] text-white py-8 px-6 md:px-12 rounded-t-3xl text-center">
          <div className="mb-6">
            {/* <ul className="flex justify-center space-x-6 text-lg md:text-xl">
              <li>LA EMPRESA - </li>
              <li> LEGAL - </li>
              <li> LA APP</li>
            </ul> */}
          </div>

          <div className="mb-4">
            <div className="flex justify-center gap-6">
              {[
                { name: "tiktok", link: "https://www.tiktok.com/@getgo.chile",},
                { name: "insta", link: "https://www.instagram.com/getgo.cl" },
                { name: "f", link: "https://www.facebook.com/GetGoAppCL" },
                { name: "x", link: "https://x.com/GetGoCL" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={`/images/${social.name}.png`}
                    alt={social.name}
                    width={30}
                    height={30}
                    className="w-6 h-6 cursor-pointer"
                  />
                </a>
              ))}
            </div>
          </div>

          <p className="text-sm mt-2">
            Todos los derechos reservados GetGo® 2025
          </p>
        </footer>
        <div className={`${montserrat.className}`}></div>
      </div>
    );
}