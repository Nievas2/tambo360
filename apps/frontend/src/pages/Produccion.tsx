import React, { useState } from 'react'
import {
  Plus,
  Search,
  Milk,
  Eye,
  DropletOff,
  BanknoteArrowUp,
  Ellipsis,
  Pencil,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  X,
  CloudOff,
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
import DeleteBatch from '@/src/components/shared/dashboard/batch/DeleteBatch'
import { useDebounce } from 'use-debounce'

const Produccion: React.FC = () => {
  const [isChangeDecreaseOpen, setIsChangeDecreaseOpen] = useState(false)
  const [isChangeCostOpen, setIsChangeCostOpen] = useState(false)
  const [isChangeBatchOpen, setIsChangeBatchOpen] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null)
  const [loteId, setLoteId] = useState('')

  const [nombre, setNombre] = useState('')
  const [orden, setOrden] = useState<'asc' | 'desc'>('asc')
  const [pagina, setPagina] = useState(1)

  const [nameDebounced] = useDebounce(nombre, 300)

  const { data, isPending, error } = useBatches({
    filters: {
      nombre: nameDebounced || undefined,
      orden,
      pagina: String(pagina),
    },
  })

  const totalPaginas: number = data?.data?.totalPaginas ?? 1

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value)
    setPagina(1)
  }

  const toggleOrden = () => {
    setOrden((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    setPagina(1)
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Lotes de producción
          </h1>
        </div>
        <Button
          className="flex items-center gap-2 h-12 w-40"
          onClick={() => setIsChangeBatchOpen(true)}
        >
          Registrar lote <Plus className="w-5 h-5" />
        </Button>
      </div>

      <Card className="border-gray-200 shadow-sm overflow-hidden rounded-2xl bg-white gap-0 py-0">
        <CardHeader className="border-b border-gray-100 bg-white p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-3">
              <CardTitle className="text-lg font-bold">
                Listado de lotes
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('es-ES', {
                  month: 'long',
                  year: 'numeric',
                })}
              </CardDescription>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                <Input
                  className="pl-10 w-full md:w-60 bg-gray-50 border-gray-200 rounded-lg"
                  placeholder="Buscar lote..."
                  value={nombre}
                  onChange={handleNombreChange}
                />
                {nombre && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 group-focus-within:text-black transition-colors"
                    onClick={() => setNombre('')}
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="border-gray-200 bg-gray-50 rounded-lg"
                onClick={toggleOrden}
                title={
                  orden === 'asc' ? 'Orden ascendente' : 'Orden descendente'
                }
              >
                {orden === 'asc' ? (
                  <ArrowUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-gray-600" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-tables">
              <TableRow>
                <TableHead className="w-[8%] text-center font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Lote
                </TableHead>
                <TableHead className="w-[10%] text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Fecha
                </TableHead>
                <TableHead className="w-[35%] min-w-40 text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Producto
                </TableHead>
                <TableHead className="w-[13%] text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Cantidad
                </TableHead>
                <TableHead className="w-[10%] text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Merma
                </TableHead>
                <TableHead className="w-[10%] text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Estado
                </TableHead>
                <TableHead className="w-[9%] text-left font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Costo
                </TableHead>
                <TableHead className="w-[5%] pr-6 pl-4 text-right font-bold text-gray-400 uppercase text-xs tracking-wider">
                  Acción
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending
                ? Array.from({ length: 6 }).map((_, i) => (
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
                : data?.data.lotes.length > 0 &&
                  !error &&
                  data?.data?.lotes.map((batch: Batch) => (
                    <TableRow key={batch.idLote}>
                      <TableCell className="text-center">
                        #{String(batch.numeroLote).padStart(3, '0')}
                      </TableCell>
                      <TableCell suppressHydrationWarning>
                        {batch.fechaProduccion
                          .slice(0, 10)
                          .split('-')
                          .reverse()
                          .join('/')}
                      </TableCell>
                      <TableCell>{batch.producto.nombre}</TableCell>
                      <TableCell className="truncate">
                        {Number(batch.cantidad).toLocaleString('es-AR')}{' '}
                        {batch.unidad}
                      </TableCell>
                      <TableCell className="truncate">
                        {batch.mermas
                          ?.reduce((total, m) => {
                            const qty =
                              typeof m.cantidad === 'string'
                                ? parseFloat(m.cantidad)
                                : (m.cantidad ?? 0)
                            return total + qty
                          }, 0)
                          .toLocaleString('es-AR') +
                          ' ' +
                          batch.unidad}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="font-bold"
                          variant={batch.estado ? 'success' : 'destructive'}
                        >
                          {batch.estado ? 'Completo' : 'Incompleto'}
                        </Badge>
                      </TableCell>
                      <TableCell className="truncate">
                        {(batch.costosDirectos.length > 0 &&
                          batch.costosDirectos[0].moneda) ||
                          '$'}{' '}
                        {batch.costosDirectos
                          ?.reduce((total, m) => {
                            const qty =
                              typeof m.monto === 'string'
                                ? parseFloat(m.monto)
                                : (m.monto ?? 0)
                            return total + qty
                          }, 0)
                          .toLocaleString('es-AR')}
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
                                disabled={
                                  batch.costosDirectos.length > 0 ||
                                  batch.mermas.length > 0 ||
                                  batch.estado
                                }
                              >
                                <Pencil /> Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedBatch(batch)
                                  setIsChangeDecreaseOpen(true)
                                }}
                                disabled={batch.estado}
                              >
                                <DropletOff /> Registrar merma
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setLoteId(batch.idLote)
                                  setIsChangeCostOpen(true)
                                }}
                                disabled={batch.estado}
                              >
                                <BanknoteArrowUp /> Registrar costo
                              </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                              <DeleteBatch batch={batch} />
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>

          {data?.data.lotes.length === 0 && (
            <div className="flex flex-col lg:flex-row items-center justify-center py-16 px-6 gap-12 bg-white w-full">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-3xl p-12 text-center max-w-md w-full">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Milk className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Tu listado de producción está vacío
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Comienza registrando tu primer lote para ver aquí el detalle
                  de tu producción láctea.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex flex-col lg:flex-row items-center justify-center py-16 px-6 gap-12 bg-white w-full">
              <div className="flex flex-col items-center justify-center rounded-3xl p-12 text-center max-w-md w-full">
                <div className="w-20 h-20 bg-[#F1F5F9] rounded-md flex items-center justify-center mb-6">
                  <CloudOff className="w-10 h-10 text-[#94A3B8]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  No pudimos cargar los lotes
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Hubo un problema al conectar el <br /> servidor. Por favor,
                  revisa tu conexión a <br /> internet e intenta nuevamente
                </p>
              </div>
            </div>
          )}

          {/* Pagination */}
          {!isPending && data?.data.lotes.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white">
              <span className="text-xs text-gray-400">
                Página {pagina} de {totalPaginas} · {data?.data.totalLotes ?? 0}{' '}
                lotes
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 border-gray-200 bg-gray-50 rounded-lg"
                  disabled={pagina <= 1}
                  onClick={() => setPagina((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 border-gray-200 bg-gray-50 rounded-lg"
                  disabled={pagina >= totalPaginas}
                  onClick={() =>
                    setPagina((p) => Math.min(totalPaginas, p + 1))
                  }
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </Button>
              </div>
            </div>
          )}
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
        idBatch={selectedBatch?.idLote}
      />

      <ChangeCost
        open={isChangeCostOpen}
        onClose={() => setIsChangeCostOpen(false)}
        loteId={loteId}
      />
    </div>
  )
}

export default Produccion
