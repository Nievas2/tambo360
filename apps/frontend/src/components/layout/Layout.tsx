import { useState, useEffect } from "react";
import { SidebarProvider } from "../common/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";

const LayoutContent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Detectamos si es móvil manualmente para evitar errores de tipos
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px es el breakpoint de lg en Tailwind
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#F9FAFB] overflow-hidden relative">
      {/* Overlay: Se muestra solo en móvil cuando el menú está abierto */}
      {isMobile && showMobileMenu && (
        <div 
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Contenedor del Sidebar */}
      <div className={`
        h-full z-[70] transition-all duration-300
        ${isMobile ? "fixed left-0 top-0 shadow-2xl" : "relative"}
        ${isMobile && !showMobileMenu ? "-translate-x-full" : "translate-x-0"}
      `}>
        <AppSidebar />
      </div>
      
      {/* Contenedor Principal */}
      <div className="flex flex-col flex-1 min-w-0 h-full relative">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto outline-none">
          {/* Botón flotante opcional para móvil si el SidebarTrigger no se ve */}
          {isMobile && (
            <button 
              onClick={() => setShowMobileMenu(true)}
              className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#4A4A4A] text-white shadow-lg lg:hidden"
            >
              <span className="text-xs font-bold">MENÚ</span>
            </button>
          )}

          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default function Layout() {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
}