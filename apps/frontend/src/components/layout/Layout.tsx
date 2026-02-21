import { SidebarProvider } from "../common/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";

export default function Layout() {
  return (
    <SidebarProvider>
      {/* h-screen y overflow-hidden aquí son obligatorios para el sticky */}
      <div className="flex h-screen w-full bg-[#F9FAFB] overflow-hidden">
        <AppSidebar />
        
        <div className="flex flex-col flex-1 min-w-0 h-full">
          <Navbar />
          
          {/* El scroll sucede solo aquí dentro */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}