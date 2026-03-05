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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/common/select'
import { useCreateDecrease } from '@/src/hooks/decrease/useCreateDecrease'
import { useUpdateDecrease } from '@/src/hooks/decrease/useUpdateDecrease'
import { Decrease, DecreaseSchema, TipoMerma } from '@/src/types/decrease'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface ChangeDecreaseProps {
  open: boolean
  onClose: () => void
  idBatch: string
  decrease?: Decrease
}

const ChangeDecrease = ({
  open,
  onClose,
  decrease,
  idBatch,
}: ChangeDecreaseProps) => {
  const { mutateAsync: create, isPending, error } = useCreateDecrease()
  const {
    mutateAsync: update,
    isPending: isPendingUpdate,
    error: updateError,
  } = useUpdateDecrease({ idLote: idBatch })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      cantidad: '',
      observacion: '',
      tipo: TipoMerma.Natural,
    },

    resolver: zodResolver(DecreaseSchema),
  })

  useEffect(() => {
    if (decrease) {
      reset({
        cantidad: decrease.cantidad,
        observacion: decrease.observacion,
        tipo: decrease.tipo,
      })
    } else {
      reset({
        cantidad: '',
        observacion: '',
        tipo: TipoMerma.Natural,
      })
    }
  }, [decrease, reset])

  const onSubmit = handleSubmit(async (data) => {
    if (decrease) {
      await update({ id: decrease.idMerma, values: data })
    } else {
      await create({ ...data, idLote: idBatch })
    }
    onClose()
  })

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose()
        reset()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {decrease ? 'Editar merma' : 'Registrar merma'}
          </DialogTitle>
          <DialogDescription>
            {decrease
              ? 'Ingresa los nuevos datos para actualizar la merma asociada al lote de produccion'
              : 'Ingresa los datos para asociar la merma a un lote de produccion'}
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Tipo de merma*</Label>

            <Controller
              name="tipo"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending || isPendingUpdate}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar tipo de merma..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Natural">Natural</SelectItem>
                      <SelectItem value="Tecnica">Tecnica</SelectItem>
                      <SelectItem value="Administrativa">
                        Administrativa
                      </SelectItem>
                      <SelectItem value="Danio">Daño</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.tipo && (
              <span className="flex items-center gap-2 text-xs text-red-500">
                {errors.tipo.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label>Merma (Kg/L)*</Label>
            <Input
              placeholder="0.00"
              inputMode="decimal"
              {...register('cantidad')}
              disabled={isPending || isPendingUpdate}
            />

            {errors.cantidad && (
              <span className="flex items-center gap-2 text-xs text-red-500">
                {errors.cantidad.message}
              </span>
            )}

            <small>
              Este valor se restará del stock disponible sin modificar la
              producción original
            </small>
          </div>

          <div className="space-y-2">
            <Label>Observaciones</Label>
            <Input
              placeholder="Anota la información que consideres importante"
              {...register('observacion')}
              disabled={isPending || isPendingUpdate}
            />

            {errors.observacion && (
              <span className="flex items-center gap-2 text-xs text-red-500">
                {errors.observacion.message}
              </span>
            )}

            {error && (
              <span className="flex items-center gap-2 text-xs text-red-500">
                {error.response.data.message}
              </span>
            )}

            {updateError && (
              <span className="flex items-center gap-2 text-xs text-red-500">
                {updateError.response.data.message}
              </span>
            )}
          </div>

          <span className="flex items-center gap-2 text-xs">
            <AlertCircle className="size-5" /> Verifica que los datos sean
            correctos antes de {decrease ? 'actualizar' : 'registrar'} la merma
          </span>

          <Button
            className="w-full h-14"
            type="submit"
            disabled={isPending || isPendingUpdate}
          >
            {decrease ? 'Actualizar merma' : 'Registrar merma'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default ChangeDecrease
