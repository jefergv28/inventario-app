import { useSession } from "next-auth/react";
import { Session } from "next-auth";

// Extiende el tipo de la sesión para incluir `accessToken` sin romper la interfaz original
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

  // Asegúrate de que la sesión se ha cargado
  if (status === "loading") {
    return { loading: true, accessToken: null };
  }

  // Verifica si el accessToken está disponible
  const accessToken = (session as SessionWithToken)?.user?.accessToken;

  // Si no hay token de acceso, lo manejas como desees (p. ej., redirigir a login)
  if (!accessToken) {
    console.log("No access token");
    return { accessToken: null };
  }

  console.log("Token de acceso:", accessToken);
  return { accessToken };
};
