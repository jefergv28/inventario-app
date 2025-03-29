import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // 🔗 Cambia esto según tu backend
});

// 📌 Interceptor para agregar el token en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // 🔐 Obtener el token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
