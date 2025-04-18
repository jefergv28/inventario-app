import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";

// Extiende el tipo de la sesión para incluir `accessToken`
interface SessionWithToken extends Omit<Session, "user"> {
  user: {
    accessToken?: string;
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    image?: string | null;
  };
}

export const useNetAuth = () => {
  const { data: session, status } = useSession();

  // Manejo de loading
  if (status === "loading") {
    return { loading: true, accessToken: null, logout: () => {} };
  }

  const accessToken = (session as SessionWithToken)?.user?.accessToken;

  const logout = () => {
    signOut({ callbackUrl: "/auth/login" }); // <- Redirige al login luego de cerrar sesión
  };

  return { accessToken, logout };
};
