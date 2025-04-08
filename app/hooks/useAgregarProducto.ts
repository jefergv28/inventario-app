import { useState } from "react";
import api from "../hooks/useApi";
import { AxiosError } from "axios";

interface Producto {
  name: string;
  quantity: number;
  description: string;
  category: string;
  provider: string;
  barcode: string;
  image?: File | string | null; // <-- Ahora acepta File (imagen) o string (datos de scanner)
}

const useAgregarProducto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const agregarProducto = async (producto: Producto) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuario no autenticado");

      const formData = new FormData();

      // Agregar campos básicos
      formData.append('name', producto.name);
      formData.append('quantity', producto.quantity.toString());
      formData.append('description', producto.description);
      formData.append('category', producto.category);
      formData.append('provider', producto.provider);
      formData.append('barcode', producto.barcode);

      // Manejar imagen/scanner
      if (producto.image) {
        if (producto.image instanceof File) {
          // Es un archivo de imagen
          formData.append('image', producto.image);
        } else if (typeof producto.image === 'string') {
          // Son datos de scanner (convertir a Blob)
          const blob = new Blob([producto.image], { type: 'text/plain' });
          formData.append('scan_data', blob);
        }
      }

      const response = await api.post("/productos", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // No establecer Content-Type, se genera automático con FormData
        }
      });

      return response.data;

    } catch (err) {
      let errorMessage = "Error al agregar producto";

      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message ||
                      err.message ||
                      `Error ${err.response?.status}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { agregarProducto, loading, error };
};

export default useAgregarProducto;