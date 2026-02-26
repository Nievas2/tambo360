import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/common/dialog'
import { Button } from '@/src/components/common/Button'
import { Label } from '@/src/components/common/label'
import { Input } from '@/src/components/common/Input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/common/select'
import { AlertCircle, ArrowRight, Grid } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BatchDto, BatchSchema } from '@/src/types/batch'
import { useCreateBatch } from '@/src/hooks/batch/useCreateBatch'
import { useUpdateBatch } from '@/src/hooks/batch/useUpdateBatch'

interface ChangeBatchProps {
  open: boolean
  setOpen: () => void
  batch?: BatchDto
}
const ChangeBatch = ({ open, setOpen, batch }: ChangeBatchProps) => {
  const [finished, setFinished] = useState(false)
  const { mutateAsync } = useCreateBatch()
  const { mutateAsync: mutateAsyncUpdate } = useUpdateBatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      idProducto: batch?.idProducto,
      cantidad: batch?.cantidad,
      fechaProduccion: batch?.fechaProduccion,
    },
    resolver: zodResolver(BatchSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!batch) {
        await mutateAsync(data)
      } else {
        await mutateAsyncUpdate({
          id: batch.id,
          values: data,
        })
      }
    } catch (err) {
      if (batch) {
        console.error('Error al actualizar el lote:', err)
      } else {
        console.error('Error al crear el lote:', err)
      }
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {finished ? (
        <DialogContent className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-[32px] font-bold text-black flex justify-center">
              <img src="/successIcon.svg" alt="success" />
            </DialogTitle>

            <DialogTitle className="text-[32px] font-bold text-black flex justify-center">
              Lote creado correctamente
            </DialogTitle>

            <DialogDescription className="text-center text-[16px]">
              El nuevo lote ha sido registrado exitosamente en <br />
              el sistema. Ahora puedes gestionar su <br />
              seguimiento y produccion.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 space-y-4">
            <Button
              variant="default"
              className="flex items-center justify-center w-full h-14 text-xl font-bold"
              asChild
            >
              <Link to="/dashboard" className="block">
                Ir al detalle del lote
                <ArrowRight className="ml-2 size-6" />
              </Link>
            </Button>

            <Button
              variant="secondary"
              className="flex items-center justify-center w-full h-14 text-xl font-bold"
              onClick={() => setFinished(false)}
            >
              Crear otro lote
            </Button>
          </div>

          <DialogFooter className="flex flex-row justify-center sm:justify-center items-center text-center">
            <Button variant="ghost" onClick={() => setOpen()}>
              <Grid className="size-5" />
              <span className="underline">Volver al dashboard</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader className="border-b p-2">
            <DialogTitle className="text-[32px] font-bold text-black">
              {batch ? 'Editar lote' : 'Crear nuevo lote'}
            </DialogTitle>

            <DialogDescription>
              {batch
                ? 'Ingresa los nuevos datos para actualizar el lote.'
                : 'Ingresa los datos para iniciar el seguimiento de producción.'}
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="space-y-4">
              <Label className="font-bold">Fecha de producción</Label>
              <Input
                type="date"
                placeholder="dd/mm/aaaa"
                {...register('fechaProduccion')}
              />

              {errors.fechaProduccion && (
                <span className="text-xs text-red-600">
                  {errors.fechaProduccion.message}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <Label className="font-bold">Tipo de producción</Label>
              <Select {...register('idProducto')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona producto..." />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="queso-fresco">Queso fresco</SelectItem>
                    <SelectItem value="queso-duro">Queso duro</SelectItem>
                    <SelectItem value="leche-cruda">Leche cruda</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {errors.idProducto && (
                <span className="text-xs text-red-600">
                  {errors.idProducto.message}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <Label className="font-bold">
                Cantidad producida (Kg/Litros)
              </Label>
              <Input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                {...register('cantidad')}
              />

              {errors.cantidad && (
                <span className="text-xs text-red-600">
                  {errors.cantidad.message}
                </span>
              )}
            </div>

            <span className="flex items-center gap-2 text-xs">
              <AlertCircle className="size-5" /> Verifica que los datos sean
              correctos antes de crear el lote.
            </span>
            <DialogFooter>
              <Button
                variant="default"
                className="flex items-center justify-center w-full h-16 text-xl font-bold"
                type="submit"
                onClick={() => setFinished(true)}
              >
                Crear lote
                <ArrowRight className="size-6" />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  )
}
export default ChangeBatch
