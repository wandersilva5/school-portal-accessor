
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  hover = false,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "rounded-xl p-6 glass shadow-subtle backdrop-blur-md",
        "dark:glass-dark dark:shadow-medium",
        hover && "transition-all duration-300 hover:shadow-medium hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
