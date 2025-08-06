"use client";

import { useForm } from "react-hook-form";
import { signInSchema, SignInSchema } from "@/features/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { login } from "@/features/auth/actions";

export function SignInForm() {
  const [error, setError] = useState(false);

  const form = useForm<SignInSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const submit = async (data: SignInSchema) => {
    setError(false);
    const result = await login(data);
    if (result.error) setError(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className={"space-y-4"}>
        {error && (
          <Alert variant={"destructive"}>
            <AlertCircleIcon />
            <AlertTitle>Invalid credentials</AlertTitle>
          </Alert>
        )}

        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={"email"}
          control={form.control}
        />

        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type={"password"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={"password"}
          control={form.control}
        />

        <Button type={"submit"} loading={form.formState.isSubmitting}>
          Sign in
        </Button>
      </form>
    </Form>
  );
}
