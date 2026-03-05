import { Button } from '@/src/components/common/Button'
import { Card, CardContent } from '@/src/components/common/card'
import { Clock, Package, ShieldAlert, ArrowDown, ArrowUp } from 'lucide-react'
import { useState } from 'react'

const TamboEngineCard = () => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col items-start gap-4">
        <section className="flex flex-row items-start gap-4 w-full">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-red-50 text-red-600">
            <ShieldAlert
              className="size-6"
              fill="currentColor"
              stroke="white"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-1.5 text-sm text-slate-500">
                <Clock className="h-4 w-4" />
                <span>Febrero 2026 (15-31)</span>
              </div>

              <Button
                variant="link"
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-start gap-2 outline"
                size="xs"
              >
                Ver análisis
                {showDetails ? (
                  <ArrowUp className="h-4 w-4 rounded-full border border-slate-900" />
                ) : (
                  <ArrowDown className="h-4 w-4 rounded-full border border-slate-900" />
                )}
              </Button>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-slate-900">
                Merma superior al promedio histórico
              </h3>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Package className="h-4 w-4" />
                <span>
                  L-001 — Producto:{' '}
                  <span className="font-semibold text-slate-700">
                    Leche entera
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {showDetails && (
          <div className="flex flex-row gap-2 bg-[#FCE8E5] w-full rounded-md p-4">
            <div>
              <img src="/smart_toy.svg" className="w-12" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold text-red-main">
                Análisis asistido por la IA
              </span>

              <p className="text-sm text-body-text">
                El lote registra una merma total de 80 litros sobre 5.000 litros
                producidos, equivalente a un 2% del volumen total. Este valor
                supera el promedio habitual del producto (1,5%), representando
                una variación del +1,5 puntos porcentuales respecto al estándar
                histórico.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TamboEngineCard
