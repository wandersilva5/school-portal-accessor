
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import { useAuth } from '@/context/AuthContext';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { BookOpen, Calendar, GraduationCap, MessageSquare, LogOut, User, Settings, CreditCard, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileLayout: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return <Outlet />;

  // Define sidebar menu items based on user role
  let sidebarMenuItems = [];
  
  if (user.role === 'guardian') {
    sidebarMenuItems = [
      { path: '/dashboard', icon: BookOpen, label: 'Dashboard' },
      { path: '/guardian/children', icon: Users, label: 'Meus Filhos' },
      { path: '/guardian/finance', icon: CreditCard, label: 'Financeiro' },
      { path: '/announcements', icon: MessageSquare, label: 'Avisos' },
      { path: '/profile', icon: User, label: 'Perfil' },
      { path: '/settings', icon: Settings, label: 'Configurações' },
    ];
  } else {
    sidebarMenuItems = [
      { path: '/dashboard', icon: BookOpen, label: 'Dashboard' },
      { path: '/schedule', icon: Calendar, label: 'Horário' },
      { path: '/grades', icon: GraduationCap, label: 'Notas' },
      { path: '/announcements', icon: MessageSquare, label: 'Avisos' },
      { path: '/profile', icon: User, label: 'Perfil' },
      { path: '/settings', icon: Settings, label: 'Configurações' },
    ];
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden bg-background">
        <Sidebar variant="floating" collapsible="offcanvas">
          <SidebarContent className="pt-16">
            <SidebarGroup>
              <SidebarGroupLabel>Portal Escolar</SidebarGroupLabel>
              <SidebarMenu>
                {sidebarMenuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild tooltip={item.label}>
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={logout}
                    tooltip="Sair"
                    className="text-destructive hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto pb-20 pt-16">
            <Outlet />
          </main>
          <BottomNavigation />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MobileLayout;
