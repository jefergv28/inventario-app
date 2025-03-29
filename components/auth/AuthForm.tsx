"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeInOnScroll } from "@/motion/motionVariants";
import Button from "../Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialAuth from "./SocialAuth";

interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string }>({});
  const [feedback, setFeedback] = useState("");
  const router = useRouter();

  // Validaciones
  const validateFullName = (value: string) => {
    if (value.trim().length < 3) {
      return "El nombre debe tener al menos 3 caracteres.";
    }
    return "";
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Ingresa un correo válido.";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    if (value.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }
    return "";
  };

  // Manejo de cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;
    const newErrors = { ...errors };

    if (field === "fullName") {
      setFullName(value);
      newErrors.fullName = validateFullName(value);
    } else if (field === "email") {
      setEmail(value);
      newErrors.email = validateEmail(value);
    } else if (field === "password") {
      setPassword(value);
      newErrors.password = validatePassword(value);
    }

    setErrors(newErrors);
  };

  // Manejo del submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      fullName: type === "register" ? validateFullName(fullName) : "",
      email: validateEmail(email),
      password: validatePassword(password),
    };

    setErrors(newErrors);

    // Si hay errores, detener
    if (Object.values(newErrors).some((error) => error)) {
      console.log("Errores en el formulario:", newErrors);
      return;
    }

    try {
      if (type === "register") {
        // Registro
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/registro`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName, email, password, role: "ROLE_USER" }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Registro exitoso:", data.message);
          setFeedback(data.message);
          setTimeout(() => router.push("/auth/login"), 2000);
        } else {
          const error = await response.json();
          console.error("Error:", error.message);
          setFeedback(`Error al registrar: ${error.message}`);
        }
      } else if (type === "login") {
        // Login
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const { token } = await response.json();
          localStorage.setItem("token", token); // Guarda el token
          setFeedback("Inicio de sesión exitoso.");
          setTimeout(() => router.push("/dashboard"), 1000);
        } else {
          const error = await response.json();
          setFeedback(`Error en inicio de sesión: ${error.message}`);
        }
      }
    } catch (err) {
      console.error("Error al conectar con el backend:", err);
      setFeedback("Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <motion.div
      variants={fadeInOnScroll(0.2, 0.6)}
      initial="hidden"
      whileInView="visible"
      className="flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-accent/60 p-8 shadow-lg"
    >
      <h2 className="mt-4 text-2xl font-bold">{type === "login" ? "Inicia sesión en tu cuenta" : "¡Únete a Inventario-Pro!"}</h2>
      <p className="text-gray-00 pointer-events-none mb-6 text-sm">
        {type === "login" ? "Ingresa tus credenciales para continuar." : "Crea tu cuenta y comienza a gestionar tu inventario."}
      </p>

      <form
        className="w-full"
        onSubmit={handleSubmit}
      >
        {type === "register" && (
          <div className="mb-4">
            <label className="block text-sm font-medium">Nombre completo</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => handleInputChange(e, "fullName")}
              className="w-full rounded-lg border px-4 py-2 text-white focus:outline-none"
              placeholder="Tu nombre completo"
            />
            {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
            className="w-full rounded-lg border px-4 py-2 text-white focus:outline-none"
            placeholder="tucorreo@ejemplo.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div className="relative mb-4">
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => handleInputChange(e, "password")}
            className="w-full rounded-lg border px-4 py-2 text-white focus:outline-none"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
        </div>

        <div className="flex flex-col items-center justify-center">
          <Button
            btnText={type === "login" ? "Iniciar sesión" : "Registrarse"}
            disabled={Object.values(errors).some((error) => error)} // Deshabilita si hay errores
          />
        </div>
      </form>

      {feedback && <p className="mt-4 text-center text-sm text-red-500">{feedback}</p>}

      <SocialAuth />

      <p className="mt-4 text-sm">
        {type === "login" ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
        <Link
          href={type === "login" ? "/auth/register" : "/auth/login"}
          className="text-red- ml-1 hover:underline"
        >
          {type === "login" ? "Regístrate" : "Inicia sesión"}
        </Link>
      </p>
    </motion.div>
  );
};

export default AuthForm;
