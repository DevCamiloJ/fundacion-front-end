import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table';

import { Disability } from '../types/disability';
import { useFetchDisabilities } from '../hooks/useDisability';

const columns: ColumnDef<Disability>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  }
];

export const DisabilitiesPage = () => {
  const { data: disabilities, isLoading, isError } = useFetchDisabilities()

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">Discapacidades</h2>
      </div>
      <DataTable columns={columns} data={disabilities || []}/>
    </div>
  )
}