import { StatCard } from "../components/shared/StatCard";
import DailyProductionLog from "../components/shared/dashboard/DailyProductionLog";

const Dashboard = () => {
  return (
    <div className="p-8 bg-slate-50/50 min-h-screen space-y-8 font-inter">
      <div className="flex flex-col gap-1">
        <p className="text-slate-500 text-sm font-medium">
          Dashboard / Tambo La Esperanza
        </p>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Resumen Mensual
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Queso Producido" value="395 Kg" trend={{ value: 12, isPositive: true }} description="vs Enero" />
        <StatCard title="Leche Vendida" value="810 L" trend={{ value: 8, isPositive: true }} description="vs Enero" />
        <StatCard title="Mermas Totales" value="45 Kg/L" trend={{ value: 15, isPositive: false }} description="vs Enero" />
        <StatCard title="Costo directo total" value="$811.000" trend={{ value: 5, isPositive: true }} description="vs Enero" />
      </div>

      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <DailyProductionLog />
      </section>
    </div>
  );
};

export default Dashboard;