import { Control } from 'react-hook-form';

import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

import { useFetchDisabilities } from '../hooks/useDisability';
import { Icons } from '@/components/ui/icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface DisabilitiesCheckboxGroupProps {
  control: Control<any>; 
  name:    string; 
}

export const DisabilitiesCheckboxGroup: React.FC<DisabilitiesCheckboxGroupProps> = ({ control, name }) => {
  const { data: disabilities = [], isLoading, isError } = useFetchDisabilities();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <Icons.Spinner className="h-4 w-4 animate-spin" />
      </div>
    );
  }
 
  if (isError || !Array.isArray(disabilities)) {
    return (
      <Alert variant="destructive">
        <Icons.AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Ocurrió un error al cargar las discapacidades. Por favor, inténtalo más tarde.
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
            <FormLabel>Discapacidades</FormLabel>
            <FormDescription>
              Selecciona todas las discapacidades que apliquen.
            </FormDescription>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">

            {disabilities.map((item) => (
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
