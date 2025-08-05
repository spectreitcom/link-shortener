"use server";

import {
  createUserSchema,
  CreateUserSchema,
  signInSchema,
  SignInSchema,
} from "@/features/auth/schemas";
import { BACKEND_URL } from "@/lib/constants";
import { z } from "zod";
import { redirect } from "next/navigation";
import { SignInResponse } from "@/features/auth/types";
import { revalidatePath } from "next/cache";
import { createSession } from "@/lib/session";

export async function createUser(payload: CreateUserSchema) {
  const validationRes = z.safeParse(createUserSchema, payload);

  if (!validationRes.success) return { error: true };

  await fetch(`${BACKEND_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validationRes.data),
  });

  redirect("/auth/sign-in");
}

export async function login(payload: SignInSchema) {
  const validationRes = z.safeParse(signInSchema, payload);
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
