import { useMutation, useQuery, useQueryClient } from 'react-query';
import { epsService } from '../services/eps.service';

// Hook para obtener todas las EPS
export const useFetchEps = () => {
  return useQuery(['eps'], epsService.findAll);
};

// Hook para crear una nueva EPS
export const useCreateEps = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newEps: Record<string, any>) => epsService.create(newEps),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['eps']); // Refresca la lista de EPS
      },
    }
  );
};

// Hook para actualizar una EPS
export const useUpdateEps = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, eps }: { id: string; eps: Record<string, any> }) =>
      epsService.update(id, eps),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['eps']); // Refresca la lista de EPS
      },
    }
  );
};

// Hook para eliminar una EPS
export const useDeleteEps = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => epsService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['eps']); // Refresca la lista de EPS
      },
    }
  );
};

// Hook para restaurar una EPS
export const useRestoreEps = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => epsService.restore(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['eps']); // Refresca la lista de EPS
      },
    }
  );
};
