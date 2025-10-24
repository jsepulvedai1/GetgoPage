import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { Textarea } from "./components/textarea";
import { useMediaQuery } from "react-responsive";
import emailjs from "@emailjs/browser";

interface ContactFormProps {
  isFormOpen: boolean;
  setIsFormOpen: (isOpen: boolean) => void;
}

const SERVICE_ID = "service_toel5bb"; // ⬅️ reemplaza
const TEMPLATE_ID = "template_blp4hku"; // ⬅️ reemplaza
const PUBLIC_KEY = "i8g2nL19W43m20iio"; // ⬅️ reemplaza

export default function ContactForm({
  isFormOpen,
  setIsFormOpen,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<null | "ok" | "error">(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Honeypot (campo oculto que los bots suelen completar)
  const [botField, setBotField] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setIsFormOpen(false);
    setFormData({ name: "", email: "", message: "" });
    setIsSending(false);
    setStatus(null);
    setBotField("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStatus(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValid = () => {
    const { name, email, message } = formData;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return name.trim().length >= 2 && emailOk && message.trim().length >= 4;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botField) return; // si el honeypot tiene valor, no enviamos
    if (!isValid()) {
      setStatus("error");
      return;
    }

    try {
      setIsSending(true);
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email, // mapea a {{email}} en el template (y úsalo como Reply-To)
          message: formData.message,
          // Si decidiste pasar destinatario dinámico en el template:
          // to_email: "javier.sepulveda@getgo.cl",
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("ok");
      handleClose();
      console.log("Correo enviado con éxito ✅");
    } catch (err) {
      console.error("Error al enviar el correo ❌", err);
      setIsSending(false);
      setStatus("error");
    }
  };

  return (
    <div className="relative" ref={formRef}>
      {/* <Button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="bg-transparent text-[#000080] hover:bg-transparent hover:text-blue-400 p-0"
        aria-expanded={isFormOpen}
        aria-controls="contact-form-popover"
      >
        Contacto
      </Button> */}

      {isFormOpen && (
        <motion.div
          id="contact-form-popover"
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
            {/* Honeypot oculto */}
            <input
              type="text"
              name="company" // nombre inocuo
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

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
              placeholder="Escribe tu mensaje"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              disabled={isSending || !isValid()}
              className={`w-full ${
                isSending ? "bg-gray-400" : "bg-green-600"
              } text-white`}
            >
              {isSending ? "Enviando..." : "Enviar"}
            </Button>

            {status === "error" && (
              <p className="text-sm text-red-600">
                Revisa los campos o intenta nuevamente.
              </p>
            )}
          </form>
        </motion.div>
      )}
    </div>
  );
}
