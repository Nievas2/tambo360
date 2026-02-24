import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { PanelLeft } from 'lucide-react'
import { useIsMobile } from '../../hooks/use-mobile'
import { cn } from '../../utils/utils'

const SidebarContext = React.createContext<{
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  toggleSidebar: () => void
} | null>(null)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true)
  const toggleSidebar = () => setOpen(!open)
  const state = open ? 'expanded' : 'collapsed'

  return (
    <SidebarContext.Provider value={{ state, open, setOpen, toggleSidebar }}>
      <div className="flex min-h-screen w-full">{children}</div>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context)
    throw new Error('useSidebar must be used within SidebarProvider')
  return context
}

export const Sidebar = ({ className, children, collapsible, variant }: any) => {
  const { open } = useSidebar()
  return (
    <aside
      data-state={open ? 'expanded' : 'collapsed'}
      data-collapsible={collapsible}
      className={cn(
        'relative h-screen transition-[width] duration-300 ease-in-out bg-slate-950 border-r border-slate-800',
        open ? 'w-64' : 'w-16',
        className
      )}
    >
      <div className="flex h-full w-full flex-col">{children}</div>
    </aside>
  )
}

export const SidebarTrigger = () => {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      onClick={toggleSidebar}
      className="p-2 hover:bg-slate-800 rounded-md text-slate-400"
    >
      <PanelLeft className="h-5 w-5" />
    </button>
  )
}

export const SidebarHeader = ({ children, className }: any) => (
  <div className={cn('flex flex-col p-2', className)}>{children}</div>
)
export const SidebarContent = ({ children, className }: any) => (
  <div className={cn('flex-1 overflow-auto p-2', className)}>{children}</div>
)
export const SidebarFooter = ({ children, className }: any) => (
  <div className={cn('p-2', className)}>{children}</div>
)
export const SidebarGroup = ({ children }: any) => (
  <div className="py-2">{children}</div>
)
export const SidebarGroupLabel = ({ children, className }: any) => (
  <div
    className={cn(
      'px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider',
      className
    )}
  >
    {children}
  </div>
)
export const SidebarGroupContent = ({ children }: any) => (
  <div className="mt-2 space-y-1">{children}</div>
)
export const SidebarMenu = ({ children }: any) => (
  <ul className="space-y-1">{children}</ul>
)
export const SidebarMenuItem = ({ children }: any) => <li>{children}</li>
export const SidebarMenuButton = ({
  children,
  asChild,
  isActive,
  className,
  ...props
}: any) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(
        'relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 overflow-hidden',
        isActive
          ? 'text-white bg-blue-600/10 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-blue-500 before:rounded-r-full'
          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
