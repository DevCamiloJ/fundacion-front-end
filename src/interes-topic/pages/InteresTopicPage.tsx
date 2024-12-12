import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table';

import { InterestTopic } from '../types/interes-topic';
import { useFetchInterestTopics } from '../hooks/useInterestTopic';

const columns: ColumnDef<InterestTopic>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  }
];

export const InteresTopicPage = () => {
  const { data: interesTopic, isLoading, isError } = useFetchInterestTopics()

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">Temas de interés</h2>
      </div>
      <DataTable columns={columns} data={interesTopic || []}/>
    </div>
  )
}