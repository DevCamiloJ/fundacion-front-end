import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table';

import { City } from '../types/city';
import { useFetchCities } from '../hooks/useCities';

const columns: ColumnDef<City>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "nombre",
    header: "nombre",
  }
];

export const CitiesPage = () => {
  const { data: cities, isLoading, isError } = useFetchCities()

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">Ciudades</h2>
      </div>
      <DataTable columns={columns} data={cities || []}/>
    </div>
  )
}