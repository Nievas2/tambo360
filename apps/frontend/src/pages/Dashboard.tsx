import { Layout } from "@/src/components/layout/Layout";
import { StatCard } from "@/src/components/shared/StatCard";
import { Activity, Milk, TrendingUp, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-8 p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Panel de Control</h1>
          <p className="text-slate-500">Resumen estadístico de producción y salud animal.</p>
        </div>

        {/* Grid Responsivo */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Producción Diaria"
            value="1,240 L"
            icon={Milk}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard 
            title="Animales en Ordeño"
            value="84"
            icon={Activity}
          />
          <StatCard 
            title="Promedio por Vaca"
            value="14.7 L"
            icon={TrendingUp}
            trend={{ value: 2.5, isPositive: false }}
          />
          <StatCard 
            title="Alertas Sanitarias"
            value="3"
            icon={AlertTriangle}
            description="Requieren atención inmediata"
          />
        </div>
      </div>
    </Layout>
  );
};
export default Dashboard;