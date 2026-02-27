import { LayoutDashboard, Milk, Cpu, User } from 'lucide-react'
import { data, Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../common/sidebar'
import { useAuth } from '@/src/context/AuthContext'
import { Button } from '@/src/components/common/Button'

interface AppSidebarProps {
  forcedCollapsed?: boolean
}

export function AppSidebar({ forcedCollapsed }: AppSidebarProps) {
  const location = useLocation()
  const { logout } = useAuth()
  const isCollapsed = forcedCollapsed

  const mainMenuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      url: ROUTES.DASHBOARD,
      data: "data-test-id='dashboard'",
    },
    {
      title: 'Producción',
      icon: Milk,
      url: '/produccion',
      data: "data-test-id='produccion'",
    },
    {
      title: 'TamboEngine',
      icon: Cpu,
      url: '/tambo-engine',
      data: "data-test-id='tambo-engine'",
    },
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
                  className={`py-4 transition-all duration-200 rounded-lg shadow-none! flex items-center ${
                    isCollapsed ? 'justify-center' : 'justify-start'
                  } ${isActive ? 'bg-[#BABABA] text-white! border-l-6 border-l-black' : 'bg-transparent text-gray-400 hover:bg-gray-100'}`}
                >
                  <Link
                    to={item.url}
                    className={`flex items-center gap-3 w-full ${isCollapsed ? 'justify-center' : ''}`}
                    data-test-id={item.data}
                  >
                    <item.icon
                      className={`h-5 w-5 shrink-0 ${isActive ? 'text-black' : 'text-gray-400'}`}
                    />
                    {!isCollapsed && (
                      <span
                        className={`font-semibold ${isActive ? 'text-black' : 'text-gray-400'}`}
                      >
                        {item.title}
                      </span>
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
              className={`py-6 transition-all duration-200 rounded-lg border-none !shadow-none flex items-center group ${
                isCollapsed ? 'justify-center' : 'justify-start'
              } ${location.pathname === '/perfil' ? 'bg-[#4A4A4A] text-white!' : 'bg-transparent text-gray-400 hover:bg-gray-100'}`}
            >
              <Button
                onClick={() => logout()}
                className={`flex items-center gap-3 w-full ${isCollapsed ? 'justify-center' : ''}`}
              >
                <User className={`h-5 w-5 shrink-0 text-gray-400 `} />
                <span className="font-semibold text-gray-400">Mi perfil</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
