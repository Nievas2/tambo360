import { Card, CardContent } from '@/src/components/common/card'
import { Button } from '@/src/components/common/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/src/components/common/label'
import { Input } from '@/src/components/common/Input'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '@/src/hooks/auth/useLogin'
import { useAuth } from '@/src/context/AuthContext'
import { EyeIcon, ArrowRight, EyeOff, AlertCircle } from 'lucide-react'
import { LoginSchema } from '@/src/types/login'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { mutateAsync, isPending, error: apiError } = useLogin()
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

  const hasAnyError = Object.keys(errors).length > 0 || !!apiError

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await mutateAsync(data)
      login({ token: response.token, user: response.user })
      navigate('/dashboard')
    } catch (err) {
      console.error('Error al iniciar sesión:', err)
    }
  })

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F2F1EC] relative font-inter">
      {/* Aviso General Centrado Arriba */}
      {hasAnyError && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-[400px] flex items-center justify-center gap-2 bg-[#FCE8E5] border border-[#F87171] text-[#B91C1C] px-4 py-3 rounded-lg text-sm font-semibold shadow-lg animate-in fade-in slide-in-from-top-5 duration-300">
          <AlertCircle 
            className="w-5 h-5 fill-[#EF4444]" 
            stroke="#FCE8E5" 
            strokeWidth={3}
          />
          <span>Revisa los campos resaltados e intenta nuevamente</span>
        </div>
      )}

      {/* Panel Izquierdo: Branding */}
      <div className="hidden md:flex md:w-1/3 xl:w-1/2 items-center justify-center bg-[#0B1001]">
        <div className="w-full h-full max-w-lg flex flex-col items-center justify-center">
          <img src="/isotipo_tambo 1.svg" alt="Logo" className="w-3/4 h-auto brightness-0 invert" />
          <img src="/logotipo 1.svg" alt="Tambo" className="w-1/2 h-auto mt-4 brightness-0 invert" />
        </div>
      </div>

      {/* Panel Derecho: Formulario */}
      <div className="w-full md:w-2/3 xl:w-1/2 flex items-center justify-center md:justify-end p-4 md:p-8">
        <Card className="w-full max-w-125 border-none shadow-none md:shadow-sm py-10 px-2 md:px-4 bg-white rounded-xl relative">
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center justify-start text-center space-y-4">
              <div className="h-12 lg:h-20 w-auto flex items-start gap-2">
                <img src="/isotipo_tambo 1.svg" alt="logo" className="h-12" />
                <img src="/logotipo 1.svg" alt="tambo" className="h-6" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight text-[#0B1001]">Bienvenido</h1>
                <p className="text-sm text-[#626059]">Ingresa tus credenciales para empezar a usar la plataforma.</p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2 text-left">
                  <Label className={`font-bold ${errors.correo ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}>
                    Correo electrónico
                  </Label>
                  <Input
                    type="email"
                    autoComplete="username"
                    placeholder="Ingresa tu correo electrónico"
                    {...register('correo')}
                    className={`${errors.correo ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'border-[#D1CFCA] bg-[#F9F9F7]'} h-14`}
                    data-test-id="email-login"
                    disabled={isPending}
                  />
                  {errors.correo && (
                    <p className="text-xs font-medium text-[#B91C1C]">{errors.correo.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2 text-left">
                  <Label className={`font-bold ${errors.contraseña ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}>
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="••••••••••••"
                      {...register('contraseña')}
                      className={`${errors.contraseña ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'border-[#D1CFCA] bg-[#F9F9F7]'} h-14`}
                      data-test-id="password-login"
                      disabled={isPending}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#626059] hover:bg-transparent h-auto p-0"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </Button>
                  </div>
                  {errors.contraseña && (
                    <p className="text-xs font-medium text-[#B91C1C]">{errors.contraseña.message}</p>
                  )}

                  <div className="flex justify-end pt-1">
                    <Link 
                      to="/auth/reset-password"
                      className="text-xs text-[#626059] hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </div>
              </div>

              {apiError && !Object.keys(errors).length && (
                <div className="bg-[#FCE8E5] border border-[#F87171] text-[#B91C1C] px-4 py-3 rounded-lg text-xs text-center font-medium">
                  {apiError.response?.data?.message || 'Error al iniciar sesión. Por favor, intenta de nuevo.'}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-14 rounded-lg text-lg font-medium transition-all bg-[#0B1001] hover:bg-[#2F3427] text-[#FFFBF1] gap-2" 
                disabled={isPending}
              >
                {isPending ? 'Cargando...' : 'Iniciar sesión'} <ArrowRight className="size-5" />
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-[#F2F1EC]">
              <p className="text-sm text-[#626059]">
                ¿No tienes una cuenta?{' '}
                <Link 
                  to="/register" 
                  className="font-bold text-[#0B1001] hover:underline"
                >
                  Regístrate
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login