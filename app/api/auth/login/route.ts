import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  createSessionToken,
  sessionMaxAge,
  validateCredentials,
} from "@/lib/auth";

type LoginPayload = {
  username?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as LoginPayload;
  const username = body.username?.trim() || "";
  const password = body.password || "";

  if (!username || username.length < 3) {
    return NextResponse.json(
      { error: "Enter a valid username." },
      { status: 400 }
    );
  }

  if (!password || password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters." },
      { status: 400 }
    );
  }

  const user = validateCredentials(username, password);

  if (!user) {
    return NextResponse.json(
      { error: "Invalid username or password." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    user: {
      username: user.username,
      role: user.role,
    },
  });

  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: await createSessionToken(user),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAge,
  });

  return response;
}
