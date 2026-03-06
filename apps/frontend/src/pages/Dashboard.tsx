import AlertsSection from '@/src/components/shared/dashboard/AlertsSection'
import { StatCard } from '../components/shared/StatCard'
import DailyProductionLog from '../components/shared/dashboard/DailyProductionLog'
import { useAuth } from '@/src/context/AuthContext'
import ComparacionHistorica from '@/src/components/shared/dashboard/ComparacionHistorica'
import { useCurrentMonth } from '@/src/hooks/dashboard/useCurrentMonth'

const Dashboard = () => {
  const { user } = useAuth()
  const { data, isPending } = useCurrentMonth()
  // 1. Sumamos la producción total
  const totalProduccion =
    (data?.data.actual.quesos || 0) + (data?.data.actual.leches || 0)

  // 2. Calculamos el porcentaje: (mermas / total) * 100
  // Usamos una validación para evitar dividir por 0
  const porcentajeMermas =
    totalProduccion > 0
      ? ((data?.data.actual.mermas || 0) / totalProduccion) * 100
      : 0

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <StatCard
          title="Queso Producido"
          value={data?.data.actual.quesos}
          unit=" Kg"
          trend={
            data?.data.variaciones.quesos !== null
              ? {
                  value: data?.data.variaciones.quesos,
                  isPositive: data?.data.variaciones.quesos >= 0,
                }
              : undefined
          }
          description={'vs ' + data?.data.mesPrevio}
          isPending={isPending}
        />

        <StatCard
          title="Leche Vendida"
          value={data?.data.actual.leches}
          trend={
            data?.data.variaciones.leches !== null
              ? {
                  value: data?.data.variaciones.leches,
                  isPositive: data?.data.variaciones.leches >= 0,
                }
              : undefined
          }
          unit="L"
          description={'vs ' + data?.data.mesPrevio}
          isPending={isPending}
        />

        <StatCard
          title="Mermas Totales"
          value={porcentajeMermas.toFixed(1)}
          unit="%"
          trend={
            data?.data.variaciones.mermas !== null
              ? {
                  value: data?.data.variaciones.mermas,
                  isPositive: data?.data.variaciones.mermas <= 0,
                }
              : undefined
          }
          description={`vs ${data?.data.mesPrevio}`}
          isPending={isPending}
        />

        <StatCard
          title="Costos totales"
          value={data?.data.actual.costos}
          unit="$ "
          trend={
            data?.data.variaciones.costos !== null
              ? {
                  value: data?.data.variaciones.costos,
                  isPositive: data?.data.variaciones.costos >= 0,
                }
              : undefined
          }
          description={'vs ' + data?.data.mesPrevio}
          isPending={isPending}
        />
      </div>

      {/* Cuerpo Principal */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Columna Izquierda */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* 2. Pasamos las propiedades requeridas para solucionar el error de TS */}
          <ComparacionHistorica />
          <DailyProductionLog />
        </div>

        {/* Columna Derecha */}
        <aside className="w-full lg:w-80 shrink-0">
          <AlertsSection />
        </aside>
      </div>
    </div>
  )
}

export default Dashboard
