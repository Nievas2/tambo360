import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import { getAIGreeting } from "../services/service";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState<string>("Cargando...");

  // Indicadores alineados al PRD de Tambo360
  const stats = [
    { label: "Producción Mensual", value: "395 kg", icon: "🥛" },
    { label: "Leche Venta Directa", value: "810 L", icon: "🚜" },
    { label: "Mermas Totales", value: "45 kg/L", icon: "📉" },
    { label: "Costo Directo Total", value: "$811.000", icon: "💰" },
  ];

  useEffect(() => {
    const initDashboard = async () => {
      const msg = await getAIGreeting(user?.name || "Productor");
      setGreeting(msg);
    };
    initDashboard();
  }, [user?.name]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10">
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">{greeting}</h2>
          <p className="text-slate-400">
            Resumen operativo de su establecimiento para el período actual.
          </p>
        </header>

        
        {/* Grid de indicadores optimizado para Tablet */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-all"
            >
              <div className="text-3xl mb-4">{stat.icon}</div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold text-white">Últimos Lotes de Producción</h3>
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 text-slate-400 text-center">
                Aquí se listarán los lotes registrados recientemente.
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-semibold text-white text-indigo-400">
              TamboEngine IA
            </h3>
            <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-2xl">
              <p className="text-sm text-slate-300 italic">
                "No se detectan desvíos críticos en la producción de Queso Pategrás esta semana."
              </p>
              <div className="mt-4 text-xs text-indigo-400 font-bold uppercase">
                Análisis Asistido
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
