import { deleteSession } from "@/lib/session";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await deleteSession();
  return Response.redirect(new URL("/auth/sign-in", request.url));
}
