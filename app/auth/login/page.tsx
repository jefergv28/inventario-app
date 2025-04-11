"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthForm from "@/components/auth/AuthForm";
import Header from "@/components/Header";
import AuthSkeleton from "@/components/skeleton/AuthSkeleton";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mostrar mensaje si la sesión expiró
    if (searchParams?.get("expired") === "1") {
      toast.warning("Tu sesión ha expirado. Por favor ingresa nuevamente.", {
        position: "top-center",
        autoClose: 5000,
      });

      // Eliminar el parámetro de la URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("expired");
      window.history.replaceState({}, "", newUrl.toString());
    }

    // Verificar si el usuario ya está autenticado (basado en el token JWT)
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    } else {
      setLoading(false); // Solo muestra el formulario si no hay token
    }
  }, [router, searchParams]);

  if (loading) {
    return <AuthSkeleton />; // O un loader
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-body">
      <Header />
      <AuthForm type="login" />
    </div>
  );
}
