import React from 'react'
import { SidebarProvider, SidebarTrigger } from "../common/sidebar"
import { AppSidebar } from "./AppSidebar"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#FFFFFF] text-[#252525]">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0 bg-[#FFFFFF]">
          <header className="flex h-16 items-center gap-4 border-b border-[#EAEAEA] px-6 bg-[#FFFFFF] sticky top-0 z-10">
            <SidebarTrigger />
            <div className="h-4 w-[1px] bg-[#D6D6D6]" />
            <nav className="flex items-center text-sm font-medium">
              <span className="text-[#959595] font-semibold">Tambo360</span>
              <span className="mx-2 text-[#D6D6D6]">/</span>
              <span className="text-[#252525] font-bold">Panel Operativo</span>
            </nav>
          </header>
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-4 md:p-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Layout