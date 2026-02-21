import { SidebarProvider } from "../common/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar"; // Importación corregida con llaves {}

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#F9FAFB] relative overflow-x-hidden">
        <AppSidebar />
        
        <div className="flex flex-col flex-1 min-w-0 max-w-full">
          <Navbar />
          
          <main className="flex-1">
            <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}