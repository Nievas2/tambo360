import React, { useState, useEffect } from "react";
import { Button } from "../components/common/Button";
import { getAIGreeting } from "../services/service";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [greeting, setGreeting] = useState<string>("Cargando...");
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);
  
  const [stats] = useState([
    { label: "Queso Producido", value: "395 kg", icon: "🧀" },
    { label: "Leche Vendida", value: "810 L", icon: "🥛" },
    { label: "Mermas Totales", value: "45 kg", icon: "📉" },
    { label: "Costo Directo", value: "$811.000", icon: "💰" },
  ]);

  useEffect(() => {
    const initDashboard = async () => {
      const [msg, online] = await Promise.all([
        getAIGreeting(user?.name || "Productor"),
        api.checkHealth(),
      ]);
      setGreeting(msg);
      setIsBackendOnline(online);
    };
    initDashboard();
  }, [user?.name]);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            TAMBO360
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium text-white">{user?.name}</span>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${isBackendOnline ? "bg-emerald-500" : "bg-red-500"} animate-pulse`}></div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                {isBackendOnline ? "Servidor Online" : "Servidor Offline"}
              </span>
            </div>
          </div>
          <Button variant="outline" onClick={logout}>Cerrar Sesión</Button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10">
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">{greeting}</h2>
          <p className="text-slate-400">Panel de control operativo del establecimiento.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
              <div className="text-3xl mb-4">{stat.icon}</div>
              <p className="text-slate-500 text-sm font-medium uppercase">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold text-white">Alertas de TamboEngine</h3>
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 text-center">
              <p className="text-slate-500">No se detectan desvíos productivos en los lotes recientes.</p>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Establecimiento</h3>
            <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-2xl">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Encargado</span>
                  <span className="text-slate-200">{user?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Ubicación</span>
                  <span className="text-slate-200">Corrientes, AR</span>
                </div>
              </div>
              <Button variant="primary" className="w-full mt-6">Registrar Lote</Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;