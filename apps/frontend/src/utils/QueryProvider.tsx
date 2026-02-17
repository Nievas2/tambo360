import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Con Next.js, queremos que las queries se revaliden cuando la ventana recupera el foco
            refetchOnWindowFocus: false,
            // Reintentar 3 veces por defecto
            retry: 3,
            // Tiempo de cache por defecto (5 minutos)
            staleTime: 1000 * 60 * 5,
            // Tiempo de garbage collection (10 minutos)
            gcTime: 1000 * 60 * 10,
          },
          mutations: {
            // Reintentar 1 vez por defecto en mutaciones
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
