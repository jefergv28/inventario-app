"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeInOnScroll } from "@/motion/motionVariants";
import Button from "../Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialAuth from "./SocialAuth";
import { signIn } from "next-auth/react";
import Cookie from "js-cookie"; // Importamos la librería

type AuthFormProps = {
  type: "login" | "register";
};

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
  }>({});
  const [feedback, setFeedback] = useState<string>("");

  const router = useRouter();

  const validateFullName = (value: string): string => {
    if (value.trim().length < 3) return "El nombre debe tener al menos 3 caracteres.";
    return "";
  };

  const validateEmail = (value: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Ingresa un correo válido.";
    return "";
  };

  const validatePassword = (value: string): string => {
    if (value.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string): void => {
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

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Realizar validación
    const newErrors = {
      fullName: type === "register" ? validateFullName(fullName) : "",
      email: validateEmail(email),
      password: validatePassword(password),
    };

    setErrors(newErrors);

    // Verificar si hay errores antes de enviar
    if (Object.values(newErrors).some((error) => error)) {
      setFeedback("Por favor corrige los errores antes de enviar el formulario.");
      return;
    }

    try {
      if (type === "register") {
        const res = await fetch("http://localhost:8000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email, password }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Error al registrar");

        // Guardar token en cookies
        Cookie.set("token", data.token, { expires: 1, secure: true, sameSite: "Strict" });

        setFeedback("Registro exitoso. Redirigiendo al login...");
        setTimeout(() => router.push("/auth/login"), 1500);
      } else {
        const res = await signIn("credentials", { redirect: false, email, password });

        if (res?.error) throw new Error(res.error);

        if (res?.ok) {
          setFeedback("Inicio de sesión exitoso. Redirigiendo...");
          console.log("redirigiedo al dasboard")
          router.push("/dashboard");
        } else {
          setFeedback("Error en el inicio de sesión.");
        }
      }
    } catch (err) {
      setFeedback(`Error: ${err instanceof Error ? err.message : "Ocurrió un error inesperado"}`);
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
            disabled={Object.values(errors).some((error) => error)}
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
