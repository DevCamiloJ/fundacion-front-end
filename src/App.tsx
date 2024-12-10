import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from '@/components/ui/sonner'
import { BrowserRouter } from 'react-router-dom'

import { AppRouter } from './router/AppRouter'
import { AuthProvider } from './auth/context/AuthContex'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
