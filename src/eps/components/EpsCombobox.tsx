import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl } from '@/components/ui/form';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useFetchEps } from '../hooks/useEps';

export function EpsCombobox({ value, onChange }: { value: string | undefined; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const { data: eps, isLoading, isError } = useFetchEps(); 

  if (isLoading) {
    return <Button variant="outline" disabled className="w-full justify-between">Cargando...</Button>;
  }

  if (isError || !Array.isArray(eps)) {
    return <Button variant="outline" disabled className="w-full justify-between">Error al cargar EPS</Button>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? eps.find((ep) => ep.id === value)?.nombre
              : "Seleccionar EPS..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar EPS..."/>
          <CommandList>
            <CommandEmpty>No se encontró la EPS.</CommandEmpty>
            <CommandGroup>
              {eps?.map((ep) => (
                <CommandItem
                  key={ep.id}
                  value={ep.id}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue); // Permitir deseleccionar
                    setOpen(false); // Cerrar el combobox después de seleccionar
                  }}
                >
                  {ep.nombre}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === ep.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
