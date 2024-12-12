import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Link } from 'react-router-dom'
import { DashboardSidebarHeader } from './DashboardSidebarHeader'
import { Icons } from '@/components/ui/icons'
import { DashboardSidebarFooter } from './DashboardSidebarFooter'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const aplicacionItems = [
  {
    title: "Hogar",
    url: "home",
    icon: Icons.Home,
  },
  {
    title: "Miembros",
    url: "miembros",
    icon: Icons.Crown,
  },
  {
    title: "Estadísticas",
    url: "estadisticas",
    icon: Icons.BarChart,
  },
];

const configuracionItems = [
  {
    title: "Usuarios",
    url: "usuarios",
    icon: Icons.Users,
  },
  {
    title: "Lugar de nacimiento",
    icon: Icons.MapPin,
    url: "/dashboard/paises",
    isActive: false,
    items: [
      {
        title: "País",
        url: "/dashboard/paises",
      },
      {
        title: "Departamento",
        url: "/dashboard/departamentos",
      },
      {
        title: "Ciudad",
        url: "/dashboard/ciudades",
      },
    ],
  },
  {
    title: "Instituciones educativas",
    url: "/dashboard/instituciones",
    icon: Icons.School
  },
  {
    title: "EPS",
    url: "#",
    icon: Icons.Stethoscope,
  },
  {
    title: "Temas de interés",
    icon: Icons.Palete,
    url: "#",
  },
  {
    title: "Sisben",
    icon: Icons.Pencil,
    url: "#",
    items: [
      {
        title: "Puntaje",
        url: "#",
      },
      {
        title: "Grupo poblacional",
        url: "#",
      },
      {
        title: "Tipo población",
        url: "#",
      },
      {
        title: "Grupo étnico",
        url: "#",
      },
      {
        title: "Discapacidad",
        url: "#",
      },
    ]
  },
];

export const DashboardSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = ({ ...props }) => (
    <Sidebar collapsible="icon" {...props}> 
      <SidebarHeader>
        <DashboardSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                aplicacionItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="size-4 text-gray-500" />
                        <span className="font-medium text-gray-700">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Configuración</SidebarGroupLabel>
          <SidebarMenu>
            {
              configuracionItems.map((item) => (
                <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link to={item.url}>
                        <item.icon className="size-4 text-gray-500"/>
                        <span className="font-medium text-gray-700">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <Icons.ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {
                              item.items?.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild>
                                    <Link to={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))
                            }
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))
            }
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        <DashboardSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  );
