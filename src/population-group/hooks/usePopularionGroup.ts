import { useMutation, useQuery, useQueryClient } from 'react-query';

import { populationGroupService } from '../services/population-group.service';
import { CreatePopulationGroupDto, PopulationGroup, UpdatePopulationGroupDto } from '../types/population-group';

// Hook para obtener todos los grupos poblacionales
export const useFetchPopulationGroups = () => {
  return useQuery<PopulationGroup[]>(['populationGroups'], populationGroupService.findAll);
};

// Hook para obtener un grupo poblacional específico por ID
export const useFetchPopulationGroupById = (id: string) => {
  return useQuery<PopulationGroup>(['populationGroup', id], () => populationGroupService.findOne(id));
};

// Hook para crear un nuevo grupo poblacional
export const useCreatePopulationGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<PopulationGroup, unknown, CreatePopulationGroupDto>(
    (newPopulationGroup) => populationGroupService.create(newPopulationGroup),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['populationGroups']); // Refresca la lista de grupos poblacionales
      },
    }
  );
};

// Hook para actualizar un grupo poblacional
export const useUpdatePopulationGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<PopulationGroup, unknown, { id: string; populationGroup: UpdatePopulationGroupDto }>(
    ({ id, populationGroup }) => populationGroupService.update(id, populationGroup),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['populationGroups']); // Refresca la lista de grupos poblacionales
      },
    }
  );
};

// Hook para eliminar un grupo poblacional
export const useDeletePopulationGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>(
    (id) => populationGroupService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['populationGroups']); // Refresca la lista de grupos poblacionales
      },
    }
  );
};

// Hook para restaurar un grupo poblacional eliminado
export const useRestorePopulationGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>(
    (id) => populationGroupService.restore(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['populationGroups']); // Refresca la lista de grupos poblacionales
      },
    }
  );
};
