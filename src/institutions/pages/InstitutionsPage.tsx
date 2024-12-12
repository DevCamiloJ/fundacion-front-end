import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table';

import { Institution } from '../types/institution';
import { useFetchEducationalInstitutions } from '../hooks/useInstitutions';

const columns: ColumnDef<Institution>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "nombre",
    header: "nombre",
  }
];

export const InstitutionPage = () => {
  const { data: institution, isLoading, isError } = useFetchEducationalInstitutions()

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">Instituciones</h2>
      </div>
      <DataTable columns={columns} data={institution || []}/>
    </div>
  )
}