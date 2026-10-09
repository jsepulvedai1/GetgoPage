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
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const [driverInfo, setDriverInfo] = useState<{ firstName?: string; lastName?: string; phone?: string; avatar?: string } | null>(null);

  const hangerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pdfReadyUrl, setPdfReadyUrl] = useState<string | null>(null);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(1.1);

  // Calculate scale dynamically to fit mobile & desktop screens without clipping
  useEffect(() => {
    function updateScale() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        if (containerWidth > 0) {
          setScale(containerWidth / 1414);
        }
      }
    }
    updateScale();
    const t = setTimeout(updateScale, 60);
    window.addEventListener("resize", updateScale);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  // Fetch driver info securely from backend using the code
  useEffect(() => {
    async function fetchDriverInfo() {
      if (!code) return;
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
      }
    }
    fetchDriverInfo();
  }, [code]);

  // Passenger deep link URL with attribution
  const passengerUrl = `https://getgoapp.onelink.me/oZ2Z/tfis2x64?af_sub1=${af_sub1}&code=${code}&referral_code=${referral_code}`;

  const downloadAsPDF = async () => {
    if (!hangerRef.current) return;
    setIsDownloading(true);

    try {
      const originalStyle = hangerRef.current.style.cssText;
      hangerRef.current.style.width = "1414px";
      hangerRef.current.style.minWidth = "1414px";
      hangerRef.current.style.maxWidth = "1414px";
      hangerRef.current.style.height = "1000px";
      hangerRef.current.style.minHeight = "1000px";
      hangerRef.current.style.maxHeight = "1000px";
      hangerRef.current.style.margin = "0";
      hangerRef.current.style.position = "fixed"; 
      hangerRef.current.style.left = "-9999px"; 
      hangerRef.current.style.top = "0"; 
      hangerRef.current.style.transform = "none";
      hangerRef.current.style.zIndex = "-9999";

      await new Promise(resolve => setTimeout(resolve, 600));

      const canvas = await html2canvas(hangerRef.current, {
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: GETGO_LIGHT,
        windowWidth: 1414, 
        width: 1414,
        height: 1000,
      });

      hangerRef.current.style.cssText = originalStyle;

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      const filename = `GetGo_Volante_${code.toUpperCase()}.pdf`;
      pdf.save(filename);
      
      const pdfBlob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      setPdfReadyUrl(blobUrl);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Hubo un error al generar el PDF. Por favor intenta de nuevo.");
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsImage = async () => {
    if (!hangerRef.current) return;
    setIsDownloadingImage(true);

    try {
      const originalStyle = hangerRef.current.style.cssText;
      hangerRef.current.style.width = "1414px";
      hangerRef.current.style.minWidth = "1414px";
      hangerRef.current.style.maxWidth = "1414px";
      hangerRef.current.style.height = "1000px";
      hangerRef.current.style.minHeight = "1000px";
      hangerRef.current.style.maxHeight = "1000px";
      hangerRef.current.style.margin = "0";
      hangerRef.current.style.position = "fixed"; 
      hangerRef.current.style.left = "-9999px"; 
      hangerRef.current.style.top = "0"; 
      hangerRef.current.style.transform = "none";
      hangerRef.current.style.zIndex = "-9999";

      await new Promise(resolve => setTimeout(resolve, 600));

      const canvas = await html2canvas(hangerRef.current, {
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: GETGO_LIGHT,
        windowWidth: 1414, 
        width: 1414,
        height: 1000,
      });

      hangerRef.current.style.cssText = originalStyle;

      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `GetGo_Volante_${code.toUpperCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating Image:", error);
      alert("Hubo un error al generar la imagen. Por favor intenta de nuevo.");
    } finally {
      setIsDownloadingImage(false);
    }
  };

  const shareHanger = async () => {
    const text = `¡Descarga GetGo con mi código de referido ${code.toUpperCase()} y viaja con conductores verificados!`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mi Volante GetGo",
          text: text,
          url: passengerUrl,
        });
        return;
      } catch {
        // Fallback to whatsapp link
      }
    }
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + passengerUrl)}`;
    window.open(waUrl, "_blank");
  };

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
    <div className={`${montserrat.className} flex flex-col items-center justify-start min-h-screen bg-[#001438] px-3 sm:px-6 pt-24 pb-16 overflow-y-auto overflow-x-hidden relative`}>
      
      {/* Modal de Éxito de Descarga de PDF */}
      {pdfReadyUrl && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl animate-fade-in border border-blue-50">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-inner">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#001438] mb-2 sm:mb-3">¡Descarga Lista!</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base font-medium leading-relaxed">
              Tu volante PDF en alta calidad se ha generado. Si no se descargó automáticamente, puedes abrirlo directamente aquí:
            </p>
            <div className="flex flex-col gap-3">
              <a 
                href={pdfReadyUrl} 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#e91e63] text-white font-black py-3.5 px-6 rounded-xl text-base hover:bg-[#c2185b] transition-all shadow-md active:scale-95"
                onClick={() => setTimeout(() => setPdfReadyUrl(null), 1000)}
              >
                ABRIR PDF AHORA
              </a>
              <button 
                onClick={() => setPdfReadyUrl(null)}
                className="text-gray-500 font-bold py-2.5 uppercase tracking-wider text-xs hover:text-gray-800 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Ver en Pantalla Completa / Ampliado en Teléfono */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden">
          {/* Barra superior de controles del visor */}
          <div className="w-full flex items-center justify-between text-white z-10 py-2 max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm sm:text-base text-white">Vista Ampliada</span>
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-bold">
                {Math.round(modalZoom * 100)}%
              </span>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setModalZoom(prev => Math.max(0.8, prev - 0.2))}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-base flex items-center justify-center border border-white/20 transition-all active:scale-95"
                title="Alejar"
              >
                -
              </button>

              <button
                onClick={() => setModalZoom(1.0)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-200 border border-white/20 transition-all"
                title="Restablecer tamaño"
              >
                100%
              </button>

              <button
                onClick={() => setModalZoom(prev => Math.min(2.5, prev + 0.2))}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-base flex items-center justify-center border border-white/20 transition-all active:scale-95"
                title="Acercar"
              >
                +
              </button>

              <button
                onClick={() => setIsFullscreenModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all text-base font-bold ml-2"
                aria-label="Cerrar vista completa"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Contenedor del visor escalado */}
          <div className="flex-1 w-full flex items-center justify-center overflow-auto p-2">
            <div 
              className="relative transition-all duration-150 shadow-2xl rounded-2xl overflow-hidden bg-white shrink-0 border border-white/10"
              style={{
                width: `${(typeof window !== "undefined" ? Math.min(window.innerWidth - 24, 1414) : 360) * modalZoom}px`,
                height: `${(typeof window !== "undefined" ? Math.min(window.innerWidth - 24, 1414) : 360) * (1000 / 1414) * modalZoom}px`,
              }}
            >
              <div 
                className="w-[1414px] h-[1000px] origin-top-left absolute top-0 left-0 bg-white"
                style={{
                  transform: `scale(${((typeof window !== "undefined" ? Math.min(window.innerWidth - 24, 1414) : 360) / 1414) * modalZoom})`,
                }}
              >
                {/* Contenido duplicado idéntico para previsualización nítida */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/hanger1.jpg"
                    alt="Hanger Background"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="absolute z-10 w-[198px] text-center" style={{ left: "92px", top: "625px" }}>
                  <span className="text-white font-black tracking-widest uppercase text-[16px]">DESCARGA AQUÍ</span>
                </div>

                <div className="absolute z-10" style={{ left: "92px", top: "655px", width: "198px", height: "198px" }}>
                  <div className="p-3 bg-white rounded-2xl shadow-lg w-full h-full flex items-center justify-center">
                    <QRCode value={passengerUrl} size={200} style={{ height: "auto", maxWidth: "100%", width: "100%" }} fgColor="#001438" />
                  </div>
                </div>

                {driverInfo && (
                  <div className="absolute z-10 flex items-center gap-4" style={{ left: "311px", top: "695px" }}>
                    <div className="bg-[#25D366] text-white rounded-full p-4 shadow-md flex items-center justify-center" style={{ width: "65px", height: "65px" }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold tracking-wide text-[18px] leading-tight">WhatsApp</span>
                      <span className="text-white font-black text-[25px] leading-tight">{formatPhone(driverInfo.phone)}</span>
                      {driverInfo.firstName && (
                        <span className="text-[#e91e63] font-black mt-1 text-[28px] leading-none">
                          {driverInfo.firstName.toUpperCase()}{driverInfo.lastName ? ` ${driverInfo.lastName.toUpperCase()}` : ''}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="absolute z-10 flex flex-col" style={{ left: "92px", top: "865px" }}>
                  <span className="text-white font-semibold tracking-wider mb-2 text-[16px]">CÓDIGO DE REFERIDO:</span>
                  <div className="bg-[#e91e63] rounded-xl flex items-center justify-center px-6 py-3 w-fit shadow-md">
                    <span className="text-white font-black tracking-widest text-[38px]">{code.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pie del visor con descarga rápida */}
          <div className="w-full flex items-center justify-center gap-3 pt-2">
            <button
              onClick={downloadAsPDF}
              className="bg-[#e91e63] hover:bg-[#c2185b] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2"
            >
              <span>Descargar PDF</span>
            </button>
            <button
              onClick={downloadAsImage}
              className="bg-[#0084ff] hover:bg-[#006bd6] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2"
            >
              <span>Descargar Imagen</span>
            </button>
          </div>
        </div>
      )}

      {/* Cabecera de la página */}
      <div className="w-full max-w-[1414px] flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h1 className="text-lg sm:text-2xl font-black text-white tracking-wide">
              Tu Volante Oficial GetGo
            </h1>
            <span className="text-[11px] bg-[#e91e63] text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Referidos
            </span>
          </div>
          <p className="text-gray-300 text-xs sm:text-sm mt-0.5">
            Muestra el código QR a tus pasajeros o descárgalo para imprimirlo y colocarlo en tu auto.
          </p>
        </div>

        {/* Botones de acción rápida para Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={downloadAsPDF}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-white shadow-xl transition-all active:scale-95 text-sm ${isDownloading ? "bg-gray-500 cursor-not-allowed" : "bg-[#e91e63] hover:bg-[#c2185b]"}`}
          >
            {isDownloading ? (
              <div className="w-4 h-4 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            )}
            <span>Descargar PDF</span>
          </button>

          <button
            onClick={downloadAsImage}
            disabled={isDownloadingImage}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-white shadow-xl transition-all active:scale-95 text-sm ${isDownloadingImage ? "bg-gray-500 cursor-not-allowed" : "bg-[#0084ff] hover:bg-[#006bd6]"}`}
          >
            {isDownloadingImage ? (
              <div className="w-4 h-4 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            )}
            <span>Descargar Imagen</span>
          </button>
        </div>
      </div>

      {/* Contenedor responsivo del Flyer - 100% libre de cortes con escala precisa */}
      <div 
        ref={containerRef} 
        className="w-full max-w-[1414px] relative mx-auto overflow-hidden rounded-2xl shadow-2xl bg-white border border-white/10" 
        style={{ 
          height: `${1000 * scale}px`,
        }}
      >
        {/* El Flyer con medidas y fuentes FIJAS ABSOLUTAS (1414 x 1000) */}
        <div
          ref={hangerRef}
          className="bg-white"
          style={{
            width: "1414px",
            minWidth: "1414px",
            maxWidth: "1414px",
            height: "1000px",
            minHeight: "1000px",
            maxHeight: "1000px",
            position: "absolute",
            top: 0,
            left: 0,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* Fondo del Volante */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hanger1.jpg"
              alt="Hanger Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Texto "DESCARGA AQUÍ" */}
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

          {/* Código QR con Enlace Dinámico del Conductor */}
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

          {/* Datos de Contacto y WhatsApp del Conductor */}
          {driverInfo && (
            <div 
              className="absolute z-10 flex items-center gap-4"
              style={{
                left: "311px",
                top: "695px",
              }}
            >
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

          {/* Código de Referido */}
          <div 
            className="absolute z-10 flex flex-col"
            style={{
              left: "92px",
              top: "865px",
            }}
          >
            <span className="text-white font-semibold tracking-wider mb-2" style={{ fontSize: "16px" }}>CÓDIGO DE REFERIDO:</span>
            <div className="bg-[#e91e63] rounded-xl flex items-center justify-center px-6 py-3 w-fit shadow-md">
              <span className="text-white font-black tracking-widest" style={{ fontSize: "38px" }}>
                {code.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Acciones Móviles y Controles Principales */}
      <div className="w-full max-w-[1414px] mt-4 flex flex-col gap-3">
        {/* Botones de acción principales */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={downloadAsPDF}
            disabled={isDownloading}
            className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-black text-white shadow-lg transition-all active:scale-95 text-xs sm:text-sm ${isDownloading ? "bg-gray-500 cursor-not-allowed" : "bg-[#e91e63] hover:bg-[#c2185b]"}`}
          >
            {isDownloading ? (
              <div className="w-4 h-4 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            )}
            <span>PDF (Imprimir)</span>
          </button>

          <button
            onClick={downloadAsImage}
            disabled={isDownloadingImage}
            className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-black text-white shadow-lg transition-all active:scale-95 text-xs sm:text-sm ${isDownloadingImage ? "bg-gray-500 cursor-not-allowed" : "bg-[#0084ff] hover:bg-[#006bd6]"}`}
          >
            {isDownloadingImage ? (
              <div className="w-4 h-4 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            )}
            <span>Guardar Imagen</span>
          </button>

          <button
            onClick={shareHanger}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-black text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-lg transition-all active:scale-95 text-xs sm:text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => setIsFullscreenModalOpen(true)}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-black text-white bg-white/10 hover:bg-white/20 border border-white/20 shadow-lg transition-all active:scale-95 text-xs sm:text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
            <span>Ver en Grande</span>
          </button>
        </div>

        {/* Consejo útil para el conductor */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <p className="text-gray-300 text-xs sm:text-sm">
            💡 <strong className="text-white">Tip:</strong> También puedes girar tu teléfono en horizontal para verlo gigante, o presionar <span className="text-[#e91e63] font-bold">&quot;Ver en Grande&quot;</span> para mostrárselo directamente a los pasajeros.
          </p>
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
