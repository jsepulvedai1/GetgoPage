/* eslint-disable react/no-unescaped-entities */
import { Montserrat } from "next/font/google";
import Image from "next/image";
import NavbarAbout from "./navbar-about";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  display: "swap",
  preload: false, // evita errores si el CSS de preload no carga bien en cPanel
});

export default function AboutUs() {
  // Cambia estas rutas cuando subas tus imágenes finales
  const gallery = [
    {
      src: "/images/2.webp", 
      alt: "Pantalla de configuración de cuenta: opción Eliminar cuenta",
      w: 600,
      h: 600,
    },
    {
      src: "/images/1.webp",
      alt: "Confirmación final de eliminación de cuenta",
      w: 600,
      h: 650,
    },
  ];

  return (
    <div className={`${montserrat.className} bg-[#f8f9fd] min-h-screen`}>
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-3 bg-[#f3fbff] bg-opacity-100 z-50 shadow-sm">
        <NavbarAbout />
      </header>

      {/* Spacing for fixed header */}
      <div className="pt-20" />

      {/* HERO */}
      <section className="text-center py-14 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#000080] leading-tight">
          ¿Cómo eliminar tu cuenta GetGo?
        </h1>
        <p className="max-w-3xl mx-auto mt-4 text-gray-700 text-lg">
          Aquí te explicamos, paso a paso, cómo solicitar la eliminación
          definitiva de tu cuenta.
        </p>
      </section>

      {/* ALERTA IMPORTANTE */}
      <section className="px-6">
        <div className="max-w-4xl mx-auto bg-[#000080] border border-[#ffd4d4] rounded-2xl p-5 md:p-6 shadow-sm">
          <h2 className="text-xl font-black italic">Antes de continuar</h2>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-[15px] leading-relaxed">
            <li >
              La eliminación es{" "}
              <span className="font-semibold ">permanente</span> y no podrás
              recuperar tu cuenta ni tu historial.
            </li>

            <li>
              Por normativas legales y contables, cierta información mínima
              puede conservarse por un periodo limitado. Revisa nuestra{" "}
              <a className="underline font-medium" href="/legal">
                Política de Privacidad
              </a>
              .
            </li>
          </ul>
        </div>
      </section>

      {/* PASO A PASO */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#000080] italic text-center">
            Eliminación desde la app
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              {
                n: 1,
                t: "Abre tu perfil (Drawer)",
                d: "Ingresa a la app y ve a Perfil.",
              },
              {
                n: 2,
                t: "Selecciona Eliminar cuenta",
                d: "Toca la opción ‘Eliminar cuenta’ y revisa la información mostrada.",
              },
             
              {
                n: 3,
                t: "Confirma eliminación",
                d: "Lee el resumen y confirma. Tu cuenta quedará en proceso de eliminación.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="min-w-10 h-10 rounded-full bg-[#e9efff] flex items-center justify-center text-[#000080] font-black">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {step.t}
                    </h3>
                    <p className="text-gray-600 mt-1">{step.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA (1–2 imágenes) */}
      <section className="py-4 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {gallery.filter(Boolean).map((img, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl p-2 shadow-sm border border-gray-100"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                className="rounded-xl w-full h-auto object-cover"
                priority={i === 0}
              />
              <p className="text-sm text-gray-600 mt-2 px-2">{img.alt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MÉTODO ALTERNATIVO */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h2 className="text-xl font-black text-[#000080] italic">
            ¿No encuentras la opción en la app?
          </h2>
          <p className="text-gray-700 mt-2">
            También puedes solicitar la eliminación por correo escribiendo a{" "}
            <a
              className="underline font-medium"
              href="mailto:soporte@getgoapp.cl"
            >
              soporte@getgoapp.cl
            </a>{" "}
            desde el email asociado a tu cuenta con el asunto: “Eliminar
            cuenta”.
          </p>
          <ul className="list-disc pl-6 mt-3 text-gray-700 space-y-1">
            <li>Incluye tu nombre completo y número de teléfono registrado.</li>
            <li>Indica si deseas descargar tus datos antes de eliminar.</li>
          </ul>
          <div className="mt-4">
            <a
              href="mailto:soporte@getgoapp.cl?subject=Eliminar%20cuenta&body=Hola%20GetGo%2C%20quiero%20eliminar%20mi%20cuenta.%20Nombre%3A%20___%20%7C%20Tel%C3%A9fono%3A%20___"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#000080] text-white font-semibold hover:opacity-90 transition"
            >
              Enviar solicitud por correo
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#000080] italic text-center">
            Preguntas frecuentes
          </h2>
          <div className="mt-6 space-y-3">
            {[
             
              {
                q: "¿Puedo reactivar mi cuenta luego?",
                a: "No. La eliminación es definitiva. Puedes crear una cuenta nueva más adelante si lo deseas.",
              },
              {
                q: "¿Qué datos se conservan?",
                a: "Solo la información mínima necesaria para cumplir con normativas legales, contables y de prevención de fraudes, por el periodo exigido por la ley.",
              },

            ].map((item, idx) => (
              <details
                key={idx}
                className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
              >
                <summary className="list-none cursor-pointer flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{item.q}</span>
                  <span className="ml-4 text-[#000080] font-black group-open:rotate-45 transition">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#000080] text-white py-8 px-6 md:px-12 rounded-t-3xl text-center">
        <div className="mb-4">
          <div className="flex justify-center gap-6">
            {[
              { name: "dd", link: "https://www.tiktok.com/@getgo.chile" },
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

      {/* JSON-LD: HowTo + FAQ para SEO */}
      <Script
        id="jsonld-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Cómo eliminar tu cuenta GetGo",
            step: [
              {
                "@type": "HowToStep",
                name: "Abre tu perfil",
                text: "Ingresa a la app y ve a Perfil → Configuración → Cuenta.",
              },
              {
                "@type": "HowToStep",
                name: "Selecciona Eliminar cuenta",
                text: "Toca la opción ‘Eliminar cuenta’ y revisa la información mostrada.",
              },
              {
                "@type": "HowToStep",
                name: "Confirma tu identidad",
                text: "Verifica con PIN, Face/Touch ID o código SMS.",
              },
              {
                "@type": "HowToStep",
                name: "Confirma eliminación",
                text: "Lee el resumen y confirma.",
              },
            ],
          }),
        }}
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "¿Cuánto tarda el proceso?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Generalmente dentro de 30 días corridos.",
                },
              },
              {
                "@type": "Question",
                name: "¿Puedo reactivar mi cuenta luego?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No, es definitiva.",
                },
              },
              {
                "@type": "Question",
                name: "¿Qué datos se conservan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Solo los mínimos exigidos por ley por un periodo limitado.",
                },
              },
              {
                "@type": "Question",
                name: "¿Cómo descargo mis datos?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Desde la app: Perfil → Privacidad → Descargar mis datos, o vía soporte.",
                },
              },
            ],
          }),
        }}
      />

      <div className={`${montserrat.className}`}></div>
    </div>
  );
}
