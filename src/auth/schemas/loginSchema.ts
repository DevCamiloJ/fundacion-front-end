import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().email("Debe ser un correo válido").min(6, "El correo debe tener al menos 6 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export type LoginFormValues = z.infer<typeof loginSchema>