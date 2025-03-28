
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  User, 
  Menu,
  CreditCard
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/components/ui/sidebar';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { toggleSidebar } = useSidebar();

  if (!user) return null;

  // Define navigation items based on user role
  let navItems = [];
  
  if (user.role === 'guardian') {
    navItems = [
      { path: '/dashboard', icon: <BookOpen className="h-5 w-5" />, label: 'Início' },
      { path: '/guardian/children', icon: <User className="h-5 w-5" />, label: 'Filhos' },
      { path: '/guardian/finance', icon: <CreditCard className="h-5 w-5" />, label: 'Financeiro' },
      { path: '/announcements', icon: <MessageSquare className="h-5 w-5" />, label: 'Avisos' },
      { path: '/profile', icon: <User className="h-5 w-5" />, label: 'Perfil' },
    ];
  } else {
    navItems = [
      { path: '/dashboard', icon: <BookOpen className="h-5 w-5" />, label: 'Início' },
      { path: '/schedule', icon: <Calendar className="h-5 w-5" />, label: 'Horário' },
      { path: '/announcements', icon: <MessageSquare className="h-5 w-5" />, label: 'Avisos' },
      { path: '/profile', icon: <User className="h-5 w-5" />, label: 'Perfil' },
    ];
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border shadow-subtle">
      <div className="flex items-center justify-between px-2">
        <button 
          onClick={toggleSidebar}
          className="flex flex-col items-center justify-center p-3 text-muted-foreground"
        >
          <Menu className="h-5 w-5" />
          <span className="text-xs mt-1">Menu</span>
        </button>

        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center p-3",
              location.pathname === item.path
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
