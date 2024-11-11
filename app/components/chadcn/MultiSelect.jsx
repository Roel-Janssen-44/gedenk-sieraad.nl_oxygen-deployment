'use client';

import * as React from 'react';
import {Check, ChevronsUpDown} from 'lucide-react';

import {cn} from '~/lib/utils';
import {Button} from '~/components/chadcn/Button';
// import {
//   //   Command,
//   //   CommandEmpty,
//   //   CommandGroup,
//   //   CommandInput,
//   //   CommandItem,
//   CommandList,
// } from '~/components/chadcn/Command';
// import {
//   Command,
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
//   CommandShortcut,
// } from '~/components/chadcn/Command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/chadcn/Popover';

export function MultiSelect() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);

  const handleSetValue = (val) => {
    if (value.includes(val)) {
      value.splice(value.indexOf(val), 1);
      setValue(value.filter((item) => item !== val));
    } else {
      setValue((prevValue) => [...prevValue, val]);
    }
  };

  return <p>Todo - multiselect</p>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[480px] justify-between"
        >
          <div className="flex gap-2 justify-start">
            {value?.length
              ? value.map((val, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
                  >
                    {
                      frameworks.find((framework) => framework.value === val)
                        ?.label
                    }
                  </div>
                ))
              : 'Select framework...'}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0">
        {/* <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => {
                    handleSetValue(framework.value);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value.includes(framework.value)
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command> */}
      </PopoverContent>
    </Popover>
  );
}
