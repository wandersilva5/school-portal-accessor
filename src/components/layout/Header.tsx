
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { 
  BookOpen, 
  Calendar, 
  ChevronDown, 
  LogOut, 
  Menu, 
  MessageSquare, 
  User, 
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <BookOpen className="h-4 w-4 mr-1" /> },
    { name: 'Horário', path: '/schedule', icon: <Calendar className="h-4 w-4 mr-1" /> },
    { name: 'Notas', path: '/grades', icon: <BookOpen className="h-4 w-4 mr-1" /> },
    { name: 'Avisos', path: '/announcements', icon: <MessageSquare className="h-4 w-4 mr-1" /> },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled ? "py-2 glass shadow-subtle backdrop-blur-lg" : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/dashboard" 
          className="text-primary font-bold text-xl flex items-center"
        >
          <span className="inline-block mr-2">
            <BookOpen className="h-6 w-6" />
          </span>
          <span className={cn(
            "transition-all duration-300", 
            isScrolled ? "translate-y-0 opacity-100" : ""
          )}>
            Portal Escolar
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-all",
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        {/* User Menu (Desktop) */}
        {user && (
          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.photoURL || ""} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground mt-1">
                      {user.role === 'student' ? 'Estudante' : 'Professor'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden transition-opacity duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-lg p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <Link 
                to="/dashboard" 
                className="text-primary font-bold text-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portal Escolar
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full p-1 hover:bg-accent"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {user && (
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={user.photoURL || ""} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {user.role === 'student' ? 'Estudante' : 'Professor'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-3 py-3 rounded-lg font-medium flex items-center transition-all",
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span className="ml-2">{link.name}</span>
                </Link>
              ))}
              <Link
                to="/profile"
                className={cn(
                  "px-3 py-3 rounded-lg font-medium flex items-center transition-all",
                  location.pathname === "/profile"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                <span className="ml-2">Perfil</span>
              </Link>

              <button
                onClick={handleLogout}
                className="mt-6 px-3 py-3 rounded-lg font-medium flex items-center text-destructive hover:bg-destructive/10 transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-2">Sair</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
