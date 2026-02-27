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

interface ChangeDecreaseProps {
  open: boolean
  onClose: () => void
  decrease?: string
}

const ChangeDecrease = ({ open, onClose, decrease }: ChangeDecreaseProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
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
        <form className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de merma*</Label>

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar tipo de merma..." />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Litros">Litros</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Merma (Kg/L)*</Label>
            <Input placeholder="0.00" inputMode="decimal" />
            <small>
              Este valor se restará del stock disponible sin modificar la
              producción original
            </small>
          </div>

          <div className="space-y-2">
            <Label>Observaciones</Label>
            <Input placeholder="Anota la información que consideres importante" />
          </div>

          <span className="flex items-center gap-2 text-xs">
            <AlertCircle className="size-5" /> Verifica que los datos sean
            correctos antes de {decrease ? 'actualizar' : 'registrar'} la merma
          </span>

          <Button className="w-full h-14" type="submit">
            {decrease ? 'Actualizar merma' : 'Registrar merma'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default ChangeDecrease
