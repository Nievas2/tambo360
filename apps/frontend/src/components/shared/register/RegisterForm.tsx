import { ArrowRight, EyeOff, EyeIcon, AlertCircle } from 'lucide-react'
import { useRegister } from '@/src/hooks/auth/useRegister'
import { Button } from '@/src/components/common/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/src/components/common/label'
import { RegisterSchema } from '@/src/types/register'
import { Input } from '@/src/components/common/Input'
import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface RegisterFormProps {
  handleNextStep: () => void
  // eslint-disable-next-line no-unused-vars
  handleAddEmail: (email: string) => void
}

const RegisterForm = ({
  handleNextStep,
  handleAddEmail,
}: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { mutateAsync, isPending, error: apiError } = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm({
    defaultValues: {
      correo: '',
      nombre: '',
      contraseña: '',
      confirmarContraseña: '',
    },
    resolver: zodResolver(RegisterSchema),
  })

  const showErrorMessage = useCallback((message?: string) => {
    toast.custom(() => (
      <div className="z-[10000] w-full max-w-[400px] flex items-center justify-center gap-3 bg-[#FCE8E5] border border-[#F87171] text-[#B91C1C] px-4 py-3 rounded-lg text-sm font-semibold shadow-lg animate-in fade-in slide-in-from-top-5 duration-300 pointer-events-auto">
        <AlertCircle
          className="w-5 h-5 flex-shrink-0 fill-[#EF4444]"
          stroke="#FCE8E5"
          strokeWidth={3}
        />
        <span className="flex-1">
          {message || 'Revisa los campos resaltados e intenta nuevamente'}
        </span>
      </div>
    ), {
      duration: 4000,
      position: 'top-center',
    })
  }, [])

  useEffect(() => {
    if (submitCount > 0 && Object.keys(errors).length > 0) {
      showErrorMessage()
    }
  }, [submitCount, errors, showErrorMessage])

  useEffect(() => {
    if (apiError) {
      const message = apiError.response?.data?.message || 'Ocurrió un error en el servidor'
      showErrorMessage(message)
    }
  }, [apiError, showErrorMessage])

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data)
      handleAddEmail(data.correo)
      handleNextStep()
    } catch (err) {
      console.error('Error al registrarse:', err)
    }
  })

  return (
    <div className="w-full flex flex-col items-center font-inter">
      <form onSubmit={onSubmit} className="w-full space-y-6" noValidate data-testid="register-form">
        <div className="space-y-4">
          <div className="space-y-2 text-left">
            <Label className={`font-bold ${errors.nombre ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}>
              Nombre*
            </Label>
            <Input
              placeholder="Ingresa tu nombre y apellido"
              {...register('nombre')}
              className={`h-14 ${errors.nombre ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'border-[#D1CFCA] bg-[#F9F9F7]'}`}
              disabled={isPending}
              data-testid="full-name-input"
            />
            {errors.nombre && (
              <p className="text-xs font-medium text-[#B91C1C]">{errors.nombre.message}</p>
            )}
          </div>

          <div className="space-y-2 text-left">
            <Label className={`font-bold ${errors.correo ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}>
              Correo electrónico*
            </Label>
            <Input
              placeholder="Ingresa tu correo electrónico"
              {...register('correo')}
              className={`h-14 ${errors.correo ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'border-[#D1CFCA] bg-[#F9F9F7]'}`}
              disabled={isPending}
              data-testid="email-input"
            />
            {errors.correo && (
              <p className="text-xs font-medium text-[#B91C1C]">{errors.correo.message}</p>
            )}
          </div>

          <div className="space-y-2 text-left">
            <Label className={`font-bold ${errors.contraseña ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}>
              Contraseña*
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                {...register('contraseña')}
                className={`h-14 ${errors.contraseña ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'border-[#D1CFCA] bg-[#F9F9F7]'}`}
                disabled={isPending}
                data-testid="password-input"
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#626059] hover:bg-transparent h-auto p-0"
                data-testid="toggle-password-visibility"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </Button>
            </div>
            {!errors.contraseña && (
              <p className="text-[10px] text-[#626059]">
                Requisitos: 8 caracteres, mayúscula, minúscula y carácter especial.
              </p>
            )}
            {errors.contraseña && (
              <p className="text-xs font-medium text-[#B91C1C]">{errors.contraseña.message}</p>
            )}
          </div>

          <div className="space-y-2 text-left">
            <Label className={`font-bold ${errors.confirmarContraseña ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}>
              Confirmar contraseña*
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                {...register('confirmarContraseña')}
                className={`h-14 ${errors.confirmarContraseña ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'border-[#D1CFCA] bg-[#F9F9F7]'}`}
                disabled={isPending}
                data-testid="confirm-password-input"
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#626059] hover:bg-transparent h-auto p-0"
                data-testid="toggle-confirm-password-visibility"
              >
                {showConfirmPassword ? <EyeOff className="size-5" /> : <EyeIcon className="size-5" />}
              </Button>
            </div>
            {errors.confirmarContraseña && (
              <p className="text-xs font-medium text-[#B91C1C]">{errors.confirmarContraseña.message}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-14 rounded-lg text-lg font-medium transition-all bg-[#0B1001] hover:bg-[#2F3427] text-[#FFFBF1] flex items-center justify-center gap-2"
          disabled={isPending}
          data-testid="register-submit-button"
        >
          {isPending ? 'Cargando...' : 'Siguiente'}
          <ArrowRight className="size-5" />
        </Button>
      </form>
    </div>
  )
}

export default RegisterForm;