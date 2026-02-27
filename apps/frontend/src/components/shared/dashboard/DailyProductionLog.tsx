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
import { useBatches } from '@/src/hooks/batch/useBatches'

const DailyProductionLog = () => {
  const [open, setOpen] = useState(false)
  const { data } = useBatches()
  console.log(data)

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Producción de hoy</h2>
          <p className="text-xs">Lunes 16 de febrero, 2026</p>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            Crear lote
            <Plus className="ml-2 size-4" />
          </Button>
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
      <ChangeBatch open={open} setOpen={() => setOpen(false)} />
    </Card>
  )
}
export default DailyProductionLog
