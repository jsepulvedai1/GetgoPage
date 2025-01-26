import Image from 'next/image';

export default function Home() {
  return (
    <div className="text-white font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-blue-800">
        <Image
          src="/images/GetGo_Logo-Negative.png"
          alt="Happy driver with passenger"
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
      <section className="px-8 py-16 text-left">
        <h2 className="text-4xl font-extrabold mb-4 text-blue-300 font-bold">LOREM IPSUM DOLOR SIT</h2>
        <p className="text-lg mb-8 max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/sample-image1.jpg"
              alt="Happy driver with passenger"
              width={300}
              height={150}
              className="rounded-lg"
            />
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold text-blue-300">ESCANEA NUESTRO QR</h3>
            <p className="text-md mt-4 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Image
              src="/images/codigoQR.png"
              alt="QR Code"
              width={150}
              height={200}
              className="border border-white rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-blue-800 py-12">
        <div className="flex flex-col md:flex-row justify-around text-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400">+999</div>
            <p className="mt-2">Lorem ipsum dolor sit amet</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400">+999</div>
            <p className="mt-2">Lorem ipsum dolor sit amet</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400">+999</div>
            <p className="mt-2">Lorem ipsum dolor sit amet</p>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <footer className="px-8 py-16 text-center">
        <h3 className="text-2xl font-bold inline-block bg-[#F6E15E] text-[#001F4E] px-4 py-2 rounded-md mb-4">¿NECESITAS AYUDA?</h3>
        <p className="text-md mb-8 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h1 className="text-3xl font-bold">GetGo DRIVER</h1>
      </footer>
    </div>
  );
}


