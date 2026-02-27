import { Badge } from '@/src/components/common/badge'
import { Button } from '@/src/components/common/Button'
import { Card, CardContent } from '@/src/components/common/card'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/src/components/common/empty'
import { Input } from '@/src/components/common/Input'
import { StatCard } from '@/src/components/shared/StatCard'
import { useBatch } from '@/src/hooks/batch/useBatch'
import {
  ArrowRight,
  CircleCheck,
  CircleDollarSign,
  Droplet,
  Factory,
  ListFilter,
  Percent,
  Search,
  StickyNote,
  Tag,
  TrendingDown,
} from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const MOCK_DATA = {
  id: '004',
  nombre: 'Leche entera',
  estado: 'Óptimo',
  inicio: '14/01/2026',
  cantidadProducida: 'XXX L',
  mermaRegistrada: 'XXX L',
  cantidadVendible: 'XXXX L',
  porcentajeMerma: 'X.X%',
  costoUnitarioReal: '$XXX',
  costoTotalLote: '$XXX',
  costoMerma: '$XXXX',
  costoUnitarioBase: '$XXX',
  observaciones: 'Sin observaciones relevantes.',
  mermas: [],
  historialCostos: [],
}

export default function BatchDetails() {
  const [tab, setTab] = useState('detalles')
  const [searchInput, setSearchInput] = useState('')
  const { search } = useLocation()
  const id = new URLSearchParams(search).get('id')

  if (!id) {
    return <p>Falta el identificador del lote</p>
  }

  const { data: batch, isLoading } = useBatch({ id: id })
  const lote = MOCK_DATA

  return (
    <div className="min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5 w-full">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-[32px] font-bold">
              Lote {lote.id} – {lote.nombre}
            </h1>
            <Badge variant="secondary">{lote.estado}</Badge>
          </div>
          <p className="text-[#959595]">Inicio: {lote.inicio}</p>
        </div>

        <div className="flex items-center justify-end gap-2 w-full">
          <Button className="h-12 w-full max-w-36">Descargar Ficha</Button>
          <Button variant="outline" className="h-12 w-full max-w-36">
            Editar lote
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            icon={<Droplet />}
            title="Cantidad Producida"
            value={lote.cantidadProducida}
          />
          <StatCard
            icon={<TrendingDown />}
            title="Merma Registrada"
            value={lote.mermaRegistrada}
          />
          <StatCard
            icon={<CircleCheck />}
            title="Cantidad Vendible"
            value={lote.cantidadVendible}
          />
          <StatCard
            icon={<Percent />}
            title="Porcentaje de Merma"
            value={lote.porcentajeMerma}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            icon={<Factory />}
            title="Costo de producción"
            value={lote.costoUnitarioReal}
          />
          <StatCard
            icon={<StickyNote />}
            title="Costo merma"
            value={lote.costoTotalLote}
          />
          <StatCard
            icon={<CircleDollarSign />}
            title="Costo Total del lote"
            value={lote.costoMerma}
          />
          <StatCard
            icon={<Tag />}
            title="Costo Unitario Real"
            value={lote.costoUnitarioBase}
          />
        </div>

        {/* Observaciones */}
        <Card className="min-h-36">
          <CardContent className="space-y-4">
            <p className="text-lg font-bold">Observaciones</p>
            <p className="text-sm text-gray-500">{lote.observaciones}</p>
          </CardContent>
        </Card>

        {/* TamboEngine notice */}
        <Card>
          <CardContent className="flex items-center gap-3">
            <div className="bg-[#CACACA] rounded-sm p-2">
              <img src="/robot.svg" className="size-6" alt="robot" />
            </div>

            <div className="flex flex-col gap-0.5 w-full">
              <p className="text-sm font-bold">
                TamboEngine: No se han detectado desviaciones en este lote.
              </p>
              <p className="text-xs text-gray-400">
                El rendimiento se mantiene dentro del promedio histórico.
              </p>
            </div>

            <Button variant="outline" className="h-12">
              Ver Análisis
              <ArrowRight className="size-5" />
            </Button>
          </CardContent>
        </Card>

        {/* Tabs + table area */}
        <Card className="py-2">
          <div className="border-b border-gray-100 px-4 py-2 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-1">
              <p className="text-md">
                <b>Detalles</b> | Historial de Costos
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="size-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Buscar lote..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="h-10 pl-10"
                />
              </div>

              <Button variant="outline" className="h-10">
                <ListFilter className="size-4" />
              </Button>
            </div>
          </div>

          <CardContent className="p-0">
            {tab === 'detalles' && lote.mermas.length === 0 && (
              <Empty className="w-full gap-4">
                <EmptyHeader>
                  <EmptyTitle className="font-bold">
                    Sin mermas registradas
                  </EmptyTitle>
                </EmptyHeader>
                <EmptyContent className="w-full max-w-xl">
                  <EmptyDescription className="w-full">
                    No se han reportado pérdidas ni ajustes para este lote hasta
                    el momento.
                  </EmptyDescription>
                  <Button>Registrar Merma</Button>
                </EmptyContent>
              </Empty>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
