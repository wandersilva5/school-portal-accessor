import { User, LoginResponse, StudentData } from '@/types';
import { api } from './api';
import { toast } from 'sonner';

// Simulated token storage for local development
const TOKEN_KEY = 'school_portal_token';
const USER_KEY = 'school_portal_user';

export const auth = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
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
        },
        { 
          id: '4', 
          email: 'responsavel@escola.com', 
          password: 'senha123', 
          name: 'Ana Pereira',
          role: 'guardian',
          guardianId: 'G20230001',
          children: ['1', '5'],
          childrenData: [
            {
              id: '1',
              name: 'João Silva',
              class: '9º Ano A',
              enrollmentId: '20230001',
              photoURL: null
            },
            {
              id: '5',
              name: 'Maria Silva',
              class: '7º Ano B',
              enrollmentId: '20230005',
              photoURL: null
            }
          ],
          photoURL: null
        },
        { 
          id: '5', 
          email: 'aluno2@escola.com', 
          password: 'senha123', 
          name: 'Maria Silva',
          role: 'student',
          enrollmentId: '20230005',
          class: '7º Ano B',
          photoURL: null
        },
        { 
          id: '5', 
          email: 'secretaria@escola.com', 
          password: 'senha123', 
          name: 'Ana Rodrigues',
          role: 'secretary',
          adminId: 'S20230002',
          department: 'Secretaria Acadêmica',
          photoURL: null
        }
      ];

      const user = mockUsers.find(u => u.email === email);
      
      if (!user || user.password !== password) {
        throw new Error('Credenciais inválidas');
      }

      const token = `mock_token_${Date.now()}`;
      
      const { password: _, ...userWithoutPassword } = user;
      
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
  
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
  
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
  
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
};
