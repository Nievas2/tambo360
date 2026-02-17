import { QueryProvider } from '@/src/utils/QueryProvider'
import { AuthProvider } from '@/src/context/AuthContext'
import { HashRouter } from 'react-router-dom'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <HashRouter>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </HashRouter>
  )
}
export default Providers
