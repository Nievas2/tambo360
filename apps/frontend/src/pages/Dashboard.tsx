import { useState } from 'react'
import AlertsSection from '@/src/components/shared/dashboard/AlertsSection'
import { StatCard } from '../components/shared/StatCard'
import DailyProductionLog from '../components/shared/dashboard/DailyProductionLog'
import { useAuth } from '@/src/context/AuthContext'
import ComparacionHistorica from '@/src/components/shared/dashboard/ComparacionHistorica'

const Dashboard = () => {
  const { user } = useAuth()
  const [periodo, setPeriodo] = useState<string>('Mes')
  const [metrica, setMetrica] = useState<string>('Producción')

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Dashboard / {user.establecimientos[0].nombre}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#252525] tracking-tight">
            Reporte Mensual
          </h1>
        </div>
      </div>

      {/* Seccion de Stats - 5 indicadores según requerimiento */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Queso Producido"
          value="395 Kg"
          trend={{ value: 12, isPositive: true }}
          description="vs Enero"
        />
        <StatCard
          title="Leche Vendida"
          value="810 L"
          trend={{ value: 8, isPositive: true }}
          description="vs Enero"
        />
        <StatCard
          title="Mermas Totales"
          value="45 Kg/L"
          trend={{ value: 15, isPositive: false }}
          description="vs Enero"
        />
        <StatCard
          title="Costo directo total"
          value="$811.000"
          trend={{ value: 5, isPositive: true }}
          description="vs Enero"
        />
      </div>

      {/* Cuerpo Principal */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Columna Izquierda */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* 2. Pasamos las propiedades requeridas para solucionar el error de TS */}
          <ComparacionHistorica
            periodo={periodo}
            setPeriodo={setPeriodo}
            metrica={metrica}
            setMetrica={setMetrica}
          />
          <DailyProductionLog />
        </div>

        {/* Columna Derecha */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <AlertsSection />
        </aside>
      </div>
    </div>
  )
}

export default Dashboard
