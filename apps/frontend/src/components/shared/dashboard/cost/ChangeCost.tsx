import { Button } from '@/src/components/common/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/src/components/common/dialog'
import { Input } from '@/src/components/common/Input'
import { Label } from '@/src/components/common/label'
import { useCreateCost } from '@/src/hooks/cost/useCreateCost'
import { useUpdateCost } from '@/src/hooks/cost/useUpdateCost'
import { Cost, UpdateCostSchema } from '@/src/types/cost'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface ChangeCostProps {
  open: boolean
  onClose: () => void
  cost?: Cost
  loteId?: string
}

const ChangeCost = ({ open, onClose, cost, loteId }: ChangeCostProps) => {
  const { mutateAsync, error, isPending } = useCreateCost()
  const {
    mutateAsync: updateCost,
    error: updateError,
    isPending: isUpdatePending,
  } = useUpdateCost()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      concepto: '',
      monto: '',
    },
    resolver: zodResolver(UpdateCostSchema),
  })

  useEffect(() => {
    if (cost) {
      reset({
        concepto: cost.concepto,
        monto: cost.monto.toString(),
      })
    } else {
      reset({
        concepto: '',
        monto: '',
      })
    }
  }, [cost, reset])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (cost) {
        await updateCost({
          values: data,
          id: cost.idCostoDirecto,
        })
        closeDialog()
      } else {
        await mutateAsync({
          values: data,
          id: loteId!,
        })
        closeDialog()
      }
    } catch (error) {
      console.error(error)
    }
  })

  function closeDialog() {
    onClose()
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{cost ? 'Editar costo' : 'Registrar costo'}</DialogTitle>
          <DialogDescription>
            {cost
              ? 'Ingresa los nuevos datos para actualizar la costo asociada al lote de produccion'
              : 'Ingresa los datos para asociar el costo a un lote de produccion'}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Concepto del costo*</Label>

            <Input
              placeholder="transporte refrigerado"
              {...register('concepto')}
              disabled={isPending || isUpdatePending}
            />

            {errors.concepto && (
              <span className="text-xs text-red-600">
                {errors.concepto.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label>Costos de producción ($)*</Label>
            <Input
              placeholder="0"
              inputMode="numeric"
              {...register('monto')}
              disabled={isPending || isUpdatePending}
            />

            {errors.monto && (
              <span className="text-xs text-red-600">
                {errors.monto.message}
              </span>
            )}

            {error && (
              <span className="text-xs text-red-600">
                {error.response.data.message}
              </span>
            )}

            {updateError && (
              <span className="text-xs text-red-600">
                {updateError.response.data.message}
              </span>
            )}
          </div>

          <span className="flex items-center gap-2 text-xs">
            <AlertCircle className="size-5 text-red-600" /> Verifica que los
            datos sean correctos antes de {cost ? 'actualizar' : 'registrar'}{' '}
            los costo
          </span>

          <Button
            className="w-full h-14"
            type="submit"
            disabled={isPending || isUpdatePending}
          >
            {cost ? 'Actualizar costo' : 'Registrar costo'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default ChangeCost
