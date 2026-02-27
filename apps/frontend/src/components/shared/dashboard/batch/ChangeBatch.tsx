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
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BatchDto, BatchSchema } from '@/src/types/batch'
import { useCreateBatch } from '@/src/hooks/batch/useCreateBatch'
import { useUpdateBatch } from '@/src/hooks/batch/useUpdateBatch'
import { useProducts } from '@/src/hooks/product/useProducts'

interface ChangeBatchProps {
  open: boolean
  setOpen: () => void
  batch?: BatchDto
}
const ChangeBatch = ({ open, setOpen, batch }: ChangeBatchProps) => {
  const [id, setId] = useState('')
  const [finished, setFinished] = useState(false)
  const { mutateAsync, error } = useCreateBatch()
  const { mutateAsync: mutateAsyncUpdate, error: errorUpdate } =
    useUpdateBatch()
  const { data } = useProducts()
  console.log(batch)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      idProducto: '',
      cantidad: '',
      fechaProduccion: '',
    },
    resolver: zodResolver(BatchSchema),
  })

  // Reset form when `batch` changes (populate inputs)
  useEffect(() => {
    if (batch) {
      const fecha =
        batch.fechaProduccion && !isNaN(Date.parse(batch.fechaProduccion))
          ? new Date(batch.fechaProduccion).toISOString().slice(0, 10) // yyyy-mm-dd for <input type="date">
          : ''
      reset({
        idProducto: batch.idProducto ?? '',
        cantidad: (batch.cantidad ?? '').toString(),
        fechaProduccion: fecha,
      })
    } else {
      reset({
        idProducto: '',
        cantidad: '',
        fechaProduccion: '',
      })
    }
  }, [batch, reset])
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!batch) {
        const date = new Date(data.fechaProduccion)
        const fechaProduccion = date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })

        const values = {
          ...data,
          fechaProduccion,
        }
        const response = await mutateAsync(values)
        setId(response.idLote)
        setFinished(true)
      } else {
        const date = new Date(data.fechaProduccion)
        const fechaProduccion = date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })

        const values = {
          ...data,
          fechaProduccion,
        }
        await mutateAsyncUpdate({
          id: batch.id,
          values: values,
        })
        setId(batch.id)
        setFinished(true)
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

            <DialogTitle className="text-[32px] font-bold text-black flex justify-center text-center">
              {batch
                ? 'Lote actualizado correctamente'
                : 'Lote creado correctamente'}
            </DialogTitle>

            {batch ? (
              <DialogDescription className="text-center text-[16px]">
                El lote ha sido actualizado exitosamente en <br />
                el sistema. Ahora puedes gestionar su <br />
                seguimiento y produccion.
              </DialogDescription>
            ) : (
              <DialogDescription className="text-center text-[16px]">
                El nuevo lote ha sido registrado exitosamente en <br />
                el sistema. Ahora puedes gestionar su <br />
                seguimiento y produccion.
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="p-4 space-y-4">
            <Button
              variant="default"
              className="flex items-center justify-center w-full h-14 text-xl font-bold"
              asChild
            >
              <Link to={`/produccion/lote/${id}`} className="block">
                Ir al detalle del lote
                <ArrowRight className="ml-2 size-6" />
              </Link>
            </Button>

            {!batch && (
              <Button
                variant="secondary"
                className="flex items-center justify-center w-full h-14 text-xl font-bold"
                onClick={() => {
                  setFinished(false)
                  reset()
                }}
              >
                Crear otro lote
              </Button>
            )}
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
              <Select
                defaultValue={batch.idProducto}
                onValueChange={(e) => setValue('idProducto', e)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona producto..." />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {data?.data.map((product) => (
                      <SelectItem
                        key={product.idProducto}
                        value={product.idProducto}
                      >
                        {product.nombre}
                      </SelectItem>
                    ))}
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

              {error && (
                <span className="text-xs text-red-600">
                  {error.message || 'Algo salió mal al crear el lote'}
                </span>
              )}

              {errorUpdate && (
                <span className="text-xs text-red-600">
                  {errorUpdate.message || 'Algo salió mal al editar el lote'}
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
              >
                {batch ? 'Actualizar lote' : 'Crear lote'}
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
