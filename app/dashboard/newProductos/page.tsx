"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useAgregarProducto from "@/app/hooks/useAgregarProducto";
import { Producto } from "@/app/services/agregarProducto";

interface Categoria {
  id: number;
  nombre: string;
}

const NewProductPage = () => {
  const router = useRouter();
  const { agregarProducto, loading, error } = useAgregarProducto();
  const [product, setProduct] = useState({
    name: "",
    quantity: 0,
    description: "",
    category: "",
    provider: "",
    price: 0,
    image: null as File | null, // <-- imagen del producto
  });

  const [errors, setErrors] = useState({
    name: "",
    quantity: "",
    category: "",
    provider: "",
    price: "",
    image: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:8000/categorias");
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Error al obtener categorías: ${errorData}`);
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  const validate = () => {
    const newErrors = {
      name: !product.name.trim() ? "El nombre es obligatorio." : "",
      quantity: product.quantity < 0 ? "La cantidad no puede ser negativa." : "",
      category: !product.category ? "La categoría es obligatoria." : "",
      provider: !product.provider.trim() ? "El proveedor es obligatorio." : "",
      price: product.price <= 0 ? "El precio debe ser un número positivo." : "",
      image: !product.image ? "La imagen es obligatoria." : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" || name === "category" ? Number(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProduct((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const producto: Producto = {
        name: product.name,
        quantity: product.quantity,
        description: product.description,
        category: product.category,
        provider: product.provider,
        price: product.price,
        image: product.image,
      };

      // Llamada a la función agregarProducto pasándole el objeto Producto y el token
      await agregarProducto(producto); // Asegúrate de pasar el token adecuado

      setSuccessMessage("¡Producto agregado correctamente!");
      setTimeout(() => {
        router.push("/dashboard/productos");
      }, 1500);

      setProduct({
        name: "",
        quantity: 0,
        description: "",
        category: "",
        provider: "",
        price: 0,
        image: null,
      });
    } catch (err) {
      console.error("Error al agregar producto:", err);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-lg dark:bg-[#16033A]">
      <h1 className="title mt-4">Agregar Nuevo Producto</h1>

      {successMessage && <div className="mb-4 rounded-md bg-green-500 p-3 text-white">{successMessage}</div>}
      {error && <div className="mb-4 rounded-md bg-red-500 p-3 text-white">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Nombre */}
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={product.name}
          onChange={handleChange}
          className={`input w-full ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}

        {/* Cantidad */}
        <input
          type="number"
          name="quantity"
          placeholder="Cantidad"
          value={product.quantity}
          onChange={handleChange}
          className={`input w-full ${errors.quantity ? "border-red-500" : ""}`}
        />
        {errors.quantity && <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>}

        {/* Categoría */}
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className={`input w-full ${errors.category ? "border-red-500" : ""}`}
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria) => (
            <option
              key={categoria.id}
              value={categoria.id}
            >
              {categoria.nombre}
            </option>
          ))}
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}

        {/* Proveedor */}
        <input
          type="text"
          name="provider"
          placeholder="Proveedor"
          value={product.provider}
          onChange={handleChange}
          className={`input w-full ${errors.provider ? "border-red-500" : ""}`}
        />
        {errors.provider && <p className="mt-1 text-sm text-red-500">{errors.provider}</p>}

        {/* Precio */}
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={product.price}
          onChange={handleChange}
          step="0.01"
          className={`input w-full ${errors.price ? "border-red-500" : ""}`}
        />
        {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}

        {/* Imagen */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={`input w-full ${errors.image ? "border-red-500" : ""}`}
        />
        {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}

        {/* Descripción */}
        <textarea
          name="description"
          placeholder="Descripción (opcional)"
          value={product.description}
          onChange={handleChange}
          className="input w-full"
          rows={3}
        />

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
