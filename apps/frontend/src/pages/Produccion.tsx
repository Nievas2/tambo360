import React, { useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  Milk,
  Eye,
  DropletOff,
  BanknoteArrowUp,
  Trash,
  Ellipsis,
  Files,
  Pencil,
} from 'lucide-react'
import { Button } from '@/src/components/common/Button'
import { Input } from '@/src/components/common/Input'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/src/components/common/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/src/components/common/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/common/dropdown-menu'
import { Link } from 'react-router-dom'
import ChangeDecrease from '@/src/components/shared/dashboard/decrease/ChangeDecrease'
import ChangeCost from '@/src/components/shared/dashboard/cost/ChangeCost'
import ChangeBatch from '@/src/components/shared/dashboard/batch/ChangeBatch'
import { Badge } from '@/src/components/common/badge'
import { Batch } from '@/src/types/batch'
import { useBatches } from '@/src/hooks/batch/useBatches'

const Produccion: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isChangeDecreaseOpen, setIsChangeDecreaseOpen] = useState(false)
  const [isChangeCostOpen, setIsChangeCostOpen] = useState(false)
  const [isChangeBatchOpen, setIsChangeBatchOpen] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null)
  const { data, isPending } = useBatches()

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Lotes de producción
          </h1>
        </div>
        <Button
          className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-6 rounded-xl transition-all shadow-sm"
          onClick={() => setIsChangeBatchOpen(true)}
        >
          Registrar lote <Plus className="w-5 h-5" />
        </Button>
      </div>

      <Card className="border-gray-200 shadow-sm overflow-hidden rounded-2xl bg-white gap-0">
        <CardHeader className="border-b border-gray-100 bg-white p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-3">
              <CardTitle className="text-lg font-bold">
                Listado de lotes
              </CardTitle>
              <CardDescription>Febrero 2026</CardDescription>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                <Input
                  className="pl-10 w-full md:w-60 bg-gray-50 border-gray-200 rounded-lg"
                  placeholder="Buscar lote..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="border-gray-200 bg-gray-50 rounded-lg"
              >
                <Filter className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#EAEAEA]">
              <TableRow>
                <TableHead className="pr-4  min-w-20 text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Lote
                </TableHead>
                <TableHead className="w-24 text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Fecha
                </TableHead>
                <TableHead className="w-[25%] min-w-55 text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Producto
                </TableHead>
                <TableHead className="w-36 text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Cantidad
                </TableHead>
                <TableHead className="w-28 text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Merma
                </TableHead>
                <TableHead className="w-28 text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Estado
                </TableHead>
                <TableHead className=" w-28 text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Costo
                </TableHead>
                <TableHead className="pr-6 pl-4  w-32 text-right font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Acción
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell>
                      <div className="h-4 w-10 bg-gray-200 rounded" />
                    </TableCell>
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
                      <div className="h-4 w-12 bg-gray-200 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-6 w-20 bg-gray-200 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-16 bg-gray-200 rounded" />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="h-8 w-8 bg-gray-200 rounded mx-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : data?.data.length > 0 ? (
                data?.data?.map((batch: Batch, index: number) => (
                  <TableRow key={batch.idLote}>
                    <TableCell>#{String(index + 1).padStart(3, '0')}</TableCell>
                    {/* avoid hydration mismatch: format date on the client or suppress warning */}
                    <TableCell suppressHydrationWarning>
                      {batch.fechaProduccion
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('/')}
                    </TableCell>
                    <TableCell>{batch.producto.nombre}</TableCell>
                    <TableCell>
                      {batch.cantidad} {batch.unidad}
                    </TableCell>
                    {/* calcula todas las mermas y las suma */}
                    <TableCell>
                      <TableCell>
                        {batch.mermas?.reduce((total, m) => {
                          const qty =
                            typeof m.cantidad === 'string'
                              ? parseFloat(m.cantidad)
                              : (m.cantidad ?? 0)
                          return total + qty
                        }, 0)}
                      </TableCell>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {batch.estado ? 'Completo' : 'Incompleto'}
                      </Badge>
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
                    <TableCell className="text-center mr-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Ellipsis />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <Link
                                to={`/produccion/lote/${batch.idLote}`}
                                className="flex items-center gap-2"
                              >
                                <Eye /> Ver Detalles
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedBatch(batch)
                                setIsChangeBatchOpen(true)
                              }}
                            >
                              <Pencil /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setIsChangeDecreaseOpen(true)}
                            >
                              <DropletOff /> Registrar merma
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setIsChangeCostOpen(true)}
                            >
                              <BanknoteArrowUp /> Registrar costo
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled={true}>
                              <Files /> Duplicar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>

                          <DropdownMenuSeparator />

                          <DropdownMenuGroup>
                            <DropdownMenuItem disabled={true}>
                              <Trash /> Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <div className="flex flex-col lg:flex-row items-center justify-center py-16 px-6 gap-12 bg-white">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-3xl p-12 text-center max-w-md w-full">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                      <Milk className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Tu listado de producción está vacío
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Comienza registrando tu primer lote para ver aquí el
                      detalle de tu producción láctea.
                    </p>
                  </div>
                </div>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modales para registrar merma, costo y lote */}
      <ChangeBatch
        open={isChangeBatchOpen}
        setOpen={() => {
          setIsChangeBatchOpen(false)
          setSelectedBatch(null)
        }}
        batch={
          selectedBatch
            ? {
                id: selectedBatch.idLote,
                idProducto: selectedBatch.idProducto,
                cantidad:
                  typeof selectedBatch.cantidad === 'string'
                    ? parseFloat(selectedBatch.cantidad)
                    : Number(selectedBatch.cantidad ?? 0),
                fechaProduccion: selectedBatch.fechaProduccion,
              }
            : undefined
        }
      />

      <ChangeDecrease
        open={isChangeDecreaseOpen}
        onClose={() => setIsChangeDecreaseOpen(false)}
      />

      <ChangeCost
        open={isChangeCostOpen}
        onClose={() => setIsChangeCostOpen(false)}
      />
    </div>
  )
}

export default Produccion
