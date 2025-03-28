
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import GlassCard from '@/components/ui-custom/GlassCard';
import { User, GraduationCap, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

const GuardianChildren: React.FC = () => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'guardian' || !user.childrenData) {
    return (
      <>
        <Header />
        <PageTransition>
          <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="text-center">
              Nenhuma informação de estudante disponível.
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2 animate-slide-up">Meus Filhos</h1>
              <p className="text-muted-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
                Acompanhe o desempenho escolar dos seus filhos
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.childrenData.map((child, index) => (
                <Link to={`/guardian/children/${child.id}`} key={child.id}>
                  <GlassCard 
                    className="animate-slide-up hover:scale-102 transition-transform" 
                    style={{ animationDelay: `${index * 100}ms` }}
                    hover
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-1">{child.name}</h2>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center text-muted-foreground">
                            <GraduationCap className="h-4 w-4 mr-2" />
                            <span>Turma: {child.class}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <CalendarDays className="h-4 w-4 mr-2" />
                            <span>Matrícula: {child.enrollmentId}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                        <span className="text-lg font-medium">→</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default GuardianChildren;
