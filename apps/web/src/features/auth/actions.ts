"use server";

import {
  createUserSchema,
  CreateUserSchema,
  signInSchema,
  SignInSchema,
} from "@/features/auth/schemas";
import { BACKEND_URL } from "@/lib/constants";
import { redirect } from "next/navigation";
import { SignInResponse } from "@/features/auth/types";
import { revalidatePath } from "next/cache";
import { createSession } from "@/lib/session";

export async function createUser(payload: CreateUserSchema) {
  const validationRes = createUserSchema.safeParse(payload);

  if (!validationRes.success) return { error: true };

  const { cPassword, ...rest } = validationRes.data;

  const response = await fetch(`${BACKEND_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rest),
  });

  if (response.status >= 400) return { error: true };

  redirect("/auth/sign-in");
}

export async function login(payload: SignInSchema) {
  const validationRes = signInSchema.safeParse(payload);
  if (!validationRes.success) return { error: true };

  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationRes.data),
  });

  const data = (await response.json()) as SignInResponse;

  await createSession(data);

  revalidatePath("/app");
  redirect("/app");
}
