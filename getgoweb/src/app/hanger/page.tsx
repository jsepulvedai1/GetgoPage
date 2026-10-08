"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import QRCode from "react-qr-code";
import { Montserrat } from "next/font/google";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

const GETGO_LIGHT = "#e2f2f5";

function HangerContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "12345";
  const referral_code = searchParams.get("referral_code") || code;
  const af_sub1 = searchParams.get("af_sub1") || code;

  const [isDownloading, setIsDownloading] = useState(false);
  const [driverInfo, setDriverInfo] = useState<{ firstName?: string; lastName?: string; phone?: string; avatar?: string } | null>(null);

  const hangerRef = useRef<HTMLDivElement>(null);

  // Fetch driver info securely from backend using the code
  useEffect(() => {
    async function fetchDriverInfo() {
      if (!code || code === "12345") return;
      if (code === "mock" && process.env.NODE_ENV === "development") {
        setDriverInfo({ firstName: "JAVIER", lastName: "SEPÚLVEDA", phone: "56987654321" });
        return;
      }
      try {
        const response = await fetch(`https://prod.getgoapp.com/api/v1/hanger-info/?code=${code}`);
        if (response.ok) {
          const data = await response.json();
          setDriverInfo({
            ...data,
            firstName: data.firstName || data.first_name,
            lastName: data.lastName || data.last_name,
          });
        }
      } catch (error) {
        console.error("Error fetching driver info:", error);
        if (process.env.NODE_ENV === "development") {
          setDriverInfo({ firstName: "JAVIER", lastName: "SEPÚLVEDA", phone: "56912345678" });
        }
      }
    }
    fetchDriverInfo();
  }, [code]);

  // URL construction based on user prompt
  const passengerUrl = `https://getgoapp.onelink.me/oZ2Z/tfis2x64?af_sub1=${af_sub1}&code=${code}&referral_code=${referral_code}`;

  const downloadAsPDF = async () => {
    if (!hangerRef.current) return;
    setIsDownloading(true);

    try {
      const originalStyle = hangerRef.current.style.cssText;
      hangerRef.current.style.width = "1280px";
      hangerRef.current.style.minWidth = "1280px";
      hangerRef.current.style.position = "absolute"; 
      hangerRef.current.style.left = "-9999px"; 

      await new Promise(resolve => setTimeout(resolve, 800));

      const canvas = await html2canvas(hangerRef.current, {
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: GETGO_LIGHT,
        windowWidth: 1280, 
        width: 1280,
      });

      hangerRef.current.style.cssText = originalStyle;

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`GetGo_Hanger_${code}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Hubo un error al generar el PDF. Por favor intenta de nuevo.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Helper to format phone number (e.g. 56995754059 -> 569 9575 4059 or similar)
  const formatPhone = (phone?: string) => {
    if (!phone) return "";
    let cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.startsWith("9") && cleanPhone.length === 9) {
      cleanPhone = "56" + cleanPhone;
    } else if (!cleanPhone.startsWith("56")) {
      cleanPhone = "56" + cleanPhone;
    }
    if (cleanPhone.length === 11 && cleanPhone.startsWith("569")) {
      return `+56 9 ${cleanPhone.substring(3, 7)} ${cleanPhone.substring(7)}`;
    }
    return `+${cleanPhone}`;
  };

  return (
    <div className={`${montserrat.className} flex flex-col items-center justify-start min-h-screen bg-[#001438] p-4 sm:p-8 overflow-y-auto overflow-x-hidden relative`} style={{ paddingTop: '100px' }}>
      <div className="fixed top-3 right-6 z-50 no-print">
        <button
          onClick={downloadAsPDF}
          disabled={isDownloading}
          className={`flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-black text-white shadow-2xl transition-all active:scale-95 ${isDownloading ? "bg-gray-400 cursor-not-allowed" : "bg-[#e91e63] hover:bg-[#c2185b] hover:-translate-y-1"}`}
        >
          {isDownloading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin" />
              <span className="hidden sm:inline">Generando PDF...</span>
            </>
          ) : (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              <span className="hidden sm:inline">DESCARGAR PDF</span>
            </>
          )}
        </button>
      </div>

      {/* Contenedor responsivo que escala el Flyer */}
      <div className="w-full max-w-[1414px] relative flex justify-center" style={{ perspective: '1000px' }}>
        
        {/* El Flyer con medidas y fuentes FIJAS ABSOLUTAS */}
        <div
          ref={hangerRef}
          className="relative bg-white shadow-2xl origin-top"
          style={{
            width: "1414px",
            height: "1000px",
            // Un pequeño truco de CSS moderno para que el contenedor escale en base al ancho de su padre sin perder sus proporciones absolutas internamente.
            transform: "scale(var(--scale, 1))",
            transformOrigin: "top center",
          }}
        >
          {/* Script inline para calcular y setear la escala CSS en base al ancho de la pantalla */}
          <style dangerouslySetInnerHTML={{__html: `
            @media (max-width: 1450px) {
              .origin-top {
                --scale: calc((100vw - 32px) / 1414);
                margin-bottom: calc(-1000px * (1 - var(--scale)));
              }
            }
          `}} />

          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hanger1.jpg"
              alt="Hanger Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Dynamic "Descarga aquí" Text */}
          <div 
            className="absolute z-10 w-[198px] text-center"
            style={{
              left: "92px",
              top: "625px",
            }}
          >
            <span className="text-white font-black tracking-widest uppercase" style={{ fontSize: "16px" }}>
              DESCARGA AQUÍ
            </span>
          </div>

          {/* QR Code Overlay (Medidas absolutas) */}
          <div 
            className="absolute z-10"
            style={{
              left: "92px",
              top: "655px",
              width: "198px",
              height: "198px",
            }}
          >
            <div className="p-3 bg-white rounded-2xl shadow-lg w-full h-full flex items-center justify-center">
              <QRCode 
                value={passengerUrl} 
                size={200} 
                style={{ height: "auto", maxWidth: "100%", width: "100%" }} 
                viewBox={`0 0 256 256`} 
                fgColor="#001438" 
              />
            </div>
          </div>

          {/* Driver Contact Info Overlay */}
          {driverInfo && (
            <div 
              className="absolute z-10 flex items-center gap-4"
              style={{
                left: "311px",
                top: "695px",
              }}
            >
              {/* WhatsApp Icon Box */}
              <div className="bg-[#25D366] text-white rounded-full p-4 shadow-md flex items-center justify-center" style={{ width: "65px", height: "65px" }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-wide" style={{ fontSize: "18px", lineHeight: "1.2" }}>WhatsApp</span>
                <span className="text-white font-black" style={{ fontSize: "25px", lineHeight: "1.2" }}>{formatPhone(driverInfo.phone)}</span>
                {driverInfo.firstName && (
                  <span className="text-[#e91e63] font-black mt-1" style={{ fontSize: "28px", lineHeight: "1" }}>
                    {driverInfo.firstName.toUpperCase()}{driverInfo.lastName ? ` ${driverInfo.lastName.toUpperCase()}` : ''}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Referral Code Overlay */}
          <div 
            className="absolute z-10 flex flex-col"
            style={{
              left: "92px",
              top: "865px",
            }}
          >
            <span className="text-white font-semibold tracking-wider mb-2" style={{ fontSize: "16px" }}>CÓDIGO DE REFERIDO:</span>
            <div className="bg-[#e91e63] rounded-xl flex items-center justify-center px-6 py-3 w-fit">
              <span className="text-white font-black tracking-widest" style={{ fontSize: "38px" }}>
                {code.toUpperCase()}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function HangerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#001438] flex items-center justify-center font-bold text-white">Cargando experiencia GetGo...</div>}>
      <HangerContent />
    </Suspense>
  );
}
