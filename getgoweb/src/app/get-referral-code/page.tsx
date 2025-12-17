"use client";

import { useEffect, useState } from "react";

/**
 * Página para que la app recupere el código de referido desde localStorage
 * 
 * La app debe abrir un WebView a esta URL:
 * https://getgo-page-h84g.vercel.app/get-referral-code
 * 
 * El WebView ejecutará JavaScript para leer el código desde localStorage
 * y enviarlo a la app nativa.
 */
export default function GetReferralCodePage() {
  const [code, setCode] = useState<string | null>(null);
  const [status, setStatus] = useState("Recuperando código de referido...");

  useEffect(() => {
    try {
      // Intentar leer el código desde localStorage
      const storedCode = localStorage.getItem("getgo_referral_code");
      const storedTimestamp = localStorage.getItem("getgo_referral_timestamp");

      if (storedCode && storedTimestamp) {
        const age = Date.now() - parseInt(storedTimestamp, 10);
        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 días

        if (age < maxAge) {
          // Código válido
          setCode(storedCode);
          setStatus("Código encontrado:");

          // Intentar enviar el código a la app nativa
          // Método 1: React Native WebView
          if (typeof window !== "undefined" && (window as any).ReactNativeWebView) {
            (window as any).ReactNativeWebView.postMessage(
              JSON.stringify({
                type: "referral_code",
                code: storedCode,
              })
            );
          }
          // Método 2: iOS WKWebView
          else if (
            typeof window !== "undefined" &&
            (window as any).webkit?.messageHandlers
          ) {
            (window as any).webkit.messageHandlers.referralCode.postMessage(
              storedCode
            );
          }
          // Método 3: Android WebView con JavaScript Interface
          else if (typeof window !== "undefined" && (window as any).Android) {
            (window as any).Android.onReferralCodeReceived(storedCode);
          }
          // Fallback: mostrar en la página para que la app lo lea
          else {
            console.log("Referral code:", storedCode);
          }
        } else {
          // Código expirado
          localStorage.removeItem("getgo_referral_code");
          localStorage.removeItem("getgo_referral_timestamp");
          setStatus("Código expirado o no encontrado");
        }
      } else {
        // No hay código guardado
        setStatus("No se encontró código de referido");
      }
    } catch (error) {
      console.error("Error recuperando código:", error);
      setStatus("Error al recuperar el código");
    }
  }, []);

  return (
    <div
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        margin: 0,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "400px" }}>
        <h1>GetGo</h1>
        <div style={{ marginTop: "20px", opacity: 0.9 }}>{status}</div>
        {code && (
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              margin: "20px 0",
              fontFamily: "monospace",
              background: "rgba(255, 255, 255, 0.2)",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            {code}
          </div>
        )}
      </div>
    </div>
  );
}

