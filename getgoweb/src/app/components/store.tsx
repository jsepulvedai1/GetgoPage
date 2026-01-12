import Image from "next/image";

const StoreButtons = () => {
  const storeLinks = {
    pasajero: {
      apple: "https://apps.apple.com/cl/app/id6748690795", // Nuevo link App Store Pasajero
      google: "https://play.google.com/store/apps/details?id=com.getgoapp.pasajero", // Link actual de pasajero Android
    },
    conductor: {
      apple: "https://apps.apple.com/cl/app/id6749026117", // Nuevo link App Store Conductor
      google: "https://play.google.com/store/apps/details?id=com.getgodriver", // Link Conductor Android
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full items-center">
      {/* Sección Pasajeros */}
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-[#000080] font-bold text-xl italic uppercase tracking-wider">
          App Pasajeros
        </h4>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={storeLinks.pasajero.apple}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image
              src="/images/App_Store-Button.webp"
              alt="Descargar Pasajero en App Store"
              width={200}
              height={60}
              className="w-48 h-auto"
            />
          </a>
          <a
            href={storeLinks.pasajero.google}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image
              src="/images/Play_Store -Button.webp"
              alt="Descargar Pasajero en Google Play"
              width={200}
              height={60}
              className="w-48 h-auto"
            />
          </a>
        </div>
      </div>

      {/* Separador sutil */}
      <div className="w-24 h-1 bg-[#f7da3a] rounded-full opacity-50"></div>

      {/* Sección Conductores */}
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-[#000080] font-bold text-xl italic uppercase tracking-wider">
          App Conductores
        </h4>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={storeLinks.conductor.apple}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image
              src="/images/App_Store-Button.webp"
              alt="Descargar Conductor en App Store"
              width={200}
              height={60}
              className="w-48 h-auto"
            />
          </a>
          <a
            href={storeLinks.conductor.google}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image
              src="/images/Play_Store -Button.webp"
              alt="Descargar Conductor en Google Play"
              width={200}
              height={60}
              className="w-48 h-auto"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default StoreButtons;
