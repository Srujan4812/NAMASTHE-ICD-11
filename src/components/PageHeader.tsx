import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export const PageHeader = ({ title, subtitle, showBack = true }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-8"
    >
      <div className="flex items-center gap-4 mb-2">
        {showBack && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-xl bg-card shadow-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-float transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        )}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.header>
  );
};
