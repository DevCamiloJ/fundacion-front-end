import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table';

import { PopulationGroup } from '../types/population-group';
import { useFetchPopulationGroups } from '../hooks/usePopularionGroup';

const columns: ColumnDef<PopulationGroup>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  }
];

export const PopulationGroupsPage = () => {
  const { data: populationGroups, isLoading, isError } = useFetchPopulationGroups()

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">Grupo poblacional</h2>
      </div>
      <DataTable columns={columns} data={populationGroups || []}/>
    </div>
  )
}