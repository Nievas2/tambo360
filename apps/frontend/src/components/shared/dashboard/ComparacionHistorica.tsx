import React, { useState } from 'react'
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

interface ComparacionDataPoint {
    label: string
    actual: number
    comparado: number
}

interface ComparacionProps {
    periodo: string
    setPeriodo: (v: string) => void
    metrica: string
    setMetrica: (v: string) => void
}

// Datos de prueba con un valor muy alto (Ene) para probar el fix
const DEFAULT_DATA: ComparacionDataPoint[] = [
    { label: 'Ago', actual: 670, comparado: 270 },
    { label: 'Sep', actual: 250, comparado: 530 },
    { label: 'Oct', actual: 490, comparado: 370 },
    { label: 'Nov', actual: 600, comparado: 290 },
    { label: 'Dic', actual: 760, comparado: 185 },
    { label: 'Ene', actual: 1000, comparado: 450 }, // Barra muy alta
]

const ComparacionHistorica = ({ periodo, setPeriodo, metrica, setMetrica }: ComparacionProps) => {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

    // Configuración del gráfico
    const CHART_H = 200
    const BAR_W = 40
    const BAR_GAP = 24
    const Y_AXIS_W = 40
    const PAD_TOP = 10
    const PAD_RIGHT = 10
    const X_LABEL_H = 30

    // Dimensiones del Tooltip para cálculos de colisión
    const TOOLTIP_W = BAR_W + 30 // 70px
    const TOOLTIP_H = 45 // Alto del tooltip incluyendo padding
    const TOOLTIP_OFFSET = 8 // Espacio entre la barra y el tooltip

    const hasData = DEFAULT_DATA && DEFAULT_DATA.length > 0
    const maxVal = hasData ? Math.max(...DEFAULT_DATA.map((d) => d.actual + d.comparado)) : 0
    // Ajustamos yMax para dar un pequeño margen superior adicional si la barra es la más alta
    const yMax = Math.ceil((maxVal * 1.05) / 250) * 250 || 1000
    const yTicks = [0, 250, 500, 750, 1000, 1250, 1500].filter(v => v <= yMax)
    const barAreaH = CHART_H - PAD_TOP

    const toY = (val: number) => PAD_TOP + barAreaH - (val / yMax) * barAreaH
    const svgW = Y_AXIS_W + DEFAULT_DATA.length * (BAR_W + BAR_GAP) + PAD_RIGHT
    const svgH = CHART_H + X_LABEL_H

    return (
        <Card className="w-full overflow-hidden">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <CardTitle className="text-lg font-bold">Comparación histórica</CardTitle>
                    <p className="text-muted-foreground text-xs">Visualizando {metrica} por {periodo}</p>
                </div>
                {/* ... Selects iguales ... */}
                <div className="flex gap-2 w-full sm:w-auto">
                    <Select value={periodo} onValueChange={setPeriodo}>
                        <SelectTrigger size="sm" className="w-[110px]">
                            <SelectValue placeholder="Periodo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Día">Día</SelectItem>
                            <SelectItem value="Quincena">Quincena</SelectItem>
                            <SelectItem value="Mes">Mes</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={metrica} onValueChange={setMetrica}>
                        <SelectTrigger size="sm" className="w-[130px]">
                            <SelectValue placeholder="Métrica" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Producción">Producción</SelectItem>
                            <SelectItem value="Mermas">Mermas</SelectItem>
                            <SelectItem value="Costo">Costo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                {!hasData ? (
                    <div className="h-[240px] flex flex-col items-center justify-center text-center p-6 bg-[#f9f9f9] rounded-lg border-2 border-dashed border-[#e0e0e0]">
                        <p className="text-sm font-medium text-gray-500">No existen datos registrados.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto pb-4 custom-scrollbar">
                        <svg
                            viewBox={`0 0 ${svgW} ${svgH}`}
                            preserveAspectRatio="xMinYMin meet"
                            className="block overflow-visible mx-auto min-w-[500px] h-full w-full"
                        >
                            <defs>
                                <pattern id="hatch" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                                    <line x1="0" y1="0" x2="0" y2="4" stroke="#c2c2c2" strokeWidth="2" />
                                </pattern>
                            </defs>

                            {/* Grid Lines */}
                            {yTicks.map((tick) => (
                                <g key={tick}>
                                    <line x1={Y_AXIS_W} y1={toY(tick)} x2={svgW} y2={toY(tick)} className="stroke-border" strokeWidth="1" />
                                    <text x={Y_AXIS_W - 10} y={toY(tick) + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
                                        {tick >= 1000 ? `${tick / 1000}k` : tick}
                                    </text>
                                </g>
                            ))}

                            {/* Bars */}
                            {DEFAULT_DATA.map((d, i) => {
                                const x = Y_AXIS_W + i * (BAR_W + BAR_GAP)
                                const totalValue = d.actual + d.comparado
                                const actualH = (d.actual / yMax) * barAreaH
                                const compH = (d.comparado / yMax) * barAreaH
                                const yActual = CHART_H - actualH
                                const yComp = CHART_H - (actualH + compH) // PUNTA DE LA BARRA

                                // --- LÓGICA DE CORRECCIÓN DEL TOOLTIP ---
                                // 1. Calculamos la posición Y por defecto (encima de la barra)
                                let tooltipY = yComp - TOOLTIP_H - TOOLTIP_OFFSET
                                let isFlipped = false

                                // 2. Detectamos colisión con el borde superior del SVG (PAD_TOP)
                                // Si tooltipY es menor que PAD_TOP, significa que se corta arriba.
                                if (tooltipY < PAD_TOP) {
                                    // Lo volteamos: dibujamos DEBAJO de la punta de la barra
                                    tooltipY = yComp + TOOLTIP_OFFSET
                                    isFlipped = true
                                }

                                // Centramos el tooltip horizontalmente respecto a la barra
                                const tooltipX = x + BAR_W / 2 - TOOLTIP_W / 2

                                return (
                                    <g key={d.label} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                                        {/* Barras */}
                                        <rect x={x} y={yActual} width={BAR_W} height={actualH} fill="#cbcbcb" rx="2" />
                                        <rect x={x} y={yComp} width={BAR_W} height={compH} fill="url(#hatch)" stroke="#c2c2c2" rx="2" />

                                        {/* Etiquetas X */}
                                        <text x={x + BAR_W / 2} y={CHART_H + 20} textAnchor="middle" className="fill-muted-foreground text-[11px] font-medium">
                                            {d.label}
                                        </text>

                                        {/* Tooltip Inteligente */}
                                        {hoveredIdx === i && (
                                            <g className="pointer-events-none transition-transform duration-150 ease-in-out">
                                                {/* Fondo del Tooltip */}
                                                <rect
                                                    x={tooltipX}
                                                    y={tooltipY}
                                                    width={TOOLTIP_W}
                                                    height={TOOLTIP_H}
                                                    rx="6"
                                                    fill="#1c1c1c"
                                                    className="shadow-xl"
                                                />

                                                {/* Triángulo indicador (Opcional, ayuda visualmente) */}
                                                <path
                                                    d={isFlipped
                                                        ? `M${x + BAR_W / 2} ${tooltipY} L${x + BAR_W / 2 - 6} ${tooltipY - 6} L${x + BAR_W / 2 + 6} ${tooltipY - 6} Z` // Triángulo hacia arriba
                                                        : `M${x + BAR_W / 2} ${yComp - TOOLTIP_OFFSET} L${x + BAR_W / 2 - 6} ${yComp - TOOLTIP_OFFSET + 6} L${x + BAR_W / 2 + 6} ${yComp - TOOLTIP_OFFSET + 6} Z` // Triángulo hacia abajo
                                                    }
                                                    fill="#1c1c1c"
                                                    transform={isFlipped ? `translate(0, 0)` : `translate(0, -6)`}
                                                />

                                                {/* Contenido del Tooltip */}
                                                <text
                                                    x={tooltipX + TOOLTIP_W / 2}
                                                    y={tooltipY + 20} // Ajuste vertical del texto dentro del rect
                                                    textAnchor="middle"
                                                    fill="white"
                                                    className="text-[11px] font-bold tracking-tight"
                                                >
                                                    {totalValue.toLocaleString('es-AR')} {/* Formato de miles */}
                                                </text>
                                                <text
                                                    x={tooltipX + TOOLTIP_W / 2}
                                                    y={tooltipY + 33}
                                                    textAnchor="middle"
                                                    fill="#aaaaaa"
                                                    className="text-[9px] font-medium"
                                                >
                                                    Total {metrica}
                                                </text>
                                            </g>
                                        )}
                                    </g>
                                )
                            })}
                        </svg>
                    </div>
                )}

                {/* Legend ... igual ... */}
                <div className="flex justify-center gap-6 mt-4 border-t pt-4">
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-sm border border-[#c2c2c2] overflow-hidden bg-white">
                            <svg width="12" height="12"><rect width="12" height="12" fill="url(#hatch)" /></svg>
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">Mes comparado</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-sm bg-[#cbcbcb]" />
                        <span className="text-xs text-muted-foreground font-medium">Actual</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ComparacionHistorica