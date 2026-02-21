import { StatCard } from "../components/shared/StatCard";
import DailyProductionLog from "../components/shared/dashboard/DailyProductionLog";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Cabecera del Dashboard igual a la imagen */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <p className="text-muted-foreground text-sm">
            Dashboard / Tambo La Esperanza
          </p>
          <h1 className="text-3xl font-bold text-[#252525] tracking-tight">Reporte Mensual</h1>
        </div>
      </div>

      {/* Seccion de Stats - Manteniendo tus datos originales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Queso Producido" value="395 Kg" trend={{ value: 12, isPositive: true }} description="vs Enero" />
        <StatCard title="Leche Vendida" value="810 L" trend={{ value: 8, isPositive: true }} description="vs Enero" />
        <StatCard title="Mermas Totales" value="45 Kg/L" trend={{ value: 15, isPositive: false }} description="vs Enero" />
        <StatCard title="Costo directo total" value="$811.000" trend={{ value: 5, isPositive: true }} description="vs Enero" />
      </div>

      {/* Contenedor para el resto de tu contenido */}
      <div className="mt-8">
        <DailyProductionLog />
      </div>
    </div>
  );
};

export default Dashboard;