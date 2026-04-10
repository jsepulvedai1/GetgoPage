"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import QRCode from "react-qr-code";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

const GETGO_LIGHT = "#e2f2f5";

function HangerContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "12345";
  const referral_code = searchParams.get("referral_code") || code;
  const af_sub1 = searchParams.get("af_sub1") || code;

  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const hangerRef = useRef<HTMLDivElement>(null);

  // URL construction based on user prompt
  const driverUrl = `https://getgoappdriver.onelink.me/x3KZ/mu3pnam9?af_sub1=${af_sub1}&code=${code}&referral_code=${referral_code}`;
  const passengerUrl = `https://getgoapp.onelink.me/oZ2Z/tfis2x64?af_sub1=${af_sub1}&code=${code}&referral_code=${referral_code}`;

  const downloadAsPDF = async () => {
    if (!hangerRef.current) return;

    setIsDownloading(true);
    setIsPrinting(true);

    try {
      // Store original styles to restore them later
      const originalStyle = hangerRef.current.style.cssText;

      // Force desktop dimensions for capture
      hangerRef.current.style.width = "1280px";
      hangerRef.current.style.minWidth = "1280px";
      hangerRef.current.style.position = "absolute"; // Take out of flow to avoid layout breaks
      hangerRef.current.style.left = "-9999px"; // Hide it during capture

      // Small delay to ensure any layout shifts and state changes are settled
      await new Promise(resolve => setTimeout(resolve, 800));

      const canvas = await html2canvas(hangerRef.current, {
        scale: 2, // High quality
        useCORS: true,
        logging: false,
        backgroundColor: GETGO_LIGHT,
        windowWidth: 1280, // Force media queries to desktop state
        width: 1280,
      });

      // Restore original styles
      hangerRef.current.style.cssText = originalStyle;

      const imgData = canvas.toDataURL("image/png");

      // Calculate PDF dimensions based on canvas aspect ratio
      // Standard A4 is 210 x 297mm. We'll use the canvas dimensions for a pixel-perfect fit.
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
      setIsPrinting(false);
    }
  };

  // Helper to adjust font size and tracking based on code length
  const getCodeStyles = (text: string) => {
    const len = text.length;
    if (len <= 5) return "text-7xl md:text-9xl tracking-widest";
    if (len <= 6) return "text-6xl md:text-8xl tracking-wider";
    if (len <= 7) return "text-5xl md:text-7xl tracking-wide";
    return "text-4xl md:text-6xl tracking-normal";
  };

  const codeStyles = getCodeStyles(code);

  return (
    <div className={`${montserrat.className} flex flex-col items-center justify-center min-h-screen bg-[#e2f2f5] p-0 overflow-hidden relative`}>
      {/* Download Action Button */}
      <div className="fixed top-6 right-6 z-50 no-print">
        <button
          onClick={downloadAsPDF}
          disabled={isDownloading}
          className={`flex items-center gap-3 px-8 py-4 rounded-full font-black text-white shadow-2xl transition-all active:scale-95 ${isDownloading ? "bg-gray-400 cursor-not-allowed" : "bg-[#e91e63] hover:bg-[#c2185b] hover:-translate-y-1"
            }`}
        >
          {isDownloading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generando PDF...
            </>
          ) : (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              DESCARGAR PDF
            </>
          )}
        </button>
      </div>

      {/* Main Hanger Container to Capture */}
      <div
        ref={hangerRef}
        className="w-full flex-1 flex flex-col items-center justify-center relative bg-[#e2f2f5]"
      >
        {/* Background City Silhouette */}
        <div className="absolute bottom-0 w-full h-[35%] bg-[#0a1d37] z-0">
          <div className="absolute top-0 left-0 w-full h-32 -translate-y-full overflow-hidden">
            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full fill-[#0a1d37] opacity-100">
              <path d="M0 100 L0 80 L20 80 L20 40 L40 40 L40 70 L60 70 L60 30 L80 30 L80 60 L100 60 L100 20 L120 20 L120 70 L140 70 L140 50 L160 50 L160 80 L180 80 L180 40 L200 40 L200 60 L220 60 L220 10 L240 10 L240 70 L260 70 L260 50 L280 50 L280 80 L300 80 L300 30 L320 30 L320 60 L340 60 L340 40 L360 40 L360 70 L380 70 L380 50 L400 50 L400 80 L420 80 L420 20 L440 20 L440 60 L460 60 L460 40 L480 40 L480 70 L500 70 L500 30 L520 30 L520 60 L540 60 L540 50 L560 50 L560 80 L580 80 L580 40 L600 40 L600 60 L620 60 L620 20 L640 20 L640 70 L660 70 L660 40 L680 40 L680 70 L700 70 L700 30 L720 30 L720 60 L740 60 L740 50 L760 50 L760 80 L780 80 L780 40 L800 40 L800 60 L820 60 L820 10 L840 10 L840 70 L860 70 L860 50 L880 50 L880 80 L900 80 L900 30 L920 30 L920 60 L940 60 L940 40 L960 40 L960 70 L980 70 L980 50 L1000 50 L1000 100 Z" />
            </svg>
          </div>

          {/* Map Dots Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-4 p-8">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center pt-10 pb-24 px-6">

          {/* Header Section */}
          <div className="flex flex-col items-center mb-12 text-center w-full">
            <div className={`flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mb-4 w-full px-4 ${isPrinting ? "flex-row" : ""}`}>
              <h1 className={`text-[#0a1d37] font-black uppercase tracking-tighter italic leading-none ${isPrinting ? "text-7xl" : "text-4xl md:text-7xl"}`}>
                BIENVENIDO A
              </h1>
              <div className={`relative flex items-center justify-center ${isPrinting ? "h-[95px] w-[320px]" : "h-[60px] md:h-[95px] w-[220px] md:w-[320px]"}`}>
                <Image
                  src="/images/GetGo_Logotype.png"
                  alt="GetGo Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h2 className={`text-[#0a1d37] font-extrabold uppercase tracking-[0.2em] mt-4 opacity-90 leading-tight ${isPrinting ? "text-4xl" : "text-xl md:text-4xl"}`}>
              TU NUEVA APP DE TRANSPORTE
            </h2>
          </div>

          {/* Central Box with Referral Code */}
          <div className="relative w-full max-w-3xl mb-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`bg-white rounded-[50px] shadow-2xl text-center relative border-[10px] border-white ring-2 ring-[#0a1d37]/5 ${isPrinting ? "p-12" : "p-6 md:p-12"}`}
            >
              <span className={`font-black text-[#0a1d37] drop-shadow-sm ${isPrinting ? getCodeStyles(code).replace("text-7xl ", "").replace("md:", "") : codeStyles}`}>
                {code.toUpperCase()}
              </span>
            </motion.div>


            {/* Pointing Hand with Tooltip */}

          </div>

          {/* QR Codes Section */}
          <div className={`flex gap-8 w-full justify-center items-stretch ${isPrinting ? "flex-row mt-8" : "flex-col md:flex-row"}`}>

            {/* Available On Section */}
            <div className={`bg-[#e91e63] rounded-[40px] p-10 flex flex-col justify-center items-center gap-8 shadow-2xl text-white relative overflow-hidden group ${isPrinting ? "w-1/3" : "md:w-1/3"}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-white/20 transition-all" />
              <h3 className="text-4xl font-black uppercase text-center leading-[0.9] tracking-tighter italic">
                Disponible en
              </h3>
              <div className="flex flex-col gap-4 w-full max-w-[200px]">
                <Image src="/images/App_Store-Button.png" alt="App Store" width={200} height={60} className="hover:scale-105 transition-transform cursor-pointer shadow-lg rounded-xl" />
                <Image src="/images/Play_Store -Button.png" alt="Play Store" width={200} height={60} className="hover:scale-105 transition-transform cursor-pointer shadow-lg rounded-xl" />
              </div>
            </div>

            {/* QR Conductor */}
            <div className={`flex flex-col items-center group ${isPrinting ? "w-1/4" : "md:w-1/4"}`}>
              <div className="bg-[#e91e63] text-white px-6 py-3 rounded-t-[25px] font-black uppercase text-sm flex items-center gap-3 shadow-lg w-full justify-center z-10 translate-y-2 group-hover:translate-y-0 transition-transform">
                <span>GetGo Conductor</span>
              </div>
              <div className="bg-white p-6 rounded-[35px] shadow-2xl w-full flex items-center justify-center aspect-square border-[8px] border-[#e91e63] z-0">
                <QRCode value={driverUrl} size={200} style={{ height: "auto", maxWidth: "100%", width: "100%" }} viewBox={`0 0 256 256`} fgColor="#0a1d37" />
              </div>
            </div>

            {/* QR Pasajero */}
            <div className={`flex flex-col items-center group ${isPrinting ? "w-1/4" : "md:w-1/4"}`}>
              <div className="bg-[#e91e63] text-white px-6 py-3 rounded-t-[25px] font-black uppercase text-sm flex items-center gap-3 shadow-lg w-full justify-center z-10 translate-y-2 group-hover:translate-y-0 transition-transform">
                <span>GetGo Pasajero</span>
              </div>
              <div className="bg-white p-6 rounded-[35px] shadow-2xl w-full flex items-center justify-center aspect-square border-[8px] border-[#e91e63] z-0">
                <QRCode value={passengerUrl} size={200} style={{ height: "auto", maxWidth: "100%", width: "100%" }} viewBox={`0 0 256 256`} fgColor="#0a1d37" />
              </div>
            </div>

          </div>
        </div>

        {/* Footer scrolling text animation */}


        {/* Absolute Pins */}
        <div className="absolute top-[20%] left-[10%] opacity-10 pointer-events-none">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="#0a1d37"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" /></svg>
        </div>
        <div className="absolute top-[30%] right-[15%] opacity-10 pointer-events-none">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="#0a1d37"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" /></svg>
        </div>
      </div>
    </div>
  );
}

export default function HangerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#e2f2f5] flex items-center justify-center font-bold text-[#0a1d37]">Cargando experiencia GetGo...</div>}>
      <HangerContent />
    </Suspense>
  );
}
