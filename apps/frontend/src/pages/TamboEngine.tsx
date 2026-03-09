import { Card, CardContent } from '@/src/components/common/card'
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
import React, { useState } from 'react'

const TamboEngine: React.FC = () => {
  const [range, setRange] = useState<'7' | '14' | '30'>('7')
  const { user } = useAuth()
  const { data, isPending } = useAlerts({
    id: user.establecimientos[0].idEstablecimiento,
    range: range,
  })

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
        <Select
          onValueChange={(e) => setRange(e as '7' | '14' | '30')}
          defaultValue={range}
        >
          <SelectTrigger className="w-fit gap-3 pl-3 pr-2 justify-between">
            <span className="flex items-center gap-1.5">
              Fecha:
              <SelectValue />
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 días</SelectItem>
            <SelectItem value="14">Últimos 14 días</SelectItem>
            <SelectItem value="30">Último mes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-4">
        {isPending &&
          Array.from({ length: 3 }).map((_, i) => (
            <TamboEngineCardSkeleton key={i} />
          ))}

        {data?.length > 0 ? (
          data?.map((alert: Alert) => (
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
                TamboEngine necesita al menos 15 lotes <br /> registrados para
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
