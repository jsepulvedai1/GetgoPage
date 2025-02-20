/* eslint-disable react/no-unescaped-entities */
import { Montserrat } from "next/font/google";
import Image from "next/image";
import NavbarNuestroSistema from "./navbar-nuestro-sistema";
const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["900"],
    display: "swap",
});

export default function AboutUs() {
    return (
        <div className={`${montserrat.className} bg-[#f8f9fd] min-h-screen`}>
            <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-3 bg-[#f3fbff] bg-opacity-100 z-50">
                <NavbarNuestroSistema />
            </header>
            {/* Sección Hero */}
            <br></br>
            <section className="text-center py-20 px-8">
                <h1 className="text-4xl md:text-4xl font-bold text-[#000080] leading-tight">
                    Como generar dinero con GetGo.
                </h1>
                <div className="mt-6 bg-white text-gray-700 p-4 rounded-lg shadow-md max-w-3xl mx-auto border border-gray-300">
                    <p className="text-lg font-normal">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </section>
            <section className="flex flex-col items-center text-center py-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-5xl">
                    <div className="relative flex justify-center md:col-span-2">
                        <Image
                            src="/images/im4.png"
                            alt="Fotógrafa en coche"
                            width={500}
                            height={300}
                            className="rounded-xl"
                        />
                    </div>
                </div>
            </section>


            <footer className="bg-[#000080] text-white py-8 px-6 md:px-12 rounded-t-3xl text-center">
                <div className="mb-6">
                    <ul className="flex justify-center space-x-6 text-lg md:text-xl">
                        <li>LA EMPRESA - </li>
                        <li> LEGAL - </li>
                        <li> LA APP</li>
                    </ul>
                </div>

                <div className="mb-4">
                    <div className="flex justify-center gap-6">
                        {["lin", "insta", "f", "x"].map((social, index) => (
                            <a
                                key={index}
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src={`/images/${social}.png`}
                                    alt={social}
                                    width={30}
                                    height={30}
                                    className="w-6 h-6 cursor-pointer"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                <p className="text-sm mt-2">
                    Todos los derechos reservados GetGo® 2024
                </p>
            </footer>
            <div className={`${montserrat.className}`}></div>
        </div>
    );
}