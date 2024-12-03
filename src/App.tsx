import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from '@/components/ui/sonner'

import { AppRouter } from './router/AppRouter'
import { AuthProvider } from './auth/context/AuthContex'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
