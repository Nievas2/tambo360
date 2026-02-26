import { Card, CardContent } from '@/src/components/common/card'
import { Button } from '@/src/components/common/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/src/components/common/label'
import { Input } from '@/src/components/common/Input'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '@/src/hooks/auth/useLogin'
import { useAuth } from '@/src/context/AuthContext'
import { EyeIcon, ArrowRight, X } from 'lucide-react'
import { LoginSchema } from '@/src/types/login'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { useForgotPassword } from '@/src/hooks/auth/useForgotPassword' // Importamos el hook que envía el mail

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  
  const { mutateAsync, isPending, error } = useLogin()
  const { mutate: sendForgotEmail, isPending: isForgotPending } = useForgotPassword()
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      correo: '',
      contraseña: '',
    },
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await mutateAsync(data)
      login({ token: response.data.token, user: response.data.user })
      navigate('/dashboard')
    } catch (err: any) {
      console.error('Error al iniciar sesión:', err)
    }
  })

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!forgotEmail) return
    sendForgotEmail(forgotEmail, {
      onSuccess: () => {
        setShowForgotModal(false)
        setForgotEmail('')
      }
    })
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#e5e5e5]">
      <div className="hidden md:flex md:w-1/3 xl:w-1/2 items-center justify-center">
        <div className="w-full h-full max-lg flex items-center justify-center">
          <div className="rounded-2xl w-full aspect-square flex flex-col items-center justify-center">
            <img src="/isotipo_tambo 1.svg" alt="Logo" className="w-3/4 h-auto" />
            <img src="/logotipo 1.svg" alt="Tambo" className="w-1/2 h-auto mt-4" />
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 xl:w-1/2 flex items-center justify-center md:justify-end p-4 md:p-8">
        <Card className="w-full max-w-125 border-none shadow-none md:shadow-sm py-8 px-2 md:px-4 bg-white rounded-xl">
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center justify-start text-center space-y-4 h-full">
              <div className="h-12 lg:h-28 w-auto flex items-start gap-2">
                <img src="/isotipo_tambo 1.svg" alt="logo" className="h-12" />
                <img src="/logotipo 1.svg" alt="tambo" className="h-6" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight text-[#1a1c1e]">Bienvenido</h1>
                <p className="text-sm text-muted-foreground">Ingresa tus credenciales para empezar a usar la plataforma.</p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold text-[#1a1c1e]">Correo electrónico</Label>
                  <Input
                    placeholder="Ingresa tu correo electrónico"
                    {...register('correo')}
                    disabled={isPending}
                  />
                  {errors.correo && <small className="text-red-500">{errors.correo.message}</small>}
                </div>

                <div className="space-y-2">
                  <Label className="font-bold text-[#1a1c1e]">Contraseña</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      {...register('contraseña')}
                      disabled={isPending}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </Button>
                  </div>
                  {errors.contraseña && <small className="text-red-500">{errors.contraseña.message}</small>}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs text-slate-500 hover:underline bg-transparent border-none p-0 cursor-pointer"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>

                  {error && (
                    <small className="text-red-700">
                      {(error as any).response?.data?.message || 'Error al iniciar sesión'}
                    </small>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 rounded-lg text-lg font-medium transition-all"
                disabled={isPending}
              >
                {isPending ? 'Cargando...' : 'Iniciar sesión'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-sm text-slate-600">
                ¿No tienes una cuenta?{' '}
                <Link to="/register" className="font-bold text-[#1a1c1e] hover:underline">Regístrate</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MODAL PARA SOLICITAR CAMBIO DE CONTRASEÑA */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-md relative bg-white rounded-xl shadow-xl">
            <button 
              onClick={() => setShowForgotModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <CardContent className="pt-8 space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-[#1a1c1e]">Recuperar acceso</h3>
                <p className="text-sm text-slate-500">
                  Enviaremos un enlace a tu correo para que puedas restablecer tu contraseña.
                </p>
              </div>
              <form onSubmit={handleForgotSubmit} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label className="font-bold text-[#1a1c1e]">Tu correo electrónico</Label>
                  <Input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12" 
                  disabled={isForgotPending}
                >
                  {isForgotPending ? 'Enviando...' : 'Enviar enlace de recuperación'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Login