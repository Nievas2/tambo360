import { StatCard } from "../components/shared/StatCard";
import DailyProductionLog from "../components/shared/dashboard/DailyProductionLog";

const Dashboard = () => {
  return (
    // min-h-screen y w-full aseguran que el contenedor no se desborde
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
      
      {/* Cabecera del Dashboard - Responsive */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Dashboard / Tambo La Esperanza
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#252525] tracking-tight">
            Reporte Mensual
          </h1>
        </div>
      </div>

      {/* Seccion de Stats - Sistema de Grid Adaptativo */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Contenedor para el log de producción - Manejo de ancho total */}
      <div className="mt-8 w-full overflow-x-auto">
        <DailyProductionLog />
      </div>
    </div>
  );
};

export default Dashboard;