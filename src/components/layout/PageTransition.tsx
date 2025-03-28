
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
      y: isMobile ? 20 : 10,
      scale: 0.98,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      y: isMobile ? -20 : -10,
      scale: 0.98,
    }
  };

  const pageTransition = {
    type: "spring",
    stiffness: 260,
    damping: 20,
    duration: 0.3
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full p-4"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
