"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import {
  LogFormSchema,
  type LogForm,
  type LogGetById,
} from "~/utils/schemas/log-schema";

interface UpdateFormProps {
  data?: LogGetById;
}

export function UpdateForm({ data }: UpdateFormProps) {
  const form = useForm<LogForm>({
    resolver: zodResolver(LogFormSchema),
    defaultValues: {
      coffeeId: data?.coffeeId,
      date: toZonedTime(
        data?.date ?? new Date(),
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      ),
    },
  });

  const utils = api.useUtils();
  const router = useRouter();

  const coffeeOptions = api.coffee.list.useQuery();

  const update = api.log.update.useMutation({
    onSuccess: async () => {
      form.reset();
      toast.success("Successfully updated log");
      await utils.log.getAll.invalidate();
      await utils.log.getAll.refetch();
      router.push("/dashboard/manage/log");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: LogForm) {
    if (!data?.id)
      return toast.error("Error submitting form", {
        description: "Missing ID field",
      });

    update.mutate({
      ...values,
      id: data.id,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }

  console.log(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="col-span-1 grid w-full gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="coffeeId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="pb-2">Coffee</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? coffeeOptions.data?.find(
                              (coffee) => coffee.value === field.value,
                            )?.label
                          : "Select coffee..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput placeholder="Search..." />
                      <CommandList>
                        <CommandEmpty>No coffee found.</CommandEmpty>
                        <CommandGroup>
                          {coffeeOptions?.data?.map((coffee) => (
                            <CommandItem
                              value={coffee.label}
                              key={coffee.value}
                              className="flex w-full justify-between gap-2"
                              onSelect={() => {
                                form.setValue("coffeeId", coffee.value);
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <Check
                                  className={cn(
                                    "h-4 w-4",
                                    coffee.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {coffee.label}
                              </div>
                              <div
                                className={cn(
                                  coffee.active ? "bg-green-500" : "bg-red-500",
                                  "h-4 w-4 justify-end rounded-full",
                                )}
                              ></div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="pb-2">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          <span>{formatDate(field.value, "MMM d, yyyy")}</span>
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
