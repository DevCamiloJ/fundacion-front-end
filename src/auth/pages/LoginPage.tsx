import { Icons } from '@/components/ui/icons'
import { LoginForm } from '../components/LoginForm'

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated sparkles */}
        <div className="absolute top-10 right-10 animate-pulse">
          <Icons.Sparkles className="w-6 h-6 text-pink-300" />
        </div>
        <div className="absolute bottom-10 left-10 animate-pulse animation-delay-2000">
          <Icons.Sparkles className="w-6 h-6 text-purple-300" />
        </div>
        <div className="absolute top-1/4 left-1/4 animate-pulse animation-delay-4000">
          <Icons.Crown className="w-8 h-8 text-pink-200" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-pulse animation-delay-4000">
          <Icons.Crown className="w-8 h-8 text-pink-300" />
        </div>
      </div>

      <div className="relative w-full max-w-md space-y-8 p-8">
        <div className="flex flex-col items-center space-y-2">
          <img
            src="/logo.svg"
            alt="Princesas Guerreras Logo"
            className="w-64 h-auto mb-10"
          />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Bienvenid@ a Princesas Guerreras
          </h1>
          <p className="text-sm text-muted-foreground">
            Ingresa tus credenciales para acceder
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

