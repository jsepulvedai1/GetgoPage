import Image from "next/image";
import FeatureItem from "@/app/components/FeatureItem";
export default function Home() {
  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: "url('/BG-WebPage-GetGo.png')" }}
    >
      <div
        className="text-white font-sans"
        style={{ backgroundImage: "url('BG-WebPage-GetGo.png')" }}
      >
        {/* Navbar */}
        <header className="flex justify-between items-center px-8 py-4 bg-blue-800 bg-opacity-90">
          <Image
            src="/images/GetGo_Logo-Negative.png"
            alt="GetGo Logo"
            width={150}
            height={100}
            className="rounded-lg"
          />
          <nav>
            <ul className="flex gap-6">
              <li className="hover:underline hover:text-blue-400 cursor-pointer transition-all duration-200">Quienes Somos</li>
              <li className="hover:underline hover:text-blue-400 cursor-pointer transition-all duration-200">Crear Cuenta</li>
              <li className="hover:underline hover:text-blue-400 cursor-pointer transition-all duration-200">Ayuda</li>
            </ul>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="px-8 py-16 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-left">
            <h2 className="text-5xl font-extrabold text-blue-300 leading-tight mb-6">
              LOREM IPSUM <br /> DOLOR SIT
            </h2>
            <p className="text-lg mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/im.png"
              alt="Driver and Passenger"
              width={400}
              height={200}
              className="rounded-lg"
            />
          </div>
        </section>

        {/* QR Section */}
        <section className="px-8 py-16 secondary flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="flex justify-end w-1/2">
            <Image
              src="/BG_Qr.png"
              alt="Background QR"
              className="w-48 h-48 md:w-64 md:h-64 rounded-lg  "
              width={500}
              height={300}
              priority
            />
          </div>

          <div className="text-center md:text-left md:ml-auto md:w-1/2">
            <h3 className="text-4xl font-extrabold text-[#001F4E] mb-4 inline-block bg-[#63BDF9FF]">
              ESCANEA NUESTRO CÓDIGO QR
            </h3>
            <p className="text-lg text-white mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex justify-center md:justify-center">
              <Image
                src="/images/codigoQR.png"
                alt="QR Code"
                className="w-32 h-32 md:w-40 md:h-40 rounded-lg"
                width={500}
                height={300}
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 secondary">
          <div className="secondary flex flex-col md:flex-row justify-around items-center text-center text-green-400 space-y-8 md:space-y-0">
            <FeatureItem src="/Icon-OpinionUser.gif" count="+999" text="Usuarios satisfechos" />
            <FeatureItem src="/Icon-Driver.gif" count="+999" text="Conductores registrados" />
            <FeatureItem src="/Icon-Travel.gif" count="+999" text="Viajes completados" />
          </div>
        </section>

        {/* Help Section */}
        <footer className="px-8 py-16 text-center secondary text-blue-900">
          <h3 className="text-2xl font-bold inline-block bg-[#F6E15E] text-[#001F4E] px-4 py-2 rounded-md mb-4">¿NECESITAS AYUDA?</h3>
          <p className="text-md mb-8 text-[#FFFFFFFF]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <h1 className="text-4xl font-bold">GetGo DRIVER</h1>
        </footer>
      </div>
    </div>
  );
}
