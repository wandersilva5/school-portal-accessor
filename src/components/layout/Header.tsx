
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/components/ui/sidebar';

const Header: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { toggleSidebar } = useSidebar();
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Track scroll for glass effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/schedule':
        return 'Horário';
      case '/grades':
        return 'Notas';
      case '/guardian/children':
        return 'Meus Filhos';
      case '/guardian/finance':
        return 'Financeiro';
      case '/announcements':
        return 'Avisos';
      case '/profile':
        return 'Perfil';
      default:
        return 'Portal Escolar';
    }
  };

  if (!user) return null;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 pt-safe",
        isScrolled 
          ? "py-2 glass shadow-subtle backdrop-blur-lg" 
          : "py-3 bg-gradient-to-b from-background to-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl mr-2 bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </span>
          <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
        </div>

        <Avatar className="h-8 w-8 ring-2 ring-primary/20">
          <AvatarImage src={user.photoURL || ""} alt={user.name} />
          <AvatarFallback className="bg-primary text-primary-foreground font-medium">
            {user.name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
