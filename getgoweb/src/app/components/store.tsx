import Image from "next/image";

const StoreButtons = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 mt-6 sm:flex-row sm:gap-6">
      {/* Botón de App Store */}
      <a
        href="https://www.apple.com/app-store/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-50 sm:w-48 md:w-60 lg:w-100 transition-transform hover:scale-105" // Ajusta tamaños aquí
      >
        <Image
          src="/images/App_Store-Button.png"
          alt="Descargar en App Store"
          width={300}
          height={60}
          className="w-full h-auto max-w-[250px] sm:max-w-[300px] md:max-w-[350px]" // Ajusta aquí también
        />
      </a>

      {/* Botón de Google Play */}
      <a
        href="https://play.google.com/store"
        target="_blank"
        rel="noopener noreferrer"
        className="w-65 sm:w-48 md:w-60 lg:w-100 transition-transform hover:scale-105"
      >
        <Image
          src="/images/Play_Store -Button.png"
          alt="Descargar en Google Play"
          width={400}
          height={60}
          className="w-full h-auto max-w-[250px] sm:max-w-[250px] md:max-w-[300px]"
        />
      </a>
    </div>
  );
};

export default StoreButtons;
