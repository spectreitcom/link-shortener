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
import { createShortenUrl } from "@/features/app/actions";
import { toast } from "sonner";
import { useState } from "react";
import { GeneratedUrlPreview } from "@/features/app/components/generated-url-preview";

export function ShortUrlForm() {
  const [url, setUrl] = useState("");

  const form = useForm<CreateShortenUrlSchema>({
    defaultValues: {
      url: "",
    },
    resolver: zodResolver(createShortenUrlSchema),
  });

  const submit = async (data: CreateShortenUrlSchema) => {
    const response = await createShortenUrl(data);
    if (response.error) {
      toast.error("Invalid url");
      return;
    }

    toast.success("Url created successfully");

    setUrl(`http://localhost:3000/${response.code}`);

    form.reset();
  };

  return (
    <Form {...form}>
      <div className={"flex justify-center"}>
        {url && (
          <div className={"w-5xl mb-4"}>
            <GeneratedUrlPreview url={url} />
          </div>
        )}
      </div>

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

        <Button type={"submit"} loading={form.formState.isSubmitting}>
          Create
        </Button>
      </form>
    </Form>
  );
}
