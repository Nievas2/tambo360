import { Button } from '@/src/components/common/Button'
import { Card, CardContent, CardHeader } from '@/src/components/common/card'
import { Plus } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/common/table'
import { useState } from 'react'
import ChangeBatch from '@/src/components/shared/dashboard/batch/ChangeBatch'
import { Batch } from '@/src/types/batch'
import { useBatchesDay } from '@/src/hooks/batch/useBatchesDay'

const DailyProductionLog = () => {
  const [open, setOpen] = useState(false)
  const { data, error } = useBatchesDay()
  console.log(data)

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Producción de hoy</h2>
          <p className="text-xs">
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            Crear lote
            <Plus className="ml-2 size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {data?.data?.length > 0 && (
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
                <TableHead className="text-sm font-light text-[#707070]">
                  Merma
                </TableHead>
                <TableHead className="text-sm font-light text-[#707070]">
                  Costo total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.length > 0 &&
                data?.data?.map((batch: Batch) => (
                  <TableRow key={batch.idLote}>
                    <TableCell>
                      #{String(batch.numeroLote).padStart(3, '0')}
                    </TableCell>

                    <TableCell suppressHydrationWarning>
                      {batch.fechaProduccion.split('T')[1].slice(0, 5)}
                    </TableCell>
                    <TableCell>{batch.producto.nombre}</TableCell>
                    <TableCell>
                      {batch.cantidad} {batch.unidad}
                    </TableCell>
                    {/* calcula todas las mermas y las suma */}
                    <TableCell>
                      {batch.mermas?.reduce((total, m) => {
                        const qty =
                          typeof m.cantidad === 'string'
                            ? parseFloat(m.cantidad)
                            : (m.cantidad ?? 0)
                        return total + qty
                      }, 0)}
                    </TableCell>
                    <TableCell>
                      {(batch.costosDirectos.length > 0 &&
                        batch.costosDirectos[0].moneda) ||
                        '$'}{' '}
                      {batch.costosDirectos?.reduce((total, m) => {
                        const qty =
                          typeof m.monto === 'string'
                            ? parseFloat(m.monto)
                            : (m.monto ?? 0)
                        return total + qty
                      }, 0)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}

        {(data?.data?.length === 0 || error) && (
          <div className="w-full h-36 flex justify-center items-center border border-dashed">
            <p className="text-center">Aún no hay producción registrada hoy</p>
          </div>
        )}
      </CardContent>

      <ChangeBatch open={open} setOpen={() => setOpen(false)} />
    </Card>
  )
}
export default DailyProductionLog
