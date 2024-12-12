import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table';

import { Eps } from '../types/eps';
import { useFetchEps } from '../hooks/useEps';

const columns: ColumnDef<Eps>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  }
];

export const EpsPage = () => {
  const { data: eps, isLoading, isError } = useFetchEps()

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">EPS</h2>
      </div>
      <DataTable columns={columns} data={eps || []}/>
    </div>
  )
}