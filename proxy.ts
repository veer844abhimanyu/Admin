import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, readSessionToken } from "@/lib/auth";

const authApiPrefix = "/api/auth";
const instructorPaths = ["/", "/home", "/courses"];

function isInstructorPath(pathname: string) {
  return instructorPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(authApiPrefix)) {
    return NextResponse.next();
  }

  const session = await readSessionToken(
    request.cookies.get(AUTH_COOKIE_NAME)?.value
  );

  if (pathname === "/login") {
    if (!session) return NextResponse.next();

    return NextResponse.redirect(
      new URL(session.role === "instructor" ? "/courses" : "/", request.url)
    );
  }

  if (!session) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (session.role === "instructor" && !isInstructorPath(pathname)) {
    return NextResponse.redirect(new URL("/courses", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg).*)",
  ],
};
