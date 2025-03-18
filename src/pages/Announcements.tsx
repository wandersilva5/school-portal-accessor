
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import GlassCard from '@/components/ui-custom/GlassCard';
import { 
  Bell,
  CalendarDays,
  ChevronDown,
  Info,
  MessageSquare, 
  Search,
  Tag,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Announcement } from '@/types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Announcements: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openAnnouncementId, setOpenAnnouncementId] = useState<string | null>(null);
  
  // Fetch announcements
  const { data: announcementsData, isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const response = await api.get('/announcements');
      return response.data as Announcement[];
    },
  });
  
  // Extract all unique tags
  const allTags = React.useMemo(() => {
    if (!announcementsData) return [];
    
    const tags = new Set<string>();
    announcementsData.forEach(announcement => {
      announcement.tags.forEach(tag => tags.add(tag));
    });
    
    return Array.from(tags).sort();
  }, [announcementsData]);
  
  // Filter announcements
  const filteredAnnouncements = React.useMemo(() => {
    if (!announcementsData) return [];
    
    return announcementsData
      .filter(announcement => {
        // Filter by search query
        if (searchQuery && !announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !announcement.content.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Filter by selected tags
        if (selectedTags.length > 0 && !announcement.tags.some(tag => selectedTags.includes(tag))) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sort by date (newest first)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [announcementsData, searchQuery, selectedTags]);
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };
  
  // Toggle announcement open state
  const toggleAnnouncement = (id: string) => {
    setOpenAnnouncementId(prev => prev === id ? null : id);
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Avisos</h1>
                <p className="text-muted-foreground">
                  Fique por dentro das últimas notícias e comunicados da escola
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="p-2 bg-primary/10 rounded-full mr-3">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Avisos</p>
                  <p className="font-medium">{announcementsData?.length || 0}</p>
                </div>
              </div>
            </div>
            
            {/* Filters */}
            <GlassCard className="mb-8 animate-slide-up">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar avisos..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 5).map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer capitalize",
                        selectedTags.includes(tag) 
                          ? "bg-primary/80 hover:bg-primary/90" 
                          : "hover:bg-muted"
                      )}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                  
                  {allTags.length > 5 && (
                    <div className="relative group">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-muted"
                      >
                        <span className="flex items-center">
                          Mais
                          <ChevronDown className="ml-1 h-3 w-3" />
                        </span>
                      </Badge>
                      
                      <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-md overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="p-2 flex flex-wrap gap-1">
                          {allTags.slice(5).map(tag => (
                            <Badge
                              key={tag}
                              variant={selectedTags.includes(tag) ? "default" : "outline"}
                              className={cn(
                                "cursor-pointer capitalize",
                                selectedTags.includes(tag) 
                                  ? "bg-primary/80 hover:bg-primary/90" 
                                  : "hover:bg-muted"
                              )}
                              onClick={() => toggleTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(searchQuery || selectedTags.length > 0) && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearFilters}
                      className="ml-2"
                    >
                      Limpar
                    </Button>
                  )}
                </div>
              </div>
            </GlassCard>
            
            {/* Announcements list */}
            <div className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center p-12">
                  <div className="animate-pulse-subtle">Carregando avisos...</div>
                </div>
              ) : filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((announcement, index) => (
                  <GlassCard 
                    key={announcement.id}
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      announcement.important ? "border-l-4 border-l-destructive" : "",
                      openAnnouncementId === announcement.id ? "shadow-medium" : ""
                    )}
                    hover
                  >
                    <Collapsible
                      open={openAnnouncementId === announcement.id}
                      onOpenChange={() => toggleAnnouncement(announcement.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className={cn(
                            "p-2 rounded-full mr-4",
                            announcement.important ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                          )}>
                            {announcement.important ? 
                              <Info className="h-5 w-5" /> : 
                              <MessageSquare className="h-5 w-5" />
                            }
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg">{announcement.title}</h3>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <User className="h-3.5 w-3.5 mr-1.5" />
                                <span>{announcement.author}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                                <span>
                                  {format(
                                    new Date(announcement.date), 
                                    "d 'de' MMMM 'de' yyyy", 
                                    { locale: ptBR }
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown 
                              className={cn(
                                "h-5 w-5 transition-transform duration-300",
                                openAnnouncementId === announcement.id && "transform rotate-180"
                              )} 
                            />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      
                      <CollapsibleContent className="pt-4">
                        <div className="pt-4 border-t border-border/50">
                          <p className="mb-4 text-foreground/90 whitespace-pre-line">
                            {announcement.content}
                          </p>
                          
                          {announcement.tags.length > 0 && (
                            <div className="flex items-center flex-wrap gap-2 mt-4">
                              <Tag className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                              {announcement.tags.map(tag => (
                                <Badge 
                                  key={tag} 
                                  variant="secondary"
                                  className="capitalize"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </GlassCard>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground bg-background/50 rounded-xl">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-medium mb-1">Nenhum aviso encontrado</h3>
                  <p>Nenhum aviso corresponde aos critérios de busca.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default Announcements;
