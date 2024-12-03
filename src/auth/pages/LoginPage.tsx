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
        
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-80 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
        
        {/* Decorative patterns */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
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

