import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'

import { Button } from '@/components/ui/button'
import { CityCombobox } from '@/cities/components/CityCombobox'
import { CountryCombobox } from '@/countries/components/CountryCombobox'
import { DatePicker } from '@/components/ui/date-picker'
import { DepartamentCombobox } from '@/departaments/components/DepartamentCombobox'
import { DisabilitiesCheckboxGroup } from '@/disabilities/components/DisabilitiesCheckbox'
import { EducationalInstitutionCombobox } from '@/institutions/components/InstitutionCombobox'
import { EpsCombobox } from '@/eps/components/EpsCombobox'
import { EthnicGroupSelect } from '@/ethnic-group/components/EthnicGroupSelect'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { InteresTopicCheckboxGroup } from '@/interes-topic/components/InteresTopicCheckbox'
import { PopularionGroupSelect } from '@/population-group/components/PopulationGroupSelect'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SisbenScoreSelect } from '@/sisben-score/components/SisbenScoreSelect'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

import { useCreateMember } from '../hooks/useMembers'
import { AddMemberFormValues, addMemberSchema, defaultValues } from '../schemas/addMemberSchema'

const MAX_FILE_SIZE = 5 * 1024 * 1024 

export const AddMemberForm = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<AddMemberFormValues>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: defaultValues
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      const file = acceptedFiles[0]
      if (file.size <= MAX_FILE_SIZE) {
        form.setValue("imagen", file)
        setPreviewImage(URL.createObjectURL(file))
      } else {
        form.setError("imagen", {
          type: "manual",
          message: "El archivo es demasiado grande. Máximo 5MB.",
        })
      }
    }
  }, [form])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false
  })

  const mutation = useCreateMember()

  const onSubmit = async (data: AddMemberFormValues) => {
    const formData = new FormData();
    console.log(data);
    // Asegúrate de que el campo imagen se esté manejando correctamente
    if (data.imagen) {
      formData.append('imagen', data.imagen as File); // data.imagen debe ser un File, no un string
    }

    // Agregar otros campos (como texto) al FormData
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof AddMemberFormValues];
      if (value !== undefined && value !== null 
          && key !== 'imagen' && key !== 'fechaNacimiento' && key !== 'fechaIngresoFundacion'
          && key !== 'areasInteres' && key !== 'discapacidades'
      ) {
        formData.append(key, value as string | Blob);
      }
    });

    // Verificar y formatear las fechas si es necesario
    if (data.fechaNacimiento) {
      formData.append('fechaNacimiento', new Date(data.fechaNacimiento).toISOString());
    }
    if (data.fechaIngresoFundacion) {
      formData.append('fechaIngresoFundacion', new Date(data.fechaIngresoFundacion).toISOString());
    }

    // Si hay un array, asegúrate de que esté en formato adecuado
    if (Array.isArray(data.areasInteres)) {
      data.areasInteres.forEach((item, index) => {
        formData.append(`areasInteres[${index}]`, item);
      });
    }
    
    if (Array.isArray(data.discapacidades)) {
      data.discapacidades.forEach((item, index) => {
        formData.append(`discapacidades[${index}]`, item);
      });
    } 

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    mutation.mutate(formData);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 mb-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Formulario lateral izquierdo */}
          <div className="lg:col-span-2 grid gap-6 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="nombres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input disabled={mutation.isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apellidos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input disabled={mutation.isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipoDocumento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de documento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                      <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
                      <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                      <SelectItem value="PP">Pasaporte</SelectItem>
                      <SelectItem value="RC">Registro Civil</SelectItem>
                      <SelectItem value="CEDE">Cédula de Extranjería Digital</SelectItem>
                      <SelectItem value="PSE">Permiso de Salida del Extranjero</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numeroDocumento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de documento</FormLabel>
                  <FormControl>
                    <Input disabled={mutation.isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fechaNacimiento"
              render={({ field }) => (
                <FormItem className="flex flex-col lg:col-span-2">
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <DatePicker onChange={field.onChange} value={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Imagen */}
          <div className="lg:col-span-1">
            <FormField
              control={form.control}
              name="imagen"
              render={() => (
                <FormItem>
                  <FormLabel>Imagen</FormLabel>
                  <FormControl>
                    <div {...getRootProps()} 
                      className={cn(
                        "relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50/50 px-2 py-4 text-center",
                        isDragActive && "border-primary bg-primary/5"
                      )}
                    >
                      <input {...getInputProps()} />
                      {
                        previewImage 
                        ? (
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="max-h-[170px] w-auto object-contain"
                            />
                          )
                        : (
                            <div className="flex flex-col items-center gap-4">
                              <Icons.Image className="mx-auto size-14 mb-3 text-gray-600"/>
                              <div>
                                { 
                                  isDragActive 
                                    ? ( 
                                        <div className="text-sm text-gray-600">
                                          Suelta la imagen aquí ...
                                        </div>
                                      ) 
                                    : ( 
                                        <div className="text-sm text-gray-600">
                                          Arrastra una imagen o haz clic para seleccionar
                                        </div>
                                      )
                                }
                                <div className="text-xs text-gray-500">
                                  Imagen de perfil del miembro (máximo 5MB)
                                </div>
                              </div>
                            </div>
                          )
                      }
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="paisNacimiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País de nacimiento</FormLabel>
                <CountryCombobox onChange={field.onChange} value={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="departamentoNacimiento"
            render={({ field }) => {
              // Obtener el país seleccionado desde el formulario
              const selectedCountry = form.watch("paisNacimiento");

              return (
                <FormItem>
                  <FormLabel>Departamento de nacimiento</FormLabel>
                    {
                      selectedCountry ? (
                        <DepartamentCombobox 
                          {...field} 
                          countryId={selectedCountry} // Pasar el país seleccionado como prop
                        />
                      ) : (
                        <Button 
                          variant="outline" 
                          disabled 
                          className="w-full justify-between"
                        >
                          Selecciona primero un país
                        </Button>
                      )
                    }
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="ciudadNacimiento"
            render={({ field }) => {
              // Obtener el departamento seleccionado desde el formulario
              const selectedDepartment = form.watch("departamentoNacimiento");

              return (
                <FormItem>
                  <FormLabel>Ciudad de nacimiento</FormLabel>
                    { 
                      selectedDepartment ? (
                        <CityCombobox 
                          {...field} 
                          departmentId={selectedDepartment} // Pasar el departamento seleccionado
                        />
                      ) : (
                        <Button 
                          variant="outline" 
                          disabled 
                          className="w-full justify-between"
                        >
                          Selecciona primero un departamento
                        </Button>
                      )
                    }
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="peso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso (Kg)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="talla"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Talla</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar talla" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="14">14</SelectItem>
                    <SelectItem value="16">16</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                    <SelectItem value="XXL">XXL</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="institucionEducativa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institución educativa</FormLabel>
                <EducationalInstitutionCombobox onChange={field.onChange} value={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grado</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fechaIngresoFundacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de ingreso a la fundación</FormLabel>
                <DatePicker onChange={field.onChange} value={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="eps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>EPS</FormLabel>
                <EpsCombobox onChange={field.onChange} value={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="puntajeSisben"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Puntaje Sisben</FormLabel>
                <SisbenScoreSelect onChange={field.onChange} value={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grupoPoblacional"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grupo poblacional</FormLabel>
                <PopularionGroupSelect onChange={field.onChange} value={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grupoEtnico"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grupo étnico</FormLabel>
                <EthnicGroupSelect onChange={field.onChange} value={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>  

        <div className="grid gap-6 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="numeroCasoVGB"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de caso VBG</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numeroCasoViolenciaFamiliar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de caso de violencia familiar</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numeroCasoPsicologico"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número caso de acompañamiento psicológico</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="areasInteres"
            render={() => (
              <FormItem>
                <InteresTopicCheckboxGroup control={form.control} name="areasInteres" />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discapacidades"
            render={() => (
              <FormItem>
                <DisabilitiesCheckboxGroup control={form.control} name="discapacidades" />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discapacidadMedica"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discapacidad medica</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>  

        <div className="flex justify-end">
          <Button type="submit">Agregar</Button>
        </div>
      </form>
    </Form>    
  )
}