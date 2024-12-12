import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table';

import { Departament } from '../types/departament';
import { useFetchDepartments } from '../hooks/useDepartaments';

const columns: ColumnDef<Departament>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "nombre",
    header: "nombre",
  }
];

export const DepartamentsPage = () => {
  const { data: departaments, isLoading, isError } = useFetchDepartments()

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">Departamentos</h2>
      </div>
      <DataTable columns={columns} data={departaments || []}/>
    </div>
  )
}