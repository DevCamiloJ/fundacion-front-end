import { Outlet } from 'react-router-dom'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { DashboardSidebar } from '../components/DashboardSidebar'

export const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <main>
          <header className="p-2">
            <SidebarTrigger />
          </header>
          <div className="px-8 py-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}