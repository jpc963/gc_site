import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  if (cookies().get("user-session")?.value === "") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/personagens", "/desafios", "/armazem"],
}
