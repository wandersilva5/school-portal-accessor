
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GlassCard from '@/components/ui-custom/GlassCard';
import { BookOpen, Lock, Mail } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      console.error('Login error:', error);
      // Error is already handled in the auth service
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen w-full bg-gradient-to-b from-primary/5 to-secondary/50 flex flex-col items-center justify-center p-4">
        <div className={cn("w-full", isMobile ? "max-w-[90%]" : "max-w-md")}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 mb-4 bg-primary/10 rounded-full text-primary">
              <BookOpen className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Portal Escolar</h1>
            <p className="mt-2 text-muted-foreground">Acesse sua conta para continuar</p>
          </div>
          
          <GlassCard className="overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <Mail className="h-4 w-4" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@escola.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <button 
                    type="button" 
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
              <p>Dados para teste:</p>
              <div className={cn(
                "mt-2 grid gap-2 text-xs",
                isMobile ? "grid-cols-1" : "grid-cols-3"
              )}>
                <div className="p-2 bg-background/50 rounded-md">
                  <p className="font-semibold">Estudante</p>
                  <p>aluno@escola.com</p>
                  <p>senha123</p>
                </div>
                <div className="p-2 bg-background/50 rounded-md">
                  <p className="font-semibold">Professor</p>
                  <p>professor@escola.com</p>
                  <p>senha123</p>
                </div>
                <div className="p-2 bg-background/50 rounded-md">
                  <p className="font-semibold">Diretor</p>
                  <p>diretor@escola.com</p>
                  <p>senha123</p>
                </div>
              </div>
            </div>
          </GlassCard>
          
          <p className="mt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Portal Escolar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default Login;
