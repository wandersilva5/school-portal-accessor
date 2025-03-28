
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  noPadding?: boolean;
  variant?: 'default' | 'gradient' | 'bordered' | 'minimal';
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  hover = false,
  noPadding = false,
  variant = 'default',
  ...props 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={cn(
        "rounded-xl shadow-subtle",
        variant === 'default' && "bg-background/95 border border-border/40",
        variant === 'gradient' && "bg-gradient-primary text-white",
        variant === 'bordered' && "bg-background border-2 border-primary/20",
        variant === 'minimal' && "bg-background border border-border/50",
        "dark:shadow-medium",
        !noPadding && (isMobile ? "p-5" : "p-6"),
        hover && "card-hover transition-all duration-300",
        isMobile && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
