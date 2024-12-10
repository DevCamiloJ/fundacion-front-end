import { Icons } from '@/components/ui/icons'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { NavLink } from 'react-router-dom'

export const DashboardSidebarHeader = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
            <NavLink to="/dashboard" className="flex items-center gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600">
                <Icons.Crown className="size-4 text-white" />
              </div>
              <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-gray-900">Princesas guerreras</span>
              <span className="text-xs text-gray-500">Dashboard</span>
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}