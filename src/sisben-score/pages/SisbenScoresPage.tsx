import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table';

import { SisbenScore } from '../types/sysben-score';
import { useFetchSisbenScores } from '../hooks/useSisbenScore';


const columns: ColumnDef<SisbenScore>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "puntaje",
    header: "Puntaje",
  }
];

export const SisbenScoresPage = () => {
  const { data: sisbenScores, isLoading, isError } = useFetchSisbenScores()

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">Puntajes de Sisben</h2>
      </div>
      <DataTable columns={columns} data={sisbenScores || []}/>
    </div>
  )
}