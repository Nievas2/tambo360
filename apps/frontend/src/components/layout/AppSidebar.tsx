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

    // Esta clase busca el botón real dentro del componente SidebarTrigger y le aplica el hover
    const triggerHoverStyles = "[&_button]:hover:!bg-[#4A4A4A] [&_button]:hover:!text-white [&_button]:transition-colors";

    return (
        <Sidebar
            collapsible="icon"
            className="border-r border-gray-200 bg-white sticky top-0 h-screen z-50"
        >
            <SidebarHeader className={isCollapsed ? "p-4" : "p-8"}>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                            <img src="/isotipo_tambo 1.svg" alt="Isotipo" className="h-full w-full object-contain" />
                        </div>
                        {!isCollapsed && (
                            <div className="flex items-center animate-in fade-in duration-300">
                                <img src="/logotipo 1.svg" alt="Tambo360" className="h-6 w-auto" />
                            </div>
                        )}
                    </div>
                    {!isCollapsed && (
                        <div className={`ml-2 ${triggerHoverStyles}`}>
                            <SidebarTrigger />
                        </div>
                    )}
                </div>
                {isCollapsed && (
                    <div className={`flex justify-center mt-4 ${triggerHoverStyles}`}>
                        <SidebarTrigger />
                    </div>
                )}
            </SidebarHeader>

            <SidebarContent className="px-4 flex flex-col justify-between h-full pb-8">
                <SidebarMenu>
                    {mainMenuItems.map((item) => {
                        const isActive = location.pathname === item.url;
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    className={`py-6 transition-all duration-200 rounded-lg border-none !shadow-none outline-none flex items-center ${
                                        isCollapsed ? "justify-center" : "justify-start"
                                    } ${
                                        isActive 
                                            ? "bg-[#4A4A4A] !text-white" 
                                            : "bg-transparent text-gray-400 hover:bg-gray-50"
                                    }`}
                                >
                                    <Link to={item.url} className={`flex items-center gap-3 w-full ${isCollapsed ? "justify-center" : ""}`}>
                                        <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
                                        {!isCollapsed && (
                                            <span className={`font-semibold ${isActive ? "text-white" : "text-gray-600"}`}>
                                                {item.title}
                                            </span>
                                        )}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            tooltip="Mi Perfil"
                            className={`py-6 transition-all duration-200 rounded-lg border-none !shadow-none outline-none flex items-center ${
                                isCollapsed ? "justify-center" : "justify-start"
                            } ${
                                location.pathname === "/perfil" 
                                    ? "bg-[#4A4A4A] !text-white" 
                                    : "bg-transparent text-gray-400 hover:bg-gray-50"
                            }`}
                        >
                            <Link to="/perfil" className={`flex items-center gap-3 w-full ${isCollapsed ? "justify-center" : ""}`}>
                                <User className={`h-5 w-5 shrink-0 ${location.pathname === "/perfil" ? "text-white" : "text-gray-400"}`} />
                                {!isCollapsed && (
                                    <span className={`font-semibold ${location.pathname === "/perfil" ? "text-white" : "text-gray-600"}`}>
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