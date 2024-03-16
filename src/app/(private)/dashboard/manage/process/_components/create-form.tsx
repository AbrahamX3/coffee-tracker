"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import {
  ProcessFormSchema,
  type ProcessForm,
} from "~/utils/schemas/process-schema";

export function CreateForm() {
  const form = useForm<ProcessForm>({
    resolver: zodResolver(ProcessFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const utils = api.useUtils();
  const router = useRouter();
  const create = api.process.create.useMutation({
    onSuccess: async () => {
      form.reset();
      toast.success("Successfully created process");
      await utils.process.getAll.invalidate();
      await utils.process.getAll.refetch();
      router.push("/dashboard/manage/process");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: ProcessForm) {
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
                <FormLabel>Roaster Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" onClick={() => router.back()} variant="ghost">
            Cancel
          </Button>
          <Button disabled={create.isLoading} type="submit">
            {create.isLoading ? (
              <span className="animate-pulse">...</span>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
