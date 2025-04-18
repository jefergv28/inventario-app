import api from "../hooks/useApi";
import { AxiosError } from "axios";

export interface Producto {
  name: string;
  quantity: number;
  description: string;
  category: string;
  provider: string;
  price: number;
  image: File | null;
}

const agregarProducto = async (producto: Producto, token: string) => {
  try {
    const formData = new FormData();

    // Agregar los datos del producto
    formData.append("name", producto.name);
    formData.append("quantity", producto.quantity.toString());
    formData.append("description", producto.description);
    formData.append("category", producto.category);
    formData.append("provider", producto.provider);
    formData.append("price", producto.price.toString());

    // Manejar imagen (si existe)
    if (producto.image instanceof File) {
      formData.append("image", producto.image);
    }

    // Realizar la solicitud POST con el token en los headers
    const response = await api.post("/productos", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    let errorMessage = "Error al agregar producto";

    if (err instanceof AxiosError) {
      errorMessage = err.response?.data?.message || err.message || `Error ${err.response?.status}`;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    throw new Error(errorMessage);
  }
};

export default agregarProducto;
