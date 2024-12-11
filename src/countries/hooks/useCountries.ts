import { useMutation, useQuery, useQueryClient } from 'react-query';
import { countriesService } from '../services/countries.service';

// Hook para obtener todos los países
export const useFetchCountries = () => {
  return useQuery(['countries'], countriesService.findAll);
};

// Hook para crear un nuevo país
export const useCreateCountry = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newCountry: Record<string, any>) => countriesService.create(newCountry),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['countries']); // Refresca la lista de países
      },
    }
  );
};

// Hook para actualizar un país
export const useUpdateCountry = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, country }: { id: string; country: Record<string, any> }) =>
      countriesService.update(id, country),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['countries']); // Refresca la lista de países
      },
    }
  );
};

// Hook para eliminar un país
export const useDeleteCountry = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => countriesService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['countries']); // Refresca la lista de países
      },
    }
  );
};

// Hook para restaurar un país
export const useRestoreCountry = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => countriesService.restore(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['countries']); // Refresca la lista de países
      },
    }
  );
};
