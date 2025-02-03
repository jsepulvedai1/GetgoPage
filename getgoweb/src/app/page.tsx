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
      style={{ backgroundImage: "url('/BG-WebPage-GetGo.png')" }}
    >
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-opacity-90" style={{ backgroundImage: "url('/BG-WebPage-GetGo.png')" }}>
        <Image
          src="/images/GetGo_Logo-Negative.png"
          alt="GetGo Logo"
          width={180}
          height={80}
        />
        <nav style={{ backgroundImage: "url('/BG-WebPage-GetGo.png')" }}>
          <ul className="flex gap-6 text-white text-lg">
            <li className="hover:text-blue-400 cursor-pointer transition-all">Quienes Somos</li>
            <li className="hover:text-blue-400 cursor-pointer transition-all">Código QR</li>
            <li className="hover:text-blue-400 cursor-pointer transition-all">Ayuda</li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-16 flex flex-col md:flex-row items-center gap-8" style={{ backgroundImage: "url('/BG-WebPage-GetGo.png')" }}>
        <div className="md:w-1/2 text-left">
          <h2 className="text-6xl font-bold text-[#6ecedb] leading-tight mb-6 uppercase">
          Regístrate en minutos <br /> gana al instante.
          </h2>
          <p className="text-lg text-white mb-8">
          Maneja con GetGo y convierte tu tiempo libre en dinero
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/driver.png"
            alt="Driver and Passenger"
            width={600}
            height={450}
            className="rounded-lg object-cover"
          />
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
            className="rounded-lg object-cover"
          />
        </div>
        <div className="text-center md:text-left w-full md:w-1/2">
          <h3 className="text-4xl font-bold text-black bg-opacity-80 px-4 py-2 inline-block uppercase bg-[#6ecedb]">
            Escanea <br /> Nuestro QR
          </h3>
          <p className="text-lg text-white mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex justify-center md:justify-start">
            <Image
              src="/images/codigoQR.png"
              alt="QR Code"
              width={120}
              height={120}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 flex flex-col md:flex-row justify-around items-center text-center space-y-8 md:space-y-0">
        <div className="flex flex-col items-center">
          <Image src="/icons/users.svg" alt="Users" width={80} height={80} />
          <h4 className="text-green-400 text-3xl font-bold">+999</h4>
          <p className="text-white text-lg">Usuarios satisfechos</p>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/icons/drivers.svg" alt="Drivers" width={80} height={80} />
          <h4 className="text-green-400 text-3xl font-bold">+999</h4>
          <p className="text-white text-lg">Conductores registrados</p>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/icons/travels.svg" alt="Travels" width={80} height={80} />
          <h4 className="text-green-400 text-3xl font-bold">+999</h4>
          <p className="text-white text-lg">Viajes completados</p>
        </div>
      </section>

      {/* Help Section */}
      <footer className="px-8 py-16 text-center text-white">
        <h3 className="text-2xl font-bold bg-[#F6E15E] text-[#001F4E] px-4 py-2 rounded-md mb-4">
          ¿NECESITAS AYUDA?
        </h3>
        <p className="text-md mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Image
          src="/images/GetGo_Logo-Negative.png"
          alt="GetGo Logo"
          width={200}
          height={100}
        />
      </footer>
    </div>
  );
}
