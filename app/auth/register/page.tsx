import AuthForm from "@/components/auth/AuthForm";
import Header from "@/components/Header";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-body">
      <Header />
      <AuthForm type="register" />
    </div>
  );
}
