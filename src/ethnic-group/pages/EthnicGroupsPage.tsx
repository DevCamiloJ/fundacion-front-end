import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table';

import { EthnicGroup } from '../types/ethnic-group';
import { useFetchEthnicGroups } from '../hooks/useEthnicGroup';

const columns: ColumnDef<EthnicGroup>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  }
];

export const EthnicGroupsPage = () => {
  const { data: ethnicGroups, isLoading, isError } = useFetchEthnicGroups()

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">Grupo étnico</h2>
      </div>
      <DataTable columns={columns} data={ethnicGroups || []}/>
    </div>
  )
}