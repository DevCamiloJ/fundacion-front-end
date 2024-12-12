import { useMutation, useQuery, useQueryClient } from 'react-query';

import { interestTopicService } from '../services/interes-topic.service';
import { CreateInterestTopicDto, InterestTopic, UpdateInterestTopicDto } from '../types/interes-topic';

// Hook para obtener todos los temas de interés
export const useFetchInterestTopics = () => {
  return useQuery<InterestTopic[]>(['interest-topics'], interestTopicService.findAll);
};

// Hook para obtener un tema de interés por ID
export const useFetchInterestTopicById = (id: string) => {
  return useQuery<InterestTopic>(['interest-topic', id], () => interestTopicService.findOne(id));
};

// Hook para crear un nuevo tema de interés
export const useCreateInterestTopic = () => {
  const queryClient = useQueryClient();
  return useMutation<InterestTopic, unknown, CreateInterestTopicDto>(
    (newInterestTopic) => interestTopicService.create(newInterestTopic),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['interest-topics']); // Refresca la lista de temas de interés
      },
    }
  );
};

// Hook para actualizar un tema de interés
export const useUpdateInterestTopic = () => {
  const queryClient = useQueryClient();
  return useMutation<InterestTopic, unknown, { id: string; interestTopic: UpdateInterestTopicDto }>(
    ({ id, interestTopic }) => interestTopicService.update(id, interestTopic),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['interest-topics']); // Refresca la lista de temas de interés
      },
    }
  );
};

// Hook para eliminar un tema de interés
export const useDeleteInterestTopic = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>(
    (id) => interestTopicService.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['interest-topics']); // Refresca la lista de temas de interés
      },
    }
  );
};

// Hook para restaurar un tema de interés eliminado
export const useRestoreInterestTopic = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>(
    (id) => interestTopicService.restore(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['interest-topics']); // Refresca la lista de temas de interés
      },
    }
  );
};
