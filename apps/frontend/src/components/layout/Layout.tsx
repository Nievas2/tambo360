import { SidebarProvider } from "../common/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar"; // Importación restablecida

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#F9FAFB]">
        {/* Sidebar Lateral */}
        <AppSidebar />
        
        <div className="flex flex-col flex-1 w-full">
          {/* Navbar Superior restablecido */}
          <Navbar />
          
          <main className="flex-1 overflow-y-auto">
            <div className="p-8">
              {/* Contenido de las páginas (Dashboard, Producción, etc.) */}
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}