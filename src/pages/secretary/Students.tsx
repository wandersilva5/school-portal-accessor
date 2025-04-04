
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { User } from '@/types';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import GlassCard from '@/components/ui-custom/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserPlus, GraduationCap, Filter } from 'lucide-react';

const SecretaryStudents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  
  // Fetch students data
  const { data: studentsData, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      // In a real app, this would fetch from the API
      // Simulated response for now
      return [
        {
          id: '1',
          name: 'João Silva',
          email: 'joao.silva@exemplo.com',
          class: '9º Ano A',
          enrollmentId: '20230001',
          role: 'student'
        },
        {
          id: '2', 
          name: 'Maria Santos',
          email: 'maria.santos@exemplo.com',
          class: '9º Ano A',
          enrollmentId: '20230002',
          role: 'student'
        },
        {
          id: '3',
          name: 'Pedro Oliveira',
          email: 'pedro.oliveira@exemplo.com',
          class: '8º Ano B',
          enrollmentId: '20230003',
          role: 'student'
        },
        {
          id: '4',
          name: 'Ana Souza',
          email: 'ana.souza@exemplo.com',
          class: '7º Ano C',
          enrollmentId: '20230004',
          role: 'student'
        },
        {
          id: '5',
          name: 'Lucas Ferreira',
          email: 'lucas.ferreira@exemplo.com',
          class: '8º Ano B',
          enrollmentId: '20230005',
          role: 'student'
        }
      ] as User[];
    },
  });
  
  // Filter students based on search term and selected class
  const filteredStudents = studentsData?.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.enrollmentId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass ? student.class === selectedClass : true;
    return matchesSearch && matchesClass;
  });
  
  // Get unique classes for filter
  const classes = studentsData ? 
    Array.from(new Set(studentsData.map(student => student.class))) : [];
  
  return (
    <>
      <Header />
      <PageTransition>
        <main className="min-h-screen pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2 animate-slide-up">Alunos</h1>
              <p className="text-muted-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
                Gerencie os cadastros de alunos da escola
              </p>
            </div>
            
            <GlassCard className="mb-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar por nome ou matrícula" 
                    className="pl-9" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <select 
                      className="h-10 px-4 py-2 rounded-md border border-input bg-background text-sm"
                      value={selectedClass || ''}
                      onChange={(e) => setSelectedClass(e.target.value || null)}
                    >
                      <option value="">Todas as turmas</option>
                      {classes.map(className => (
                        <option key={className} value={className}>{className}</option>
                      ))}
                    </select>
                    <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                  
                  <Button className="flex gap-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Novo Aluno</span>
                  </Button>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              {isLoading ? (
                <div className="flex justify-center p-12">
                  <div className="animate-pulse-subtle">Carregando dados dos alunos...</div>
                </div>
              ) : filteredStudents && filteredStudents.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Matrícula</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Turma</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map(student => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.enrollmentId}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Editar
                              </Button>
                              <Button variant="outline" size="sm">
                                Detalhes
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p>Nenhum aluno encontrado.</p>
                </div>
              )}
            </GlassCard>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default SecretaryStudents;
