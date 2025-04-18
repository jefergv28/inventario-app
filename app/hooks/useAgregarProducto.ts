import { useState } from "react";
import agregarProducto from "../services/agregarProducto"; // Importa el servicio
import { useSession } from "next-auth/react"; // Para obtener la sesión y el token de NextAuth
import { Producto } from "../services/agregarProducto"; // Interfaz Producto

const useAgregarProducto = () => {
  const { data: session } = useSession();
  console.log("Session:", session); // Verifica si la sesión tiene los datos correctos

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handler para agregar un producto
  const agregarProductoHandler = async (producto: Producto) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Verifica si el token está presente en la sesión
      if (!session?.user?.accessToken) {
        throw new Error("No se encontró el token de autenticación.");
      }

      // Llamar al servicio para agregar el producto
      const response = await agregarProducto(producto, session.user.accessToken);

      setSuccess("Producto agregado correctamente!");
      return response;
    } catch (err: unknown) {
      console.error("Error al agregar producto:", err);
      setError("Hubo un error al agregar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return {
    agregarProducto: agregarProductoHandler,
    loading,
    error,
    success,
  };
};

export default useAgregarProducto;
