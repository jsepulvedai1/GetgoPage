import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";

const SocialSidebar = () => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50">
      {[
        { icon: FaFacebook, link: "https://www.facebook.com/GetGoAppCL" },
        { icon: FaTwitter, link: "https://x.com/GetGoCL" },
        { icon: FaInstagram, link: "https://www.instagram.com/getgo.cl" },
        { icon: FaTiktok, link: "https://www.tiktok.com/@getgo.chile" },
      ].map(({ icon: Icon, link }, index) => (
        <motion.a
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-700"
          initial={{ opacity: 0, x: 50 }} // Animación desde la derecha
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          whileHover={{ scale: 1.2, rotate: 10 }}
        >
          <Icon size={24} />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialSidebar;
