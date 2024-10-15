import { NextResponse, type NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  url.pathname = "/"

  const response = NextResponse.next()

  if (response.cookies.has("appwrite-session")) {
    return NextResponse.rewrite(url)
  }
}

export const config = {
  matcher: ["/login", "/registro"],
}
