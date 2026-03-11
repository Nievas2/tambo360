import Robot from '@/src/components/shared/Robot'
import { Button } from '@/src/components/common/Button'
import { Card, CardContent } from '@/src/components/common/card'
import { useViewedAlert } from '@/src/hooks/alerts/useViewedAlert'
import { Alert } from '@/src/types/alerts'
import { Clock, Package, ArrowDown, ArrowUp, ShieldAlert } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface TamboEngineCardProps {
  alert: Alert
}

const TamboEngineCard = ({ alert }: TamboEngineCardProps) => {
  const [showDetails, setShowDetails] = useState(false)
  const { mutate } = useViewedAlert()
  const { hash } = useLocation()
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const targetId = hash.replace('#', '')
    if (targetId !== alert.id) return

    setShowDetails(true)

    if (!alert.visto) mutate(alert.id)

    const timeout = setTimeout(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)

    return () => clearTimeout(timeout)
  }, [hash, alert.id])

  return (
    <Card
      ref={cardRef}
      className={`overflow-hidden relative ${!alert.visto && 'border border-red-main'}`}
      id={alert.id}
    >
      <CardContent className="flex flex-col items-start gap-4">
        <section className="flex flex-row gap-4 w-full">
          <div
            className={`flex size-12 shrink-0 items-center justify-center rounded-md  ${
              alert.nivel === 'alto'
                ? 'bg-alert-bg'
                : alert.nivel === 'medio'
                  ? 'bg-[#FFFBF1]'
                  : 'bg-dialogs'
            }`}
          >
            <ShieldAlert
              className={`h-6 w-6 text-white ${
                alert.nivel === 'alto'
                  ? 'fill-red-main'
                  : alert.nivel === 'medio'
                    ? 'fill-orange-alert'
                    : 'fill-green-main'
              }`}
            />
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
                onClick={() => {
                  setShowDetails(!showDetails)
                  if (!alert.visto) mutate(alert.id)
                }}
                className="flex items-center gap-2 outline"
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
                  {alert.numeroLote} — Producto:{' '}
                  <span className="font-semibold text-slate-700">
                    {alert.producto}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {showDetails && (
          <div
            className={`flex flex-row gap-2 w-full rounded-md p-4 ${
              alert.nivel === 'alto'
                ? 'bg-alert-bg'
                : alert.nivel === 'medio'
                  ? 'bg-[#FFFBF1]'
                  : 'bg-dialogs'
            }`}
          >
            <div>
              <Robot
                className={`${
                  alert.nivel === 'alto'
                    ? 'fill-red-main'
                    : alert.nivel === 'medio'
                      ? 'fill-orange-alert'
                      : 'fill-green-main'
                }`}
                size={18}
              />
            </div>

            <div className="flex flex-col gap-2">
              <span
                className={`text-sm font-bold  ${
                  alert.nivel === 'alto'
                    ? 'text-red-main'
                    : alert.nivel === 'medio'
                      ? 'text-orange-alert'
                      : 'text-green-main'
                }`}
              >
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
