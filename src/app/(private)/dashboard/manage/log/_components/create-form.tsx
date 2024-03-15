"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
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
  LogInsertFormSchema,
  type LogInsertForm,
} from "~/utils/schemas/log-schema";

export function CreateForm() {
  const form = useForm<LogInsertForm>({
    resolver: zodResolver(LogInsertFormSchema),
    defaultValues: {
      coffeeId: 0,
      date: new Date(),
    },
  });

  const utils = api.useUtils();
  const router = useRouter();

  const coffeeOptions = api.coffee.list.useQuery();

  const create = api.log.insert.useMutation({
    onSuccess: async (data) => {
      console.log(data);
      form.reset();
      toast.success("Successfully created log");
      await utils.log.getAll.invalidate();
      await utils.log.getAll.refetch();
      await utils.stats.invalidate();
      router.push("/dashboard/manage/log");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: LogInsertForm) {
    create.mutate(values);
  }

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
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search..." />
                      <CommandList>
                        <CommandEmpty>No coffee found.</CommandEmpty>
                        <CommandGroup>
                          {coffeeOptions?.data?.map((coffee) => (
                            <CommandItem
                              value={coffee.label}
                              key={coffee.value}
                              onSelect={() => {
                                form.setValue("coffeeId", coffee.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  coffee.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {coffee.label}
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
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
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
