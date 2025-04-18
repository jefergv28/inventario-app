import { useState, useEffect } from "react";
import api from "../hooks/useApi";
import Cookies from "js-cookie"; // Importa js-cookie

interface Producto {
  id: number;
  nombreProducto: string;
  precioProducto: number;
  cantidadProducto: number;
  categoria: string;
  proveedor: string;
}

interface BackendProducto {
  id: number;
  nombre_producto: string;
  precio_producto: number;
  cantidad_producto: number;
  categoria: string;
  proveedor: string;
}

const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Obtener el token desde las cookies
        const token = Cookies.get("next-auth.session-token"); // Usamos js-cookie para obtener el token

        if (!token) throw new Error("Usuario no autenticado");

        const response = await api.get<BackendProducto[]>("/productos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Respuesta API:", response.data);

        // Transformar los datos del backend al formato esperado en el frontend
        const transformedData: Producto[] = response.data.map((p) => ({
          id: p.id,
          nombreProducto: p.nombre_producto,
          precioProducto: p.precio_producto,
          cantidadProducto: p.cantidad_producto,
          categoria: p.categoria,
          proveedor: p.proveedor,
        }));

        setProductos(transformedData);
      } catch (err: unknown) {
        console.error("Error en la solicitud:", err);
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return { productos, loading, error };
};

export default useProductos;
