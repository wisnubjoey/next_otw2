// middleware.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  // Definisikan public routes (yang bisa diakses tanpa login)
  const publicRoutes = ['/', '/access'] // '/access' untuk halaman login
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname)

  // Jika tidak ada session dan bukan public route, redirect ke halaman login
  if (!req.auth && !isPublicRoute) {
    return NextResponse.redirect(new URL('/access', req.url))
  }

  // Jika sudah login dan mencoba akses halaman login, redirect ke dashboard
  if (req.auth && req.nextUrl.pathname === '/access') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
})

// Konfigurasi path mana saja yang akan diprotect oleh middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}