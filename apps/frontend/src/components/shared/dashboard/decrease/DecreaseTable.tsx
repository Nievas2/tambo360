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
import ChangeDecrease from '@/src/components/shared/dashboard/decrease/ChangeDecrease'
import { useDeleteDecrease } from '@/src/hooks/decrease/useDeleteDecrease'
import { Batch } from '@/src/types/batch'
import { Decrease } from '@/src/types/decrease'
import { Ellipsis, Pencil, Trash } from 'lucide-react'
import { useState } from 'react'

interface DecreaseTableProps {
  batch: Batch
  isPending: boolean
}
const DecreaseTable = ({ batch, isPending }: DecreaseTableProps) => {
  const [open, setOpen] = useState(false)
  const [decrease, setDecrease] = useState<Decrease>()
  const [idDelete, setIdDelete] = useState('')
  const [openDelete, setOpenDelete] = useState(false)
  const { mutateAsync, error } = useDeleteDecrease({ idLote: batch.idLote })

  const handleDelete = async (id: string) => {
    await mutateAsync(id)
    setOpenDelete(false)
  }

  return (
    <CardContent className="p-0">
      {batch.mermas.length === 0 ? (
        <Empty className="w-full gap-4">
          <EmptyHeader>
            <EmptyTitle className="font-bold">
              Sin mermas registradas
            </EmptyTitle>
          </EmptyHeader>
          <EmptyContent className="w-full max-w-xl">
            <EmptyDescription className="w-full">
              No se han reportado pérdidas ni ajustes para este lote hasta el
              momento.
            </EmptyDescription>
            <Button onClick={() => setOpen(true)} disabled={batch?.estado}>
              Registrar Merma
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
                    <TableCell>
                      <div className="h-4 w-16 bg-gray-200 rounded" />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="h-8 w-8 bg-gray-200 rounded mx-auto" />
                    </TableCell>
                  </TableRow>
                ))
              : batch.mermas.length > 0 &&
                batch.mermas.map((decrease: Decrease) => (
                  <TableRow key={decrease.idLote}>
                    <TableCell suppressHydrationWarning>
                      {decrease.fechaCreacion
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('/')}
                    </TableCell>
                    <TableCell>{decrease.tipo}</TableCell>
                    <TableCell>
                      {Number(decrease.cantidad).toLocaleString('es-AR')}{' '}
                      {batch.unidad}
                    </TableCell>
                    <TableCell className="max-w-64 wrap-break-word whitespace-normal">
                      {decrease.observacion ? decrease.observacion : '-'}
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
                                setDecrease(decrease)
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
                                setIdDelete(decrease.idMerma)
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

      <ChangeDecrease
        open={open}
        onClose={() => setOpen(false)}
        idBatch={batch.idLote}
        decrease={decrease}
      />

      <ConfirmDeleteDialog
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => handleDelete(idDelete)}
        isLoading={isPending}
        title="¿Deseas eliminar esta merma?"
        description="Al eliminar esta merma, toda su información dejará de estar disponible para consulta y edición."
        buttonText="Eliminar merma"
        error={error?.response?.data?.message}
      />
    </CardContent>
  )
}
export default DecreaseTable
