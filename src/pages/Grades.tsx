
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import GlassCard from '@/components/ui-custom/GlassCard';
import { Book, CheckCircle, BarChart, AlertCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubjectGrades } from '@/types';
import { Progress } from '@/components/ui/progress';

const Grades: React.FC = () => {
  const { user } = useAuth();
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  
  // Fetch grades data
  const { data: gradesData, isLoading } = useQuery({
    queryKey: ['grades'],
    queryFn: async () => {
      const response = await api.get('/student/grades');
      return response.data as SubjectGrades[];
    },
  });
  
  // Set first subject as active after data loads
  React.useEffect(() => {
    if (gradesData && gradesData.length > 0 && !activeSubject) {
      setActiveSubject(gradesData[0].subject);
    }
  }, [gradesData, activeSubject]);
  
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
  
  return (
    <>
      <Header />
      <PageTransition>
        <main className="min-h-screen pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Notas e Avaliações</h1>
                <p className="text-muted-foreground">
                  Acompanhe seu desempenho acadêmico e avaliações
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="p-2 bg-primary/10 rounded-full mr-3">
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ano Letivo</p>
                  <p className="font-medium">2023/2024</p>
                </div>
              </div>
            </div>
            
            {/* Overview cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                  <h2 className="text-lg font-semibold">Disciplinas por Desempenho</h2>
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
              
              {/* Terms Status */}
              <GlassCard className="animate-slide-up" style={{ animationDelay: '200ms' }} hover>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold">Status dos Bimestres</h2>
                </div>
                
                <div className="space-y-4 py-2">
                  <div className="flex items-center justify-between">
                    <span>1º Bimestre</span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Concluído</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>2º Bimestre</span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Em Andamento</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>3º Bimestre</span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Pendente</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>4º Bimestre</span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Pendente</span>
                  </div>
                </div>
              </GlassCard>
            </div>
            
            {/* Detailed grades */}
            <GlassCard className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              {isLoading ? (
                <div className="flex justify-center p-12">
                  <div className="animate-pulse-subtle">Carregando notas...</div>
                </div>
              ) : gradesData && gradesData.length > 0 ? (
                <Tabs defaultValue={activeSubject || ''} onValueChange={(value) => setActiveSubject(value)}>
                  <div className="mb-6 overflow-x-auto">
                    <TabsList className="inline-flex min-w-full">
                      {gradesData.map((subject) => (
                        <TabsTrigger 
                          key={subject.subject} 
                          value={subject.subject}
                          className={cn(
                            "min-w-[150px] data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
                            "flex items-center justify-center"
                          )}
                        >
                          <span className="truncate">{subject.subject}</span>
                          <span 
                            className={cn(
                              "ml-2 w-6 h-6 flex items-center justify-center rounded-full text-xs",
                              subject.average >= 8 ? "bg-green-100 text-green-800" : 
                              subject.average >= 6 ? "bg-orange-100 text-orange-800" : 
                              "bg-red-100 text-red-800"
                            )}
                          >
                            {subject.average.toFixed(1)}
                          </span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  
                  {gradesData.map((subject) => (
                    <TabsContent key={subject.subject} value={subject.subject} className="animate-fade-in">
                      <div className="mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h2 className="text-xl font-semibold">{subject.subject}</h2>
                            <div className="flex items-center mt-1 text-muted-foreground">
                              <User className="h-4 w-4 mr-2" />
                              <span>Professor(a): {subject.teacher}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 flex items-center">
                            <div className="mr-3">
                              <p className="text-sm text-muted-foreground">Média da Disciplina</p>
                              <p className={cn(
                                "text-2xl font-bold",
                                subject.average >= 8 ? "text-green-600" : 
                                subject.average >= 6 ? "text-orange-500" : 
                                "text-destructive"
                              )}>
                                {subject.average.toFixed(1)}
                              </p>
                            </div>
                            <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-muted bg-background shadow-sm"
                              style={{
                                borderColor: 
                                  subject.average >= 8 ? 'rgb(22, 163, 74)' : 
                                  subject.average >= 6 ? 'rgb(249, 115, 22)' : 
                                  'rgb(220, 38, 38)',
                                borderTopColor: 'transparent',
                                transform: `rotate(${45 + (subject.average / 10) * 360}deg)`,
                                transition: 'all 0.5s ease-out'
                              }}
                            >
                              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
                                <span className="text-sm font-medium">
                                  {(subject.average / 10 * 100).toFixed(0)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Bimestre</th>
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Avaliação</th>
                              <th className="text-right py-3 px-4 font-medium text-muted-foreground">Nota</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {subject.grades.map((grade, index) => (
                              <tr 
                                key={`${subject.subject}-${grade.assessment}-${index}`}
                                className="hover:bg-muted/20 transition-colors"
                              >
                                <td className="py-3 px-4">{grade.term}</td>
                                <td className="py-3 px-4">{grade.assessment}</td>
                                <td className="py-3 px-4 text-right">
                                  <span className={cn(
                                    "font-medium",
                                    grade.grade >= 8 ? "text-green-600" : 
                                    grade.grade >= 6 ? "text-orange-500" : 
                                    "text-destructive"
                                  )}>
                                    {grade.grade.toFixed(1)}
                                  </span>
                                  <span className="text-muted-foreground text-sm ml-1">
                                    /{grade.maxGrade}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Não há notas disponíveis para exibição.
                </div>
              )}
            </GlassCard>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default Grades;
