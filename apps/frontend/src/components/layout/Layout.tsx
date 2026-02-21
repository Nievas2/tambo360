import { SidebarProvider, SidebarTrigger } from "../common/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";
import { MapPin, Calendar, Clock } from "lucide-react";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";

const Layout = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const userName = "Raul Maidana";
  const location = "Córdoba, Argentina";
  
  // Formateo de fecha: "Lun, Feb 16, 2026"
  const getFormattedDate = (date: Date) => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayNum = date.getDate();
    const year = date.getFullYear();
    
    return `${dayName}, ${monthName} ${dayNum}, ${year}`;
  };

  // Formateo de hora: "8:00 AM"
  const timeStr = time.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });

  const dateStr = getFormattedDate(time);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#F8FAFC]">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0"> 

          {/* Barra de Bienvenida con formato específico */}
          <div className="bg-white border-b px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-medium text-[#64748B]">
                Bienvenido, <span className="text-[#1E293B] font-bold">{userName}</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Sección Ubicación */}
              <div className="flex items-center gap-2 bg-[#F1F5F9] border border-[#E2E8F0] px-3 py-1.5 rounded-lg shadow-sm">
                <MapPin className="h-4 w-4 text-[#475569]" />
                <span className="text-sm font-semibold text-[#475569]">{location}</span>
              </div>

              {/* Sección Fecha y Hora con formato: Lun, Feb 16, 2026 | 8:00 AM */}
              <div className="flex items-center gap-2 bg-[#F1F5F9] border border-[#E2E8F0] px-3 py-1.5 rounded-lg shadow-sm">
                <Calendar className="h-4 w-4 text-[#475569]" />
                <span className="text-sm font-semibold text-[#475569]">
                  {dateStr} <span className="mx-1 text-[#CBD5E1]">|</span> {timeStr}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
              <Outlet /> 
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;