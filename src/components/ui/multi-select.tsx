import { cn } from "~/lib/utils";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export type OptionType = {
  label: string;
  value: number | string;
};

interface MultiSelectProps {
  id: string;
  options: OptionType[];
  selected: (number | string)[];
  onChange: React.Dispatch<React.SetStateAction<(number | string)[]>>;
  className?: string;
  selectAll?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

function MultiSelect({
  id,
  options,
  selected,
  onChange,
  className,
  placeholder = "Select options",
  selectAll = false,
  isLoading = false,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    if (selectAll) {
      if (selected.length === options.length) {
        setAllSelected(true);
      } else {
        setAllSelected(false);
      }
    }
  }, [selectAll, selected, options]);

  const handleUnselect = (item: number | string) => {
    onChange(selected.filter((i) => i !== item));
  };

  const handleSelectAll = () => {
    if (allSelected) {
      onChange([]);
    } else {
      const allValues = options.map((option) => option.value);
      onChange(allValues);
    }
    setAllSelected(!allSelected);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${
            selected.length > 1 ? "h-full" : "h-10"
          }`}
          onClick={() => setOpen(!open)}
        >
          <div className="flex flex-wrap gap-1">
            {!selected.length ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              selected.map((item) => (
                <Badge
                  variant="secondary"
                  key={item}
                  className="mb-1 mr-1"
                  onClick={() => handleUnselect(item)}
                >
                  {options.find((option) => option.value === item)?.label}

                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ))
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className={className}>
          <CommandInput placeholder="Search ..." />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandItem className="m-1" onSelect={handleSelectAll}>
              {allSelected ? "Unselect All" : "Select All"}
            </CommandItem>
            <CommandSeparator />
            <CommandGroup heading="Options">
              {isLoading ? (
                <CommandItem aria-readonly className="animate-pulse">
                  Loading options...
                </CommandItem>
              ) : (
                options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      onChange(
                        selected.includes(option.value)
                          ? selected.filter((item) => item !== option.value)
                          : [...selected, option.value],
                      );
                      setOpen(true);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
