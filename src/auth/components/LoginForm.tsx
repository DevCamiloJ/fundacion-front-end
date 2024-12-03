import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { LoginFormValues, loginSchema } from '../schemas/loginSchema'
import { PasswordInput } from '../components/PasswordInput'
import { useAuthMutation } from '../hooks/useAuthMutation'


export const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
        email: "",
        password: ""
    },
  })

  const mutation = useAuthMutation()
  const queryClient = useQueryClient()
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        toast("Inicio de sesión exitoso", {
          description: "Redirigiendo al dashboard...",
        });
        localStorage.setItem("token", data.access_token); // Guarda el token JWT
        queryClient.invalidateQueries(['currentUser']);
        navigate("/dashboard");
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'Credenciales incorrectas. Inténtalo de nuevo.';
        toast.error("Error al iniciar sesión", {
          description: errorMessage,
        });
      },
    });
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  placeholder="nombre@ejemplo.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={mutation.isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <PasswordInput 
                  id="password" 
                  placeholder="******"
                  disabled={mutation.isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <a
            href="/forgot-password"
            className="text-sm text-pink-600 hover:text-pink-500"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <Button className="w-full bg-gradient-to-r from-[#FF69B4] to-[#9370DB] hover:from-[#FF1493] hover:to-[#8A2BE2]">
          {/* { mutation.isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />) } */}
          Iniciar Sesión { mutation.isLoading }
        </Button>
      </form>
    </Form>
  );
};
