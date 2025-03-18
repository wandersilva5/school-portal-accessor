
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
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled ? "py-2 glass shadow-subtle backdrop-blur-lg" : "py-3 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="inline-block mr-2">
            <BookOpen className="h-5 w-5 text-primary" />
          </span>
          <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
        </div>

        <Avatar className="h-8 w-8">
          <AvatarImage src={user.photoURL || ""} alt={user.name} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {user.name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
