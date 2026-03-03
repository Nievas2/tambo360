import { useState } from 'react'
import { Trash } from 'lucide-react'
import { DropdownMenuItem } from '@/src/components/common/dropdown-menu'
import { useDeleteBatch } from '@/src/hooks/batch/useDeleteBatch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/common/dialog'
import { Button } from '@/src/components/common/Button'
import { Batch } from '@/src/types/batch'

interface DeleteBatchProps {
  batch: Batch
  onSuccess?: () => void
}

const DeleteBatch = ({ batch, onSuccess }: DeleteBatchProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const { mutateAsync, isPending } = useDeleteBatch()

  const handleDelete = async () => {
    try {
      await mutateAsync({ id: batch.idLote })
      setShowDialog(false)
      onSuccess?.()
    } catch (error) {
      console.error('Error al eliminar:', error)
    }
  }

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault()
          setShowDialog(true)
        }}
        disabled={
          isPending ||
          batch.costosDirectos.length > 0 ||
          batch.mermas.length > 0
        }
      >
        <Trash className="h-4 w-4" />
        Eliminar
      </DropdownMenuItem>

      <ConfirmDeleteDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleDelete}
        isLoading={isPending}
        title="¿Deseas eliminar este lote?"
        description="Al eliminar este lote, toda su información dejará de estar disponible para consulta y edición. Los registros de costos y producción asociados se ocultarán del panel principal."
      />
    </>
  )
}

export default DeleteBatch

interface ConfirmDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
  title: string
  description: string
}

const ConfirmDeleteDialog = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title,
  description,
}: ConfirmDeleteDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-10 flex flex-col items-center text-center">
        <img src="/alertIcon.svg" className="size-36" />

        <DialogHeader>
          <DialogTitle className="text-[32px] font-bold leading-tight mb-4">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-base text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col w-full gap-3 mt-8">
          <Button
            variant="default"
            className="h-14 text-lg font-bold bg-black hover:bg-zinc-800"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Eliminando...' : 'Eliminar lote'}
          </Button>
          <Button
            variant="outline"
            className="h-14 text-lg font-bold border-gray-300"
            onClick={onClose}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
