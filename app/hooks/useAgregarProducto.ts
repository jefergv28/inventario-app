import { useState } from "react";
import api from "../hooks/useApi"; // 🔗 Importa la instancia de Axios

interface Producto {
  name: string;
  quantity: number;
  description: string;
  category: string;
  provider: string;
  barcode: string;
  image?: File | null;
}

const useAgregarProducto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const agregarProducto = async (producto: Producto) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // 🔑 Recupera el token del usuario

      if (!token) {
        throw new Error("Usuario no autenticado");
      }

      const response = await api.post("/productos", producto, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Envía el token en la cabecera
        },
      });

      return response.data;
    } catch (err) {
      console.error("Error al agregar producto:", err);
      setError("Error al agregar producto");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { agregarProducto, loading, error };
};

export default useAgregarProducto;
