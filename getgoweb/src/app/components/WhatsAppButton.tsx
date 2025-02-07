import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "56998248744"; // Cambia esto por tu número de WhatsApp (sin el +)

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center z-50"
      style={{ width: "60px", height: "60px" }}
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppButton;
