import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type AuthRole = "participant" | "admin";

export interface DemoAccount {
  email: string;
  password: string;
  role: AuthRole;
  displayName: string;
  handle?: string;
}

export interface AuthSession {
  email: string;
  role: AuthRole;
  displayName: string;
  handle?: string;
}

export const AUTH_COOKIE_NAME = "arenadronov_session";

export const demoAccounts: DemoAccount[] = [
  {
    email: "blitz@arenadronov.test",
    password: "demo1234",
    role: "participant",
    displayName: "Кирилл «Blitz» Иванов",
    handle: "blitz",
  },
  {
    email: "admin@arenadronov.test",
    password: "admin1234",
    role: "admin",
    displayName: "Администратор платформы",
    handle: "admin",
  },
];

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getRedirectPath(role: AuthRole) {
  return role === "admin" ? "/admin" : "/app";
}

function encodeSession(session: AuthSession) {
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
}

function decodeSession(value: string): AuthSession | null {
  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as Partial<AuthSession>;
    if (
      !parsed ||
      (parsed.role !== "participant" && parsed.role !== "admin") ||
      typeof parsed.email !== "string" ||
      typeof parsed.displayName !== "string"
    ) {
      return null;
    }

    return {
      email: parsed.email,
      role: parsed.role,
      displayName: parsed.displayName,
      handle: parsed.handle,
    };
  } catch {
    return null;
  }
}

export function findDemoAccount(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  return demoAccounts.find(
    (account) =>
      normalizeEmail(account.email) === normalizedEmail && account.password === password,
  );
}

export async function createSession(account: DemoAccount) {
  const cookieStore = await cookies();
  const session: AuthSession = {
    email: normalizeEmail(account.email),
    role: account.role,
    displayName: account.displayName,
    handle: account.handle,
  };

  cookieStore.set(AUTH_COOKIE_NAME, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!raw) return null;
  return decodeSession(raw);
}

export async function redirectIfAuthenticated() {
  const session = await getSession();
  if (session) {
    redirect(getRedirectPath(session.role));
  }
}

export async function requireRole(role: AuthRole) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  if (session.role !== role) {
    redirect(getRedirectPath(session.role));
  }

  return session;
}
