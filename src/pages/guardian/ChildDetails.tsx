
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import GlassCard from '@/components/ui-custom/GlassCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  GraduationCap, 
  CalendarDays, 
  BarChart3, 
  Calendar, 
  Clock, 
  Book, 
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  BarChart
} from 'lucide-react';
import { SubjectGrades, ScheduleDay } from '@/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const GuardianChildDetails: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get the child data
  const childData = user?.childrenData?.find(child => child.id === childId);
  
  // Fetch grades data
  const { data: gradesData, isLoading: gradesLoading } = useQuery({
    queryKey: ['grades', childId],
    queryFn: async () => {
      // In a real app, this would fetch the specific child's grades
      const response = await api.get('/student/grades');
      return response.data as SubjectGrades[];
    },
  });
  
  // Fetch schedule data
  const { data: scheduleData, isLoading: scheduleLoading } = useQuery({
    queryKey: ['schedule', childId],
    queryFn: async () => {
      // In a real app, this would fetch the specific child's schedule
      const response = await api.get('/student/schedule');
      return response.data as ScheduleDay[];
    },
  });
  
  // Calculate overall average
  const calculateOverallAverage = () => {
    if (!gradesData || gradesData.length === 0) return 0;
    
    const sum = gradesData.reduce((total, subject) => total + subject.average, 0);
    return sum / gradesData.length;
  };
  
  const overallAverage = calculateOverallAverage();
  
  // Count subjects by performance
  const countSubjectsByPerformance = () => {
    if (!gradesData) return { good: 0, average: 0, risk: 0 };
    
    const good = gradesData.filter(subject => subject.average >= 8).length;
    const average = gradesData.filter(subject => subject.average >= 6 && subject.average < 8).length;
    const risk = gradesData.filter(subject => subject.average < 6).length;
    
    return { good, average, risk };
  };
  
  const performanceCounts = countSubjectsByPerformance();
  
  // Get today's schedule
  const getTodaySchedule = () => {
    if (!scheduleData) return [];
    
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const today = days[new Date().getDay()];
    
    const todaySchedule = scheduleData.find(day => day.day === today);
    return todaySchedule?.periods || [];
  };
  
  const todaySchedule = getTodaySchedule();
  
  if (!childData) {
    return (
      <>
        <Header />
        <PageTransition>
          <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="text-center">
              Estudante não encontrado.
            </div>
          </div>
        </PageTransition>
      </>
    );
  }
  
  return (
    <>
      <Header />
      <PageTransition>
        <main className="min-h-screen pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Back link */}
            <Link to="/guardian/children" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Voltar para a lista</span>
            </Link>
            
            {/* Student info */}
            <GlassCard className="mb-6 animate-slide-up">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <User className="h-12 w-12 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{childData.name}</h1>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center text-muted-foreground">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      <span>Turma: {childData.class}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      <span>Matrícula: {childData.enrollmentId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
            
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="grades">Notas</TabsTrigger>
                <TabsTrigger value="schedule">Horário</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Overall Average */}
                  <GlassCard className="animate-slide-up" hover>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-lg font-semibold">Média Geral</h2>
                      <div className="p-2 bg-primary/10 rounded-full">
                        <BarChart className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center py-4">
                      <div className="text-center">
                        <span className={cn(
                          "text-5xl font-bold",
                          overallAverage >= 8 ? "text-green-600" : 
                          overallAverage >= 6 ? "text-orange-500" : 
                          "text-destructive"
                        )}>
                          {overallAverage.toFixed(1)}
                        </span>
                        <p className="text-muted-foreground mt-2">de 10.0</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Progress value={overallAverage * 10} className="h-2" />
                    </div>
                  </GlassCard>
                  
                  {/* Subjects by Performance */}
                  <GlassCard className="animate-slide-up" style={{ animationDelay: '100ms' }} hover>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-lg font-semibold">Desempenho por Disciplina</h2>
                    </div>
                    
                    <div className="space-y-4 py-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span>Bom (8.0+)</span>
                        </div>
                        <span className="font-semibold">{performanceCounts.good}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <BarChart className="h-4 w-4 text-orange-500 mr-2" />
                          <span>Médio (6.0-7.9)</span>
                        </div>
                        <span className="font-semibold">{performanceCounts.average}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                          <span>Em Risco (0-5.9)</span>
                        </div>
                        <span className="font-semibold">{performanceCounts.risk}</span>
                      </div>
                    </div>
                  </GlassCard>
                  
                  {/* Today's Classes */}
                  <GlassCard className="animate-slide-up" style={{ animationDelay: '200ms' }} hover>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-lg font-semibold">Aulas de Hoje</h2>
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Book className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {todaySchedule.length > 0 ? (
                        todaySchedule.slice(0, 3).map((period, index) => (
                          <div
                            key={`${period.time}-${index}`}
                            className="flex items-center p-2 rounded-lg bg-background/50"
                          >
                            <div className="mr-2 p-1 bg-primary/10 rounded-full">
                              <Clock className="h-3 w-3 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm truncate">{period.subject}</p>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{period.time}</span>
                                <span>Sala {period.room}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-muted-foreground text-sm">
                          Não há aulas programadas para hoje.
                        </div>
                      )}
                      
                      {todaySchedule.length > 3 && (
                        <div className="text-center text-sm text-primary font-medium mt-2">
                          + {todaySchedule.length - 3} mais aulas
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </div>
                
                {/* Recent Activities */}
                <GlassCard className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold">Atividades Recentes</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { 
                        title: 'Prova de Matemática', 
                        description: 'Nota: 8.5/10.0', 
                        date: '2023-10-15', 
                        type: 'grade',
                        icon: <BarChart3 className="h-4 w-4 text-green-600" />
                      },
                      { 
                        title: 'Faltou na aula de Inglês', 
                        description: 'Ausência justificada pelos pais', 
                        date: '2023-10-12', 
                        type: 'absence',
                        icon: <Calendar className="h-4 w-4 text-orange-500" /> 
                      },
                      { 
                        title: 'Trabalho de Ciências', 
                        description: 'Nota: 9.0/10.0', 
                        date: '2023-10-08', 
                        type: 'grade',
                        icon: <BarChart3 className="h-4 w-4 text-green-600" />
                      },
                      { 
                        title: 'Reunião de pais', 
                        description: 'Comparecimento registrado', 
                        date: '2023-10-05', 
                        type: 'meeting',
                        icon: <User className="h-4 w-4 text-primary" />
                      }
                    ].map((activity, index) => (
                      <div 
                        key={`${activity.title}-${index}`}
                        className="p-3 border-l-2 border-primary/30 bg-background/50 rounded-r-lg"
                      >
                        <div className="flex items-start">
                          <div className="p-2 rounded-full bg-muted mr-3">
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{activity.title}</h3>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {format(new Date(activity.date), "dd 'de' MMMM", { locale: ptBR })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </TabsContent>
              
              {/* Grades Tab */}
              <TabsContent value="grades" className="animate-fade-in">
                <GlassCard>
                  {gradesLoading ? (
                    <div className="flex justify-center p-12">
                      <div className="animate-pulse-subtle">Carregando notas...</div>
                    </div>
                  ) : gradesData && gradesData.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Disciplina</th>
                            <th className="text-center py-3 px-4 font-medium text-muted-foreground">Professor</th>
                            <th className="text-right py-3 px-4 font-medium text-muted-foreground">Média</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {gradesData.map((subject) => (
                            <tr 
                              key={subject.subject}
                              className="hover:bg-muted/20 transition-colors"
                            >
                              <td className="py-3 px-4 font-medium">{subject.subject}</td>
                              <td className="py-3 px-4 text-center text-muted-foreground">{subject.teacher}</td>
                              <td className="py-3 px-4 text-right">
                                <span className={cn(
                                  "font-medium",
                                  subject.average >= 8 ? "text-green-600" : 
                                  subject.average >= 6 ? "text-orange-500" : 
                                  "text-destructive"
                                )}>
                                  {subject.average.toFixed(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      Não há notas disponíveis para exibição.
                    </div>
                  )}
                </GlassCard>
              </TabsContent>
              
              {/* Schedule Tab */}
              <TabsContent value="schedule" className="animate-fade-in">
                <GlassCard>
                  {scheduleLoading ? (
                    <div className="flex justify-center p-12">
                      <div className="animate-pulse-subtle">Carregando horário...</div>
                    </div>
                  ) : scheduleData && scheduleData.length > 0 ? (
                    <div className="overflow-x-auto">
                      {scheduleData.map((day) => (
                        <div key={day.day} className="mb-6 last:mb-0">
                          <h3 className="font-semibold text-lg mb-3">{day.day}</h3>
                          <div className="space-y-3">
                            {day.periods.map((period, index) => (
                              <div
                                key={`${day.day}-${period.time}-${index}`}
                                className="flex items-center p-3 rounded-lg bg-background/50"
                              >
                                <div className="mr-3 p-2 bg-primary/10 rounded-full">
                                  <Clock className="h-4 w-4 text-primary" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-col sm:flex-row sm:justify-between">
                                    <p className="font-medium truncate">{period.subject}</p>
                                    <span className="text-sm text-muted-foreground">
                                      {period.teacher}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between mt-1 text-sm">
                                    <span className="text-muted-foreground">{period.time}</span>
                                    <span className="text-muted-foreground">Sala {period.room}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      Não há informações de horário disponíveis.
                    </div>
                  )}
                </GlassCard>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default GuardianChildDetails;
