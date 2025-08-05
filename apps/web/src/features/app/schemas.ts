import { z } from "zod";

export const createShortenUrlSchema = z.object({ url: z.url() });

export type CreateShortenUrlSchema = z.infer<typeof createShortenUrlSchema>;
