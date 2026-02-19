import React from 'react'
import { SidebarProvider, SidebarTrigger } from "../common/sidebar"
import { AppSidebar } from "./AppSidebar"

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <SidebarProvider>
      {/* Fondo base en Blanco Puro (#FFFFFF) */}
      <div
        className={`flex min-h-screen w-full bg-[#FFFFFF] text-[#252525] ${className}`}
      >
        <AppSidebar />

        <main className="flex-1 flex flex-col min-w-0 bg-[#FFFFFF]">
          
          {/* Header con borde en #EAEAEA */}
          <header className="flex h-16 items-center gap-4 border-b border-[#EAEAEA] px-6 bg-[#FFFFFF] sticky top-0 z-10">
            {/* Quitamos el className del SidebarTrigger para eliminar el error de TS */}
            <SidebarTrigger />
            
            <div className="h-4 w-[1px] bg-[#D6D6D6]" />
            
            <nav className="flex items-center text-sm font-medium">
              <span className="text-[#959595] font-semibold">Tambo360</span>
              <span className="mx-2 text-[#D6D6D6]">/</span>
              <span className="text-[#252525] font-bold">Panel Operativo</span>
            </nav>

            <div className="ml-auto flex items-center gap-4">
              <div className="text-[10px] bg-[#F1F1F1] text-[#707070] px-2 py-1 rounded border border-[#E3E3E3] font-bold uppercase tracking-wider">
                V.2026
              </div>
            </div>
          </header>

          {/* Área de contenido */}
          <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#FFFFFF]">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Layout