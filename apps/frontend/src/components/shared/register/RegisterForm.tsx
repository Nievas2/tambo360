import { ArrowRight, Eye, EyeClosed, EyeIcon } from 'lucide-react'
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
  handleAddEmail: (email: string) => void
}

const RegisterForm = ({
  handleNextStep,
  handleAddEmail,
}: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { mutateAsync, isPending, error } = useRegister()

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data)
      handleAddEmail(data.correo) // aquí se usa el parámetro, pero ESLint no lo ve porque está en la definición del tipo
      handleNextStep()
    } catch (err) {
      console.error('Error al registrarse:', err)
    }
  })

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Nombre */}
        <div className="space-y-2">
          <Label className="font-bold text-[#1a1c1e]">Nombre*</Label>
          <Input
            placeholder="Ingresa tu nombre y apellido"
            {...register('nombre')}
            data-test-id="nombre-registro"
            disabled={isPending}
          />
          {errors.nombre && (
            <small className="text-red-500">{errors.nombre.message}</small>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label className="font-bold text-[#1a1c1e]">Correo electrónico*</Label>
          <Input
            placeholder="Ingresa tu correo electrónico"
            {...register('correo')}
            data-test-id="email-registro"
            disabled={isPending}
          />
          {errors.correo && (
            <small className="text-red-500">{errors.correo.message}</small>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label title="Contraseña" className="font-bold text-[#1a1c1e]">Contraseña*</Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              {...register('contraseña')}
              data-test-id="password-registro"
              disabled={isPending}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              {showPassword ? <EyeClosed className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </Button>
          </div>
          <small><b>Requisitos:</b> 8 caracteres, mayúscula, minúscula y carácter especial.</small>
          {errors.contraseña && (
            <div><small className="text-red-500">{errors.contraseña.message}</small></div>
          )}
        </div>

        {/* Confirmar Password */}
        <div className="space-y-2">
          <Label title="Contraseña" className="font-bold text-[#1a1c1e]">Confirmar contraseña*</Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              {...register('confirmarContraseña')}
              data-test-id="confirm-password"
              disabled={isPending}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              {showConfirmPassword ? <EyeClosed className="size-5" /> : <Eye className="size-5" />}
            </Button>
          </div>
          {errors.confirmarContraseña && (
            <small className="text-red-500">{errors.confirmarContraseña.message}</small>
          )}
          {error && (
            <div className="pt-2">
              <small className="text-red-700">
                {error.response?.data?.message || 'Error al crear la cuenta. Inténtalo de nuevo.'}
              </small>
            </div>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-14 rounded-lg text-lg font-medium transition-all"
        data-test-id="submit-registro"
        disabled={isPending}
      >
        {isPending ? 'Cargando...' : 'Siguiente'}
        <ArrowRight className="ml-2 size-5" />
      </Button>
    </form>
  )
}
export default RegisterForm