"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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
  const appStoreUrl = "https://apps.apple.com/app/id6748690795";

  // Generar fingerprint del dispositivo (usando useCallback para evitar recrear la función)
  const getDeviceFingerprint = useCallback((): string => {
    if (typeof window === "undefined") return "";
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.textBaseline = "top";
      ctx.font = "14px Arial";
      ctx.fillText("Device fingerprint", 2, 2);
    }

    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + "x" + screen.height,
      new Date().getTimezoneOffset().toString(),
      canvas.toDataURL(),
      navigator.hardwareConcurrency?.toString() || "",
    ].join("|");

    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }

    return Math.abs(hash).toString(36);
  }, []);

  // Guardar código en backend (usando useCallback para evitar recrear la función)
  const saveCodeToBackend = useCallback(async (code: string): Promise<void> => {
    try {
      const deviceId = getDeviceFingerprint();
      const response = await fetch("https://getgo-page-h84g.vercel.app/api/save-referral-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          device_id: deviceId,
          timestamp: Date.now(),
        }),
      });

      if (response.ok) {
        console.log("✅ Código guardado en backend");
      } else {
        console.warn("⚠️ Error guardando en backend:", response.status);
      }
    } catch (error) {
      console.error("❌ Error guardando en backend:", error);
      // No lanzar error, solo loguear (localStorage es el fallback)
    }
  }, [getDeviceFingerprint]);

  // Obtener código de referido de la URL y detectar plataforma
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Obtener código de referido de la URL
      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get("code") || "N/A";
      
      // IMPORTANTE: SIEMPRE guardar el código en localStorage Y backend cuando hay uno en la URL
      // Esto asegura que no se pierda aunque la app se abra o redirija a la tienda
      if (code !== "N/A") {
        try {
          // Guardar en localStorage (fallback rápido)
          localStorage.setItem("getgo_referral_code", code);
          localStorage.setItem("getgo_referral_timestamp", Date.now().toString());
          console.log(`✅ Código guardado en localStorage desde URL: ${code}`);
          
          // Guardar en backend (persistencia más robusta)
          saveCodeToBackend(code);
        } catch (error) {
          console.error("❌ Error guardando código en localStorage:", error);
        }
      } else {
        // Si no hay código en la URL, intentar recuperarlo de localStorage
        // (útil cuando el usuario vuelve después de instalar la app)
        try {
          const storedCode = localStorage.getItem("getgo_referral_code");
          const storedTimestamp = localStorage.getItem("getgo_referral_timestamp");
          
          // Solo usar el código guardado si tiene menos de 7 días (604800000 ms)
          if (storedCode && storedTimestamp) {
            const age = Date.now() - parseInt(storedTimestamp, 10);
            const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 días
            
            if (age < maxAge) {
              code = storedCode;
              console.log(`✅ Código recuperado de localStorage: ${code}`);
            } else {
              // Código expirado, limpiar
              localStorage.removeItem("getgo_referral_code");
              localStorage.removeItem("getgo_referral_timestamp");
              console.log("⏰ Código en localStorage expirado, limpiado");
            }
          }
        } catch (error) {
          console.error("❌ Error leyendo localStorage:", error);
        }
      }
      
      console.log("URL completa:", window.location.href);
      console.log("Código obtenido:", code);
      
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

  // Detectar si la app se abrió usando múltiples métodos
  useEffect(() => {
    if (typeof window === "undefined") return;

    const markAppAsOpened = () => {
      if (!appOpenedRef.current) {
        console.log("✅ App detected as opened");
        appOpenedRef.current = true;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    };

    // Método 1: Blur event (página pierde foco)
    const handleBlur = () => {
      console.log("📱 Blur event detected");
      // Pequeño delay para evitar falsos positivos
      setTimeout(markAppAsOpened, 100);
    };

    // Método 2: Visibility change (página se oculta)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("👁️ Page hidden (visibilitychange)");
        markAppAsOpened();
      }
    };

    // Método 3: Pagehide event (página se oculta, más confiable en iOS)
    const handlePageHide = () => {
      console.log("🚪 Page hide event detected");
      markAppAsOpened();
    };

    // Método 4: Focus out (específico para algunos navegadores)
    const handleFocusOut = () => {
      console.log("🔍 Focus out event detected");
      setTimeout(markAppAsOpened, 100);
    };

    // Método 5: Detectar si estamos en un iframe (algunos navegadores abren en iframe)
    const checkIfInIframe = () => {
      try {
        if (window.self !== window.top) {
          console.log("🖼️ Detected in iframe, app likely opened");
          markAppAsOpened();
        }
      } catch {
        // Si hay error de cross-origin, probablemente estamos en iframe
        console.log("🖼️ Cross-origin error, likely in iframe");
        markAppAsOpened();
      }
    };

    // Agregar todos los listeners
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("focusout", handleFocusOut);
    
    // Verificar iframe después de un pequeño delay
    setTimeout(checkIfInIframe, 500);

    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  const redirectToStore = () => {
    if (appOpenedRef.current) {
      console.log("✅ App already opened, skipping store redirect");
      console.log(`💾 Código ya guardado en localStorage: ${referralCode}`);
      return;
    }

    // IMPORTANTE: Guardar el código en localStorage Y backend ANTES de redirigir
    // Esto permite que la app lo recupere después de la instalación
    // (Aunque ya debería estar guardado, lo guardamos de nuevo por seguridad)
    if (typeof window !== "undefined" && referralCode !== "N/A") {
      try {
        // Guardar en localStorage (fallback rápido)
        localStorage.setItem("getgo_referral_code", referralCode);
        localStorage.setItem("getgo_referral_timestamp", Date.now().toString());
        console.log(`💾 Código guardado en localStorage antes de redirigir a tienda: ${referralCode}`);
        
        // Guardar en backend (persistencia más robusta)
        saveCodeToBackend(referralCode);
        
        console.log(`📱 La app puede recuperar este código desde:`);
        console.log(`   - localStorage: getgo_referral_code`);
        console.log(`   - Backend API: /api/save-referral-code?device_id=...`);
        console.log(`   - Página web: https://getgo-page-h84g.vercel.app/get-referral-code`);
      } catch (error) {
        console.error("❌ Error guardando código en localStorage:", error);
      }
    } else {
      console.warn("⚠️ No hay código de referido para guardar");
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
        console.log(`📍 Already on ${deeplinkDomain} domain`);
        console.log(`⏳ Waiting for app to open (App Links should handle this automatically)`);
        console.log(`💡 If you see a dialog, choose "Open with GetGo"`);
        deeplinkAttemptedRef.current = true;
        
        // IMPORTANTE: Guardar código ANTES de esperar (por si acaso)
        // Esto asegura que el código esté guardado incluso si la app se abre rápidamente
        if (typeof window !== "undefined" && referralCode !== "N/A") {
          try {
            // Guardar en localStorage (fallback rápido)
            localStorage.setItem("getgo_referral_code", referralCode);
            localStorage.setItem("getgo_referral_timestamp", Date.now().toString());
            console.log(`✅ Código guardado en localStorage (preventivo): ${referralCode}`);
            
            // Guardar en backend (persistencia más robusta)
            saveCodeToBackend(referralCode);
          } catch (error) {
            console.error("❌ Error guardando código en localStorage:", error);
          }
        }
        
        // Para iOS: Universal Links pueden tardar más en abrir la app
        // Para Android: App Links verificados abren instantáneamente, pero no verificados pueden tardar
        // Si App Links no están verificados, Android muestra un diálogo que puede tardar más
        // Aumentamos el timeout significativamente para dar tiempo al usuario de elegir la app
        const timeoutDuration = platform === "ios" ? 5000 : 6000; // Más tiempo, especialmente para Android con diálogo
        
        console.log(`⏳ Esperando ${timeoutDuration}ms para ver si la app se abre...`);
        console.log(`💡 Si ves un diálogo, elige "Abrir con GetGo" para que la app se abra`);
        
        // Verificar periódicamente si la página perdió el foco (más confiable que eventos)
        let checkCount = 0;
        const maxChecks = Math.floor(timeoutDuration / 500); // Verificar cada 500ms
        
        const checkInterval = setInterval(() => {
          checkCount++;
          
          // Si la página está oculta o perdió el foco, probablemente la app se abrió
          if (document.hidden || !document.hasFocus()) {
            console.log("✅ Página oculta o sin foco detectado, app probablemente abierta");
            appOpenedRef.current = true;
            clearInterval(checkInterval);
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
            return;
          }
          
          // Si llegamos al máximo de checks, detener
          if (checkCount >= maxChecks) {
            clearInterval(checkInterval);
          }
        }, 500);
        
        // Esperar un momento para ver si la app se abre
        timeoutRef.current = setTimeout(() => {
          clearInterval(checkInterval);
          
          if (!appOpenedRef.current) {
            console.log("⏱️ Timeout reached, app did not open, redirecting to store...");
            console.log(`💾 Código ya guardado en localStorage: ${referralCode}`);
            console.log(`📱 La app puede recuperar el código desde: https://getgo-page-h84g.vercel.app/get-referral-code`);
            redirectToStore();
          } else {
            console.log("✅ App opened successfully, not redirecting to store");
            console.log(`💾 Código guardado en localStorage: ${referralCode}`);
          }
        }, timeoutDuration);
        
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