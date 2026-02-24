import RegisterForm from '@/src/components/shared/register/RegisterForm'
import { Card, CardContent } from '@/src/components/common/card'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Mail, Section } from 'lucide-react'
import { Button } from '@/src/components/common/Button'

const Register: React.FC = () => {
  const [step, setStep] = useState(2)

  function handleNextStep() {
    setStep((prev) => prev + 1)
  }
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#e5e5e5]">
      <div className="hidden md:flex md:w-1/3 xl:w-1/2 items-center justify-center">
        <div className="w-full h-full max-w-lg flex items-center justify-center">
          <div className="rounded-2xl w-full aspect-square flex flex-col items-center justify-center">
            <img
              src="/isotipo_tambo 1.svg"
              alt="Logo"
              className="w-3/4 h-auto"
            />
            <img
              src="/logotipo 1.svg"
              alt="Tambo"
              className="w-1/2 h-auto mt-4"
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 xl:w-1/2 flex items-center justify-center md:justify-end p-4 md:p-8">
        <Card className="w-full max-w-125 border-none shadow-none md:shadow-sm py-8 bg-white rounded-xl">
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center justify-start text-center space-y-4 h-full">
              <div className="h-12 lg:h-28 w-auto flex items-start gap-2">
                <img src="/isotipo_tambo 1.svg" alt="logo" className="h-12" />

                <img src="/logotipo 1.svg" alt="tambo" className="h-6" />
              </div>

              {step === 1 && (
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tight text-[#1a1c1e]">
                    Crear cuenta
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Comencemos con el proceso de registro <br />
                    para tu establecimiento lácteo
                  </p>
                </div>
              )}
            </div>

            {step === 1 ? (
              <RegisterForm handleNextStep={handleNextStep} />
            ) : (
              <section className="h-full min-h-[50vh] flex flex-col items-center justify-center gap-6">
                <h2 className="text-4xl font-bold tracking-tight text-[#1a1c1e]">
                  Crear cuenta
                </h2>
                <p className="text-sm text-muted-foreground">
                  Selecciona el método que prefieras para recibir la
                  verificación
                </p>
                <Button variant="outline" className="w-full h-14">
                  <Mail className="size-5" /> Via correo electrónico
                </Button>
              </section>
            )}

            <div className="text-center pt-4">
              <p className="text-sm text-slate-600">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  to="/register"
                  className="font-bold text-[#1a1c1e] hover:underline"
                  data-test-id="iniciar-sesion"
                >
                  Inicia sesion
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Register
