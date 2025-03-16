"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion"; // Importar Framer Motion

const NewProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    description: "",
    category: "",
    provider: "",
    barcode: "",
    image: null as File | null,
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleBarcodeScan = (scannedCode: string) => {
    setProduct({ ...product, barcode: scannedCode });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Producto agregado:", product);

    // Mostrar mensaje de éxito
    setSuccessMessage("¡Producto agregado correctamente!");

    // Limpiar formulario después de 2 segundos
    setTimeout(() => {
      setSuccessMessage(null);
      setProduct({
        name: "",
        quantity: "",
        description: "",
        category: "",
        provider: "",
        barcode: "",
        image: null,
      });
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Empieza invisible y ligeramente abajo
      animate={{ opacity: 1, y: 0 }} // Aparece y sube a su posición
      transition={{ duration: 0.5, ease: "easeOut" }} // Suavidad en la animación
      className="space-y-6 p-6"
    >
      <h1 className="text-2xl font-bold text-black dark:text-white">Agregar Nuevo Producto</h1>

      {successMessage && <div className="rounded-md bg-green-500 p-3 text-white">{successMessage}</div>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={product.name}
          onChange={handleChange}
          className="input"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Cantidad"
          value={product.quantity}
          onChange={handleChange}
          className="input"
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={product.description}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="category"
          placeholder="Categoría"
          value={product.category}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="provider"
          placeholder="Proveedor"
          value={product.provider}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="barcode"
          placeholder="Código de barras"
          value={product.barcode}
          onChange={handleChange}
          className="input"
        />
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => handleBarcodeScan("123456789")}
            variant="secondary"
          >
            Escanear Código de Barras
          </Button>

          <Button variant="destructive">Agregar Producto</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default NewProductPage;
