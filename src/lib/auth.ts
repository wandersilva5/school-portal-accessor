
import { User, LoginResponse } from '@/types';
import { api } from './api';
import { toast } from 'sonner';

// Simulated token storage for local development
const TOKEN_KEY = 'school_portal_token';
const USER_KEY = 'school_portal_user';

export const auth = {
  // Login with credentials
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      // In a real app, this would call the API
      // const response = await api.post('/auth/login', { email, password });
      
      // For testing purposes, we'll use mock data
      const mockUsers = [
        { 
          id: '1', 
          email: 'aluno@escola.com', 
          password: 'senha123', 
          name: 'João Silva',
          role: 'student',
          enrollmentId: '20230001',
          class: '9º Ano A',
          photoURL: null
        },
        { 
          id: '2', 
          email: 'professor@escola.com', 
          password: 'senha123', 
          name: 'Maria Oliveira',
          role: 'teacher',
          teacherId: 'T20230001',
          subjects: ['Matemática', 'Física'],
          photoURL: null
        },
        { 
          id: '3', 
          email: 'diretor@escola.com', 
          password: 'senha123', 
          name: 'Carlos Souza',
          role: 'admin',
          adminId: 'A20230001',
          photoURL: null
        }
      ];

      const user = mockUsers.find(u => u.email === email);
      
      if (!user || user.password !== password) {
        throw new Error('Credenciais inválidas');
      }

      // Create a "token"
      const token = `mock_token_${Date.now()}`;
      
      // Remove the password before storing
      const { password: _, ...userWithoutPassword } = user;
      
      // Store in localStorage (in a real app this would be handled more securely)
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));

      return {
        user: userWithoutPassword as User,
        token
      };
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Falha ao fazer login. Verifique suas credenciais.');
      throw error;
    }
  },
  
  // Logout
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
  
  // Get current user
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },
  
  // Get authentication token
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
};
