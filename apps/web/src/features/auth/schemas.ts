import { z } from "zod";

export const createUserSchema = z
  .object({
    email: z.email().min(1),
    password: z.string().min(3),
    cPassword: z.string(),
  })
  .refine((data) => data.password === data.cPassword, {
    error: "Passwords don't match",
    path: ["cPassword"],
  });

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const signInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
