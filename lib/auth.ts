export type UserRole = "admin" | "instructor";

export type AuthUser = {
  username: string;
  role: UserRole;
};

export const AUTH_COOKIE_NAME = "ayushyogi_admin_session";

const SESSION_TTL_SECONDS = 60 * 60 * 8;

type DemoUser = AuthUser & {
  password: string;
};

const demoUsers: DemoUser[] = [
  {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "Admin@123",
    role: "admin",
  },
  {
    username: process.env.INSTRUCTOR_USERNAME || "instructor",
    password: process.env.INSTRUCTOR_PASSWORD || "Instructor@123",
    role: "instructor",
  },
];

function getSecret() {
  return process.env.AUTH_SECRET || "replace-this-secret-before-production";
}

function base64UrlEncode(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "="
  );
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value)
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function validateCredentials(username: string, password: string) {
  const normalizedUsername = username.trim().toLowerCase();

  return (
    demoUsers.find(
      (user) =>
        user.username.toLowerCase() === normalizedUsername &&
        user.password === password
    ) || null
  );
}

export async function createSessionToken(user: AuthUser) {
  const payload = base64UrlEncode(
    JSON.stringify({
      username: user.username,
      role: user.role,
      expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000,
    })
  );
  const signature = await sign(payload);

  return `${payload}.${signature}`;
}

export async function readSessionToken(token?: string) {
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = await sign(payload);
  if (signature !== expectedSignature) return null;

  try {
    const parsed = JSON.parse(base64UrlDecode(payload)) as AuthUser & {
      expiresAt: number;
    };

    if (parsed.expiresAt < Date.now()) return null;
    if (parsed.role !== "admin" && parsed.role !== "instructor") return null;

    return {
      username: parsed.username,
      role: parsed.role,
    };
  } catch {
    return null;
  }
}

export const sessionMaxAge = SESSION_TTL_SECONDS;
