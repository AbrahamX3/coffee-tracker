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
  name: z.string().min(1, { message: "Varietal name is required" }),
});

type FormSchema = z.infer<typeof formSchema>;

export function CreateForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const create = api.varietal.create.useMutation({
    onSuccess: async () => {
      form.reset();
      toast.success("Successfully created varietal");
      await api.useUtils().varietal.getAll.invalidate();
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
                <FormLabel>Varietal Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
