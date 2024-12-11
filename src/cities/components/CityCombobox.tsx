import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl } from '@/components/ui/form';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useFetchCitiesByDepartment } from '../hooks/useCities';

export function CityCombobox({ value, onChange, departmentId }: { value: string, onChange: (value: string) => void, departmentId: string }) {
  const [open, setOpen] = useState(false);
  const { data: cities, isLoading, isError } = useFetchCitiesByDepartment(departmentId); // Usamos el hook de React Query

  if (isLoading) {
    return <Button variant="outline" disabled className="w-full justify-between">Cargando...</Button>;
  }

  if (isError || !Array.isArray(cities)) {
    return <Button variant="outline" disabled className="w-full justify-between">Error al cargar ciudades</Button>;
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
            {
              value
              ? cities.find((city) => city.id === value)?.nombre 
              : "Seleccionar ciudad..."
            }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar ciudad..." />
          <CommandList>
            <CommandEmpty>No se encontró la ciudad.</CommandEmpty>
            <CommandGroup>
              {
                cities.map((city) => (
                  <CommandItem
                    key={city.id}
                    value={city.id}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {city.nombre}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === city.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}