import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/common/select'
import TamboEngineCard from '@/src/components/shared/dashboard/tambo engine/TamboEngineCard'
import React from 'react'

const TamboEngine: React.FC = () => {
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
      <TamboEngineCard />
    </main>
  )
}

export default TamboEngine
