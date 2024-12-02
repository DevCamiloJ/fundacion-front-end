import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Configuración Inicial</h1>
    </QueryClientProvider>
  )
}

export default App
