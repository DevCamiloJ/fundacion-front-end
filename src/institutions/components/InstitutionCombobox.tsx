import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl } from '@/components/ui/form';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useFetchEducationalInstitutions } from '../hooks/useInstitutions';


export function EducationalInstitutionCombobox({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const { data: institutions, isLoading, isError } = useFetchEducationalInstitutions(); // No pasa el countryId

  if (isLoading) {
    return <Button variant="outline" disabled className="w-full justify-between">Cargando...</Button>;
  }

  if (isError || !Array.isArray(institutions)) {
    return <Button variant="outline" disabled className="w-full justify-between">Error al cargar instituciones</Button>;
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
              ? institutions.find((institution) => institution.id === value)?.nombre
              : "Seleccionar institución..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar institución..."/>
          <CommandList>
            <CommandEmpty>No se encontró la institución.</CommandEmpty>
            <CommandGroup>
              {institutions?.map((institution) => (
                <CommandItem
                  key={institution.id}
                  value={institution.id}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue); // Permitir deseleccionar
                    setOpen(false); // Cerrar el combobox después de seleccionar
                  }}
                >
                  {institution.nombre}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === institution.id ? "opacity-100" : "opacity-0"
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
