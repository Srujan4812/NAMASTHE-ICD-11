import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  hover?: boolean;
}

export const FloatingCard = ({ 
  children, 
  className = '', 
  onClick, 
  delay = 0,
  hover = true 
}: FloatingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={hover ? { 
        y: -6, 
        transition: { duration: 0.3, ease: 'easeOut' }
      } : undefined}
      onClick={onClick}
      className={`floating-card ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface FloatingPanelProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const FloatingPanel = ({ children, className = '', delay = 0 }: FloatingPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`floating-panel ${className}`}
    >
      {children}
    </motion.div>
  );
};
