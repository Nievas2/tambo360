import { LayoutDashboard, Milk, Cpu, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../common/sidebar'

interface AppSidebarProps {
  forcedCollapsed?: boolean
}

export function AppSidebar({ forcedCollapsed }: AppSidebarProps) {
  const location = useLocation()
  const isCollapsed = forcedCollapsed

  const mainMenuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, url: ROUTES.DASHBOARD },
    { title: 'Producción', icon: Milk, url: '/produccion' },
    { title: 'TamboEngine', icon: Cpu, url: '/tambo-engine' },
  ]

  return (
    <Sidebar className="w-full border-none h-full bg-white">
      <SidebarHeader
        className={`transition-all duration-300 ${isCollapsed ? 'p-4' : 'p-8'}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center">
            <img
              src="/isotipo_tambo 1.svg"
              alt="Isotipo"
              className="h-full w-full object-contain"
            />
          </div>
          {!isCollapsed && (
            <div className="flex items-center animate-in fade-in duration-300">
              <img
                src="/logotipo 1.svg"
                alt="Tambo360"
                className="h-6 w-auto"
              />
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 flex flex-col justify-between h-full pb-8">
        <SidebarMenu>
          {mainMenuItems.map((item) => {
            const isActive = location.pathname === item.url
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={`py-6 transition-all duration-200 rounded-lg border-none !shadow-none flex items-center ${
                    isCollapsed ? 'justify-center' : 'justify-start'
                  } ${isActive ? 'bg-[#4A4A4A] !text-white' : 'bg-transparent text-gray-400 hover:bg-gray-50'}`}
                >
                  <Link
                    to={item.url}
                    className={`flex items-center gap-3 w-full ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <item.icon
                      className={`h-5 w-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`}
                    />
                    {!isCollapsed && (
                      <span className="font-semibold">{item.title}</span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={`py-6 transition-all duration-200 rounded-lg border-none !shadow-none flex items-center ${
                isCollapsed ? 'justify-center' : 'justify-start'
              } ${location.pathname === '/perfil' ? 'bg-[#4A4A4A] !text-white' : 'bg-transparent text-gray-400 hover:bg-gray-50'}`}
            >
              <Link
                to="/perfil"
                className={`flex items-center gap-3 w-full ${isCollapsed ? 'justify-center' : ''}`}
              >
                <User
                  className={`h-5 w-5 shrink-0 ${location.pathname === '/perfil' ? 'text-white' : 'text-gray-400'}`}
                />
                {!isCollapsed && (
                  <span className="font-semibold">Mi Perfil</span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
