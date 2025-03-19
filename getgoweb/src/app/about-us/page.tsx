/* eslint-disable react/no-unescaped-entities */
import { Montserrat } from "next/font/google";
import Image from "next/image";
import NavbarAbout from "./navbar-about";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

export default function AboutUs() {
  return (
    <div className={`${montserrat.className} bg-[#f8f9fd] min-h-screen`}>
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-3 bg-[#f3fbff] bg-opacity-100 z-50">
        <NavbarAbout />
      </header>
      <br></br>
      <br></br>
      {/* Sección Hero */}
      <section className="text-center py-20 px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#000080] leading-tight">
          Nuestra misión es hacer que cada viaje cuente.
        </h1>
      </section>
      <section className="flex flex-col items-center text-center py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-5xl">
          <div className="relative">
            <Image
              src="/images/header-pasajeros-banner.png"
              alt="Fotógrafa en coche"
              width={500}
              height={300}
              className="rounded-xl"
            />
          </div>
          <div className="bg-[#f3f1fd] text-[#2D2D2D] font-semibold p-6 rounded-xl flex items-center w-full shadow-md">
            <p className="text-left">
              <span className="font-black text-lg">Nuestra mision</span> <br />
              Es conectar con personas para transportar con seguridad,
              eficiencia y puntualidad."
            </p>
          </div>

          <div className="bg-[#f3f1fd] text-[#2D2D2D] font-semibold p-6 rounded-xl flex items-center w-full shadow-md">
            <p className="text-left">
              <span className="font-black text-lg">Nuestra Vision</span> <br />
              "Es liderar el transporte por aplicación en Latinoamérica,
              poniendo la seguridad, innovación y tecnología al servicio de
              nuestros socios y de un futuro más conectado.”
            </p>
          </div>

          {/* Segunda fila */}

          <div className="relative">
            <Image
              src="/images/imagebar_reverse.jpg"
              alt="Ciudad iluminada de noche"
              width={500}
              height={300}
              className="rounded-xl"
            />
          </div>
          {/* <div className="relative">
            <Image
              src="/images/imagebar.jpg"
              alt="Fotógrafa en coche"
              width={500}
              height={300}
              className="rounded-xl"
            />
          </div>

          <div className="bg-[#f3f1fd] text-[#2D2D2D] p-6 rounded-xl flex items-center w-full shadow-md">
            <p className="text-left">
              Queremos ser la plataforma de transporte líder en Latinoamérica,
              combinando tecnología, seguridad y un modelo de crecimiento que
              beneficie tanto a pasajeros como a conductores. Buscamos crear una
              comunidad donde cada conexión signifique más que solo un traslado.
            </p>
          </div> */}
        </div>
      </section>
      <section className="bg-white py-20 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-[#000080] text-center">
          Los objetivos que nos guían
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mt-12 justify-center">
          <div className="text-center max-w-xs mx-auto">
            <Image
              src="/icons/Icon-Obj1-GetGo.png"
              alt="Imparables"
              width={120}
              height={120}
              className="mx-auto"
            />
            <h3 className="text-[#000080] font-bold text-xl mt-4">
              {/* Imparables */}
            </h3>
            <p className="text-gray-600 text-lg font-bold leading-relaxed">
              Proporcionar soluciones de transporte personalizadas e innovadoras
              que conecten personas de forma segura.
            </p>
          </div>
          <div className="text-center max-w-xs mx-auto">
            <Image
              src="/icons/Icon-Obj5-GetGo.png"
              alt="Imparables"
              width={120}
              height={120}
              className="mx-auto"
            />
            <h3 className="text-[#000080] font-bold text-xl mt-4">
              {/* Imparables */}
            </h3>
            <p className="text-gray-600 text-lg font-bold leading-relaxed">
              Inspirar y apoyar a nuestros socios para que construyan negocios
              prósperos y sostenibles.
            </p>
          </div>
          <div className="text-center max-w-xs mx-auto">
            <Image
              src="/icons/Icon-Obj6-GetGo.png"
              alt="Imparables"
              width={120}
              height={120}
              className="mx-auto"
            />
            <h3 className="text-[#000080] font-bold text-xl mt-4">
              {/* Imparables */}
            </h3>
            <p className="text-gray-600 text-lg font-bold leading-relaxed">
              Entregar beneficios para conductores y usuarios.
            </p>
          </div>
          <div className="text-center max-w-xs mx-auto">
            <Image
              src="/icons/Icon-Obj2-GetGo.png"
              alt="Valientes"
              width={120}
              height={120}
              className="mx-auto"
            />
            <h3 className="text-[#000080] font-bold text-xl mt-4">
              {/* Valientes */}
            </h3>
            <p className="text-gray-600 text-lg font-bold leading-relaxed">
              Ofrecer servicios de transporte confiable, seguro y eficiente.
            </p>
          </div>
          <div className="text-center max-w-xs mx-auto">
            <Image
              src="/icons/Icon-Obj3-GetGo.png"
              alt="Coherentes"
              width={120}
              height={120}
              className="mx-auto"
            />
            <h3 className="text-[#000080] font-bold text-xl mt-4">
              {/* Coherentes */}
            </h3>
            <p className="text-gray-600 text-lg font-bold leading-relaxed">
              Ser una plataforma con servicios seguros para los usuarios.
            </p>
          </div>
          <div className="text-center max-w-xs mx-auto">
            <Image
              src="/icons/Icon-Obj4-GetGo.png"
              alt="Humildes"
              width={120}
              height={120}
              className="mx-auto"
            />
            <h3 className="text-[#000080] font-bold text-xl mt-4">
              {/* Humildes */}
            </h3>
            <p className="text-gray-600 text-lg font-bold leading-relaxed">
              Entregar servicios diferenciados.
            </p>
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
              {
                name: "dd",
                link: "https://www.tiktok.com/@getgo.chile",
              },
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