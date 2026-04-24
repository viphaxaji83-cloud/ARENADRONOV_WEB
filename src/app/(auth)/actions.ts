"use server";

import { redirect } from "next/navigation";
import { clearSession, createSession, findDemoAccount } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const account = findDemoAccount(email, password);

  if (!account) {
    redirect("/login?error=invalid");
  }

  await createSession(account);
  redirect(account.role === "admin" ? "/admin" : "/app");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}
