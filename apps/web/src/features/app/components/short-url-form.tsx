"use client";

import { useForm } from "react-hook-form";
import {
  createShortenUrlSchema,
  CreateShortenUrlSchema,
} from "@/features/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ShortUrlForm() {
  const form = useForm<CreateShortenUrlSchema>({
    defaultValues: {
      url: "",
    },
    resolver: zodResolver(createShortenUrlSchema),
  });

  const submit = async (data: CreateShortenUrlSchema) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className={"flex items-start justify-between gap-4 w-5xl mx-auto"}
      >
        <FormField
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <FormControl>
                <Input {...field} placeholder={"Paste here your url"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={"url"}
          control={form.control}
        />

        <Button type={"submit"} disabled={form.formState.isSubmitting}>
          Create
        </Button>
      </form>
    </Form>
  );
}
