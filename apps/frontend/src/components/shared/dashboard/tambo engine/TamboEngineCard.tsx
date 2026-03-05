import { Button } from '@/src/components/common/Button'
import { Card, CardContent } from '@/src/components/common/card'
import { Alert } from '@/src/types/alerts'
import { Clock, Package, ArrowDown, ArrowUp } from 'lucide-react'
import { useState } from 'react'

interface TamboEngineCardProps {
  alert: Alert
}
const TamboEngineCard = ({ alert }: TamboEngineCardProps) => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <Card
      className={`overflow-hidden ${
        alert.nivel === 'alto'
          ? 'bg-alert-bg'
          : alert.nivel === 'medio'
            ? 'bg-[#FFFBF1]'
            : 'bg-dialogs'
      }`}
    >
      <CardContent className="flex flex-col items-start gap-4">
        <section className="flex flex-row items-center gap-4 w-full">
          <div
            className={`flex size-16 shrink-0 items-center justify-center rounded-md ${
              alert.nivel === 'alto'
                ? 'bg-red-main'
                : alert.nivel === 'medio'
                  ? 'bg-orange-alert'
                  : 'bg-green-main'
            }`}
          >
            <img src="/robot.svg" alt="robot-ia" />
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-1.5 text-sm text-slate-500">
                <Clock className="h-4 w-4" />
                <span className="capitalize">
                  {new Date(alert.creado_en).toLocaleString('es-ES', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
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
                    {alert.producto}
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

              <p className="text-sm text-body-text">{alert.descripcion}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TamboEngineCard
