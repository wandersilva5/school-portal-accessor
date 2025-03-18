
import axios from 'axios';
import { auth } from './auth';
import { toast } from 'sonner';

// Create axios instance
const instance = axios.create({
  // In a real app, this would be your actual API URL
  baseURL: 'https://api.example-school-portal.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to add authentication token to requests
instance.interceptors.request.use(
  (config) => {
    const token = auth.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add interceptor to handle response errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle authentication errors
    if (response && response.status === 401) {
      toast.error('Sua sessão expirou. Por favor, faça login novamente.');
      auth.logout();
      window.location.href = '/login';
    }
    
    // Handle server errors
    else if (response && response.status >= 500) {
      toast.error('Erro no servidor. Por favor, tente novamente mais tarde.');
    }
    
    // Handle other client errors
    else if (response && response.data && response.data.message) {
      toast.error(response.data.message);
    } else {
      toast.error('Ocorreu um erro. Por favor, tente novamente.');
    }
    
    return Promise.reject(error);
  }
);

// For mocking API responses during development
const mockResponses = {
  // Student schedule
  getStudentSchedule: () => {
    return [
      { day: 'Segunda-feira', periods: [
        { time: '7:30 - 8:20', subject: 'Matemática', teacher: 'Maria Oliveira', room: '101' },
        { time: '8:20 - 9:10', subject: 'Português', teacher: 'Ana Santos', room: '102' },
        { time: '9:10 - 10:00', subject: 'História', teacher: 'Pedro Costa', room: '103' },
        { time: '10:20 - 11:10', subject: 'Geografia', teacher: 'Carla Lima', room: '104' },
        { time: '11:10 - 12:00', subject: 'Ciências', teacher: 'Bruno Dias', room: '105' },
      ]},
      { day: 'Terça-feira', periods: [
        { time: '7:30 - 8:20', subject: 'Português', teacher: 'Ana Santos', room: '102' },
        { time: '8:20 - 9:10', subject: 'Física', teacher: 'Maria Oliveira', room: '106' },
        { time: '9:10 - 10:00', subject: 'Educação Física', teacher: 'Rafael Sousa', room: 'Quadra' },
        { time: '10:20 - 11:10', subject: 'Inglês', teacher: 'Júlia Mendes', room: '107' },
        { time: '11:10 - 12:00', subject: 'Artes', teacher: 'Fernanda Gomes', room: '108' },
      ]},
      { day: 'Quarta-feira', periods: [
        { time: '7:30 - 8:20', subject: 'Matemática', teacher: 'Maria Oliveira', room: '101' },
        { time: '8:20 - 9:10', subject: 'Química', teacher: 'Roberto Alves', room: '109' },
        { time: '9:10 - 10:00', subject: 'Biologia', teacher: 'Camila Rocha', room: '110' },
        { time: '10:20 - 11:10', subject: 'História', teacher: 'Pedro Costa', room: '103' },
        { time: '11:10 - 12:00', subject: 'Geografia', teacher: 'Carla Lima', room: '104' },
      ]},
      { day: 'Quinta-feira', periods: [
        { time: '7:30 - 8:20', subject: 'Física', teacher: 'Maria Oliveira', room: '106' },
        { time: '8:20 - 9:10', subject: 'Matemática', teacher: 'Maria Oliveira', room: '101' },
        { time: '9:10 - 10:00', subject: 'Português', teacher: 'Ana Santos', room: '102' },
        { time: '10:20 - 11:10', subject: 'Educação Física', teacher: 'Rafael Sousa', room: 'Quadra' },
        { time: '11:10 - 12:00', subject: 'Inglês', teacher: 'Júlia Mendes', room: '107' },
      ]},
      { day: 'Sexta-feira', periods: [
        { time: '7:30 - 8:20', subject: 'Química', teacher: 'Roberto Alves', room: '109' },
        { time: '8:20 - 9:10', subject: 'Biologia', teacher: 'Camila Rocha', room: '110' },
        { time: '9:10 - 10:00', subject: 'Filosofia', teacher: 'Marcos Vieira', room: '111' },
        { time: '10:20 - 11:10', subject: 'Sociologia', teacher: 'Patrícia Ramos', room: '112' },
        { time: '11:10 - 12:00', subject: 'Literatura', teacher: 'Ana Santos', room: '102' },
      ]},
    ];
  },
  
  // Teacher schedule
  getTeacherSchedule: () => {
    return [
      { day: 'Segunda-feira', periods: [
        { time: '7:30 - 8:20', subject: 'Matemática', class: '9º Ano A', room: '101' },
        { time: '8:20 - 9:10', subject: 'Matemática', class: '9º Ano B', room: '101' },
        { time: '9:10 - 10:00', subject: 'Física', class: '3º Ano A', room: '106' },
        { time: '10:20 - 11:10', subject: 'Física', class: '3º Ano B', room: '106' },
        { time: '11:10 - 12:00', subject: 'Matemática', class: '8º Ano A', room: '101' },
      ]},
      { day: 'Terça-feira', periods: [
        { time: '7:30 - 9:10', subject: 'Coordenação', class: '-', room: 'Sala dos Professores' },
        { time: '9:10 - 10:00', subject: 'Física', class: '2º Ano A', room: '106' },
        { time: '10:20 - 11:10', subject: 'Física', class: '2º Ano B', room: '106' },
        { time: '11:10 - 12:00', subject: 'Matemática', class: '7º Ano A', room: '101' },
      ]},
      { day: 'Quarta-feira', periods: [
        { time: '7:30 - 8:20', subject: 'Matemática', class: '8º Ano B', room: '101' },
        { time: '8:20 - 9:10', subject: 'Matemática', class: '7º Ano B', room: '101' },
        { time: '9:10 - 10:00', subject: 'Física', class: '1º Ano A', room: '106' },
        { time: '10:20 - 12:00', subject: 'Reunião de Departamento', class: '-', room: 'Sala de Reuniões' },
      ]},
      { day: 'Quinta-feira', periods: [
        { time: '7:30 - 8:20', subject: 'Física', class: '1º Ano B', room: '106' },
        { time: '8:20 - 9:10', subject: 'Matemática', class: '6º Ano A', room: '101' },
        { time: '9:10 - 10:00', subject: 'Matemática', class: '6º Ano B', room: '101' },
        { time: '10:20 - 12:00', subject: 'Planejamento', class: '-', room: 'Sala dos Professores' },
      ]},
      { day: 'Sexta-feira', periods: [
        { time: '7:30 - 9:10', subject: 'Orientação de Projetos', class: 'Clube de Ciências', room: 'Laboratório' },
        { time: '9:10 - 10:00', subject: 'Física', class: '3º Ano A', room: '106' },
        { time: '10:20 - 11:10', subject: 'Física', class: '2º Ano A', room: '106' },
        { time: '11:10 - 12:00', subject: 'Matemática', class: '9º Ano A', room: '101' },
      ]},
    ];
  },
  
  // Student grades
  getStudentGrades: () => {
    return [
      {
        subject: 'Matemática',
        teacher: 'Maria Oliveira',
        grades: [
          { term: '1º Bimestre', assessment: 'Prova 1', grade: 8.5, maxGrade: 10 },
          { term: '1º Bimestre', assessment: 'Trabalho', grade: 9.0, maxGrade: 10 },
          { term: '1º Bimestre', assessment: 'Participação', grade: 8.0, maxGrade: 10 },
          { term: '2º Bimestre', assessment: 'Prova 1', grade: 7.5, maxGrade: 10 },
          { term: '2º Bimestre', assessment: 'Trabalho', grade: 9.5, maxGrade: 10 },
        ],
        average: 8.5
      },
      {
        subject: 'Português',
        teacher: 'Ana Santos',
        grades: [
          { term: '1º Bimestre', assessment: 'Prova 1', grade: 7.0, maxGrade: 10 },
          { term: '1º Bimestre', assessment: 'Redação', grade: 8.5, maxGrade: 10 },
          { term: '1º Bimestre', assessment: 'Seminário', grade: 9.0, maxGrade: 10 },
          { term: '2º Bimestre', assessment: 'Prova 1', grade: 8.0, maxGrade: 10 },
          { term: '2º Bimestre', assessment: 'Redação', grade: 8.0, maxGrade: 10 },
        ],
        average: 8.1
      },
      {
        subject: 'História',
        teacher: 'Pedro Costa',
        grades: [
          { term: '1º Bimestre', assessment: 'Prova 1', grade: 9.0, maxGrade: 10 },
          { term: '1º Bimestre', assessment: 'Trabalho', grade: 8.5, maxGrade: 10 },
          { term: '1º Bimestre', assessment: 'Debate', grade: 9.5, maxGrade: 10 },
          { term: '2º Bimestre', assessment: 'Prova 1', grade: 8.5, maxGrade: 10 },
          { term: '2º Bimestre', assessment: 'Trabalho', grade: 9.0, maxGrade: 10 },
        ],
        average: 8.9
      },
      {
        subject: 'Geografia',
        teacher: 'Carla Lima',
        grades: [
          { term: '1º Bimestre', assessment: 'Prova 1', grade: 7.5, maxGrade: 10 },
          { term: '1º Bimestre', assessment: 'Trabalho', grade: 8.0, maxGrade: 10 },
          { term: '1º Bimestre', assessment: 'Atividade', grade: 8.5, maxGrade: 10 },
          { term: '2º Bimestre', assessment: 'Prova 1', grade: 8.0, maxGrade: 10 },
        ],
        average: 8.0
      },
      {
        subject: 'Ciências',
        teacher: 'Bruno Dias',
        grades: [
          { term: '1º Bimestre', assessment: 'Prova 1', grade: 9.0, maxGrade: 10 },
          { term: '1º Bimestre', assessment: 'Experimento', grade: 10.0, maxGrade: 10 },
          { term: '1º Bimestre', assessment: 'Relatório', grade: 8.5, maxGrade: 10 },
          { term: '2º Bimestre', assessment: 'Prova 1', grade: 8.0, maxGrade: 10 },
          { term: '2º Bimestre', assessment: 'Experimento', grade: 9.5, maxGrade: 10 },
        ],
        average: 9.0
      },
    ];
  },
  
  // Class grades (for teachers)
  getClassGrades: (className: string) => {
    return {
      className: className,
      subject: 'Matemática',
      students: [
        { 
          id: '001', 
          name: 'Ana Beatriz', 
          grades: [
            { assessment: 'Prova 1', grade: 8.5 },
            { assessment: 'Trabalho', grade: 9.0 },
            { assessment: 'Participação', grade: 8.0 },
          ],
          average: 8.5
        },
        { 
          id: '002', 
          name: 'Bruno Cardoso', 
          grades: [
            { assessment: 'Prova 1', grade: 7.0 },
            { assessment: 'Trabalho', grade: 8.0 },
            { assessment: 'Participação', grade: 9.0 },
          ],
          average: 8.0
        },
        { 
          id: '003', 
          name: 'Carolina Duarte', 
          grades: [
            { assessment: 'Prova 1', grade: 9.5 },
            { assessment: 'Trabalho', grade: 9.0 },
            { assessment: 'Participação', grade: 8.5 },
          ],
          average: 9.0
        },
        { 
          id: '004', 
          name: 'Daniel Esteves', 
          grades: [
            { assessment: 'Prova 1', grade: 6.5 },
            { assessment: 'Trabalho', grade: 7.0 },
            { assessment: 'Participação', grade: 8.0 },
          ],
          average: 7.2
        },
        { 
          id: '005', 
          name: 'Eduarda Freitas', 
          grades: [
            { assessment: 'Prova 1', grade: 8.0 },
            { assessment: 'Trabalho', grade: 8.5 },
            { assessment: 'Participação', grade: 9.0 },
          ],
          average: 8.5
        },
      ]
    };
  },
  
  // Announcements
  getAnnouncements: () => {
    return [
      {
        id: '1',
        title: 'Suspensão de Aulas - Recesso',
        content: 'Informamos que não haverá aula nos dias 20 e 21 de outubro devido ao recesso escolar. As atividades retornarão normalmente no dia 22/10.',
        author: 'Coordenação Pedagógica',
        date: '2023-10-15T10:30:00',
        tags: ['recesso', 'calendário'],
        important: true
      },
      {
        id: '2',
        title: 'Feira de Ciências - Inscrições Abertas',
        content: 'Estão abertas as inscrições para a Feira de Ciências que ocorrerá no dia 15/11. Os alunos interessados devem procurar seus professores de Ciências, Física, Química ou Biologia para orientações sobre os projetos.',
        author: 'Departamento de Ciências',
        date: '2023-10-10T14:15:00',
        tags: ['feira', 'ciências', 'inscrições'],
        important: true
      },
      {
        id: '3',
        title: 'Palestra sobre Profissões',
        content: 'No próximo dia 25/10, teremos uma palestra sobre carreiras e profissões voltada para os alunos do Ensino Médio. Confirme sua presença com o orientador educacional.',
        author: 'Serviço de Orientação Educacional',
        date: '2023-10-08T09:45:00',
        tags: ['palestra', 'carreiras', 'orientação'],
        important: false
      },
      {
        id: '4',
        title: 'Reunião de Pais e Mestres',
        content: 'A próxima reunião de pais e mestres será realizada no dia 28/10, sábado, das 9h às 12h. É importante a presença de todos os responsáveis para acompanhamento do desempenho escolar.',
        author: 'Direção Escolar',
        date: '2023-10-05T16:20:00',
        tags: ['reunião', 'pais', 'responsáveis'],
        important: true
      },
      {
        id: '5',
        title: 'Campeonato Interclasses',
        content: 'O Campeonato Interclasses de Futsal começará no dia 30/10. Os times devem ser inscritos com o professor de Educação Física até o dia 20/10.',
        author: 'Departamento de Educação Física',
        date: '2023-10-03T11:10:00',
        tags: ['esporte', 'campeonato', 'futsal'],
        important: false
      },
      {
        id: '6',
        title: 'Novo Sistema de Entrada e Saída',
        content: 'A partir do dia 01/11, o acesso à escola será feito apenas mediante apresentação da carteirinha estudantil. Os alunos que ainda não possuem devem procurar a secretaria.',
        author: 'Administração Escolar',
        date: '2023-09-28T08:30:00',
        tags: ['segurança', 'acesso', 'carteirinha'],
        important: true
      },
    ];
  },
};

export const api = {
  get: async (url: string, config = {}) => {
    try {
      // In a real app, this would call the actual API
      // return await instance.get(url, config);
      
      // For testing purposes, return mock data
      switch (url) {
        case '/student/schedule':
          return { data: mockResponses.getStudentSchedule() };
        case '/teacher/schedule':
          return { data: mockResponses.getTeacherSchedule() };
        case '/student/grades':
          return { data: mockResponses.getStudentGrades() };
        case '/announcements':
          return { data: mockResponses.getAnnouncements() };
        default:
          return { data: {} };
      }
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      throw error;
    }
  },
  
  post: async (url: string, data = {}, config = {}) => {
    try {
      // In a real app, this would call the actual API
      // return await instance.post(url, data, config);
      
      // For testing, just log and return mock data
      console.log(`POST to ${url} with data:`, data);
      return { data: { success: true } };
    } catch (error) {
      console.error(`Error posting to ${url}:`, error);
      throw error;
    }
  },
  
  put: async (url: string, data = {}, config = {}) => {
    try {
      // In a real app, this would call the actual API
      // return await instance.put(url, data, config);
      
      // For testing, just log and return mock data
      console.log(`PUT to ${url} with data:`, data);
      return { data: { success: true } };
    } catch (error) {
      console.error(`Error updating ${url}:`, error);
      throw error;
    }
  },
  
  delete: async (url: string, config = {}) => {
    try {
      // In a real app, this would call the actual API
      // return await instance.delete(url, config);
      
      // For testing, just log and return mock data
      console.log(`DELETE to ${url}`);
      return { data: { success: true } };
    } catch (error) {
      console.error(`Error deleting ${url}:`, error);
      throw error;
    }
  }
};
