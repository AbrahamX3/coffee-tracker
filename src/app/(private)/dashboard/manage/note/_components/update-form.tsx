"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { type NoteSelectSchema } from "~/server/db/schema";
import { api } from "~/trpc/react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Note Name is required" }),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpdateFormProps {
  id: number;
  data?: z.infer<typeof NoteSelectSchema>;
}

export function UpdateForm({ id, data }: UpdateFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
    },
  });

  const utils = api.useUtils();
  const router = useRouter();

  const update = api.note.update.useMutation({
    onSuccess: async () => {
      form.reset();
      toast.success("Successfully updated note");
      await utils.note.getAll.invalidate();
      await utils.note.getAll.refetch();
      router.push("/dashboard/manage/note");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: FormSchema) {
    update.mutate({
      id,
      ...values,
    });
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
        </div>
        <Button
          disabled={update.isLoading || !form.formState.isDirty}
          className="float-end"
          type="submit"
        >
          {update.isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </Form>
  );
}
