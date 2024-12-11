import { FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useFetchSisbenScores } from "../hooks/useSisbenScore";
import { SisbenScore } from "../types/sysben-score";

export function SisbenScoreSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const { data: sisbenScores, isLoading, isError } = useFetchSisbenScores();

  if (isLoading) {
    return <Button variant="outline" disabled className="w-full justify-between">Cargando...</Button>;
  }

  if (isError || !Array.isArray(sisbenScores)) {
    return <Button variant="outline" disabled className="w-full justify-between">Error al cargar puntajes de sisben</Button>;
  }

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar puntaje" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {
          sisbenScores.map((score: SisbenScore) => (
            <SelectItem key={score.id} value={score.id}>
              { score.puntaje }
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  );
}
