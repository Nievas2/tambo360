import { ArrowRight, EyeOff, EyeIcon, AlertCircle } from 'lucide-react'
import { useRegister } from '@/src/hooks/auth/useRegister'
import { Button } from '@/src/components/common/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/src/components/common/label'
import { RegisterSchema } from '@/src/types/register'
import { Input } from '@/src/components/common/Input'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface RegisterFormProps {
  handleNextStep: () => void
  // Deshabilitamos ESLint para esta línea porque el nombre del parámetro es necesario
  // pero no se usa en este archivo (solo es parte de la firma)
  // eslint-disable-next-line no-unused-vars
  handleAddEmail: (_email: string) => void
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      correo: '',
      nombre: '',
      contraseña: '',
      confirmarContraseña: '',
    },
    resolver: zodResolver(RegisterSchema),
  })

  const hasAnyError = Object.keys(errors).length > 0 || !!apiError

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
      {/* Aviso General: fixed para que se alinee al root de la pantalla con estilos Handoff */}
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

      <form onSubmit={onSubmit} className="w-full space-y-6">
        <div className="space-y-4">
          {/* Nombre */}
          <div className="space-y-2 text-left">
            <Label className={`font-bold ${errors.nombre ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}>
              Nombre*
            </Label>
            <Input
              placeholder="Ingresa tu nombre y apellido"
              {...register('nombre')}
              className={`h-14 ${errors.nombre ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'border-[#D1CFCA] bg-[#F9F9F7]'}`}
              disabled={isPending}
            />
            {errors.nombre && (
              <p className="text-xs font-medium text-[#B91C1C]">{errors.nombre.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2 text-left">
            <Label className={`font-bold ${errors.correo ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}>
              Correo electrónico*
            </Label>
            <Input
              placeholder="Ingresa tu correo electrónico"
              {...register('correo')}
              className={`h-14 ${errors.correo ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'border-[#D1CFCA] bg-[#F9F9F7]'}`}
              disabled={isPending}
            />
            {errors.correo && (
              <p className="text-xs font-medium text-[#B91C1C]">{errors.correo.message}</p>
            )}
          </div>

          {/* Password */}
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
            {!errors.contraseña && (
              <p className="text-[10px] text-[#626059]">
                Requisitos: 8 caracteres, mayúscula, minúscula y carácter especial.
              </p>
            )}
            {errors.contraseña && (
              <p className="text-xs font-medium text-[#B91C1C]">{errors.contraseña.message}</p>
            )}
          </div>

          {/* Confirmar Password */}
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
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#626059] hover:bg-transparent h-auto p-0"
              >
                {showConfirmPassword ? <EyeOff className="size-5" /> : <EyeIcon className="size-5" />}
              </Button>
            </div>
            {errors.confirmarContraseña && (
              <p className="text-xs font-medium text-[#B91C1C]">{errors.confirmarContraseña.message}</p>
            )}
          </div>
        </div>

        {apiError && !Object.keys(errors).length && (
          <div className="bg-[#FCE8E5] border border-[#F87171] text-[#B91C1C] px-4 py-2 rounded-lg text-xs text-center font-medium">
            {apiError.response?.data?.message || 'Ocurrió un error en el servidor.'}
          </div>
        )}

        {/* Botón Primario: Negro Olivo #0B1001, Texto Crema #FFFBF1, Gap 8px */}
        <Button
          type="submit"
          className="w-full h-14 rounded-lg text-lg font-medium transition-all bg-[#0B1001] hover:bg-[#2F3427] text-[#FFFBF1] flex items-center justify-center gap-2"
          disabled={isPending}
        >
          {isPending ? 'Cargando...' : 'Siguiente'}
          <ArrowRight className="size-5" />
        </Button>
      </form>
    </div>
  )
}

export default RegisterForm;