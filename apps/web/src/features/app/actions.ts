"use server";

import {
  createShortenUrlSchema,
  CreateShortenUrlSchema,
} from "@/features/app/schemas";
import { z } from "zod";
import { BACKEND_URL } from "@/lib/constants";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

type CreateShortenUrlResponse = {
  code: string;
};

export async function createShortenUrl(payload: CreateShortenUrlSchema) {
  const session = await getSession();
  if (!session) redirect("/api/auth/logout");

  const validationRes = z.safeParse(createShortenUrlSchema, payload);
  if (!validationRes.success) return { error: true };

  const response = await fetch(`${BACKEND_URL}/urls`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(validationRes.data),
  });

  if (response.status === 401) {
    redirect("/api/auth/logout");
  }

  const data = (await response.json()) as CreateShortenUrlResponse;

  return { error: false, code: data.code };
}
