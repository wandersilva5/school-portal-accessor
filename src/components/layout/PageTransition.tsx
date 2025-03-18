
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  const pageVariants = {
    initial: {
      opacity: 0,
      y: isMobile ? 20 : 8,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: isMobile ? -20 : -8,
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: isMobile ? 0.3 : 0.4
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
