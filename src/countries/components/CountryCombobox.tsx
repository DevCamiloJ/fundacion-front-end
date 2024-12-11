import { Check, ChevronsUpDown } from 'lucide-react';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useFetchCountries } from '../hooks/useCountries'; // Asegúrate de tener este hook importado
import { useState } from 'react';

export function CountryCombobox({ value, onChange }: { value: string, onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const { data: countries, isLoading, isError } = useFetchCountries(); // Usamos el hook de React Query

  if (isLoading) {
    return <Button variant="outline" disabled className="w-full justify-between">Cargando...</Button>;
  }

  if (isError || !Array.isArray(countries)) {
    return <Button variant="outline" disabled className="w-full justify-between">Error al cargar países</Button>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {
            value
            ? countries.find((country) => country.id === value)?.nombre
            : "Seleccionar país..."
          }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar país..." />
          <CommandList>
            <CommandEmpty>No se encontró el país.</CommandEmpty>
            <CommandGroup>
              {
                countries.map((country) => (
                  <CommandItem
                    key={country.id}
                    value={country.id}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    {country.nombre}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === country.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
