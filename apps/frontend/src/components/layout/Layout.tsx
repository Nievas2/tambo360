import { useState, useEffect } from 'react'
import { SidebarProvider } from '../common/sidebar'
import { AppSidebar } from './AppSidebar'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar'

const LayoutContent = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) setShowMobileMenu(false)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleToggleMenu = () => {
    if (isMobile) {
      setShowMobileMenu(!showMobileMenu)
    } else {
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <div className="flex h-screen w-full bg-[#F9FAFB] overflow-hidden">
      {/* Overlay para móvil */}
      {isMobile && showMobileMenu && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Sidebar - Controlamos el ancho exacto aquí */}
      <div
        className={`h-full z-[70] transition-all duration-300 ease-in-out shrink-0 bg-white border-r border-gray-200
          ${isMobile ? 'fixed left-0 top-0 shadow-2xl' : 'relative'}
          ${isMobile && !showMobileMenu ? '-translate-x-full' : 'translate-x-0'}
          ${!isMobile ? (isCollapsed ? 'w-[80px]' : 'w-[280px]') : 'w-[280px]'}
        `}
      >
        <AppSidebar forcedCollapsed={!isMobile && isCollapsed} />
      </div>

      {/* Contenedor Principal - Ocupa el 100% del espacio sobrante */}
      <div className="flex flex-col flex-grow min-w-0 h-full">
        <Navbar onMenuClick={handleToggleMenu} />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default function Layout() {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  )
}
