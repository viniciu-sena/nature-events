'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { twMerge } from 'tailwind-merge';

interface SelectProps {
  items: {
    label: React.ReactNode;
    value: string | number;
  }[];
  value?: string | number | null;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
}

export function Select({
  items,
  value,
  onChange,
  placeholder = 'Selecione um item',
  className,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={twMerge(
            cn(
              'w-full justify-between text-left font-normal',
              !value && 'text-muted-foreground',
            ),
            className,
          )}
        >
          {value ? (
            items.find((item) => item.value === value)?.label
          ) : (
            <span className="opacity-60 w-full">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0">
        <Command>
          <CommandInput placeholder="Pesquisar" />
          <CommandList>
            <CommandEmpty>Nada encontrado </CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value as string}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function LabelWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex justify-start items-center gap-2">
      {children}
    </div>
  );
}
