import { Control } from 'react-hook-form';

import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/ui/icons';

import { useFetchInterestTopics } from '../hooks/useInterestTopic';

interface InteresTopicCheckboxGroupProps {
  control: Control<any>; 
  name:    string; 
}

export const InteresTopicCheckboxGroup: React.FC<InteresTopicCheckboxGroupProps> = ({ control, name }) => {
  const { data: interesTopic = [], isLoading, isError } = useFetchInterestTopics();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <Icons.Spinner className="h-4 w-4 animate-spin" />
      </div>
    );
  }
 
  if (isError || !Array.isArray(interesTopic)) {
    return (
      <Alert variant="destructive">
        <Icons.AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Ocurrió un error al cargar las areas de interés. Por favor, inténtalo más tarde.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="mb-4">
            <FormLabel>Areas de interés</FormLabel>
            <FormDescription>
              Selecciona todas las areas de interés que apliquen.
            </FormDescription>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
            {interesTopic.map((item) => (
              <FormItem
                key={item.id}
                className="lex flex-row items-start space-x-3 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(item.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...field.value, item.id]); // Agregar ID seleccionado
                      } else {
                        field.onChange(
                          field.value?.filter((value: string) => value !== item.id)
                        );
                      }
                    }}
                  />
                </FormControl>
                <FormLabel className="font-normal">{item.nombre}</FormLabel>
              </FormItem>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
