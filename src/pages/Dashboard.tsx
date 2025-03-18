
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import GlassCard from '@/components/ui-custom/GlassCard';
import { 
  BarChart, 
  Bell, 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  GraduationCap, 
  Users 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Announcement, ScheduleDay, SubjectGrades } from '@/types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  
  // Get current time-based greeting
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      let greetingText = '';
      
      if (hour >= 5 && hour < 12) {
        greetingText = 'Bom dia';
      } else if (hour >= 12 && hour < 18) {
        greetingText = 'Boa tarde';
      } else {
        greetingText = 'Boa noite';
      }
      
      setGreeting(greetingText);
      
      // Format current date
      const now = new Date();
      const formattedDate = format(now, "EEEE, d 'de' MMMM", { locale: ptBR });
      setCurrentDate(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
    };
    
    updateGreeting();
    
    // Update every minute
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);
  
  // Fetch schedule
  const { data: scheduleData } = useQuery({
    queryKey: ['schedule', user?.role],
    queryFn: async () => {
      const endpoint = user?.role === 'teacher' ? '/teacher/schedule' : '/student/schedule';
      const response = await api.get(endpoint);
      return response.data as ScheduleDay[];
    },
  });
  
  // Fetch grades
  const { data: gradesData } = useQuery({
    queryKey: ['grades', user?.role],
    queryFn: async () => {
      if (user?.role !== 'student') return null;
      const response = await api.get('/student/grades');
      return response.data as SubjectGrades[];
    },
    enabled: user?.role === 'student',
  });
  
  // Fetch announcements
  const { data: announcementsData } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const response = await api.get('/announcements');
      return response.data as Announcement[];
    },
  });
  
  // Get today's schedule
  const getTodaySchedule = () => {
    if (!scheduleData) return [];
    
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const today = days[new Date().getDay()];
    
    const todaySchedule = scheduleData.find(day => day.day === today);
    return todaySchedule?.periods || [];
  };
  
  // Get important announcements
  const getImportantAnnouncements = () => {
    if (!announcementsData) return [];
    
    return announcementsData
      .filter(announcement => announcement.important)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  };
  
  // Calculate performance
  const calculatePerformance = () => {
    if (!gradesData || gradesData.length === 0) return { average: 0, above: 0, below: 0 };
    
    const totalAverage = gradesData.reduce((sum, subject) => sum + subject.average, 0) / gradesData.length;
    const aboveAverage = gradesData.filter(subject => subject.average >= 7).length;
    const belowAverage = gradesData.filter(subject => subject.average < 7).length;
    
    return {
      average: totalAverage,
      above: aboveAverage,
      below: belowAverage
    };
  };
  
  const performance = calculatePerformance();
  const todaySchedule = getTodaySchedule();
  const importantAnnouncements = getImportantAnnouncements();

  return (
    <>
      <Header />
      <PageTransition>
        <main className="min-h-screen pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Welcome section */}
            <section className="mb-10">
              <div className="flex flex-col items-start">
                <span className="text-sm text-muted-foreground font-medium mb-1 animate-fade-in">
                  {currentDate}
                </span>
                <h1 className="text-3xl font-bold text-foreground mb-2 animate-slide-up">
                  {greeting}, {user?.name?.split(' ')[0]}
                </h1>
                <p className="text-muted-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
                  {user?.role === 'student' 
                    ? `Turma: ${user.class}` 
                    : user?.role === 'teacher' 
                      ? `Professor de ${user.subjects?.join(', ')}` 
                      : 'Administrador'}
                </p>
              </div>
            </section>
            
            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Today's Schedule Card */}
              <GlassCard className="md:col-span-2 overflow-hidden" hover>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-semibold text-lg">Horário de Hoje</h2>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full font-medium">
                    {todaySchedule.length} aulas
                  </span>
                </div>
                
                <div className="space-y-3">
                  {todaySchedule.length > 0 ? (
                    todaySchedule.map((period, index) => (
                      <div
                        key={`${period.time}-${index}`}
                        className={cn(
                          "flex items-center p-3 rounded-lg transition-all animate-slide-up",
                          "bg-background/50 hover:bg-background"
                        )}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="mr-3 p-2 bg-primary/10 rounded-full">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <p className="font-medium truncate">{period.subject}</p>
                            <span className="text-sm text-muted-foreground">
                              {user?.role === 'student' ? period.teacher : period.class}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-1 text-sm">
                            <span className="text-muted-foreground">{period.time}</span>
                            <span className="text-muted-foreground">Sala {period.room}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground bg-background/50 rounded-lg animate-fade-in">
                      Não há aulas programadas para hoje.
                    </div>
                  )}
                </div>
              </GlassCard>
              
              {/* Announcements Card */}
              <GlassCard className="overflow-hidden" hover>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-semibold text-lg">Avisos Importantes</h2>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {importantAnnouncements.length > 0 ? (
                    importantAnnouncements.map((announcement, index) => (
                      <div
                        key={announcement.id}
                        className="p-3 rounded-lg bg-background/50 hover:bg-background transition-all animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <p className="font-medium line-clamp-1">{announcement.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{announcement.content}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(announcement.date), 'dd/MM/yyyy')}
                          </span>
                          <span className="text-xs text-primary font-medium hover:underline cursor-pointer">
                            Ler mais
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground bg-background/50 rounded-lg animate-fade-in">
                      Não há avisos importantes no momento.
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>
            
            {/* Additional content based on user role */}
            {user?.role === 'student' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Academic Performance */}
                <GlassCard hover>
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-semibold text-lg">Desempenho Acadêmico</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Média Geral</span>
                        <span className={cn(
                          "font-semibold",
                          performance.average >= 7 ? "text-green-600" : "text-destructive"
                        )}>
                          {performance.average.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-background/50">
                        <span className="block text-sm text-muted-foreground">Acima da Média</span>
                        <span className="text-xl font-semibold text-green-600">{performance.above}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50">
                        <span className="block text-sm text-muted-foreground">Abaixo da Média</span>
                        <span className="text-xl font-semibold text-destructive">{performance.below}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
                
                {/* Quick Access */}
                <GlassCard className="md:col-span-2" hover>
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-semibold text-lg">Acesso Rápido</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { icon: FileText, title: 'Boletim' },
                      { icon: Calendar, title: 'Calendário' },
                      { icon: Users, title: 'Professores' },
                      { icon: GraduationCap, title: 'Biblioteca' }
                    ].map((item, index) => (
                      <div 
                        key={item.title} 
                        className="p-4 rounded-lg bg-background/50 hover:bg-background transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="p-2 bg-primary/10 rounded-full">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium text-sm text-center">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            )}
            
            {user?.role === 'teacher' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Classes Overview */}
                <GlassCard className="md:col-span-2" hover>
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-semibold text-lg">Turmas</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['9º Ano A', '9º Ano B', '8º Ano A', '8º Ano B', '7º Ano A', '7º Ano B'].map((className, index) => (
                      <div 
                        key={className} 
                        className="p-4 rounded-lg bg-background/50 hover:bg-background transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="p-2 bg-primary/10 rounded-full">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium text-sm text-center">{className}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
                
                {/* Quick Actions */}
                <GlassCard hover>
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-semibold text-lg">Ações Rápidas</h2>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { title: 'Lançar Notas', description: 'Registre avaliações' },
                      { title: 'Registrar Presença', description: 'Controle de frequência' },
                      { title: 'Material Didático', description: 'Compartilhe recursos' },
                      { title: 'Criar Aviso', description: 'Comunique-se com alunos' }
                    ].map((action, index) => (
                      <div 
                        key={action.title} 
                        className="p-3 rounded-lg bg-background/50 hover:bg-background transition-all cursor-pointer animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <p className="font-medium">{action.title}</p>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            )}
            
            {user?.role === 'admin' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* School Overview */}
                <GlassCard className="md:col-span-3" hover>
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-semibold text-lg">Visão Geral da Escola</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { title: 'Alunos', count: '850', icon: Users },
                      { title: 'Professores', count: '45', icon: GraduationCap },
                      { title: 'Turmas', count: '32', icon: BookOpen },
                      { title: 'Frequência', count: '94%', icon: FileText }
                    ].map((stat, index) => (
                      <div 
                        key={stat.title} 
                        className="p-4 rounded-lg bg-background/50 hover:bg-background transition-all animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{stat.title}</span>
                          <div className="p-2 bg-primary/10 rounded-full">
                            <stat.icon className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <p className="text-2xl font-bold">{stat.count}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
                
                {/* Admin Actions */}
                <GlassCard className="md:col-span-2" hover>
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-semibold text-lg">Gerenciamento</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { title: 'Usuários', description: 'Gerenciar contas' },
                      { title: 'Turmas', description: 'Configurar turmas' },
                      { title: 'Calendário', description: 'Eventos escolares' },
                      { title: 'Comunicados', description: 'Enviar avisos' }
                    ].map((action, index) => (
                      <div 
                        key={action.title} 
                        className="p-3 rounded-lg bg-background/50 hover:bg-background transition-all cursor-pointer animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <p className="font-medium">{action.title}</p>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
                
                {/* Reports */}
                <GlassCard hover>
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-semibold text-lg">Relatórios</h2>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { title: 'Desempenho Acadêmico' },
                      { title: 'Frequência Escolar' },
                      { title: 'Financeiro' },
                      { title: 'Recursos Humanos' }
                    ].map((report, index) => (
                      <div 
                        key={report.title} 
                        className="p-3 rounded-lg bg-background/50 hover:bg-background transition-all cursor-pointer animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <p className="font-medium">{report.title}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            )}
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default Dashboard;
