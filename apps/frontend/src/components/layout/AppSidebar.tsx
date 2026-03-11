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
import { useNoViewedAlerts } from '@/src/hooks/alerts/useNoViewedAlerts'
import { useAuth } from '@/src/context/AuthContext'

interface AppSidebarProps {
  forcedCollapsed?: boolean
}

export function AppSidebar({ forcedCollapsed }: AppSidebarProps) {
  const location = useLocation()
  const { user } = useAuth()
  const { data } = useNoViewedAlerts({
    id: user.establecimientos[0].idEstablecimiento,
  })
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
    <Sidebar className="w-full border-none h-full bg-[#F1F5F9]">
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
            const isActive =
              item.url === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.url)
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={`py-4 transition-all duration-200 rounded-lg shadow-none! flex items-center ${
                    isCollapsed ? 'justify-center' : 'justify-start'
                  } ${isActive ? 'bg-[#D7ECAF] hover:bg-[#D7ECAF]/60 hover:text-[#669213]/60 border-l-6 border-l-black' : 'bg-transparent text-gray-400 hover:bg-gray-100'}`}
                >
                  <Link
                    to={item.url}
                    className={`flex items-center gap-3 w-full ${isCollapsed ? 'justify-center' : ''}`}
                    data-test-id={item.data}
                  >
                    <item.icon
                      className={`h-5 w-5 shrink-0 ${isActive ? 'text-[#669213]' : 'text-gray-400'}`}
                    />
                    {!isCollapsed && (
                      <span
                        className={`font-semibold flex justify-between w-full ${isActive ? 'text-[#669213]' : 'text-gray-400'}`}
                      >
                        {item.title}{' '}
                        {item.url === '/tambo-engine' &&
                          data?.data.cantidad > 0 && (
                            <span className="text-white bg-red-main rounded-full size-6 text-center text-[16px]">
                              {data.data.cantidad}
                            </span>
                          )}
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
              className={`py-4 transition-all duration-200 rounded-lg shadow-none! flex items-center ${
                isCollapsed ? 'justify-center' : 'justify-start'
              } ${location.pathname === '/perfil' ? 'bg-[#D7ECAF] hover:bg-[#D7ECAF]/60 hover:text-[#669213]/60 border-l-6 border-l-black' : 'bg-transparent text-gray-400 hover:bg-gray-100'}`}
            >
              <Link
                to="/perfil"
                className={`flex items-center gap-3 w-full ${isCollapsed ? 'justify-center' : ''}`}
                data-test-id="data-test-id='perfil'"
              >
                <User
                  className={`h-5 w-5 shrink-0 ${location.pathname === '/perfil' ? 'text-[#669213]' : 'text-gray-400'}`}
                />
                {!isCollapsed && (
                  <span
                    className={`font-semibold ${location.pathname === '/perfil' ? 'text-[#669213]' : 'text-gray-400'}`}
                  >
                    Perfil
                  </span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
