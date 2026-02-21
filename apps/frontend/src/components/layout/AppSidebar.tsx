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
    SidebarGroup,
    SidebarGroupContent,
} from "../common/sidebar";

export function AppSidebar() {
    const location = useLocation();

    const mainItems = [
        { title: "Dashboard", url: ROUTES.DASHBOARD, icon: LayoutDashboard },
        { title: "Producción", url: ROUTES.PRODUCCION || "/produccion", icon: Milk },
        { title: "TamboEngine", url: "/tambo-engine", icon: Cpu }, // Corregido para que dirija correctamente
    ];

    return (
        <Sidebar className="bg-[#F1F1F1] border-r border-[#E3E3E3] text-[#252525] w-72">
            <SidebarHeader className="p-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center">
                        <img
                            src="/isotipo_tambo 1.svg"
                            alt="Isotipo Tambo360"
                            className="h-full w-full object-contain"
                        />
                    </div>

                    <div className="flex items-center">
                        <img
                            src="/logotipo 1.svg"
                            alt="Tambo360"
                            className="h-6 w-auto object-contain"
                        />
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-4 flex flex-col justify-between h-full pb-8">
                {/* Grupo Superior: Dashboard, Producción, TamboEngine */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-2">
                            {mainItems.map((item) => {
                                const isActive = location.pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={`h-12 rounded-lg transition-all duration-200 group ${isActive
                                                ? "bg-[#FFFFFF] text-[#000000] shadow-sm border border-[#D6D6D6]"
                                                : "hover:bg-[#EAEAEA] text-[#4A4A4A]"
                                                }`}
                                        >
                                            <Link to={item.url} className="flex items-center gap-4 px-4">
                                                <item.icon className={`h-5 w-5 ${isActive ? 'text-[#000000]' : 'text-[#959595] group-hover:text-[#252525]'}`} />
                                                <span className={`font-bold text-[15px] ${isActive ? 'text-[#000000]' : ''}`}>
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Grupo Inferior: Solo Perfil */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    className={`h-12 rounded-lg transition-all duration-200 group ${location.pathname === '/perfil'
                                        ? "bg-[#FFFFFF] text-[#000000] shadow-sm border border-[#D6D6D6]"
                                        : "hover:bg-[#EAEAEA] text-[#4A4A4A]"
                                        }`}
                                >
                                    <Link to="/perfil" className="flex items-center gap-4 px-4">
                                        <User className={`h-5 w-5 ${location.pathname === '/perfil' ? 'text-[#000000]' : 'text-[#959595] group-hover:text-[#252525]'}`} />
                                        <span className="font-bold text-[15px]">Perfil</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}