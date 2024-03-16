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
  RoasterFormSchema,
  type RoasterForm,
  type RoasterGetById,
} from "~/utils/schemas/roaster-schema";

interface UpdateFormProps {
  data?: RoasterGetById;
}

export function UpdateForm({ data }: UpdateFormProps) {
  const form = useForm<RoasterForm>({
    resolver: zodResolver(RoasterFormSchema),
    defaultValues: {
      name: data?.name,
      instagram: data?.instagram ?? "",
      website: data?.website ?? "",
    },
  });

  const utils = api.useUtils();
  const router = useRouter();
  const update = api.roaster.update.useMutation({
    onSuccess: async () => {
      form.reset();
      toast.success("Successfully updated roaster");
      await utils.roaster.getAll.invalidate();
      await utils.roaster.getAll.refetch();
      router.push("/dashboard/manage/roaster");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: RoasterForm) {
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
                <FormLabel>Roaster Name</FormLabel>
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
