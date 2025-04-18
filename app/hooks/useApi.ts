import axios from "axios";
import { getSession } from "next-auth/react";

// Crear la instancia de Axios
const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Interceptor para añadir token de sesión a cada request
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.user.accessToken;

    // Si no hay token, se envía la request normal
    if (!token) {
      console.warn("No hay token disponible para esta solicitud.");
      return config;
    }

    // Añadir el token al header Authorization
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
