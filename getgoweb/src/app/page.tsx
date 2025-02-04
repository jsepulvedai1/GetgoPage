import Image from "next/image";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['900'],
  display: 'swap',
});

export default function Home() {
  return (
    <div className={`${montserrat.className} bg-cover bg-center min-h-screen`}
    >
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-3 bg-[#f3fbff] bg-opacity-100 z-50">
        <Image
          src="/images/GetGo_Logo.png"
          alt="GetGo Logo"
          width={180}
          height={80}
          className="w-[10vw] h-auto"  // Ajustamos la imagen con un tamaño relativo
        />
        <nav>
          <ul className="flex gap-6 text-[#000080] text-[1.5vw]">  {/* Ajustamos el tamaño de texto usando vw */}
            <li className="hover:text-blue-400 cursor-pointer transition-all">Quienes Somos</li>
            <li className="hover:text-blue-400 cursor-pointer transition-all">Código QR</li>
            <li className="hover:text-blue-400 cursor-pointer transition-all">Ayuda</li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-0 py-16 flex flex-col md:flex-row gap-8" style={{ paddingTop: "80px" }}>
        <div className="w-full h-80 text-left relative bg-cover bg-center flex justify-center items-center"
          style={{ backgroundImage: "url('/images/backgroundHeader.png')", height: "68vh", margin: "0", padding: "0" }}>

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
      {/* QR Section */}
      <section className="px-8 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/images/phone-app.png"
            alt="QR Code on Phone"
            width={500}
            height={500}
            className="w-full max-w-sm h-auto rounded-lg object-cover"
          />
        </div>
        <div className="text-center md:text-left w-full md:w-1/2">
          <h3 className="text-4xl font-bold text-black bg-opacity-80 px-4 py-2 inline-block uppercase bg-[#6ecedb+]">
            Escanea <br /> Nuestro QR
          </h3>
          <p className="text-lg text-[#000080] mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex justify-center md:justify-start">
            <Image
              src="/images/codigoQR.png"
              alt="QR Code"
              width={120}
              height={120}
              className="w-48 h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 flex flex-col md:flex-row justify-around items-center text-center space-y-8 md:space-y-0">
        <div className="flex flex-col items-center">
          <Image src="/Icon-OpinionUser.gif" alt="Users" width={80} height={80} className="w-20 h-auto" />
          <h4 className="text-green-400 text-3xl font-bold">+999</h4>
          <p className="text-[#000080] text-lg">Usuarios satisfechos</p>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/Icon-Driver.gif" alt="Drivers" width={80} height={80} className="w-20 h-auto" />
          <h4 className="text-green-400 text-3xl font-bold">+999</h4>
          <p className="text-[#000080] text-lg">Conductores registrados</p>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/Icon-travel.gif" alt="Travels" width={80} height={80} className="w-20 h-auto" />
          <h4 className="text-green-400 text-3xl font-bold">+999</h4>
          <p className="text-[#000080] text-lg">Viajes completados</p>
        </div>
      </section>

      {/* Help Section */}
      <footer className="px-0 py-16 flex flex-col md:flex-row gap-8" style={{ paddingTop: "30px" }}>
        <div
          className="w-full text-left relative bg-cover bg-center flex justify-center items-center"
          style={{
            backgroundImage: "url('/images/Maqueta_Web-GetGo-V2_03.png')",
            height: "68vh",
            margin: "0",
            padding: "0"
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
                src="/images/GetGo_Logo-OneInk.png"
                alt="GetGo Logo"
                width={200}
                height={100}
                className="w-[18vw] h-auto mx-auto"
              />
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
