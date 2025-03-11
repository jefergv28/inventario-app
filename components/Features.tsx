"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const featuresData = [
  {
    imgSrc: "/features/img-1.svg",
    title: "Gestión inteligente de inventarios",
    description: "Administración centralizada y segura de tus inventarios",
    highlights: [
      "Sincronización en tiempo real",
      "Gestión de permisos y roles",
      "Carga y descarga de inventarios",
    ],
  },
  {
    imgSrc: "/features/img-2.svg",
    title: "Optimización de productos",
    description: "Optimización de inventarios y productos",
    highlights: [
      "Optimización de stock según necesidades",
      "Control de precios y costos",
      "Control de calidad",
    ],
  },
  {
    imgSrc: "/features/img-3.svg",
    title: "Gestión de clientes y proveedores",
    description: "Gestión centralizada y segura de tus clientes y proveedores",
    highlights: [
      "Sincronización en tiempo real",
      "Gestión de permisos y roles",
      "Carga y descarga de clientes y proveedores",
    ],
  },
  {
    imgSrc: "/features/img-4.svg",
    title: "Control de stock",
    description: "Control de stock y alertas",
    highlights: [
      "Monitoreo del stock en tiempo real",
      "Alertas de stock bajo",
      "Alertas de sobrestock",
    ],
  },
];

const Features = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="text-white pt-3 relative">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-16">
          {/* Imagen */}
          <motion.div
            key={featuresData[index].imgSrc} // Asegura que la imagen cambie
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2,
            }}
            className="hidden xl:flex justify-center flex-1 w-full h-[480px] sticky top-[calc(50%-240px)]"
          >
            <div className="relative w-full h-full">
              <Image
                src={featuresData[index].imgSrc}
                fill
                alt={featuresData[index].title}
                className="h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Texto */}
          <div className="flex-1 flex flex-col gap-24">
            {featuresData.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                onViewportEnter={() => setIndex(itemIndex)} // Cambia imagen y texto al entrar en vista
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.5 }}
                className="w-full h-auto xl:h-[480px] flex items-center"
              >
                <div className="w-[80vw] xl:w-auto mx-auto xl:mx-0">
                  <h2 className="h2 mb-4">{item.title}</h2>
                  <p className="lead mb-8">{item.description}</p>
                  {/* Destacados */}
                  <div className="mt-4">
                    {item.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <FaRegCheckCircle className="text-accent_secondary text-2xl" />
                        <p>{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
