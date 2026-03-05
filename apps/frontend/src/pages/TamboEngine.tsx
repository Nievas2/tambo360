import { Card, CardContent, CardHeader } from '@/src/components/common/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/common/select'
import TamboEngineCardSkeleton from '@/src/components/shared/dashboard/tambo engine/skeletons/TamboEngineCardSkeleton'
import TamboEngineCard from '@/src/components/shared/dashboard/tambo engine/TamboEngineCard'
import { useAuth } from '@/src/context/AuthContext'
import { useAlerts } from '@/src/hooks/alerts/useAlerts'
import { Alert } from '@/src/types/alerts'
import { Bot } from 'lucide-react'
import React from 'react'

const TamboEngine: React.FC = () => {
  const { user } = useAuth() /* 
  const { data } = useAlerts({ id: user.establecimientos[0].idEstablecimiento }) */
  const isPending = false

  const alerts = []
  return (
    <main className="flex flex-col gap-4">
      {' '}
      {/* Agregado padding al contenedor principal */}
      <h2 className="text-4xl font-bold">TamboEngine - IA</h2>
      <p>
        TamboEngine analiza automáticamente los datos históricos de producción,
        mermas y costos para identificar patrones atípicos y desvíos relevantes.
        Las alertas generadas son informativas y ayudan a comprender el
        comportamiento productivo sin sustituir el criterio del encargado.
      </p>
      <div>
        <Select defaultValue="a">
          <SelectTrigger className="w-fit gap-3 pl-3 pr-2 justify-between">
            <span className="flex items-center gap-1.5">
              Fecha:
              <SelectValue />
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Últimos 7 días</SelectItem>
            <SelectItem value="b">Últimos 14 días</SelectItem>
            <SelectItem value="c">Último mes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-4">
        {isPending &&
          Array.from({ length: 3 }).map((_, i) => (
            <TamboEngineCardSkeleton key={i} />
          ))}

        {alerts.length > 0 ? (
          alerts.map((alert: Alert) => (
            <TamboEngineCard alert={alert} key={alert.id} />
          ))
        ) : (
          <Card className="flex flex-col items-center justify-center gap-6 text-center">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center size-16 bg-[#F1F5F9] rounded-md">
                <Bot className="size-6" />
              </div>
            </div>

            <CardContent>
              <h2 className="text-2xl font-semibold text-slate-700">
                Aun no hay análisis disponible
              </h2>

              <p className="text-md text-body-text leading-relaxed">
                TamboEngine necesita al menos 5 lotes <br /> registrados para
                empezar a identificar patrones y <br /> desvíos en tu produccion
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}

export default TamboEngine
