import RegisterForm from '@/src/components/shared/register/RegisterForm'
import { Card, CardContent } from '@/src/components/common/card'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/src/components/common/Button'
import { useResendEmail } from '@/src/hooks/auth/useResendEmail'

const Register: React.FC = () => {
  const [isResending, setIsResending] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [email, setEmail] = useState('')
  const [step, setStep] = useState(1)
  
  const { mutateAsync, isPending } = useResendEmail()

  useEffect(() => {
    if (step === 2) setSecondsLeft(180)
  }, [step])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(timer)
  }, [secondsLeft])

  const handleNextStep = () => setStep((prev) => prev + 1)
  const handleAddEmail = (email: string) => setEmail(email)

  async function handleResend() {
    try {
      setIsResending(true)
      await mutateAsync(email)
      setSecondsLeft(180)
    } catch (e) {
      console.error(e)
    } finally {
      setIsResending(false)
    }
  }

  const backgroundImage = step === 1 ? "url('/vacas_2.webp')" : "url('/vacas_3.webp')"

  return (
    <div 
      className="min-h-screen w-full flex flex-col md:flex-row bg-[#F2F1EC] relative font-inter bg-cover bg-center bg-no-repeat transition-all duration-700"
      style={{ backgroundImage }}
      data-testid="register-page-container"
    >
      <div className="absolute inset-0 bg-black/10 z-0" />
      <div className="hidden md:flex md:w-1/3 xl:w-1/2" />
      <div className="w-full md:w-2/3 xl:w-1/2 flex items-center justify-center md:justify-end p-4 md:p-8 z-10">
        <Card className="w-full max-w-125 border-none shadow-2xl py-8 bg-white/95 backdrop-blur-md rounded-xl relative">
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-auto flex items-start gap-2">
                <img src="/isotipo_tambo 1.svg" alt="logo" className="h-12" />
                <img src="/logotipo 1.svg" alt="tambo" className="h-6" />
              </div>
              {step === 1 && (
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tight text-[#0B1001]" data-testid="register-title">Crear cuenta</h1>
                  <p className="text-sm text-[#626059]">Comencemos con el proceso de registro para tu establecimiento lácteo</p>
                </div>
              )}
            </div>

            {step === 1 ? (
              <RegisterForm handleNextStep={handleNextStep} handleAddEmail={handleAddEmail} />
            ) : (
              <section className="h-full min-h-[40vh] flex flex-col items-center justify-center gap-6" data-testid="verify-email-step">
                <h2 className="text-4xl font-bold tracking-tight text-[#0B1001]">Revisa tu email</h2>
                <p className="text-sm text-center text-[#626059]">Haz clic en el enlace del email para activar tu cuenta y comenzar a usar Tambo360.</p>
                <div className="w-full max-w-sm">
                  <Button
                    variant="outline"
                    className="w-full h-14 border-[#D1CFCA] text-[#0B1001] hover:bg-[#F2F1EC]"
                    onClick={handleResend}
                    disabled={secondsLeft > 0 || isResending || isPending}
                    data-testid="resend-email-button"
                  >
                    {isResending ? 'Enviando...' : secondsLeft > 0 ? `Reenviar email (${Math.floor(secondsLeft / 60)}:${(secondsLeft % 60).toString().padStart(2, '0')})` : 'Reenviar email'}
                  </Button>
                </div>
              </section>
            )}

            {step === 1 && (
              <div className="text-center pt-4 border-t border-[#F2F1EC]">
                <p className="text-sm text-[#626059]">¿Ya tienes una cuenta? <Link to="/login" data-testid="login-link" className="font-bold text-[#0B1001] hover:underline">Inicia sesión</Link></p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Register