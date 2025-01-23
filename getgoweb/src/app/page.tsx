// pages/index.js
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-blue-900 text-white font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-blue-800">
        <h1 className="text-2xl font-bold">GetGo DRIVER</h1>
        <nav>
          <ul className="flex gap-6">
            <li className="hover:underline cursor-pointer">Quienes Somos</li>
            <li className="hover:underline cursor-pointer">Código QR</li>
            <li className="hover:underline cursor-pointer">Ayuda</li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-16 text-center">
        <h2 className="text-4xl font-extrabold mb-4">LOREM IPSUM DOLOR SIT</h2>
        <p className="text-lg mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex justify-center items-center gap-4">
          <div className="w-1/2">
            <Image
              src="/images/sample-image1.jpg"
              alt="QR Code"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold">ESCANEA NUESTRO QR</h3>
            <p className="text-md mt-4 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Image
              src="/images/sample-qr-code.jpg"
              alt="QR Code"
              width={200}
              height={200}
              className="border border-white rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-blue-800 py-12">
        <div className="flex justify-around text-center">
          <div className="text-center">
            <div className="text-4xl font-bold">+999</div>
            <p className="mt-2">Lorem ipsum dolor sit amet</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">+999</div>
            <p className="mt-2">Lorem ipsum dolor sit amet</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">+999</div>
            <p className="mt-2">Lorem ipsum dolor sit amet</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="px-8 py-16 text-center">
        <h3 className="text-2xl font-bold mb-4">¿NECESITAS AYUDA?</h3>
        <p className="text-md mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h1 className="text-3xl font-bold">GetGo DRIVER</h1>
      </footer>
    </div>
  );
}

