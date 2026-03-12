import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/src/components/common/dialog'
import { Button } from '@/src/components/common/Button'
import ErrorIcon from '@/src/components/shared/ErrorIcon'

interface ConnectionErrorModalProps {
  open: boolean
  onRetry: () => void
  onCancel: () => void
  message?: string
}

export const ConnectionErrorModal = ({
  open,
  onRetry,
  onCancel,
  message = 'Hubo un error inesperado al intentar registrar los datos. Por favor, intentar guardar nuevamente en unos momentos',
}: ConnectionErrorModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-sm text-center space-y-6 py-8">
        <DialogTitle className="flex justify-center">
          <ErrorIcon />
        </DialogTitle>

        <div className="space-y-2 px-2">
          <h2 className="text-xl font-bold text-slate-900">
            No pudimos guardar los cambios
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">{message}</p>
        </div>

        <div className="flex flex-col gap-3 px-2">
          <Button className="w-full h-12 font-semibold" onClick={onRetry}>
            Intentar de nuevo
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 font-semibold"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
