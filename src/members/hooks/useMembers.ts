import { useMutation, useQuery, useQueryClient } from 'react-query';
import { membersService } from '../services/miembros.service';


// Hook para obtener todos los miembros
export const useFetchMembers = () => {
  return useQuery(['members'], membersService.findAll);
};

// Hook para crear un nuevo miembro
export const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newMember: Record<string, any>) => membersService.create(newMember),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['members']); // Refresca la lista de miembros
      },
    }
  );
};

// Hook para actualizar un miembro
export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, member }: { id: string; member: Record<string, any> }) => 
      membersService.update(id, member),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['members']); // Refresca la lista de miembros
      },
    }
  );
};

// Hook para inactivar un miembro
export const useInactivateMember = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: string) => membersService.inactivate(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['members']); // Refresca la lista de miembros
      },
    }
  );
};
