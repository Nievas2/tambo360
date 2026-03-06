import { Button } from '@/src/components/common/Button'
import { Card, CardContent } from '@/src/components/common/card'
import { useAuth } from '@/src/context/AuthContext'
import { useVerifyEmail } from '@/src/hooks/auth/useVerifyEmail'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const VerifyUser = () => {
  const { mutateAsync, error, isPending } = useVerifyEmail()
  const { search } = useLocation()
  const { setToken, setUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = new URLSearchParams(search).get('token')
        if (token) {
          const response = await mutateAsync(token)
          setUser(response.data.user)
          setToken(token)
        }
      } catch (err) { console.error(err) }
    }
    checkToken()
  }, [search, mutateAsync, setToken, setUser])

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F2F1EC] relative font-inter bg-[url('/vacas_4.webp')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/10 z-0" />
      <div className="hidden md:flex md:w-1/3 xl:w-1/2" />
      <div className="w-full md:w-2/3 xl:w-1/2 flex items-center justify-center md:justify-end p-4 md:p-8 z-10">
        <Card className="w-full max-w-125 border-none shadow-2xl py-8 bg-white/95 backdrop-blur-md rounded-xl relative">
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4 h-full">
              <div className="h-12 lg:h-20 w-auto flex items-start gap-2">
                <img src="/isotipo_tambo 1.svg" alt="logo" className="h-12" />
                <img src="/logotipo 1.svg" alt="tambo" className="h-6" />
              </div>
              <section className="min-h-[40vh] flex flex-col items-center justify-center gap-6">
                {isPending ? (
                  <div className="space-y-4">
                    <Loader2 className="w-12 h-12 text-[#0B1001] animate-spin mx-auto" />
                    <h2 className="text-4xl font-bold tracking-tight text-[#0B1001]">Verificando...</h2>
                  </div>
                ) : error ? (
                  <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight text-[#B91C1C]">Verificación fallida</h2>
                    <Button onClick={() => navigate('/login')} variant="outline" className="border-[#D1CFCA] text-[#0B1001]">Volver al login</Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-6">
                    <img src="/successIcon.svg" alt="success" className="w-20 h-20" />
                    <h2 className="text-4xl font-bold tracking-tight text-[#0B1001]">¡Usuario validado!</h2>
                    <Button className="w-full h-14 bg-[#0B1001] text-white rounded-lg flex items-center justify-center gap-2" onClick={() => navigate('/establecimiento')}>
                      Crear establecimiento <ArrowRight className="size-5" />
                    </Button>
                  </div>
                )}
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VerifyUser