import { useState, useMemo } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/common/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/common/select'
import { useGraph } from '@/src/hooks/dashboard/useGraph'
import { GraphParams } from '@/src/types/dashboard'
import { Button } from '@/src/components/common/Button'
import { Plus } from 'lucide-react'
import ChangeBatch from '@/src/components/shared/dashboard/batch/ChangeBatch'

interface BackendDataPoint {
  mes: string
  anio: number
  valor: number
}

const ComparacionHistorica = () => {
  const [open, setOpen] = useState(false)
  const [params, setParams] = useState<GraphParams>({
    producto: 'leches',
    metrica: 'cantidad',
  })

  const { data, isPending } = useGraph({ params })
  const chartData: BackendDataPoint[] = data?.data.resultado || []

  const isAllZero = useMemo(() => {
    return data?.data.Lote === 'false'
  }, [chartData, data])

  const { yMax, yTicks, hasData } = useMemo(() => {
    const validData = chartData.length > 0
    if (!validData || isAllZero)
      return { yMax: 100, yTicks: [0, 25, 50, 75, 100], hasData: validData }

    const maxVal = Math.max(...chartData.map((d) => d.valor))
    const ceiling = maxVal === 0 ? 100 : maxVal * 1.15
    const magnitude = Math.pow(10, Math.floor(Math.log10(ceiling)))
    const step = magnitude / 2 || 10
    const yMaxRounded = Math.ceil(ceiling / step) * step

    const ticks = Array.from({ length: 5 }, (_, i) =>
      Math.round((yMaxRounded / 4) * i)
    )

    return { yMax: yMaxRounded, yTicks: ticks, hasData: true }
  }, [chartData, isAllZero])

  const CHART_H = 200
  const BAR_W = 42
  const BAR_GAP = 30
  const Y_AXIS_W = 56
  const PAD_TOP = 20
  const PAD_RIGHT = 20
  const X_LABEL_H = 30

  const barAreaH = CHART_H - PAD_TOP
  const toY = (val: number) => PAD_TOP + barAreaH - (val / yMax) * barAreaH

  const svgW =
    Y_AXIS_W + (chartData.length || 6) * (BAR_W + BAR_GAP) + PAD_RIGHT
  const svgH = CHART_H + X_LABEL_H

  return (
    <Card className="w-full overflow-hidden">
      {isPending ? (
        <div className="h-60 flex items-center justify-center">
          <span className="text-sm text-muted-foreground animate-pulse">
            Cargando datos...
          </span>
        </div>
      ) : !hasData || isAllZero ? (
        <div className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-b-lg ">
          <h3 className="text-xl font-bold text-black mb-2">
            Tu historial comienza aca
          </h3>
          <p className="text-slate-500 text-sm max-w-75 mb-6">
            Registra tu primer lote para ver comparativas históricas y el
            rendimiento de tu producción.
          </p>
          <Button onClick={() => setOpen(true)}>
            Registrar lote <Plus className="size-4" />
          </Button>
        </div>
      ) : (
        <>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-bold text-slate-800">
                Histórico de {params.producto}
              </CardTitle>
              <p className="text-muted-foreground text-xs">
                Últimos 6 meses de {params.metrica}
              </p>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <Select
                value={params.producto}
                onValueChange={(v: 'quesos' | 'leches') =>
                  setParams((prev) => ({ ...prev, producto: v }))
                }
              >
                <SelectTrigger size="sm" className="w-27.5 capitalize">
                  <SelectValue placeholder="Producto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leches">Leches</SelectItem>
                  <SelectItem value="quesos">Quesos</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={params.metrica}
                onValueChange={(v: 'cantidad' | 'mermas' | 'costos') =>
                  setParams((prev) => ({ ...prev, metrica: v }))
                }
              >
                <SelectTrigger size="sm" className="w-30 capitalize">
                  <SelectValue placeholder="Métrica" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cantidad">Cantidad</SelectItem>
                  <SelectItem value="mermas">Mermas</SelectItem>
                  <SelectItem value="costos">Costos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {isPending ? (
              <div className="h-60 flex items-center justify-center">
                <span className="text-sm text-muted-foreground animate-pulse">
                  Cargando datos...
                </span>
              </div>
            ) : (
              <div className="overflow-x-auto pb-4 custom-scrollbar">
                <svg
                  viewBox={`0 0 ${svgW} ${svgH}`}
                  className="block overflow-visible mx-auto min-w-125 w-full h-full"
                >
                  {yTicks.map((tick) => (
                    <g key={tick}>
                      <line
                        x1={Y_AXIS_W}
                        y1={toY(tick)}
                        x2={svgW}
                        y2={toY(tick)}
                        className="stroke-slate-200"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={Y_AXIS_W - 8}
                        y={toY(tick) + 4}
                        textAnchor="end"
                        className="fill-slate-400 text-[10px] font-medium"
                      >
                        {tick >= 1000000
                          ? `${(tick / 1000000).toFixed(1)}M`
                          : tick >= 1000
                            ? `${(tick / 1000).toFixed(0)}k`
                            : tick}
                      </text>
                    </g>
                  ))}

                  {chartData.map((d, i) => {
                    const x = Y_AXIS_W + i * (BAR_W + BAR_GAP) + BAR_GAP / 2
                    const barHeight = (d.valor / yMax) * barAreaH
                    const yPos = toY(d.valor)

                    return (
                      <g
                        key={`${d.mes}-${d.anio}`}
                        className="group cursor-default"
                      >
                        <rect
                          x={x}
                          y={yPos}
                          width={BAR_W}
                          height={Math.max(barHeight, 3)}
                          fill={'#8ddfeb'}
                          rx="4"
                          className="transition-all duration-300"
                        />
                        <text
                          x={x + BAR_W / 2}
                          y={CHART_H + 20}
                          textAnchor="middle"
                          className="fill-slate-500 text-[10px] font-semibold"
                        >
                          {d.mes.substring(0, 3)}
                        </text>
                        <title>{`${d.mes} ${d.anio}: ${d.valor}`}</title>
                      </g>
                    )
                  })}
                </svg>
              </div>
            )}
          </CardContent>
        </>
      )}
      <ChangeBatch
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      />
    </Card>
  )
}

export default ComparacionHistorica
