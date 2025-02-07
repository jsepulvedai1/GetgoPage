import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

export default function QuienesSomos() {
  return (
    <div className={`${montserrat.className} bg-[#f8f9fd] min-h-screen`}>
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
            <Link href="/">
              <li className="hover:text-blue-400 cursor-pointer transition-all">
                Inicio
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

          <div className="bg-[#f3f1fd] text-[#2D2D2D] p-6 rounded-xl flex items-center w-full shadow-md">
            <p className="text-left">
              <span className="font-bold text-lg">Lo que nos mueve</span> <br />
              En GetGo, no solo te movemos, te conectamos con nuevas
              oportunidades. Somos una plataforma innovadora de transporte que
              combina seguridad, accesibilidad y beneficios exclusivos para
              pasajeros y conductores.
            </p>
          </div>

          {/* Segunda fila */}
          <div className="bg-[#f3f1fd] text-[#2D2D2D] p-6 rounded-xl flex items-center w-full shadow-md">
            <p className="text-left">
              Nuestra misión es hacer que cada viaje cuente, brindando una
              experiencia confiable y eficiente mientras ofrecemos una nueva
              forma de generar ingresos a quienes forman parte de nuestra
              comunidad.
            </p>
          </div>

          <div className="relative">
            <Image
              src="/images/imagebar_reverse.jpg"
              alt="Ciudad iluminada de noche"
              width={500}
              height={300}
              className="rounded-xl"
            />
          </div>
          <div className="relative">
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
          </div>
        </div>
      </section>
      <section className="bg-white py-20 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-[#000080] text-center">
          Los principios que nos guían
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-12">
          <div className="text-center max-w-xs mx-auto">
            <Image
              src="/images/icon-energy.png"
              alt="Imparables"
              width={90}
              height={90}
              className="mx-auto"
            />
            <h3 className="text-[#000080] font-bold text-xl mt-4">
              Imparables
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nos impulsa la innovación y la determinación para superar
              cualquier desafío.
            </p>
          </div>
          <div className="text-center max-w-xs mx-auto">
            <Image
              src="/images/icon-impact.png"
              alt="Valientes"
              width={90}
              height={90}
              className="mx-auto"
            />
            <h3 className="text-[#000080] font-bold text-xl mt-4">Valientes</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Asumimos desafíos sin miedo al fracaso y aprendemos en el proceso.
            </p>
          </div>
          <div className="text-center max-w-xs mx-auto">
            <Image
              src="/icons/p.png"
              alt="Coherentes"
              width={90}
              height={90}
              className="mx-auto"
            />
            <h3 className="text-[#000080] font-bold text-xl mt-4">
              Coherentes
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nuestras acciones reflejan nuestros valores, con transparencia y
              ética.
            </p>
          </div>
          <div className="text-center max-w-xs mx-auto">
            <Image
              src="/icons/d.png"
              alt="Humildes"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h3 className="text-[#000080] font-bold text-xl mt-4">Humildes</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Escuchamos, aprendemos y evolucionamos en comunidad.
            </p>
          </div>
        </div>
      </section>

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
                <img
                  src="/images/linkedIn-icon_1.png"
                  alt="LinkedIn"
                  className="w-6 h-6 cursor-pointer"
                />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/instagram-icon.png"
                  alt="Instagram"
                  className="w-6 h-6 cursor-pointer"
                />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/facebook-Icon.png"
                  alt="Facebook"
                  className="w-6 h-6 cursor-pointer"
                />
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/x-icon.png"
                  alt="Twitter/X"
                  className="w-6 h-6 cursor-pointer"
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
