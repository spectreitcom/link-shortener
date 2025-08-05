"use client";

import { useForm } from "react-hook-form";
import { createUserSchema, CreateUserSchema } from "@/features/auth/schemas";
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
import { createUser } from "@/features/auth/actions";

export function SignUpForm() {
  const [error, setError] = useState(false);

  const form = useForm<CreateUserSchema>({
    defaultValues: {
      email: "",
      password: "",
      cPassword: "",
    },
    resolver: zodResolver(createUserSchema),
  });

  const submit = async (data: CreateUserSchema) => {
    setError(false);
    const result = await createUser(data);
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

        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input {...field} type={"password"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={"cPassword"}
          control={form.control}
        />

        <Button type={"submit"} disabled={form.formState.isSubmitting}>
          Create an account
        </Button>
      </form>
    </Form>
  );
}
