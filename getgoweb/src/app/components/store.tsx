import Image from "next/image";

const StoreButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 sm:gap-6">
      {/* Botón de App Store */}
      <a
        href="https://www.apple.com/app-store/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-48 sm:w-56 md:w-64 lg:w-72 transition-transform hover:scale-105"
      >
        <Image
          src="/images/apple.svg" // Ruta de la imagen
          alt="Descargar en App Store"
          width={100}
          height={10}
          className="w-full h-auto"
        />
      </a>

      {/* Botón de Google Play */}
      <a
        href="https://play.google.com/store"
        target="_blank"
        rel="noopener noreferrer"
        className="w-48 sm:w-56 md:w-64 lg:w-72 transition-transform hover:scale-105"
      >
        <Image
          src="/images/play.png" // Ruta de la imagen
          alt="Descargar en Google Play"
          width={200}
          height={60}
          className="w-full h-auto"
        />
      </a>
    </div>
  );
};

export default StoreButtons;
