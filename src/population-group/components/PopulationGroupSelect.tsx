import { FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useFetchPopulationGroups } from "../hooks/usePopularionGroup";
import { PopulationGroup } from "../types/population-group";

export function PopularionGroupSelect({ value, onChange }: { value?: string; onChange: (value: string) => void }) {
  const { data: populationGroups, isLoading, isError } = useFetchPopulationGroups();

  if (isLoading) {
    return <Button variant="outline" disabled className="w-full justify-between">Cargando...</Button>;
  }

  if (isError || !Array.isArray(populationGroups)) {
    return <Button variant="outline" disabled className="w-full justify-between">Error al cargar grupo poblacional</Button>;
  }

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Seleccione un grupo poblacional" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {
          populationGroups.map((populationGroup: PopulationGroup) => (
            <SelectItem key={populationGroup.id} value={populationGroup.id}>
              { populationGroup.nombre }
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  );
}
