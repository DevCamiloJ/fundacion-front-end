import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table';

import { Country } from '../types/country';
import { useFetchCountries } from '../hooks/useCountries';

const columns: ColumnDef<Country>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "nombre",
    header: "nombre",
  }
];

export const CountriesPage = () => {
  const { data: countries, isLoading, isError } = useFetchCountries()

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">Paises</h2>
      </div>
      <DataTable columns={columns} data={countries || []}/>
    </div>
  )
}