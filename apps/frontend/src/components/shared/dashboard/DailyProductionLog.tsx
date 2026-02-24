import { Button } from '@/src/components/common/Button'
import { Card, CardContent, CardHeader } from '@/src/components/common/card'
import { AlertCircle, ArrowRight, Grid, Plus } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/common/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/common/dialog'
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
import { useState } from 'react'
import { Link } from 'react-router-dom'

const DailyProductionLog = () => {
  const [open, setOpen] = useState(false)
  const [finished, setFinished] = useState(false)
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Producción de hoy</h2>
          <p className="text-xs">Lunes 16 de febrero, 2026</p>
        </div>

        <div className="flex justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Crear lote
                <Plus className="ml-2 size-4" />
              </Button>
            </DialogTrigger>
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
                  <Button variant="ghost" onClick={() => setOpen(false)}>
                    <Grid className="size-5" />
                    <span className="underline">Volver al dashboard</span>
                  </Button>
                </DialogFooter>
              </DialogContent>
            ) : (
              <DialogContent>
                <DialogHeader className="border-b p-2">
                  <DialogTitle className="text-[32px] font-bold text-black">
                    Crear nuevo lote
                  </DialogTitle>

                  <DialogDescription>
                    Ingresa los datos para iniciar el seguimiento de producción.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-6">
                  <div className="space-y-4">
                    <Label className="font-bold">Fecha de producción</Label>
                    <Input type="date" placeholder="dd/mm/aaaa" />
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold">Tipo de producción</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona producto..." />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="queso-fresco">
                            Queso fresco
                          </SelectItem>
                          <SelectItem value="queso-duro">Queso duro</SelectItem>
                          <SelectItem value="leche-cruda">
                            Leche cruda
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold">
                      Cantidad producida (Kg/Litros)
                    </Label>
                    <Input type="text" inputMode="decimal" placeholder="0.00" />
                  </div>

                  <span className="flex items-center gap-2 text-xs">
                    <AlertCircle className="size-5" /> Verifica que los datos
                    sean correctos antes de crear el lote.
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
        </div>
      </CardHeader>
      <CardContent>
        <Table className="rounded-md border">
          <TableHeader>
            <TableRow className="border-none">
              <TableHead className="w-18 text-sm font-light text-[#707070]">
                Lote
              </TableHead>
              <TableHead className="w-18 text-sm font-light text-[#707070]">
                Hora
              </TableHead>
              <TableHead className="w-60 text-sm font-light text-[#707070]">
                Producto
              </TableHead>
              <TableHead className="text-sm font-light text-[#707070]">
                Cantidad
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-none">
              <TableCell>L-003</TableCell>
              <TableCell>14:30</TableCell>
              <TableCell>Queso fresco</TableCell>
              <TableCell>125kg</TableCell>
            </TableRow>

            <TableRow className="border-none rounded-md bg-[#F1f1f1]">
              <TableCell>L-002</TableCell>
              <TableCell>10:15</TableCell>
              <TableCell>Leche cruda</TableCell>
              <TableCell>850L</TableCell>
            </TableRow>

            <TableRow className="border-none">
              <TableCell>L-001</TableCell>
              <TableCell>08:45</TableCell>
              <TableCell>Queso duro</TableCell>
              <TableCell>180kg</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
export default DailyProductionLog
