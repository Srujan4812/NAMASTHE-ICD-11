import { motion } from 'framer-motion';
import { PageHeader } from '@/components/PageHeader';
import { FloatingPanel } from '@/components/FloatingCard';

const About = () => {
  const sections = [
    {
      title: 'Purpose',
      content: 'This clinical terminology mapping system provides a bridge between NAMASTE (National Medical Standards and Terminology Exchange) codes and the WHO ICD-11 classification system. It enables healthcare providers and systems to translate local terminology into internationally recognized standards.'
    },
    {
      title: 'Incremental Mapping Approach',
      content: 'Our mappings are developed incrementally and curated by domain experts. Each mapping relationship is reviewed for clinical accuracy, ensuring that the translation between terminology systems preserves the intended clinical meaning. This careful curation process prioritizes quality over quantity.'
    },
    {
      title: 'Handling Unmapped Concepts',
      content: 'Not all NAMASTE concepts have direct ICD-11 equivalents. When a biomedical code is unavailable, we clearly indicate this in the interface. Users can still access the TM2 (Traditional Medicine Module 2) mapping while understanding the limitations. Future updates will expand coverage as new mappings are validated.'
    },
    {
      title: 'Separation of Concerns',
      content: 'This system maintains a clear separation between three layers: Terminology (the codes and their meanings), Transport (FHIR R4 bundles for data exchange), and Visualization (the user interface and AR integration). This architecture ensures that each layer can evolve independently while maintaining interoperability.'
    },
    {
      title: 'Data Privacy & Synthetic Data',
      content: 'All patient data displayed in FHIR bundles is entirely synthetic and generated for demonstration purposes only. No real patient information is stored, transmitted, or processed by this application. The QR codes serve as a visualization of the transport mechanism, not as a production data exchange method.'
    },
    {
      title: 'Technical Implementation',
      content: 'This application is built as a frontend-only solution with no external API dependencies. All processing occurs client-side, ensuring data privacy and enabling offline usage. The 20 curated mappings represent a foundational dataset that can be extended through the CSV upload feature for local evaluation.'
    }
  ];

  return (
    <div className="min-h-screen bg-background mesh-background">
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          title="About" 
          subtitle="Understanding the terminology mapping system"
        />

        <div className="max-w-3xl mx-auto space-y-6">
          {sections.map((section, index) => (
            <FloatingPanel key={section.title} delay={0.1 + index * 0.08}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {section.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            </FloatingPanel>
          ))}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center py-8 text-sm text-muted-foreground"
          >
            <p>NAMASTE–ICD-11 Mapping Platform</p>
            <p className="mt-1">Version 1.0 • Frontend-only implementation</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
