import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CreateDisabilityDto, Disability, UpdateDisabilityDto } from '../types/disability';
import { disabilityService } from '../services/disability.service';


// Hook para obtener todas las discapacidades
export const useFetchDisabilities = () => {
  return useQuery<Disability[]>(['disabilities'], disabilityService.findAll);
};

// Hook para obtener una discapacidad específica por ID
export const useFetchDisabilityById = (id: string) => {
  return useQuery<Disability>(['disability', id], () => disabilityService.findOne(id));
};

// Hook para crear una nueva discapacidad
export const useCreateDisability = () => {
  const queryClient = useQueryClient();
  return useMutation<Disability, unknown, CreateDisabilityDto>(
    (newDisability) => disabilityService.create(newDisability),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['disabilities']); // Refresca la lista de discapacidades
      },
    }
  );
};

// Hook para actualizar una discapacidad
export const useUpdateDisability = () => {
  const queryClient = useQueryClient();
  return useMutation<Disability, unknown, { id: string; disability: UpdateDisabilityDto }>(
    ({ id, disability }) => disabilityService.update(id, disability),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['disabilities']); // Refresca la lista de discapacidades
      },
    }
  );
};

// Hook para eliminar una discapacidad
export const useDeleteDisability = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>(
    (id) => disabilityService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['disabilities']); // Refresca la lista de discapacidades
      },
    }
  );
};

// Hook para restaurar una discapacidad eliminada
export const useRestoreDisability = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>(
    (id) => disabilityService.restore(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['disabilities']); // Refresca la lista de discapacidades
      },
    }
  );
};
