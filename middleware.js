import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/write")) {
    const session = await getToken({ req: request });
    if (session === null) {
      return NextResponse.redirect(new URL("/message", request.url));
    }
  }
}
