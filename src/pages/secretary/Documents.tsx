
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import GlassCard from '@/components/ui-custom/GlassCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, FileText, Plus, Download, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';

// Mock document request type
interface DocumentRequest {
  id: string;
  type: 'enrollment' | 'transcript' | 'certificate' | 'transfer' | 'other';
  typeName: string;
  studentName: string;
  studentId: string;
  requestDate: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  urgency: 'normal' | 'urgent';
}

const SecretaryDocuments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Fetch document requests data
  const { data: documentsData, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      // In a real app, this would fetch from the API
      // Simulated response
      return [
        {
          id: 'DOC20230001',
          type: 'enrollment',
          typeName: 'Declaração de Matrícula',
          studentName: 'Maria Silva',
          studentId: 'ST00128',
          requestDate: '2023-09-15',
          status: 'completed',
          urgency: 'normal'
        },
        {
          id: 'DOC20230002',
          type: 'transcript',
          typeName: 'Histórico Escolar',
          studentName: 'João Santos',
          studentId: 'ST00129',
          requestDate: '2023-09-18',
          status: 'processing',
          urgency: 'urgent'
        },
        {
          id: 'DOC20230003',
          type: 'certificate',
          typeName: 'Certificado de Conclusão',
          studentName: 'Ana Oliveira',
          studentId: 'ST00130',
          requestDate: '2023-09-20',
          status: 'pending',
          urgency: 'normal'
        },
        {
          id: 'DOC20230004',
          type: 'transfer',
          typeName: 'Transferência Escolar',
          studentName: 'Carlos Lima',
          studentId: 'ST00131',
          requestDate: '2023-09-22',
          status: 'rejected',
          urgency: 'urgent'
        },
        {
          id: 'DOC20230005',
          type: 'other',
          typeName: 'Atestado de Frequência',
          studentName: 'Patrícia Costa',
          studentId: 'ST00132',
          requestDate: '2023-09-25',
          status: 'pending',
          urgency: 'normal'
        }
      ] as DocumentRequest[];
    },
  });
  
  // Filter documents
  const filteredDocuments = documentsData?.filter(doc => {
    const matchesSearch = doc.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.typeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = activeTab === 'all' ? true : doc.status === activeTab;
    return matchesSearch && matchesStatus;
  });
  
  // Count documents by status
  const getCounts = () => {
    if (!documentsData) return { all: 0, pending: 0, processing: 0, completed: 0, rejected: 0 };
    
    return {
      all: documentsData.length,
      pending: documentsData.filter(doc => doc.status === 'pending').length,
      processing: documentsData.filter(doc => doc.status === 'processing').length,
      completed: documentsData.filter(doc => doc.status === 'completed').length,
      rejected: documentsData.filter(doc => doc.status === 'rejected').length
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
              <h1 className="text-3xl font-bold text-foreground mb-2 animate-slide-up">Documentos</h1>
              <p className="text-muted-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
                Gerencie as solicitações de documentos
              </p>
            </div>
            
            <GlassCard className="mb-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar por aluno ou tipo de documento" 
                    className="pl-9" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Button className="flex gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Novo Documento</span>
                </Button>
              </div>
            </GlassCard>
            
            <GlassCard className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="all">
                    Todos <Badge variant="secondary" className="ml-2">{counts.all}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    Pendentes <Badge variant="secondary" className="ml-2">{counts.pending}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="processing">
                    Em Processo <Badge variant="secondary" className="ml-2">{counts.processing}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="completed">
                    Concluídos <Badge variant="secondary" className="ml-2">{counts.completed}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="rejected">
                    Rejeitados <Badge variant="secondary" className="ml-2">{counts.rejected}</Badge>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="animate-fade-in">
                  {isLoading ? (
                    <div className="flex justify-center p-12">
                      <div className="animate-pulse-subtle">Carregando documentos...</div>
                    </div>
                  ) : filteredDocuments && filteredDocuments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredDocuments.map((document) => (
                        <div 
                          key={document.id} 
                          className="border rounded-lg p-4 bg-card"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium">{document.typeName}</h3>
                              <p className="text-sm text-muted-foreground">{document.studentName}</p>
                            </div>
                            <Badge 
                              variant={
                                document.status === 'completed' ? 'default' :
                                document.status === 'processing' ? 'secondary' :
                                document.status === 'rejected' ? 'destructive' : 
                                'outline'
                              }
                            >
                              {document.status === 'completed' ? 'Concluído' :
                               document.status === 'processing' ? 'Em Processo' :
                               document.status === 'rejected' ? 'Rejeitado' : 
                               'Pendente'
                              }
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <FileText className="h-3.5 w-3.5 mr-1.5" />
                              <span>{document.id}</span>
                            </div>
                            <div>
                              {new Date(document.requestDate).toLocaleDateString('pt-BR')}
                              {document.urgency === 'urgent' && (
                                <Badge variant="destructive" className="ml-2">Urgente</Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end gap-2">
                            {document.status === 'pending' && (
                              <>
                                <Button size="sm" variant="outline" className="flex gap-1">
                                  <CheckCircle className="h-4 w-4" />
                                  <span>Processar</span>
                                </Button>
                                <Button size="sm" variant="outline" className="flex gap-1">
                                  <XCircle className="h-4 w-4" />
                                  <span>Rejeitar</span>
                                </Button>
                              </>
                            )}
                            
                            {document.status === 'processing' && (
                              <Button size="sm" variant="outline" className="flex gap-1">
                                <CheckCircle className="h-4 w-4" />
                                <span>Concluir</span>
                              </Button>
                            )}
                            
                            {document.status === 'completed' && (
                              <Button size="sm" variant="outline" className="flex gap-1">
                                <Download className="h-4 w-4" />
                                <span>Download</span>
                              </Button>
                            )}
                            
                            <Button size="sm" variant="outline" className="flex gap-1">
                              <Eye className="h-4 w-4" />
                              <span>Detalhes</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p>Nenhum documento encontrado.</p>
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

export default SecretaryDocuments;
