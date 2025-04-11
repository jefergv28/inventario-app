import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Instancia de Axios
const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const url = config.url || "";

  // Asegura que sólo se agregue el token si la ruta NO es de login o register
  if (url.includes("/auth/login") || url.includes("/auth/register")) {
    return config;
  }

  if (token) {
    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const isExpired = decoded.exp < Date.now() / 1000;

      if (isExpired) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login?expired=1";
        return Promise.reject(new Error("Token expirado"));
      }

      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }
  }

  return config;
});

export default api;
