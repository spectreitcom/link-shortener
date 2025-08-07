"use server";

import {
  createShortenUrlSchema,
  CreateShortenUrlSchema,
} from "@/features/app/schemas";
import { z } from "zod";
import { BACKEND_URL } from "@/lib/constants";
import { redirect, permanentRedirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { UserUrl } from "@/features/app/types";
import { revalidatePath } from "next/cache";

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

  revalidatePath("/app");

  return { error: false, code: data.code };
}

type GetOriginalUrlResponse = {
  url: string;
};

export async function getOriginalUrl(code: string) {
  const response = await fetch(`${BACKEND_URL}/urls/${code}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) return { error: true };

  const data = (await response.json()) as GetOriginalUrlResponse;

  permanentRedirect(data.url);
}

type GetUrlResponse = {
  urls: UserUrl[];
  totalPages: number;
};

export async function getUserUrls(page = 1) {
  const session = await getSession();
  if (!session) redirect("/api/auth/logout");

  const searchParams = new URLSearchParams();
  searchParams.set("page", page.toString());

  const response = await fetch(
    `${BACKEND_URL}/urls?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    },
  );

  if (response.status === 401) {
    redirect("/api/auth/logout");
  }

  return (await response.json()) as GetUrlResponse;
}
