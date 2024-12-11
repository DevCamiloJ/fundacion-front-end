import { useMutation, useQuery, useQueryClient } from 'react-query';

import { sisbenScoreService } from '../services/sisben-score.service';
import { CreateSisbenScoreDto, SisbenScore, UpdateSisbenScoreDto } from '../types/sysben-score';


// Hook para obtener todos los puntajes del SISBEN
export const useFetchSisbenScores = () => {
  return useQuery<SisbenScore[]>(['sisbenScores'], sisbenScoreService.findAll);
};

// Hook para obtener un puntaje específico por ID
export const useFetchSisbenScoreById = (id: string) => {
  return useQuery<SisbenScore>(['sisbenScore', id], () => sisbenScoreService.findOne(id));
};

// Hook para crear un nuevo puntaje
export const useCreateSisbenScore = () => {
  const queryClient = useQueryClient();
  return useMutation<SisbenScore, unknown, CreateSisbenScoreDto>(
    (newSisbenScore) => sisbenScoreService.create(newSisbenScore),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sisbenScores']); // Refresca la lista de puntajes
      },
    }
  );
};

// Hook para actualizar un puntaje
export const useUpdateSisbenScore = () => {
  const queryClient = useQueryClient();
  return useMutation<SisbenScore, unknown, { id: string; sisbenScore: UpdateSisbenScoreDto }>(
    ({ id, sisbenScore }) => sisbenScoreService.update(id, sisbenScore),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sisbenScores']); // Refresca la lista de puntajes
      },
    }
  );
};

// Hook para eliminar un puntaje
export const useDeleteSisbenScore = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>(
    (id) => sisbenScoreService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sisbenScores']); // Refresca la lista de puntajes
      },
    }
  );
};

// Hook para restaurar un puntaje eliminado
export const useRestoreSisbenScore = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>(
    (id) => sisbenScoreService.restore(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['sisbenScores']); // Refresca la lista de puntajes
      },
    }
  );
};
