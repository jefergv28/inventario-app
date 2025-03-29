"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import useAgregarProducto from "@/app/hooks/useAgregarProducto";
import BarcodeScanner from "@/components/BarcodeScanner"; // Importamos el lector

const NewProductPage = () => {
  const { agregarProducto, loading, error } = useAgregarProducto();
  const [product, setProduct] = useState<{
    name: string;
    quantity: number;
    description: string;
    category: string;
    provider: string;
    barcode: string;
  }>({
    name: "",
    quantity: 0,
    description: "",
    category: "",
    provider: "",
    barcode: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    quantity: "",
    category: "",
    provider: "",
    barcode: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Validación de campos
  const validate = () => {
    const validationErrors = {
      name: "",
      quantity: "",
      category: "",
      provider: "",
      barcode: "",
    };

    if (!product.name.trim()) validationErrors.name = "El nombre es obligatorio.";
    if (product.quantity < 0) validationErrors.quantity = "La cantidad no puede ser negativa.";
    if (!product.category.trim()) validationErrors.category = "La categoría es obligatoria.";
    if (!product.provider.trim()) validationErrors.provider = "El proveedor es obligatorio.";
    if (!/^\d{8,13}$/.test(product.barcode)) validationErrors.barcode = "El código de barras debe ser numérico (8-13 dígitos).";

    setErrors(validationErrors);
    return Object.values(validationErrors).every((error) => error === ""); // Devuelve true si no hay errores
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) || 0 : value,
    }));
  };

  const handleScan = (barcode: string) => {
    setProduct((prev) => ({ ...prev, barcode }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await agregarProducto(product);
      setSuccessMessage("¡Producto agregado correctamente!");
      setErrors({
        name: "",
        quantity: "",
        category: "",
        provider: "",
        barcode: "",
      });
      // Reseteo del producto
      setProduct({
        name: "",
        quantity: 0,
        description: "",
        category: "",
        provider: "",
        barcode: "",
      });
    } catch (error) {
      console.error("❌ Error al agregar el producto:", error);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-lg dark:bg-[#16033A]">
      <h1 className="title mt-4">Agregar Nuevo Producto</h1>

      {successMessage && <div className="rounded-md bg-green-500 p-3 text-white">{successMessage}</div>}
      {error && <div className="rounded-md bg-red-500 p-3 text-white">{error}</div>}

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
          className={`input w-full ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <input
          type="number"
          name="quantity"
          placeholder="Cantidad"
          value={product.quantity}
          onChange={handleChange}
          className={`input w-full ${errors.quantity ? "border-red-500" : ""}`}
        />
        {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}

        <input
          type="text"
          name="category"
          placeholder="Categoría"
          value={product.category}
          onChange={handleChange}
          className={`input w-full ${errors.category ? "border-red-500" : ""}`}
        />
        {errors.category && <p className="text-red-500">{errors.category}</p>}

        <input
          type="text"
          name="provider"
          placeholder="Proveedor"
          value={product.provider}
          onChange={handleChange}
          className={`input w-full ${errors.provider ? "border-red-500" : ""}`}
        />
        {errors.provider && <p className="text-red-500">{errors.provider}</p>}

        <div className="flex flex-col items-center gap-2">
          <BarcodeScanner onScan={handleScan} />
          <input
            type="text"
            name="barcode"
            placeholder="Código de barras"
            value={product.barcode}
            onChange={handleChange}
            className={`input w-full ${errors.barcode ? "border-red-500" : ""}`}
          />
          {errors.barcode && <p className="text-red-500">{errors.barcode}</p>}
        </div>

        <Button
          type="submit"
          variant="destructive"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Agregando..." : "Agregar Producto"}
        </Button>
      </form>
    </div>
  );
};

export default NewProductPage;
