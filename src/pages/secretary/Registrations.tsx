
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import GlassCard from '@/components/ui-custom/GlassCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, FileText, Plus, Filter, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock registration type
interface Registration {
  id: string;
  studentName: string;
  studentId: string;
  class: string;
  academicYear: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  submissionDate: string;
}

const SecretaryRegistrations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedYear, setSelectedYear] = useState<string>('2023/2024');
  
  // Fetch registrations data
  const { data: registrationsData, isLoading } = useQuery({
    queryKey: ['registrations'],
    queryFn: async () => {
      // In a real app, this would fetch from the API
      // Simulated response
      return [
        {
          id: 'REG20230001',
          studentName: 'Carlos Mendes',
          studentId: 'ST00123',
          class: '9º Ano A',
          academicYear: '2023/2024',
          status: 'completed',
          submissionDate: '2023-01-15'
        },
        {
          id: 'REG20230002',
          studentName: 'Ana Beatriz',
          studentId: 'ST00124',
          class: '8º Ano B',
          academicYear: '2023/2024',
          status: 'approved',
          submissionDate: '2023-01-18'
        },
        {
          id: 'REG20230003',
          studentName: 'Roberto Silva',
          studentId: 'ST00125',
          class: '7º Ano C',
          academicYear: '2023/2024',
          status: 'pending',
          submissionDate: '2023-01-20'
        },
        {
          id: 'REG20230004',
          studentName: 'Juliana Pereira',
          studentId: 'ST00126',
          class: '6º Ano A',
          academicYear: '2023/2024',
          status: 'rejected',
          submissionDate: '2023-01-22'
        },
        {
          id: 'REG20230005',
          studentName: 'Lucas Martins',
          studentId: 'ST00127',
          class: '9º Ano B',
          academicYear: '2023/2024',
          status: 'pending',
          submissionDate: '2023-01-25'
        }
      ] as Registration[];
    },
  });
  
  // Filter registrations
  const filteredRegistrations = registrationsData?.filter(reg => {
    const matchesSearch = reg.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          reg.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = activeTab === 'all' ? true : reg.status === activeTab;
    const matchesYear = reg.academicYear === selectedYear;
    return matchesSearch && matchesStatus && matchesYear;
  });
  
  // Count registrations by status
  const getCounts = () => {
    if (!registrationsData) return { all: 0, pending: 0, approved: 0, rejected: 0, completed: 0 };
    
    const filtered = registrationsData.filter(reg => reg.academicYear === selectedYear);
    return {
      all: filtered.length,
      pending: filtered.filter(reg => reg.status === 'pending').length,
      approved: filtered.filter(reg => reg.status === 'approved').length,
      rejected: filtered.filter(reg => reg.status === 'rejected').length,
      completed: filtered.filter(reg => reg.status === 'completed').length
    };
  };
  
  const counts = getCounts();
  
  return (
    <>
      <Header />
      <PageTransition>
        <main className="min-h-screen pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2 animate-slide-up">Matrículas</h1>
              <p className="text-muted-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
                Gerencie as matrículas e renovações
              </p>
            </div>
            
            <GlassCard className="mb-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar matrícula ou aluno" 
                    className="pl-9" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <select 
                      className="h-10 px-4 py-2 rounded-md border border-input bg-background text-sm"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      <option value="2023/2024">Ano Letivo 2023/2024</option>
                      <option value="2022/2023">Ano Letivo 2022/2023</option>
                    </select>
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                  
                  <Button className="flex gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Nova Matrícula</span>
                  </Button>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="all">
                    Todas <Badge variant="secondary" className="ml-2">{counts.all}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    Pendentes <Badge variant="secondary" className="ml-2">{counts.pending}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="approved">
                    Aprovadas <Badge variant="secondary" className="ml-2">{counts.approved}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="rejected">
                    Rejeitadas <Badge variant="secondary" className="ml-2">{counts.rejected}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="completed">
                    Concluídas <Badge variant="secondary" className="ml-2">{counts.completed}</Badge>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="animate-fade-in">
                  {isLoading ? (
                    <div className="flex justify-center p-12">
                      <div className="animate-pulse-subtle">Carregando matrículas...</div>
                    </div>
                  ) : filteredRegistrations && filteredRegistrations.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Aluno</TableHead>
                            <TableHead>Turma</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredRegistrations.map(registration => (
                            <TableRow key={registration.id}>
                              <TableCell className="font-medium">{registration.id}</TableCell>
                              <TableCell>{registration.studentName}</TableCell>
                              <TableCell>{registration.class}</TableCell>
                              <TableCell>{new Date(registration.submissionDate).toLocaleDateString('pt-BR')}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant={
                                    registration.status === 'completed' ? 'default' :
                                    registration.status === 'approved' ? 'success' :
                                    registration.status === 'rejected' ? 'destructive' : 
                                    'outline'
                                  }
                                >
                                  {registration.status === 'completed' ? 'Concluída' :
                                   registration.status === 'approved' ? 'Aprovada' :
                                   registration.status === 'rejected' ? 'Rejeitada' : 
                                   'Pendente'
                                  }
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    Detalhes
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    Documentos
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
                      <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p>Nenhuma matrícula encontrada.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </GlassCard>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default SecretaryRegistrations;
