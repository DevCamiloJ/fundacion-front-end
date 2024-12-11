import { useMutation, useQuery, useQueryClient } from 'react-query';
import { educationalInstitutionsService } from '../services/institutions.service';

// Hook para obtener todas las instituciones educativas
export const useFetchEducationalInstitutions = () => {
  return useQuery(['educationalInstitutions'], educationalInstitutionsService.findAll);
};

// Hook para crear una nueva institución educativa
export const useCreateEducationalInstitution = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newEducationalInstitution: Record<string, any>) => educationalInstitutionsService.create(newEducationalInstitution),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['educationalInstitutions']); // Refresca la lista de instituciones educativas
      },
    }
  );
};

// Hook para actualizar una institución educativa
export const useUpdateEducationalInstitution = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, educationalInstitution }: { id: string; educationalInstitution: Record<string, any> }) =>
      educationalInstitutionsService.update(id, educationalInstitution),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['educationalInstitutions']); // Refresca la lista de instituciones educativas
      },
    }
  );
};

// Hook para eliminar una institución educativa
export const useDeleteEducationalInstitution = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => educationalInstitutionsService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['educationalInstitutions']); // Refresca la lista de instituciones educativas
      },
    }
  );
};

// Hook para restaurar una institución educativa
export const useRestoreEducationalInstitution = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => educationalInstitutionsService.restore(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['educationalInstitutions']); // Refresca la lista de instituciones educativas
      },
    }
  );
};
