import Image from "next/image";

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
        <header
          className="flex justify-between items-center px-8 py-4 bg-blue-800 bg-opacity-90"
          style={{ backgroundImage: "url('BG-WebPage-GetGo.png')" }}
        >
          <Image
            src="/images/GetGo_Logo-Negative.png"
            alt="GetGo Logo"
            width={150}
            height={100}
            className="rounded-lg"
          />
          <nav>
            <ul className="flex gap-6">
              <li className="hover:underline cursor-pointer">Quienes Somos</li>
              <li className="hover:underline cursor-pointer">Código QR</li>
              <li className="hover:underline cursor-pointer">Ayuda</li>
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
              src="/im.png" // Cambia esto al archivo de la maqueta
              alt="Driver and Passenger"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* QR Section */}
        <section className="px-8 py-16 secondary flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Imagen de fondo con el celular */}
          <div className="flex justify-center">
            <Image
              src="/BG_Qr.png"
              alt="Background QR"
              className="w-48 h-48 md:w-64 md:h-64 rounded-lg border-4 border-blue-300"
              width={500}
              height={300}
            />
          </div>

          {/* Contenido de texto e imagen del QR */}
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-bold text-blue-300 mb-4">
              ESCANEA NUESTRO QR
            </h3>
            <p className="text-lg text-white mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex justify-center md:justify-start">
              <Image
                src="/images/codigoQR.png"
                alt="QR Code"
                className="w-32 h-32 md:w-40 md:h-40 border-4 border-blue-300 rounded-lg"
                width={500}
                height={300}
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 secondary">
          <div className=" secondary flex flex-col md:flex-row justify-around items-center text-center text-green-400 space-y-8 md:space-y-0">
            <div className="flex flex-col items-center space-y-4 secondary">
              <Image
                src="/Icon-OpinionUser.gif"
                width={150}
                height={150}
                alt="Happy driver with passenger"
                className="w-20 h-20 md:w-32 md:h-32"
              />
              <div className="text-4xl font-bold">+999</div>
              <p className="text-lg">Usuarios satisfechos</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Image
                src="/Icon-Driver.gif"
                width={150}
                height={150}
                alt="Driver Icon"
                className="w-20 h-20 md:w-32 md:h-32"
              />
              <div className="text-4xl font-bold">+999</div>
              <p className="text-lg">Conductores registrados</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Image
                src="/Icon-Travel.gif"
                width={150}
                height={150}
                alt="Travel Icon"
                className="w-20 h-20 md:w-32 md:h-32"
              />
              <div className="text-4xl font-bold">+999</div>
              <p className="text-lg">Viajes completados</p>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <footer className="px-8 py-16 text-center secondary text-blue-900">
          <h3 className="text-3xl font-bold mb-4">¿NECESITAS AYUDA?</h3>
          <p className="text-md mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <h1 className="text-4xl font-bold">GetGo DRIVER</h1>
        </footer>
      </div>
    </div>
  );
}
