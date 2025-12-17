"use client";

import { useEffect, useState, useRef } from "react";
import { Montserrat } from "next/font/google";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  display: "swap",
  preload: false,
});

export default function ReferralPage() {
  const [referralCode, setReferralCode] = useState("N/A");
  const displayCode = referralCode.replace(/0/g, "Ø");
  const [message, setMessage] = useState("Redirigiendo...");
  const [showLoading, setShowLoading] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop">("desktop");
  const appOpenedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const deeplinkAttemptedRef = useRef(false);

  // URLs de las stores
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.getgoapp.pasajero";
  const appStoreUrl = "https://apps.apple.com/app/id1234567890"; // TODO: Reemplazar con tu App Store ID real

  // Obtener código de referido de la URL y detectar plataforma
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Obtener código de referido
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code") || "N/A";
      
      console.log("URL completa:", window.location.href);
      console.log("Código obtenido de URL:", code);
      
      setReferralCode(code);

      // Detectar plataforma
      const userAgent = navigator.userAgent || navigator.vendor || (window as Window & { opera?: string }).opera || "";
      const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as Window & { MSStream?: unknown }).MSStream;
      const isAndroid = /android/i.test(userAgent);

      if (isIOS) {
        setPlatform("ios");
      } else if (isAndroid) {
        setPlatform("android");
      } else {
        setPlatform("desktop");
      }
    }
  }, []);

  // Detectar si la app se abrió (la página pierde el foco)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBlur = () => {
      console.log("App opened (page lost focus)");
      appOpenedRef.current = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("Page hidden, app likely opened");
        appOpenedRef.current = true;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    };

    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const redirectToStore = () => {
    if (appOpenedRef.current) {
      console.log("App already opened, skipping store redirect");
      return;
    }

    setShowLoading(true);
    setMessage("Redirigiendo a la tienda...");

    let storeUrl: string;

    if (platform === "ios") {
      storeUrl = appStoreUrl;
    } else if (platform === "android") {
      storeUrl = playStoreUrl;
    } else {
      // Desktop o plataforma desconocida - mostrar opciones
      setMessage("Selecciona tu plataforma:");
      setShowLoading(false);
      setShowFallback(true);
      return;
    }

    // Agregar parámetro de referido a la URL de la store (si es posible)
    try {
      const storeUri = new URL(storeUrl);
      storeUri.searchParams.set("referral", referralCode);
      storeUrl = storeUri.toString();
    } catch {
      // Si falla, usar la URL original
    }

    // Redirigir a la store
    if (typeof window !== "undefined") {
      window.location.href = storeUrl;
    }
  };

  // Intentar abrir la app con deeplink, luego redirigir a la store
  useEffect(() => {
    if (referralCode === "N/A") {
      return;
    }

    if (platform === "desktop") {
      // Mostrar opciones de plataforma si es desktop
      setShowFallback(true);
      setMessage("Selecciona tu plataforma:");
      return;
    }

    // Para iOS y Android, intentar abrir la app primero con App Links / Universal Links
    if (platform === "ios" || platform === "android") {
      if (typeof window === "undefined") return;
      
      // Evitar intentos múltiples
      if (deeplinkAttemptedRef.current) {
        console.log("Deeplink already attempted, skipping");
        return;
      }

      const currentHost = window.location.hostname;
      const encodedCode = encodeURIComponent(referralCode);
      const deeplinkDomain = "getgo-page-h84g.vercel.app";
      
      // Si ya estamos en el dominio de deeplink, NO intentar deeplink (evita loop)
      // Solo esperar y redirigir a la store si la app no se abre
      if (currentHost === deeplinkDomain || currentHost.includes(deeplinkDomain)) {
        console.log(`Already on ${deeplinkDomain} domain, waiting for app to open or redirecting to store`);
        deeplinkAttemptedRef.current = true;
        
        // Esperar un momento para ver si la app se abre
        timeoutRef.current = setTimeout(() => {
          if (!appOpenedRef.current) {
            console.log("App did not open, redirecting to store...");
            redirectToStore();
          }
        }, 2000);
        
        return;
      }

      // Si estamos en otro dominio, redirigir al dominio de deeplink
      // Esto permite que los App Links funcionen correctamente
      console.log(`Redirecting to ${deeplinkDomain} for deeplink`);
      deeplinkAttemptedRef.current = true;
      const deepLinkUrl = `https://${deeplinkDomain}/refer?code=${encodedCode}`;
      
      // Redirigir al dominio correcto (solo una vez)
      window.location.href = deepLinkUrl;

      // Limpiar timeout si el componente se desmonta
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referralCode, platform]);

  const handleManualClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    redirectToStore();
  };

  return (
    <>
      {/* Eruda Console para debugging en móvil */}
      <Script
        src="https://cdn.jsdelivr.net/npm/eruda"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined") {
            const windowWithEruda = window as Window & {
              eruda?: {
                init: () => void;
              };
            };
            if (windowWithEruda.eruda) {
              windowWithEruda.eruda.init();
            }
          }
        }}
      />
      <div
        className={`${montserrat.className} min-h-screen flex items-center justify-center p-5`}
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
      <div className="bg-white rounded-[20px] p-10 max-w-[500px] w-full shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-center">
        <div className="w-[120px] h-[120px] mx-auto mb-8 rounded-[30px] flex items-center justify-center text-5xl text-white font-bold bg-gradient-to-br from-[#667eea] to-[#764ba2]">
          GG
        </div>
        <h1 className="text-[#333] mb-4 text-[28px] font-semibold">
          ¡Únete a GetGo!
        </h1>
        <div className="bg-[#f5f5f5] p-5 rounded-xl my-6 text-[32px] font-bold tracking-[4px] text-[#667eea] font-mono">
          {displayCode}
        </div>
        <p className="text-[#666] mb-8 leading-relaxed text-base">
          {message}
        </p>
        {showLoading && (
          <div className="mt-5">
            <div className="w-10 h-10 mx-auto border-4 border-[#f3f3f3] border-t-[#667eea] rounded-full animate-spin" />
          </div>
        )}
        {showFallback && (
          <div className="mt-8 pt-8 border-t border-[#eee]">
            <p className="mb-4">Si no se redirige automáticamente:</p>
            <a
              href={playStoreUrl}
              onClick={handleManualClick}
              className="block mb-2 text-[#667eea] no-underline text-sm hover:underline"
            >
              Descargar desde Play Store
            </a>
            <a
              href={appStoreUrl}
              className="inline-block px-10 py-4 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white no-underline rounded-xl font-semibold text-lg transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(102,126,234,0.4)] active:translate-y-0 mt-2"
            >
              Descargar desde App Store
            </a>
          </div>
        )}
        </div>
      </div>
    </>
  );
}