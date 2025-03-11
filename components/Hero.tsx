"use client";

import { motion, useScroll, useTransform } from "framer-motion";
//componenetes
import Header from "./Header";
import Button from "./Button";

const Hero = () => {
  const { scrollY } = useScroll();

  // Transformaciones para las animaciones
  const imgTopPosition = useTransform(scrollY, [0, 400], ["400px", "240px"]);
  const imgScale = useTransform(scrollY, [0, 200, 1300], [1, 1.4, 1]);
  const textOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const textScale = useTransform(scrollY, [0, 200], [1, 0.8]);
  const textDisplay = useTransform(scrollY, [0, 800], ["flex", "none"]);

  return (
    <section className="h-screen xl:h-[1600px] overflow-x-clip relative">
      <Header />
      <div className="container mx-auto h-full items-center xl:items-start">
        {/* Texto animado */}
        <motion.div
          className="flex flex-col justify-center items-center gap-6 text-center fixed left-0 right-0 mt-24 xl:mt-[160px]"
          style={{
            opacity: textOpacity,
            scale: textScale,
            display: textDisplay,
          }}
        >
          <h1 className="text-[60px] font-bold tracking-[-0.5] leading-none max-w-[800px] xl:max-w-max">
            Inventario Cero Errores: Control Total al Instante.
          </h1>
          <p className="max-w-[680px] text-[20px] text-white/80 font-light px-8 xl:px-0 mb-2">
            Simplifica la gestión de tu stock, desde entradas y salidas hasta
            informes detallados, todo en una sola plataforma.
          </p>
          <Button btnText={"Únete hoy"} />
        </motion.div>

        {/* Imagen animada */}
        <motion.div
          className="hidden xl:flex w-full max-[960px] mx-auto h-[520px] bg-no-repeat sticky left-0 right-0"
          style={{
            backgroundImage: "url('/hero/img.svg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            top: imgTopPosition,
            scale: imgScale,
          }}
        ></motion.div>
      </div>
    </section>
  );
};

export default Hero;
