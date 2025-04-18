import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Accediendo a la ruta:", request.url);

  // Obtiene y decodifica el token desde las cookies de NextAuth
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.accessToken) {
    console.log("Token no encontrado. Redirigiendo...");
    return NextResponse.redirect(new URL("/login?expired=1", request.url));
  }

  console.log("Token encontrado:", token);
  return NextResponse.next();
}

// Definir las rutas donde se aplicará este middleware
export const config = {
  matcher: ["/dashboard/:path*"], // protege todas las rutas que empiecen con /dashboard
};
