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
import ChangeBatch from '@/src/components/shared/dashboard/batch/ChangeBatch'
import ChangeCost from '@/src/components/shared/dashboard/cost/ChangeCost'
import ChangeDecrease from '@/src/components/shared/dashboard/decrease/ChangeDecrease'
import { StatCard } from '@/src/components/shared/StatCard'
import { useBatch } from '@/src/hooks/batch/useBatch'
import { Droplet, Factory, ListFilter, TrendingDown } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function BatchDetails() {
  const { pathname } = useLocation()
  const id = pathname.split('/')[3]

  if (!id) {
    return <p>Falta el identificador del lote</p>
  }
  const [isChangeDecreaseOpen, setIsChangeDecreaseOpen] = useState(false)
  const [isChangeCostOpen, setIsChangeCostOpen] = useState(false)
  const [isChangeBatchOpen, setIsChangeBatchOpen] = useState(false)
  const { data: batch, isLoading } = useBatch({ id: id })

  if (isLoading) {
    return (
      <div className="min-h-screen space-y-6 animate-pulse">
        {/* Header skeleton */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 w-full">
            <div className="h-5 w-20 bg-gray-200 rounded-full" />
            <div className="h-9 w-72 bg-gray-200 rounded-lg" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center justify-end gap-2 w-full mt-2 sm:mt-0">
            <div className="h-12 w-36 bg-gray-200 rounded-lg" />
            <div className="h-12 w-36 bg-gray-200 rounded-lg" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Stats grid skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="border rounded-xl p-4 flex flex-col gap-3 bg-white"
              >
                <div className="h-8 w-8 bg-gray-200 rounded-lg" />
                <div className="h-4 w-28 bg-gray-200 rounded" />
                <div className="h-7 w-20 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          {/* Mermas card skeleton */}
          <div className="border rounded-xl bg-white py-2">
            <div className="border-b border-gray-100 px-4 py-2 flex items-center justify-between">
              <div className="h-5 w-36 bg-gray-200 rounded" />
              <div className="flex gap-2">
                <div className="h-10 w-10 bg-gray-200 rounded-lg" />
                <div className="h-10 w-36 bg-gray-200 rounded-lg" />
              </div>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-12 w-full bg-gray-100 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Costos card skeleton */}
          <div className="border rounded-xl bg-white py-2">
            <div className="border-b border-gray-100 px-4 py-2 flex items-center justify-between">
              <div className="h-5 w-36 bg-gray-200 rounded" />
              <div className="flex gap-2">
                <div className="h-10 w-10 bg-gray-200 rounded-lg" />
                <div className="h-10 w-36 bg-gray-200 rounded-lg" />
              </div>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-12 w-full bg-gray-100 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5 w-full">
          <Badge variant="secondary">
            {batch?.data?.estado ? 'Completo' : 'Incompleto'}
          </Badge>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-[32px] font-bold">
              Lote #{String(batch?.data?.numeroLote).padStart(3, '0')} –
              {batch?.data?.producto?.nombre}
            </h1>
          </div>
          <p className="text-[#959595]">
            Inicio:{' '}
            {batch?.data?.fechaProduccion
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('/')}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 w-full">
          <Button
            variant="outline"
            className="h-12 w-full max-w-36"
            onClick={() => setIsChangeBatchOpen(true)}
          >
            Editar lote
          </Button>
          <Button className="h-12 w-full max-w-36">Completar lote</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            icon={<Droplet />}
            title="Cantidad Producida"
            value={batch?.data?.cantidad}
          />

          <StatCard
            icon={<Factory />}
            title="Costo de producción"
            value={
              '$' +
              batch?.data?.costosDirectos
                .reduce((total, costo) => total + costo.monto, 0)
                .toString()
            }
          />

          <StatCard
            icon={<TrendingDown />}
            title="Merma Registrada"
            value={batch?.data.mermas
              ?.reduce((total, m) => {
                const qty =
                  typeof m.cantidad === 'string'
                    ? parseFloat(m.cantidad)
                    : (m.cantidad ?? 0)
                return total + qty
              }, 0)
              .toString()}
          />
        </div>

        {/* TamboEngine notice */}
        {/* <Card>
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
        </Card> */}

        <Card className="py-2">
          <div className="border-b border-gray-100 px-4 py-2 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-1">
              <p className="text-md font-bold">Historial de mermas</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-10">
                <ListFilter className="size-4" />
              </Button>

              <Button className="w-52">Agregar merma</Button>
            </div>
          </div>

          <CardContent className="p-0">
            {batch?.data?.mermas.length === 0 && (
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

        <Card className="py-2">
          <div className="border-b border-gray-100 px-4 py-2 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-1">
              <p className="text-md font-bold">Historial de costos</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-10">
                <ListFilter className="size-4" />
              </Button>

              <Button className="w-52">Agregar costo</Button>
            </div>
          </div>

          <CardContent className="p-0">
            {batch?.data?.costosDirectos.length === 0 && (
              <Empty className="w-full gap-4">
                <EmptyHeader>
                  <EmptyTitle className="font-bold">
                    Sin costos registrados
                  </EmptyTitle>
                </EmptyHeader>
                <EmptyContent className="w-full max-w-xl">
                  <EmptyDescription className="w-full">
                    No se han reportado pérdidas ni ajustes para este lote hasta
                    el momento.
                  </EmptyDescription>
                  <Button>Registrar costo</Button>
                </EmptyContent>
              </Empty>
            )}
          </CardContent>
        </Card>
      </div>

      <ChangeBatch
        open={isChangeBatchOpen}
        setOpen={() => setIsChangeBatchOpen(false)}
        batch={
          batch?.data != undefined
            ? {
                id: batch.data.idLote,
                idProducto: batch.data.idProducto,
                cantidad:
                  typeof batch.data.cantidad === 'string'
                    ? parseFloat(batch.data.cantidad)
                    : Number(batch.data.cantidad ?? 0),
                fechaProduccion: batch.data.fechaProduccion,
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
