
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import GlassCard from '@/components/ui-custom/GlassCard';
import { FinancialRecord } from '@/types';
import { 
  CreditCard, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ChevronDown,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GuardianFinance: React.FC = () => {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState<string | null>(
    user?.childrenData && user.childrenData.length > 0 ? user.childrenData[0].id : null
  );
  
  // Fetch financial data
  const { data: financialData, isLoading } = useQuery({
    queryKey: ['financial', selectedChild],
    queryFn: async () => {
      // In a real app, this would fetch from the API with the selected child ID
      // Simulated response
      return [
        {
          id: '1',
          description: 'Mensalidade Escolar - Outubro/2023',
          amount: 800,
          dueDate: '2023-10-10',
          status: 'paid',
          paymentDate: '2023-10-08'
        },
        {
          id: '2',
          description: 'Mensalidade Escolar - Novembro/2023',
          amount: 800,
          dueDate: '2023-11-10',
          status: 'pending'
        },
        {
          id: '3',
          description: 'Material Didático - 4º Bimestre',
          amount: 350,
          dueDate: '2023-10-15',
          status: 'paid',
          paymentDate: '2023-10-14'
        },
        {
          id: '4',
          description: 'Excursão Pedagógica - Museu',
          amount: 120,
          dueDate: '2023-09-20',
          status: 'paid',
          paymentDate: '2023-09-18'
        },
        {
          id: '5',
          description: 'Atividades Extracurriculares - Esportes',
          amount: 200,
          dueDate: '2023-09-05',
          status: 'paid',
          paymentDate: '2023-09-05'
        },
        {
          id: '6',
          description: 'Atividades Extracurriculares - Música',
          amount: 180,
          dueDate: '2023-10-25',
          status: 'overdue'
        }
      ] as FinancialRecord[];
    },
  });
  
  // Calculate summary values
  const calculateSummary = () => {
    if (!financialData) return { paid: 0, pending: 0, overdue: 0, total: 0 };
    
    const paid = financialData
      .filter(item => item.status === 'paid')
      .reduce((sum, item) => sum + item.amount, 0);
      
    const pending = financialData
      .filter(item => item.status === 'pending')
      .reduce((sum, item) => sum + item.amount, 0);
      
    const overdue = financialData
      .filter(item => item.status === 'overdue')
      .reduce((sum, item) => sum + item.amount, 0);
      
    return {
      paid,
      pending,
      overdue,
      total: paid + pending + overdue
    };
  };
  
  const summary = calculateSummary();
  
  // Group records by month
  const groupByMonth = () => {
    if (!financialData) return {};
    
    const grouped: Record<string, FinancialRecord[]> = {};
    
    financialData.forEach(record => {
      const month = format(new Date(record.dueDate), 'MMMM yyyy', { locale: ptBR });
      
      if (!grouped[month]) {
        grouped[month] = [];
      }
      
      grouped[month].push(record);
    });
    
    return grouped;
  };
  
  const groupedRecords = groupByMonth();
  
  return (
    <>
      <Header />
      <PageTransition>
        <main className="min-h-screen pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2 animate-slide-up">Financeiro</h1>
              <p className="text-muted-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
                Acompanhe e gerencie os pagamentos escolares
              </p>
            </div>
            
            {/* Child selector */}
            {user?.childrenData && user.childrenData.length > 1 && (
              <div className="mb-6 animate-slide-up">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Selecione um filho:</span>
                </div>
                <Select 
                  value={selectedChild || ''} 
                  onValueChange={(value) => setSelectedChild(value)}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Selecione um filho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {user.childrenData.map(child => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.name} - {child.class}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* Financial summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <GlassCard className="animate-slide-up">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-xl font-bold">R$ {summary.total.toFixed(2)}</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-green-100">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pagos</p>
                    <p className="text-xl font-bold">R$ {summary.paid.toFixed(2)}</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-orange-100">
                    <Clock className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pendentes</p>
                    <p className="text-xl font-bold">R$ {summary.pending.toFixed(2)}</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-red-100">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vencidos</p>
                    <p className="text-xl font-bold">R$ {summary.overdue.toFixed(2)}</p>
                  </div>
                </div>
              </GlassCard>
            </div>
            
            {/* Financial records */}
            <GlassCard className="animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Histórico Financeiro</h2>
                <div className="p-2 bg-primary/10 rounded-full">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center p-12">
                  <div className="animate-pulse-subtle">Carregando dados financeiros...</div>
                </div>
              ) : financialData && financialData.length > 0 ? (
                <div className="space-y-6">
                  {Object.entries(groupedRecords).map(([month, records]) => (
                    <div key={month} className="border-b pb-4 last:border-0 last:pb-0">
                      <h3 className="font-medium text-lg mb-3 capitalize">{month}</h3>
                      
                      <div className="space-y-3">
                        {records.map(record => (
                          <div 
                            key={record.id}
                            className={cn(
                              "p-3 rounded-lg transition-all",
                              record.status === 'paid' ? "bg-green-50" : 
                              record.status === 'pending' ? "bg-orange-50" : 
                              "bg-red-50"
                            )}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex-1">
                                <p className="font-medium">{record.description}</p>
                                <p className="text-sm text-muted-foreground">
                                  Vencimento: {format(new Date(record.dueDate), 'dd/MM/yyyy')}
                                </p>
                              </div>
                              
                              <div className="mt-2 sm:mt-0 flex flex-col items-end">
                                <p className="font-semibold">R$ {record.amount.toFixed(2)}</p>
                                <div className="flex items-center mt-1">
                                  {record.status === 'paid' ? (
                                    <>
                                      <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                                      <span className="text-xs text-green-600">
                                        Pago em {format(new Date(record.paymentDate || ''), 'dd/MM/yyyy')}
                                      </span>
                                    </>
                                  ) : record.status === 'pending' ? (
                                    <>
                                      <Clock className="h-3 w-3 text-orange-500 mr-1" />
                                      <span className="text-xs text-orange-500">Pendente</span>
                                    </>
                                  ) : (
                                    <>
                                      <AlertTriangle className="h-3 w-3 text-red-600 mr-1" />
                                      <span className="text-xs text-red-600">Vencido</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {(record.status === 'pending' || record.status === 'overdue') && (
                              <div className="mt-3 flex justify-end">
                                <Button size="sm" variant="outline" className="text-xs">
                                  Gerar Boleto
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Não há registros financeiros disponíveis.
                </div>
              )}
            </GlassCard>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default GuardianFinance;
