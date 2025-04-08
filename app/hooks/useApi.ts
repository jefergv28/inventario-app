import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:8000", // Asegúrate de que esta URL sea la correcta
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const isExpired = decoded.exp < Date.now() / 1000;

      if (isExpired) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login?expired=1"; // Redirigir si el token ha caducado
        return Promise.reject(new Error("Token expirado"));
      }

      config.headers.Authorization = `Bearer ${token}`; // Establece el token en los encabezados
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      localStorage.removeItem("token");
      window.location.href = "/auth/login"; // Redirigir si hay un error con el token
    }
  }

  return config;
});

export default api;
