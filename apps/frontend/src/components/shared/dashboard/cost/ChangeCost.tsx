import { Button } from '@/src/components/common/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
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
import { AlertCircle } from 'lucide-react'

interface ChangeCostProps {
  open: boolean
  onClose: () => void
  cost?: string
}

const ChangeCost = ({ open, onClose, cost }: ChangeCostProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{cost ? 'Editar costo' : 'Registrar costo'}</DialogTitle>
          <DialogDescription>
            {cost
              ? 'Ingresa los nuevos datos para actualizar la costo asociada al lote de produccion'
              : 'Ingresa los datos para asociar el costo a un lote de produccion'}
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de costo*</Label>

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Concepto del costo..." />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Gastos">Gastos</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Costos de producción ($)*</Label>
            <Input placeholder="0" inputMode="numeric" />
          </div>

          <span className="flex items-center gap-2 text-xs">
            <AlertCircle className="size-5" /> Verifica que los datos sean
            correctos antes de {cost ? 'actualizar' : 'registrar'} los costo
          </span>

          <Button className="w-full h-14" type="submit">
            {cost ? 'Actualizar costo' : 'Registrar costo'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default ChangeCost
