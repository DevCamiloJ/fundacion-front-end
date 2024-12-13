import { FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useFetchEthnicGroups } from "../hooks/useEthnicGroup";
import { EthnicGroup } from "../types/ethnic-group";


export function EthnicGroupSelect({ value, onChange }: { value?: string; onChange: (value: string) => void }) {
  const { data: ethnicGroups, isLoading, isError } = useFetchEthnicGroups();

  if (isLoading) {
    return <Button variant="outline" disabled className="w-full justify-between">Cargando...</Button>;
  }

  if (isError || !Array.isArray(ethnicGroups)) {
    return <Button variant="outline" disabled className="w-full justify-between">Error al cargar grupos étnicos</Button>;
  }

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Seleccione un grupo étnico" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {
          ethnicGroups.map((ethnicGroup: EthnicGroup) => (
            <SelectItem key={ethnicGroup.id} value={ethnicGroup.id}>
              { ethnicGroup.nombre }
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  );
}
