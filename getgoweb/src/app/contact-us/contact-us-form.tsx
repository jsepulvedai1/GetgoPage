import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { Textarea } from "./components/textarea";
import { useMediaQuery } from "react-responsive"; // Importar useMediaQuery

interface ContactFormProps {
  isFormOpen: boolean;
  setIsFormOpen: (isOpen: boolean) => void;
}

export default function ContactForm({
  isFormOpen,
  setIsFormOpen,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const formRef = useRef<HTMLDivElement>(null);

  // Detectar si el dispositivo es móvil (ancho máximo de 768px)
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsFormOpen(false);
        setFormData({ name: "", email: "", message: "" }); // Limpiar datos al cerrar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsFormOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendEmail(formData);
    setFormData({ name: "", email: "", message: "" }); // Limpiar datos tras el envío
    setIsFormOpen(false);
  };

const sendEmail = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error en el envío");
    }

    console.log("Correo enviado exitosamente!");
  } catch (error) {
    console.error("Error al enviar el correo", error);
  }
};

  return (
    <div className="relative" ref={formRef}>
      <Button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="bg-transparent text-[#000080] hover:bg-transparent hover:text-blue-400 p-0"
      ></Button>

      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`fixed ${
            isMobile ? "top-10 right-4 w-11/12" : "top-20 right-24 w-96"
          } bg-white p-4 rounded-lg shadow-lg border`}
        >
          <h2 className="text-lg font-bold mb-3 text-blue-400">
            Formulario de Contacto
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Escribe tu mensaje..."
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full bg-green-600 text-white">
              Enviar
            </Button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
