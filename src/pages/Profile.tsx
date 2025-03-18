
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import GlassCard from '@/components/ui-custom/GlassCard';
import { 
  Camera,
  ChevronRight,
  Edit, 
  Globe, 
  GraduationCap, 
  Home, 
  Mail, 
  Phone, 
  SaveIcon, 
  Shield, 
  User, 
  UserCog
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Create editable profile data with some mock info
  const [profileData, setProfileData] = useState({
    email: user?.email || '',
    name: user?.name || '',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    zipCode: '01234-567',
    birthDate: '15/05/2005',
    parentName: 'Roberto Silva',
    parentPhone: '(11) 98765-4322',
    enrollmentDate: '01/02/2022',
    interests: 'Ciências, Tecnologia, Esportes',
    bio: 'Estudante dedicado com interesse em ciências e tecnologia.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Perfil atualizado com sucesso!');
  };

  return (
    <>
      <Header />
      <PageTransition>
        <main className="min-h-screen pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Perfil</h1>
                <p className="text-muted-foreground">
                  Visualize e edite suas informações pessoais
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button 
                  onClick={() => setIsEditing(!isEditing)} 
                  variant={isEditing ? "destructive" : "default"}
                  className="flex items-center"
                >
                  {isEditing ? (
                    <>Cancelar</>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar Perfil
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Profile grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Profile card */}
              <GlassCard className="md:col-span-1 text-center animate-slide-up">
                <div className="relative inline-block">
                  <Avatar className="w-32 h-32 mx-auto border-4 border-background">
                    <AvatarImage src={user?.photoURL || ""} alt={user?.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-4xl">
                      {user?.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 p-1 bg-background rounded-full shadow-md">
                    <button className="bg-primary/10 hover:bg-primary/20 text-primary p-1.5 rounded-full transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold mt-4">{user?.name}</h2>
                <p className="text-muted-foreground">
                  {user?.role === 'student' 
                    ? `Estudante - ${user.class}` 
                    : user?.role === 'teacher'
                      ? 'Professor'
                      : 'Administrador'
                  }
                </p>
                
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center text-sm">
                      <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>ID: {user?.role === 'student' ? user.enrollmentId : user?.teacherId || user?.adminId}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        {user?.role === 'student' 
                          ? 'Ensino Fundamental II' 
                          : user?.role === 'teacher'
                            ? user.subjects?.join(', ')
                            : 'Administração'
                        }
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Português (Brasil)</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
              
              {/* Main profile info */}
              <GlassCard className="md:col-span-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
                
                <div className="space-y-6">
                  {/* Personal section */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Nome Completo</label>
                        {isEditing ? (
                          <Input name="name" value={profileData.name} onChange={handleChange} />
                        ) : (
                          <p>{profileData.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">E-mail</label>
                        {isEditing ? (
                          <Input name="email" value={profileData.email} onChange={handleChange} />
                        ) : (
                          <p>{profileData.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Telefone</label>
                        {isEditing ? (
                          <Input name="phone" value={profileData.phone} onChange={handleChange} />
                        ) : (
                          <p>{profileData.phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Data de Nascimento</label>
                        {isEditing ? (
                          <Input name="birthDate" value={profileData.birthDate} onChange={handleChange} />
                        ) : (
                          <p>{profileData.birthDate}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Address section */}
                  <div>
                    <h4 className="text-md font-medium mb-4">Endereço</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Endereço</label>
                        {isEditing ? (
                          <Input name="address" value={profileData.address} onChange={handleChange} />
                        ) : (
                          <p>{profileData.address}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Cidade</label>
                        {isEditing ? (
                          <Input name="city" value={profileData.city} onChange={handleChange} />
                        ) : (
                          <p>{profileData.city}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="text-sm text-muted-foreground mb-1 block">CEP</label>
                      {isEditing ? (
                        <Input 
                          name="zipCode" 
                          value={profileData.zipCode} 
                          onChange={handleChange} 
                          className="max-w-[200px]"
                        />
                      ) : (
                        <p>{profileData.zipCode}</p>
                      )}
                    </div>
                  </div>
                  
                  {user?.role === 'student' && (
                    <>
                      <Separator />
                      
                      {/* Parent/Guardian section */}
                      <div>
                        <h4 className="text-md font-medium mb-4">Responsável</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-muted-foreground mb-1 block">Nome</label>
                            {isEditing ? (
                              <Input name="parentName" value={profileData.parentName} onChange={handleChange} />
                            ) : (
                              <p>{profileData.parentName}</p>
                            )}
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground mb-1 block">Telefone</label>
                            {isEditing ? (
                              <Input name="parentPhone" value={profileData.parentPhone} onChange={handleChange} />
                            ) : (
                              <p>{profileData.parentPhone}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {isEditing && (
                    <div className="flex justify-end pt-4">
                      <Button onClick={handleSave} className="w-full sm:w-auto">
                        <SaveIcon className="mr-2 h-4 w-4" />
                        Salvar Alterações
                      </Button>
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>
            
            {/* Additional sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Academic info for students */}
              {user?.role === 'student' && (
                <GlassCard className="animate-slide-up" style={{ animationDelay: '200ms' }} hover>
                  <h3 className="text-lg font-semibold mb-4">Informações Acadêmicas</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-background/80 transition-colors">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-full mr-3">
                          <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <span>Histórico Escolar</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-background/80 transition-colors">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-full mr-3">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span>Professores</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-background/80 transition-colors">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-full mr-3">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <span>Mensagens</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </GlassCard>
              )}
              
              {/* Teacher info */}
              {user?.role === 'teacher' && (
                <GlassCard className="animate-slide-up" style={{ animationDelay: '200ms' }} hover>
                  <h3 className="text-lg font-semibold mb-4">Área do Professor</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-background/80 transition-colors">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-full mr-3">
                          <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <span>Turmas</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-background/80 transition-colors">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-full mr-3">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <span>Mensagens</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-background/80 transition-colors">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-full mr-3">
                          <UserCog className="h-4 w-4 text-primary" />
                        </div>
                        <span>Configurações Profissionais</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </GlassCard>
              )}
              
              {/* Admin section */}
              {user?.role === 'admin' && (
                <GlassCard className="md:col-span-2 animate-slide-up" style={{ animationDelay: '200ms' }} hover>
                  <h3 className="text-lg font-semibold mb-4">Administração do Sistema</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-background/80 transition-colors">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-full mr-3">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span>Gerenciar Usuários</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-background/80 transition-colors">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-full mr-3">
                          <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <span>Gerenciar Turmas</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-background/80 transition-colors">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary/10 rounded-full mr-3">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        <span>Permissões</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </GlassCard>
              )}
              
              {/* Account settings */}
              <GlassCard className="animate-slide-up" style={{ animationDelay: '300ms' }} hover>
                <h3 className="text-lg font-semibold mb-4">Configurações da Conta</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-background/80 transition-colors">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary/10 rounded-full mr-3">
                        <UserCog className="h-4 w-4 text-primary" />
                      </div>
                      <span>Alterar Senha</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-background/80 transition-colors">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary/10 rounded-full mr-3">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                      <span>Idioma</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-background/80 transition-colors">
                    <div className="flex items-center">
                      <div className="p-2 bg-primary/10 rounded-full mr-3">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                      <span>Privacidade</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default Profile;
