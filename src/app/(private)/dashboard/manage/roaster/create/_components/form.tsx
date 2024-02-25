"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Roaster name is required" }),
  website: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .or(z.literal("")),
  instagram: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .or(z.literal("")),
});

type FormSchema = z.infer<typeof formSchema>;

export function CreateForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      instagram: "",
      website: "",
    },
  });

  const create = api.roaster.create.useMutation({
    onSuccess: async () => {
      form.reset();
      toast.success("Successfully created roaster");
      await api.useUtils().roaster.getAll.invalidate();
      revalidatePath("/dashboard/manage");
    },
  });

  function onSubmit(values: FormSchema) {
    create.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="col-span-1 grid w-full gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={create.isLoading} className="float-end" type="submit">
          {create.isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Form>
  );
}
