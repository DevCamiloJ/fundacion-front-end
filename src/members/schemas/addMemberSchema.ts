import { z } from 'zod';

export const addMemberSchema = z.object({
  nombres: z.string().min(1, "El nombre es obligatorio"),
  apellidos: z.string().min(1, "El apellido es obligatorio"),
  tipoDocumento: z
    .string()
    .min(1, "El tipo de documento es obligatorio")
    .refine(value => ["CC", "TI", "CE", "PP", "RC", "CEDE", "PSE"].includes(value), "Tipo de documento no válido"),
  numeroDocumento: z
    .string()
    .min(1, "El número de documento es obligatorio")
    .regex(/^\d+$/, "El número de documento debe contener solo dígitos"),
  fechaNacimiento: z.date().refine(date => !date || date <= new Date(), {
    message: "La fecha de nacimiento no puede ser en el futuro",
  }),
  imagen: z.instanceof(File)
    .optional()
    .nullable()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: 'El archivo es demasiado grande. Máximo 5MB.',
    })
    .refine((file) => !file || file.type.startsWith('image/'), {
      message: 'Solo se permiten imágenes',
    }),
  paisNacimiento: z.string().min(1, "El país de nacimiento es obligatorio"),
  departamentoNacimiento: z.string().min(1, "El departamento de nacimiento es obligatorio"),
  ciudadNacimiento: z.string().min(1, "La ciudad de nacimiento es obligatoria"),
  peso: z.string()
    .min(1, "El peso debe ser un número positivo")
    .transform(val => parseFloat(val))  // Convierte la cadena a un número
    .refine(val => val > 0, "El peso debe ser un número positivo"),
  talla: z
    .string()
    .min(1, "La talla es obligatoria")
    .refine(value => ["8", "10", "12", "14", "16", "S", "M", "L", "XL", "XXL"].includes(value), "Talla no válida"),
  institucionEducativa: z.string().optional(),
  grado: z.string().optional(),
  fechaIngresoFundacion: z.date().refine(date => !date || date <= new Date(), {
    message: "La fecha de ingreso no puede ser en el futuro",
  }),
  eps: z.string().min(1, "La EPS es obligatoria"),
  puntajeSisben: z.string().optional(),
  grupoPoblacional:  z.string().optional(),
  grupoEtnico:  z.string().optional(),
  numeroCasoVGB: z.string().optional(),
  numeroCasoViolenciaFamiliar: z.string().optional(),
  numeroCasoPsicologico: z.string().optional(),
  areasInteres: z.array(z.string()).nonempty("Debe seleccionar al menos un área de interés"),
  discapacidades: z.array(z.string()).optional(),
  discapacidadMedica: z.string().optional(),
}).refine(data => {
  if (data.institucionEducativa) {
    return data.grado && data.grado.trim() !== "";
  }
  return true; // Si no hay institución educativa, no importa el grado
}, {
  message: "El grado es obligatorio si existe una institución educativa",
  path: ["grado"], // Campo al que se asignará el error
});

export type AddMemberFormValues = z.infer<typeof addMemberSchema>

// Valores por defecto
export const defaultValues = {
  nombres: "",
  apellidos: "",
  tipoDocumento: "",
  numeroDocumento: "",
  fechaNacimiento: new Date(),
  imagen: undefined,
  paisNacimiento: "",
  departamentoNacimiento: "",
  ciudadNacimiento: "",
  peso: 0,
  talla: "",
  institucionEducativa: "",
  grado: "",
  fechaIngresoFundacion: new Date(),
  eps: "",
  puntajeSisben: "",
  grupoPoblacional: "",
  grupoEtnico: "",
  numeroCasoVGB: "",
  numeroCasoViolenciaFamiliar: "",
  numeroCasoPsicologico: "",
  areasInteres: [],
  discapacidades: [],
  discapacidadMedica: "",
};
