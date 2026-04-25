"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import QRCode from "react-qr-code";
import { Montserrat } from "next/font/google";


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

  const hangerRef = useRef<HTMLDivElement>(null);

  // URL construction based on user prompt
  const passengerUrl = `https://getgoapp.onelink.me/oZ2Z/tfis2x64?af_sub1=${af_sub1}&code=${code}&referral_code=${referral_code}`;

  const downloadAsPDF = async () => {
    if (!hangerRef.current) return;

    setIsDownloading(true);
    setIsDownloading(true);

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
    }
  };


  return (
    <div className={`${montserrat.className} flex flex-col items-center justify-center min-h-screen bg-[#001438] p-0 overflow-hidden relative`}>
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
        className="relative w-full aspect-[1414/1000] max-w-7xl overflow-hidden bg-white shadow-2xl"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hanger1.jpg"
            alt="Hanger Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* QR Code Overlay */}
        <div 
          className="absolute z-10"
          style={{
            left: "8%",
            top: "73%",
            width: "15%",
            aspectRatio: "1/1"
          }}
        >
          <div className="p-2 bg-white rounded-xl shadow-lg w-full h-full flex items-center justify-center">
            <QRCode 
              value={passengerUrl} 
              size={200} 
              style={{ height: "auto", maxWidth: "100%", width: "100%" }} 
              viewBox={`0 0 256 256`} 
              fgColor="#001438" 
            />
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
