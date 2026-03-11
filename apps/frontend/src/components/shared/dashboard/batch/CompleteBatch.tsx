import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/common/dialog'
import { Button } from '@/src/components/common/Button'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useCompleteBatch } from '@/src/hooks/batch/useCompleteBatch'
import { Link } from 'react-router-dom'
import ChangeBatch from '@/src/components/shared/dashboard/batch/ChangeBatch'

interface CompleteBatchProps {
  open: boolean
  onClose: () => void
  batchId: string
  refetch: () => void
}

const CompleteBatch = ({
  open,
  onClose,
  batchId,
  refetch,
}: CompleteBatchProps) => {
  const [finished, setFinished] = useState(false)
  const [openAddBatch, setOpenAddBatch] = useState(false)
  const { mutateAsync, isPending, error } = useCompleteBatch()

  const handleComplete = async () => {
    try {
      await mutateAsync(batchId)
      refetch()
      setFinished(true)
    } catch (err) {
      console.error('Error al completar el lote:', err)
    }
  }

  const handleCloseAll = () => {
    setFinished(false)
    onClose()
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleCloseAll}>
        {finished ? (
          <DialogContent className="p-10 flex flex-col items-center text-center space-y-6">
            <DialogHeader className="items-center">
              <img src="/successIcon.svg" alt="Terminado" />
              <DialogTitle className="text-[32px] font-bold text-black">
                Lote completo
              </DialogTitle>
              <DialogDescription className="text-base font-medium text-center">
                El nuevo lote ha sido completado exitosamente. No se podrá
                editar la información ni registrar nuevas mamas o costos
                asociados
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col w-full space-y-2">
              <Button className="h-14 text-xl font-bold" asChild>
                <Link to="/dashboard">
                  Volver al dashboard <ArrowRight />
                </Link>
              </Button>

              <Button
                className="h-14 text-xl font-bold"
                variant="secondary"
                onClick={() => {
                  setOpenAddBatch(true)
                  handleCloseAll()
                }}
              >
                Crear otro lote
              </Button>
            </div>
          </DialogContent>
        ) : (
          <DialogContent className="p-10 flex flex-col items-center text-center">
            <img src="/alertIcon.svg" alt="Completar lote" />

            <DialogHeader className="items-center">
              <DialogTitle className="text-[32px] font-bold leading-tight">
                ¿Completar lote?
              </DialogTitle>
              <DialogDescription className="text-center text-base text-gray-600 mt-2">
                Una vez completado, el lote se cerrará permanentemente. No
                podrás editar la información ni registrar nuevas mamas o costos
                asociados.
              </DialogDescription>
            </DialogHeader>

            {error && (
              <p className="text-sm text-red-600 font-medium">
                {error.response?.data?.message ||
                  'Algo salió mal al completar el lote'}
              </p>
            )}

            <div className="flex flex-col w-full gap-3 mt-8">
              <Button
                className="h-14 text-xl font-bold flex items-center justify-center gap-2"
                onClick={handleComplete}
                disabled={isPending}
              >
                {isPending ? 'Procesando...' : 'Si, completar lote'}
              </Button>

              <Button
                variant="outline"
                className="h-14 text-xl font-bold border-gray-300"
                onClick={handleCloseAll}
                disabled={isPending}
              >
                Cancelar
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <ChangeBatch
        open={openAddBatch}
        onClose={() => setOpenAddBatch(false)}
        onOpen={() => setOpenAddBatch(true)}
      />
    </>
  )
}

export default CompleteBatch
