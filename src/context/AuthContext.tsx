
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginResponse } from '@/types';
import { auth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = () => {
      setLoading(true);
      try {
        if (auth.isAuthenticated()) {
          const currentUser = auth.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // If there's an error, clear the auth state
        auth.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response: LoginResponse = await auth.login(email, password);
      setUser(response.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    auth.logout();
    setUser(null);
    navigate('/login');
  };
  
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
