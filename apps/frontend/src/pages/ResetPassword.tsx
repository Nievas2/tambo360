import { Card, CardContent } from '@/src/components/common/card'
import { Button } from '@/src/components/common/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/src/components/common/label'
import { Input } from '@/src/components/common/Input'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useResetPassword } from '@/src/hooks/auth/useResetPassword'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

const ResetSchema = z.object({
  contraseña: z.string().min(8, 'Mínimo 8 caracteres'),
  confirmarContraseña: z.string()
}).refine((data) => data.contraseña === data.confirmarContraseña, {
  message: "Las contraseñas no coinciden",
  path: ["confirmarContraseña"],
})

const ResetPassword: React.FC = () => {
  const [showPass, setShowPass] = useState(false)
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { mutateAsync, isPending, error: apiError } = useResetPassword()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetSchema),
  })

  const hasAnyError = Object.keys(errors).length > 0 || !!apiError

  const onSubmit = handleSubmit(async (data) => {
    if (!token) return
    try {
      await mutateAsync({ token, password: data.contraseña })
      navigate('/login')
    } catch (err) {
      console.error('Error al restablecer:', err)
    }
  })

  return (
    // Background: #F2F1EC (Crema de fondo según Handoff)
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F2F1EC] p-4 relative font-inter">
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

      <Card className="w-full max-w-md border-none shadow-sm py-8 bg-white rounded-xl">
        <CardContent className="space-y-8">
          <div className="text-center space-y-2">
            {/* Título: Negro Olivo #0B1001 */}
            <h1 className="text-3xl font-bold text-[#0B1001]">Nueva contraseña</h1>
            <p className="text-sm text-[#626059]">Ingresa tu nueva clave de acceso</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                {/* Labels: Negro Olivo o Rojo Error */}
                <Label className={`font-bold ${errors.contraseña ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}>
                  Nueva contraseña*
                </Label>
                <div className="relative">
                  <Input
                    type={showPass ? 'text' : 'password'}
                    {...register('contraseña')}
                    // Input: Fondo #F9F9F7 y bordes según estado
                    className={`h-14 ${errors.contraseña ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'border-[#D1CFCA] bg-[#F9F9F7]'}`}
                    disabled={isPending}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-auto p-0 text-[#626059] hover:bg-transparent"
                  >
                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
                {errors.contraseña && (
                  <p className="text-xs font-medium text-[#B91C1C]">{errors.contraseña.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className={`font-bold ${errors.confirmarContraseña ? 'text-[#B91C1C]' : 'text-[#0B1001]'}`}>
                  Confirmar nueva contraseña*
                </Label>
                <Input
                  type="password"
                  {...register('confirmarContraseña')}
                  className={`h-14 ${errors.confirmarContraseña ? 'border-[#F87171] bg-[#FCE8E5]/30' : 'border-[#D1CFCA] bg-[#F9F9F7]'}`}
                  disabled={isPending}
                />
                {errors.confirmarContraseña && (
                  <p className="text-xs font-medium text-[#B91C1C]">{errors.confirmarContraseña.message}</p>
                )}
              </div>
            </div>

            {/* Botón Primario: Negro Olivo #0B1001, Texto Crema #FFFBF1, Gap 8px */}
            <Button 
              type="submit" 
              className="w-full h-14 rounded-lg text-lg font-medium bg-[#0B1001] hover:bg-[#2F3427] text-[#FFFBF1] flex items-center justify-center gap-2 transition-all" 
              disabled={isPending || !token}
            >
              {isPending ? 'Guardando...' : 'Restablecer contraseña'} 
              <ArrowRight className="size-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPassword;