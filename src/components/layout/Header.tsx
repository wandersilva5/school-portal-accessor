
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { BookOpen, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/components/ui/sidebar';

const Header: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { toggleSidebar } = useSidebar();
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Track scroll for shadow effect
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
          ? "py-2 bg-background shadow-subtle" 
          : "py-3 bg-gradient-primary"
      )}
    >
      <div className="relative container mx-auto px-4">
        {/* Wave pattern overlay */}
        <div 
          className={cn(
            "absolute inset-0 pointer-events-none overflow-hidden",
            isScrolled ? "opacity-0" : "opacity-100",
            "transition-opacity duration-300"
          )}
          aria-hidden="true"
        >
          <svg 
            className="absolute bottom-0 w-full h-24 transform translate-y-1/3" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 320"
          >
            <path 
              fill="rgba(255,255,255,0.1)" 
              fillOpacity="1" 
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,117.3C672,107,768,117,864,138.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <span className={cn(
              "inline-flex items-center justify-center w-8 h-8 rounded-xl mr-2",
              isScrolled ? "bg-primary/10" : "bg-white/20"
            )}>
              <BookOpen className={cn(
                "h-5 w-5", 
                isScrolled ? "text-primary" : "text-white"
              )} />
            </span>
            <h1 className={cn(
              "text-lg font-semibold",
              isScrolled ? "text-foreground" : "text-white"
            )}>
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => window.location.href = '/settings'} 
              className={cn(
                "p-2 rounded-full",
                isScrolled ? "text-muted-foreground hover:bg-muted" : "text-white/80 hover:bg-white/10"
              )}
            >
              <Settings className="h-5 w-5" />
            </button>
            
            <Avatar className={cn(
              "h-8 w-8 ring-2",
              isScrolled ? "ring-primary/20" : "ring-white/30"
            )}>
              <AvatarImage src={user.photoURL || ""} alt={user.name} />
              <AvatarFallback className={cn(
                "font-medium",
                isScrolled ? "bg-primary text-primary-foreground" : "bg-white/20 text-white"
              )}>
                {user.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
