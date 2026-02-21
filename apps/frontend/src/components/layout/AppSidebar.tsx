import { LayoutDashboard, Milk, Cpu, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "../common/sidebar";

export function AppSidebar() {
    const location = useLocation();
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    const mainMenuItems = [
        { title: "Dashboard", icon: LayoutDashboard, url: ROUTES.DASHBOARD },
        { title: "Producción", icon: Milk, url: "/produccion" },
        { title: "TamboEngine", icon: Cpu, url: "/tambo-engine" },
    ];

    return (
        <Sidebar collapsible="icon" className="border-r border-gray-200 bg-white">
            <SidebarHeader className={isCollapsed ? "p-4" : "p-8"}>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        {/* Isotipo: Se eliminó el fondo bg-black y el redondeado */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                            <img
                                src="/isotipo_tambo 1.svg"
                                alt="Isotipo"
                                className="h-full w-full object-contain"
                            />
                        </div>

                        {/* Logotipo: Solo visible si no está colapsado */}
                        {!isCollapsed && (
                            <div className="flex items-center animate-in fade-in duration-300">
                                <img
                                    src="/logotipo 1.svg"
                                    alt="Tambo360"
                                    className="h-6 w-auto object-contain"
                                />
                            </div>
                        )}
                    </div>

                    {!isCollapsed && (
                        <div className="ml-2">
                            <SidebarTrigger />
                        </div>
                    )}
                </div>

                {/* Trigger cuando está colapsado */}
                {isCollapsed && (
                    <div className="flex justify-center mt-4">
                        <SidebarTrigger />
                    </div>
                )}
            </SidebarHeader>

            <SidebarContent className="px-4 flex flex-col justify-between h-full pb-8">
                {/* Navegación Principal */}
                <SidebarMenu>
                    {mainMenuItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={location.pathname === item.url}
                                tooltip={item.title}
                                className="py-6 hover:bg-gray-50 transition-colors"
                            >
                                <Link to={item.url} className="flex items-center gap-3">
                                    <item.icon
                                        className={`h-5 w-5 shrink-0 ${location.pathname === item.url ? "text-black" : "text-gray-400"
                                            }`}
                                    />
                                    {!isCollapsed && (
                                        <span className={`font-medium ${location.pathname === item.url ? "text-black" : "text-gray-600"}`}>
                                            {item.title}
                                        </span>
                                    )}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>

                {/* Perfil al final */}
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={location.pathname === "/perfil"}
                            tooltip="Mi Perfil"
                            className="py-6 hover:bg-gray-50 transition-colors"
                        >
                            <Link to="/perfil" className="flex items-center gap-3">
                                <User
                                    className={`h-5 w-5 shrink-0 ${location.pathname === "/perfil" ? "text-black" : "text-gray-400"
                                        }`}
                                />
                                {!isCollapsed && (
                                    <span className={`font-medium ${location.pathname === "/perfil" ? "text-black" : "text-gray-600"}`}>
                                        Mi Perfil
                                    </span>
                                )}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}