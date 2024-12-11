
// Hooks para React Query
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { citiesService } from '../services/cities.service';

// Hook para obtener todas las ciudades
export const useFetchCities = () => {
  return useQuery(['cities'], citiesService.findAll);
};

// Hook para obtener una ciudad por ID
export const useFetchCity = (id: string) => {
  return useQuery(['city', id], () => citiesService.findOne(id), {
    enabled: !!id, // Solo ejecuta si el ID está definido
  });
};

// Hook para obtener ciudades por departamento
export const useFetchCitiesByDepartment = (departmentId: string) => {
  return useQuery(['cities', 'department', departmentId], () => citiesService.findByDepartment(departmentId), {
    enabled: !!departmentId, // Solo ejecuta si el departmentId está definido
  });
};

// Hook para crear una ciudad
export const useCreateCity = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newCity: Record<string, any>) => citiesService.create(newCity),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cities']); // Refresca la lista de ciudades
      },
    }
  );
};

// Hook para actualizar una ciudad
export const useUpdateCity = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, city }) => citiesService.update(id, city),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cities']); // Refresca la lista de ciudades
      },
    }
  );
};

// Hook para eliminar una ciudad
export const useDeleteCity = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id) => citiesService.remove(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cities']); // Refresca la lista de ciudades
      },
    }
  );
};

// Hook para restaurar una ciudad
export const useRestoreCity = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id) => citiesService.restore(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cities']); // Refresca la lista de ciudades
      },
    }
  );
};