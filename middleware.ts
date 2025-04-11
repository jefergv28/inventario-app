import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Si no hay token, redirigir al login con un query param
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login?expired=1", request.url));
  }

  return NextResponse.next();
}

// Definir las rutas donde se aplicará este middleware
export const config = {
  matcher: ["/dashboard/:path*"], // Aplica a todas las rutas que empiecen con /dashboard
};
