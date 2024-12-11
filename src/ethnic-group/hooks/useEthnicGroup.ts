// src/hooks/useEthnicGroup.ts
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { ethnicGroupService } from '../services/ethnic-group.service';
import { CreateEthnicGroupDto, EthnicGroup, UpdateEthnicGroupDto } from '../types/ethnic-group';

// Hook para obtener todos los grupos étnicos
export const useFetchEthnicGroups = () => {
  return useQuery<EthnicGroup[]>(['ethnicGroups'], ethnicGroupService.findAll);
};

// Hook para obtener un grupo étnico específico por ID
export const useFetchEthnicGroupById = (id: string) => {
  return useQuery<EthnicGroup>(['ethnicGroup', id], () => ethnicGroupService.findOne(id));
};

// Hook para crear un nuevo grupo étnico
export const useCreateEthnicGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<EthnicGroup, unknown, CreateEthnicGroupDto>(
    (newEthnicGroup) => ethnicGroupService.create(newEthnicGroup),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['ethnicGroups']); // Refresca la lista de grupos étnicos
      },
    }
  );
};

// Hook para actualizar un grupo étnico
export const useUpdateEthnicGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<EthnicGroup, unknown, { id: string; ethnicGroup: UpdateEthnicGroupDto }>(
    ({ id, ethnicGroup }) => ethnicGroupService.update(id, ethnicGroup),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['ethnicGroups']); // Refresca la lista de grupos étnicos
      },
    }
  );
};

// Hook para eliminar un grupo étnico
export const useDeleteEthnicGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>(
    (id) => ethnicGroupService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['ethnicGroups']); // Refresca la lista de grupos étnicos
      },
    }
  );
};

// Hook para restaurar un grupo étnico eliminado
export const useRestoreEthnicGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>(
    (id) => ethnicGroupService.restore(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['ethnicGroups']); // Refresca la lista de grupos étnicos
      },
    }
  );
};
