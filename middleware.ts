import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"

const userPaths = ["/dashboard", "/personagens", "/desafios", "/armazem"]
const authPaths = ["/login", "/registro"]

export function middleware(request: NextRequest) {
  if (
    cookies().get("user-session")?.value === "" &&
    userPaths.includes(request.url)
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (
    cookies().get("user-session")?.value !== "" &&
    authPaths.includes(request.url)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard",
    "/personagens",
    "/desafios",
    "/armazem",
    "/login",
    "/registro",
  ],
}
