
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import GlassCard from '@/components/ui-custom/GlassCard';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScheduleDay } from '@/types';

const Schedule: React.FC = () => {
  const { user } = useAuth();
  const [activeDay, setActiveDay] = useState<string>(() => {
    const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const today = weekdays[new Date().getDay()];
    return today === 'Domingo' || today === 'Sábado' ? 'Segunda-feira' : today;
  });
  
  // Fetch schedule data
  const { data: scheduleData, isLoading } = useQuery({
    queryKey: ['schedule', user?.role],
    queryFn: async () => {
      const endpoint = user?.role === 'teacher' ? '/teacher/schedule' : '/student/schedule';
      const response = await api.get(endpoint);
      return response.data as ScheduleDay[];
    },
  });
  
  // Get the schedule for the active day
  const activeDaySchedule = scheduleData?.find(day => day.day === activeDay)?.periods || [];
  
  return (
    <>
      <Header />
      <PageTransition>
        <main className="min-h-screen pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Horário de Aulas</h1>
                <p className="text-muted-foreground">
                  {user?.role === 'student' 
                    ? `Visualize seu horário de aulas da turma ${user.class}`
                    : 'Visualize sua grade de horários'
                  }
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="p-2 bg-primary/10 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ano Letivo</p>
                  <p className="font-medium">2023/2024</p>
                </div>
              </div>
            </div>
            
            {/* Schedule tabs and content */}
            <GlassCard className="overflow-hidden animate-slide-up">
              <Tabs defaultValue={activeDay} onValueChange={setActiveDay}>
                <TabsList className="grid grid-cols-5 mb-6">
                  {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'].map((day) => (
                    <TabsTrigger 
                      key={day} 
                      value={day}
                      className={cn(
                        "data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                      )}
                    >
                      {day.split('-')[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'].map((day) => (
                  <TabsContent key={day} value={day} className="space-y-6 animate-fade-in">
                    <div className="flex items-center mb-4">
                      <h2 className="text-lg font-semibold">{day}</h2>
                    </div>
                    
                    {isLoading ? (
                      <div className="flex justify-center p-12">
                        <div className="animate-pulse-subtle">Carregando horário...</div>
                      </div>
                    ) : activeDaySchedule.length > 0 ? (
                      <div className="space-y-4">
                        {activeDaySchedule.map((period, index) => (
                          <div
                            key={`${day}-${period.time}`}
                            className={cn(
                              "relative rounded-xl overflow-hidden bg-background/50 hover:bg-background transition-all duration-300",
                              "border border-border/50"
                            )}
                          >
                            {/* Time column */}
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/6 p-4 md:p-6 bg-primary/5 flex flex-row md:flex-col justify-between items-center md:items-start">
                                <div className="flex items-center md:mb-2">
                                  <Clock className="h-4 w-4 text-primary mr-2 md:mr-0 md:mb-2" />
                                  <span className="text-sm md:text-base font-medium">{period.time}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 text-muted-foreground mr-2 md:mr-0 md:mb-2" />
                                  <span className="text-sm text-muted-foreground">Sala {period.room}</span>
                                </div>
                              </div>
                              
                              {/* Content column */}
                              <div className="flex-1 p-4 md:p-6">
                                <div className="mb-2">
                                  <h3 className="text-lg font-semibold mb-1">{period.subject}</h3>
                                  <div className="flex items-center text-muted-foreground">
                                    <User className="h-4 w-4 mr-2" />
                                    <span>
                                      {user?.role === 'student' ? period.teacher : `Turma ${period.class}`}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        Não há aulas programadas para este dia.
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </GlassCard>
            
            {/* Legend */}
            <div className="mt-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <h3 className="text-sm font-medium mb-2">Legenda</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                  <span className="text-sm text-muted-foreground">Aula Regular</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
                  <span className="text-sm text-muted-foreground">Laboratório</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></div>
                  <span className="text-sm text-muted-foreground">Educação Física</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-pink-400 mr-2"></div>
                  <span className="text-sm text-muted-foreground">Artes</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default Schedule;
