import { Dispatch, SetStateAction } from 'react'
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
    // Usamos Dispatch para no tener que nombrar parámetros y evitar errores de ESLint
    setPeriodo: Dispatch<SetStateAction<string>>
    metrica: string
    setMetrica: Dispatch<SetStateAction<string>>
}

const DEFAULT_DATA: ComparacionDataPoint[] = [
    { label: 'Ago', actual: 670, comparado: 270 },
    { label: 'Sep', actual: 250, comparado: 530 },
    { label: 'Oct', actual: 490, comparado: 370 },
    { label: 'Nov', actual: 600, comparado: 290 },
    { label: 'Dic', actual: 760, comparado: 185 },
    { label: 'Ene', actual: 1000, comparado: 450 },
]

const ComparacionHistorica = ({ periodo, setPeriodo, metrica, setMetrica }: ComparacionProps) => {
    // Configuración del gráfico
    const CHART_H = 200
    const BAR_W = 40
    const BAR_GAP = 24
    const Y_AXIS_W = 40
    const PAD_TOP = 10
    const PAD_RIGHT = 10
    const X_LABEL_H = 30

    const hasData = DEFAULT_DATA && DEFAULT_DATA.length > 0
    const maxVal = hasData ? Math.max(...DEFAULT_DATA.map((d) => d.actual + d.comparado)) : 0
    const yMax = Math.ceil((maxVal * 1.05) / 250) * 250 || 1000
    const yTicks = [0, 250, 500, 750, 1000, 1250, 1500].filter(tick => tick <= yMax)
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

                            {yTicks.map((tick) => (
                                <g key={tick}>
                                    <line x1={Y_AXIS_W} y1={toY(tick)} x2={svgW} y2={toY(tick)} className="stroke-border" strokeWidth="1" />
                                    <text x={Y_AXIS_W - 10} y={toY(tick) + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
                                        {tick >= 1000 ? `${tick / 1000}k` : tick}
                                    </text>
                                </g>
                            ))}

                            {DEFAULT_DATA.map((d, i) => {
                                const x = Y_AXIS_W + i * (BAR_W + BAR_GAP)
                                const actualH = (d.actual / yMax) * barAreaH
                                const compH = (d.comparado / yMax) * barAreaH
                                const yActual = CHART_H - actualH
                                const yComp = CHART_H - (actualH + compH)

                                return (
                                    <g key={d.label}>
                                        <rect x={x} y={yActual} width={BAR_W} height={actualH} fill="#cbcbcb" rx="2" />
                                        {/* Lógica de barra única: solo se dibuja si hay valor comparado */}
                                        {compH > 0 && (
                                            <rect x={x} y={yComp} width={BAR_W} height={compH} fill="url(#hatch)" stroke="#c2c2c2" rx="2" />
                                        )}
                                        <text x={x + BAR_W / 2} y={CHART_H + 20} textAnchor="middle" className="fill-muted-foreground text-[11px] font-medium">
                                            {d.label}
                                        </text>
                                    </g>
                                )
                            })}
                        </svg>
                    </div>
                )}

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