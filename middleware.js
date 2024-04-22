import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  let msg = "";
  if (
    request.nextUrl.pathname.startsWith("/write") ||
    request.nextUrl.pathname.startsWith("/my-posts") ||
    request.nextUrl.pathname.startsWith("/my-likes") ||
    request.nextUrl.pathname.startsWith("/my-comments") ||
    request.nextUrl.pathname.startsWith("/profile")
  ) {
    if (request.nextUrl.pathname.startsWith("/write")) {
      msg = "write";
    } else if (request.nextUrl.pathname.startsWith("/my-posts")) {
      msg = "my-posts";
    } else if (request.nextUrl.pathname.startsWith("/my-likes")) {
      msg = "my-likes";
    } else if (request.nextUrl.pathname.startsWith("/my-comments")) {
      msg = "my-comments";
    } else if (request.nextUrl.pathname.startsWith("/profile")) {
      msg = "profile";
    }
    const session = await getToken({ req: request });
    if (session === null) {
      return NextResponse.redirect(new URL(`/message/${msg}`, request.url));
    }
  }
}
