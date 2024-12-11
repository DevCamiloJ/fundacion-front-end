import { useMutation, useQuery, useQueryClient } from 'react-query';
import { departmentsService } from '../services/departaments.service';

// Hook para obtener todos los departamentos
export const useFetchDepartments = () => {
  return useQuery(['departments'], departmentsService.findAll);
};

// Hook para obtener departamentos por país
export const useFetchDepartmentsByCountry = (paisId: string) => {
  return useQuery(['departmentsByCountry', paisId], () => departmentsService.findByCountry(paisId));
};

// Hook para crear un nuevo departamento
export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newDepartment: Record<string, any>) => departmentsService.create(newDepartment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['departments']); // Refresca la lista de departamentos
      },
    }
  );
};

// Hook para actualizar un departamento
export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, department }: { id: string; department: Record<string, any> }) =>
      departmentsService.update(id, department),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['departments']); // Refresca la lista de departamentos
      },
    }
  );
};

// Hook para eliminar un departamento
export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => departmentsService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['departments']); // Refresca la lista de departamentos
      },
    }
  );
};

// Hook para restaurar un departamento
export const useRestoreDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => departmentsService.restore(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['departments']); // Refresca la lista de departamentos
      },
    }
  );
};
