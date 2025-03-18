
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  noPadding?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  hover = false,
  noPadding = false,
  ...props 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={cn(
        "rounded-xl glass shadow-subtle backdrop-blur-md",
        "dark:glass-dark dark:shadow-medium",
        !noPadding && (isMobile ? "p-4" : "p-6"),
        hover && !isMobile && "transition-all duration-300 hover:shadow-medium hover:scale-[1.02]",
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
