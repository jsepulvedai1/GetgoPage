"use client";

import { Montserrat } from "next/font/google";
import Navbar from "../components/navbar";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  display: "swap",
  preload: false,
});

export default function RecoverGetGoPass() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Solo permitir números y limitar a 9 dígitos
    const value = e.target.value.replace(/\D/g, "").slice(0, 9);
    setPhone(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch("https://prod.getgoapp.com/api/v1/pass-change-request/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          phone: parseInt(phone, 10), // Enviar como número, solo los 9 dígitos
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      setStatus("success");
    } catch (error) {
      console.error("Error al recuperar contraseña:", error);
      setStatus("error");
    }
  };

  return (
    <div className={`${montserrat.className} bg-[#f8f9fd] min-h-screen flex flex-col`}>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-10 py-3 bg-[#f3fbff] bg-opacity-100 z-50 shadow-md">
        <Navbar />
      </header>

      <main className="flex-grow flex items-center justify-center px-6 pt-32 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full border border-gray-100"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-[#000080] mb-3">Recuperar GetGo Pass</h1>
            <p className="text-gray-500 font-medium">
              Ingresa tu correo electrónico y número telefónico asociados a tu cuenta para recibir instrucciones de recuperación.
            </p>
          </div>

          {status === "success" ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
            >
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-2">¡Solicitud enviada!</h3>
              <p className="text-green-700 mb-6">
                Hemos enviado las instrucciones a <strong>{email}</strong> y un SMS a tu número registrado.
              </p>
              <button 
                onClick={() => { setStatus("idle"); setEmail(""); setPhone(""); }}
                className="text-[#000080] font-bold hover:underline"
              >
                Volver al formulario
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#000080] mb-2 ml-1">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#000080] focus:border-transparent outline-none transition-all text-gray-800"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-[#000080] mb-2 ml-1">
                  Número Telefónico
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-gray-500 font-semibold select-none">
                    +56
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#000080] focus:border-transparent outline-none transition-all text-gray-800"
                    placeholder="9 1234 5678"
                    maxLength={9}
                    pattern="[0-9]{9}"
                  />
                </div>
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg text-sm border border-red-100">
                  <AlertCircle size={18} />
                  <span>Ocurrió un error. Por favor intenta nuevamente.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#000080] text-white font-bold py-4 rounded-xl hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1"
              >
                {status === "loading" ? (
                  <span className="animate-pulse">Procesando...</span>
                ) : (
                  <>
                    Recuperar Pass <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </main>
      
      <footer className="py-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} GetGo. Todos los derechos reservados.
      </footer>
    </div>
  );
}
