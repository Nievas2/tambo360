import { Button } from '@/src/components/common/Button'
import { CardContent } from '@/src/components/common/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/common/dropdown-menu'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/src/components/common/empty'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/common/table'
import { ConfirmDeleteDialog } from '@/src/components/shared/dashboard/batch/DeleteBatch'
import ChangeCost from '@/src/components/shared/dashboard/cost/ChangeCost'
import { useDeleteCost } from '@/src/hooks/cost/useDeleteCost'
import { Batch } from '@/src/types/batch'
import { CONCEPTO_LABELS, Cost } from '@/src/types/cost'
import { Ellipsis, Pencil, Trash } from 'lucide-react'
import { useState } from 'react'

interface CostTableProps {
  batch: Batch
  changeCost: () => void
  disabled: boolean
  isPending: boolean
}
const CostTable = ({
  batch,
  changeCost,
  disabled,
  isPending,
}: CostTableProps) => {
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [cost, setCost] = useState<Cost | undefined>(undefined)
  const [idDelete, setIdDelete] = useState('')
  const { mutateAsync, error } = useDeleteCost({ idBatch: batch.idLote })

  const handleDelete = async (idCost: string) => {
    await mutateAsync(idCost)
    setOpenDelete(false)
  }

  return (
    <CardContent className="p-0">
      {batch.costosDirectos.length === 0 ? (
        <Empty className="w-full gap-4">
          <EmptyHeader>
            <EmptyTitle className="font-bold">
              Sin costos registrados
            </EmptyTitle>
          </EmptyHeader>
          <EmptyContent className="w-full max-w-xl">
            <EmptyDescription className="w-full">
              No se han reportado pérdidas ni ajustes para este lote hasta el
              momento.
            </EmptyDescription>
            <Button onClick={() => changeCost()} disabled={disabled}>
              Registrar costo
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <Table>
          <TableHeader className="bg-tables">
            <TableRow>
              <TableHead className="w-[10%] text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                Fecha
              </TableHead>
              <TableHead className="w-[10%] text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                Tipo
              </TableHead>
              <TableHead className="w-[15%] text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                Cantidad
              </TableHead>
              <TableHead className="w-[55%] text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                Observación
              </TableHead>
              <TableHead className="pr-6 pl-4 w-[10%] text-right font-bold text-gray-400 uppercase text-xs tracking-wider">
                Acción
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending
              ? Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell>
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-16 bg-gray-200 rounded" />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="h-8 w-8 bg-gray-200 rounded mx-auto" />
                    </TableCell>
                  </TableRow>
                ))
              : batch.costosDirectos.length > 0 &&
                batch.costosDirectos.map((cost: Cost) => (
                  <TableRow key={cost.idLote}>
                    <TableCell suppressHydrationWarning>
                      {cost.fechaCreacion
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('/')}
                    </TableCell>
                    <TableCell>
                      {CONCEPTO_LABELS[cost.concepto] || cost.concepto}
                    </TableCell>
                    <TableCell>
                      $ {Number(cost.monto).toLocaleString('es-AR')}
                    </TableCell>
                    <TableCell>
                      {cost.observaciones || 'Sin observaciones'}
                    </TableCell>
                    <TableCell className="text-center mr-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Ellipsis />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                setOpen(true)
                                setCost(cost)
                              }}
                              disabled={isPending}
                            >
                              <Pencil className="size-4" /> Editar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>

                          <DropdownMenuSeparator />

                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onSelect={() => {
                                setIdDelete(cost.idCostoDirecto)
                                setOpenDelete(true)
                              }}
                              disabled={isPending}
                            >
                              <Trash className="size-4" /> Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      )}

      <ConfirmDeleteDialog
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => handleDelete(idDelete)}
        isLoading={isPending}
        title="¿Deseas eliminar este costo?"
        description="Al eliminar este costo, toda su información dejará de estar disponible para consulta y edición."
        buttonText="Eliminar costo"
        error={error?.response?.data?.message}
      />

      <ChangeCost
        open={open}
        onClose={() => setOpen(false)}
        loteId={batch.idLote}
        cost={cost}
      />
    </CardContent>
  )
}
export default CostTable
