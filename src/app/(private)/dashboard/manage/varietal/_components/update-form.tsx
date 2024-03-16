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
  VarietalFormSchema,
  type VarietalForm,
  type VarietalGetById,
} from "~/utils/schemas/varietal-schema";

interface UpdateFormProps {
  data?: VarietalGetById;
}

export function UpdateForm({ data }: UpdateFormProps) {
  const form = useForm<VarietalForm>({
    resolver: zodResolver(VarietalFormSchema),
    defaultValues: {
      name: data?.name,
    },
  });

  const router = useRouter();
  const utils = api.useUtils();

  const update = api.varietal.update.useMutation({
    onSuccess: async () => {
      form.reset();
      toast.success("Successfully updated varietal");
      await utils.varietal.getAll.invalidate();
      await utils.varietal.getAll.refetch();
      router.push("/dashboard/manage/varietal");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: VarietalForm) {
    if (!data?.id)
      return toast.error("Error submitting form", {
        description: "Missing ID field",
      });

    update.mutate({
      id: data.id,
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
                <FormLabel>Varietal Name</FormLabel>
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
