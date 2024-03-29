"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import { Button } from "~/components/ui/button";
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
import { Input } from "~/components/ui/input";
import { MultiSelect } from "~/components/ui/multi-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Switch } from "~/components/ui/switch";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import {
  CoffeeFormSchema,
  type CoffeeForm,
} from "~/utils/schemas/coffee-schema";

export function CreateForm() {
  const form = useForm<CoffeeForm>({
    resolver: zodResolver(CoffeeFormSchema),
    defaultValues: {
      notes: [],
      varietals: [],
      active: true,
    },
  });

  const utils = api.useUtils();
  const router = useRouter();

  const noteOptions = api.note.list.useQuery();
  const processOptions = api.process.list.useQuery();
  const roasterOptions = api.roaster.list.useQuery();
  const varietalOptions = api.varietal.list.useQuery();

  const roastOptions = [
    { value: "LIGHT", label: "Light" },
    { value: "LIGHT_MEDIUM", label: "Light Medium" },
    { value: "MEDIUM", label: "Medium" },
    { value: "MEDIUM_DARK", label: "Medium Dark" },
    { value: "DARK", label: "Dark" },
  ];

  const create = api.coffee.insert.useMutation({
    onSuccess: async () => {
      form.reset();
      toast.success("Successfully created coffee");
      await utils.roaster.getAll.invalidate();
      await utils.roaster.getAll.refetch();
      router.push("/dashboard/manage/coffee");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: CoffeeForm) {
    create.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="col-span-1 grid w-full gap-8 md:grid-cols-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Input placeholder="Region" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="altitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altitude</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0-10,000 masl"
                    type="number"
                    pattern="[0-9]*"
                    min={0}
                    step={100}
                    max={10000}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="producer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Producer</FormLabel>
                <FormControl>
                  <Input placeholder="Producer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estate</FormLabel>
                <FormControl>
                  <Input placeholder="Estate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sca"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SCA Score</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0-100"
                    type="number"
                    step={1}
                    pattern="[0-9]*"
                    min={0}
                    max={100}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="personal_sca"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personal SCA Score</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0-100"
                    type="number"
                    step={1}
                    pattern="[0-9]*"
                    min={0}
                    max={100}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Notes</FormLabel>
                <FormControl>
                  <MultiSelect
                    id={field.name}
                    selectAll
                    selected={field.value}
                    options={noteOptions.data ?? []}
                    isLoading={noteOptions.isLoading}
                    onChange={field.onChange}
                    placeholder="Select notes"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="varietals"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Varietals</FormLabel>
                <FormControl>
                  <MultiSelect
                    id={field.name}
                    selectAll
                    selected={field.value}
                    options={varietalOptions.data ?? []}
                    isLoading={varietalOptions.isLoading}
                    onChange={field.onChange}
                    placeholder="Select varietals"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roasterId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="pb-2">Roaster</FormLabel>
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
                          ? roasterOptions.data?.find(
                              (roaster) => roaster.value === field.value,
                            )?.label
                          : "Select roaster..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search..." />
                      <CommandList>
                        <CommandEmpty>No roaster found.</CommandEmpty>
                        <CommandGroup>
                          {roasterOptions?.data?.map((roaster) => (
                            <CommandItem
                              value={roaster.label}
                              key={roaster.value}
                              onSelect={() => {
                                form.setValue("roasterId", roaster.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  roaster.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {roaster.label}
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
            name="processId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="pb-2">Process</FormLabel>
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
                          ? processOptions.data?.find(
                              (process) => process.value === field.value,
                            )?.label
                          : "Select process"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search..." />
                      <CommandList>
                        <CommandEmpty>No process found.</CommandEmpty>
                        <CommandGroup>
                          {processOptions?.data?.map((process) => (
                            <CommandItem
                              value={process.label}
                              key={process.value}
                              onSelect={() => {
                                form.setValue("processId", process.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  process.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {process.label}
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
            name="roast"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="pb-2">Roast Type</FormLabel>
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
                          ? roastOptions?.find(
                              (roast) => roast.value === field.value,
                            )?.label
                          : "Select roast"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search..." />
                      <CommandList>
                        <CommandEmpty>No roaster found.</CommandEmpty>
                        <CommandGroup>
                          {roastOptions?.map((roast) => (
                            <CommandItem
                              value={roast.label}
                              key={roast.value}
                              onSelect={() => {
                                form.setValue(
                                  "roast",
                                  roast.value as z.infer<
                                    typeof CoffeeFormSchema
                                  >["roast"],
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  roast.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {roast.label}
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
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-readonly
                    className="block"
                  />
                </FormControl>
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
