import ComparacionHistorica from '@/src/components/shared/dashboard/ComparacionHistorica'
import DailyProductionLog from '@/src/components/shared/dashboard/DailyProductionLog'
import AlertsSection from '@/src/components/shared/dashboard/AlertsSection'
import { useCurrentMonth } from '@/src/hooks/dashboard/useCurrentMonth'
import { StatCard } from '@/src/components/shared/StatCard'
import { useAuth } from '@/src/context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()
  const { data, isPending } = useCurrentMonth()
  const totalProduccion =
    (data?.data.actual.quesos || 0) + (data?.data.actual.leches || 0)

  const porcentajeMermas =
    totalProduccion > 0
      ? ((data?.data.actual.mermas || 0) / totalProduccion) * 100
      : 0

  console.log(porcentajeMermas)
  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <StatCard
          title="Queso Producido"
          value={data?.data.actual.quesos}
          unit=" Kg"
          trend={
            data?.data.variaciones.quesos != null
              ? {
                  value: data.data.variaciones.quesos,
                  isPositive: data.data.variaciones.quesos >= 0,
                }
              : null
          }
          description={'vs ' + data?.data.mesPrevio}
          isPending={isPending}
        />

        <StatCard
          title="Leche Producida"
          value={data?.data.actual.leches}
          trend={
            data?.data.variaciones.leches != null
              ? {
                  value: data.data.variaciones.leches,
                  isPositive: data.data.variaciones.leches >= 0,
                }
              : null
          }
          unit="L"
          description={'vs ' + data?.data.mesPrevio}
          isPending={isPending}
        />

        <StatCard
          title="Mermas Totales"
          value={porcentajeMermas.toFixed(2)}
          unit="%"
          trend={
            data?.data.variaciones.costos != null
              ? {
                  value: data?.data.variaciones.mermas,
                  isPositive: data?.data.variaciones.mermas <= 0,
                }
              : null
          }
          description={`vs ${data?.data.mesPrevio}`}
          isPending={isPending}
        />

        <StatCard
          title="Costos totales"
          value={data?.data.actual.costos}
          unit="$ "
          trend={
            data?.data.variaciones.costos != null
              ? {
                  value: data.data.variaciones.costos,
                  isPositive: data.data.variaciones.costos <= 0,
                }
              : null
          }
          description={'vs ' + data?.data.mesPrevio}
          isPending={isPending}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <ComparacionHistorica />
          <DailyProductionLog />
        </div>

        <aside className="w-full lg:w-80 shrink-0">
          <AlertsSection />
        </aside>
      </div>
    </div>
  )
}

export default Dashboard
