"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthForm from "@/components/auth/AuthForm";
import Header from "@/components/Header";
import AuthSkeleton from "@/components/skeleton/AuthSkeleton";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard"); // Redirige al dashboard si ya está autenticado
    }
  }, [status, router]);

  if (status === "loading") {
    return <AuthSkeleton />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-body">
      <Header />
      <AuthForm type="login" />
    </div>
  );
}
