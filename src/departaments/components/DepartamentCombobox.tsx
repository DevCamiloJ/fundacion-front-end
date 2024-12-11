import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useFetchDepartmentsByCountry } from '../hooks/useDepartaments';
import { FormControl } from '@/components/ui/form';


export function DepartamentCombobox({ value, onChange, countryId }: { value: string, onChange: (value: string) => void, countryId: string }) {
  const [open, setOpen] = useState(false);
  const { data: departaments, isLoading, isError } = useFetchDepartmentsByCountry(countryId); // Usamos el hook de React Query

  console.log({countryId, departaments });

  if (isLoading) {
    return <Button variant="outline" disabled className="w-full justify-between">Cargando...</Button>;
  }

  if (isError || !Array.isArray(departaments)) {
    return <Button variant="outline" disabled className="w-full justify-between">Error al cargar departamentos</Button>;
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
              ? departaments.find((departament) => departament.id === value)?.nombre
              : "Seleccionar departamento..."
            }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar departamento..." />
          <CommandList>
            <CommandEmpty>No se encontró el departamento.</CommandEmpty>
            <CommandGroup>
              {
                departaments.map((departament) => (
                  <CommandItem
                    key={departament.id}
                    value={departament.id}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    {departament.nombre}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === departament.id ? "opacity-100" : "opacity-0"
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
