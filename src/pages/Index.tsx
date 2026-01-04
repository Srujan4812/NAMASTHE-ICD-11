import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  FileSpreadsheet, 
  LayoutGrid, 
  QrCode, 
  Info,
  Eye
} from 'lucide-react';
import { FloatingCard } from '@/components/FloatingCard';

const navItems = [
  {
    title: 'Terminology Search',
    description: 'Search and explore NAMASTE to ICD-11 mappings',
    icon: Search,
    path: '/search',
    color: 'from-primary to-accent'
  },
  {
    title: 'CSV Mapping Input',
    description: 'Upload and review CSV terminology data',
    icon: FileSpreadsheet,
    path: '/csv-upload',
    color: 'from-success to-primary'
  },
  {
    title: 'Mapping Overview',
    description: 'View all terminology mappings at a glance',
    icon: LayoutGrid,
    path: '/overview',
    color: 'from-accent to-primary'
  },
  {
    title: 'FHIR Bundle & QR',
    description: 'Generate FHIR R4 bundles with QR encoding',
    icon: QrCode,
    path: '/fhir-bundle',
    color: 'from-warning to-success'
  },
  {
    title: 'About',
    description: 'Learn about the terminology mapping system',
    icon: Info,
    path: '/about',
    color: 'from-muted-foreground to-foreground'
  },
  {
    title: 'View in AR',
    description: 'Experience the data in augmented reality',
    icon: Eye,
    path: 'external',
    externalUrl: 'https://sih-ar-web.vercel.app/',
    color: 'from-primary to-success'
  }
];

const Index = () => {
  const navigate = useNavigate();

  const handleCardClick = (item: typeof navItems[0]) => {
    if (item.path === 'external' && item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="min-h-screen bg-background mesh-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Clinical Terminology System
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
            NAMASTE–ICD-11
            <span className="block text-primary mt-2">Mapping Platform</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A professional clinical terminology mapping system with advanced visualization, 
            FHIR R4 bundle generation, and seamless AR integration.
          </p>
        </motion.div>

        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {navItems.map((item, index) => (
            <FloatingCard
              key={item.title}
              delay={0.1 + index * 0.08}
              onClick={() => handleCardClick(item)}
              className="nav-card group"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className={`nav-card-icon bg-gradient-to-br ${item.color}`}
              >
                <item.icon className="w-6 h-6" />
              </motion.div>
              
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="text-sm text-muted-foreground text-center">
                {item.description}
              </p>

              {item.path === 'external' && (
                <span className="text-xs text-primary/70 mt-1">
                  Opens in new tab →
                </span>
              )}
            </FloatingCard>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16 text-sm text-muted-foreground"
        >
          <p></p>
          <p className="mt-1"></p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
