"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthForm from "@/components/auth/AuthForm";
import AuthSkeleton from "@/components/skeleton/AuthSkeleton";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Si la sesión ha expirado
    if (searchParams?.get("expired") === "1") {
      toast.warning("Tu sesión ha expirado. Por favor ingresa nuevamente.", {
        position: "top-center",
        autoClose: 5000,
      });
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("expired");
      window.history.replaceState({}, "", newUrl.toString());
    }

    // Si ya está autenticado
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard"); // Redirigir si ya está autenticado
    } else {
      setLoading(false); // Muestra el formulario solo si no hay token
    }
  }, [router, searchParams]);

  if (loading) {
    return <AuthSkeleton />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-body">
      <AuthForm type="login" />
    </div>
  );
}
