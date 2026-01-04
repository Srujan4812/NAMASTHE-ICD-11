import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { FileJson, QrCode, ScanLine, ChevronDown } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { FloatingCard, FloatingPanel } from '@/components/FloatingCard';
import { StatusBadge } from '@/components/StatusBadge';
import { terminologyMappings, TerminologyMapping } from '@/data/terminologyMappings';
import { generateFHIRBundle, FHIRBundle } from '@/utils/fhirBundle';

const FHIRBundlePage = () => {
  const [selectedMapping, setSelectedMapping] = useState<TerminologyMapping | null>(null);
  const [fhirBundle, setFhirBundle] = useState<FHIRBundle | null>(null);
  const [decodedBundle, setDecodedBundle] = useState<FHIRBundle | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMappingSelect = (mapping: TerminologyMapping) => {
    setSelectedMapping(mapping);
    setFhirBundle(generateFHIRBundle(mapping));
    setDecodedBundle(null);
    setIsDropdownOpen(false);
  };

  const bundleJson = useMemo(() => {
    return fhirBundle ? JSON.stringify(fhirBundle, null, 2) : '';
  }, [fhirBundle]);

  const handleSimulateScan = () => {
    if (fhirBundle) {
      setDecodedBundle(fhirBundle);
    }
  };

  // Only show mappings that have biomedical codes for full FHIR
  const mappedTerms = terminologyMappings;

  return (
    <div className="min-h-screen bg-background mesh-background">
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          title="FHIR Bundle & QR" 
          subtitle="Generate FHIR R4 bundles with QR code encoding"
        />

        {/* Term Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between p-4 bg-card rounded-xl shadow-float hover:shadow-float-hover transition-all duration-300"
            >
              <span className={selectedMapping ? 'text-foreground' : 'text-muted-foreground'}>
                {selectedMapping ? selectedMapping.namaste.display : 'Select a condition to generate FHIR Bundle'}
              </span>
              <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 w-full mt-2 bg-card rounded-xl shadow-float-hover max-h-[300px] overflow-y-auto"
                >
                  {mappedTerms.map((mapping) => (
                    <button
                      key={mapping.id}
                      onClick={() => handleMappingSelect(mapping)}
                      className="w-full text-left p-4 hover:bg-muted/50 transition-colors duration-200 border-b border-border/50 last:border-0"
                    >
                      <p className="font-medium text-foreground">{mapping.namaste.display}</p>
                      <p className="text-sm text-muted-foreground">{mapping.namaste.code} • {mapping.namaste.category}</p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          {fhirBundle && (
            <motion.div
              key={selectedMapping?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* JSON Viewer */}
              <FloatingPanel delay={0.1}>
                <div className="flex items-center gap-2 mb-4">
                  <FileJson className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">FHIR R4 Bundle</h3>
                </div>
                
                <div className="json-viewer text-xs">
                  <pre className="text-foreground whitespace-pre-wrap">
                    {bundleJson}
                  </pre>
                </div>
                
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <StatusBadge status="mapped" label="Valid FHIR R4" />
                  <span>• Synthetic data only</span>
                </div>
              </FloatingPanel>

              {/* QR Code */}
              <div className="space-y-6">
                <FloatingPanel delay={0.2}>
                  <div className="flex items-center gap-2 mb-4">
                    <QrCode className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">QR Code</h3>
                  </div>
                  
                  <div className="flex justify-center p-6 bg-card rounded-xl">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="p-4 bg-background rounded-xl animate-pulse-glow"
                    >
                      <QRCodeSVG 
                        value={bundleJson}
                        size={200}
                        level="L"
                        includeMargin
                        className="rounded-lg"
                      />
                    </motion.div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    QR encodes the complete FHIR Bundle JSON
                  </p>
                </FloatingPanel>

                {/* Simulate Scan */}
                <FloatingCard delay={0.3} hover={false} className="p-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSimulateScan}
                    className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold shadow-glow hover:shadow-float-hover transition-all duration-300"
                  >
                    <ScanLine className="w-5 h-5" />
                    Simulate QR Scan
                  </motion.button>
                </FloatingCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decoded Result */}
        <AnimatePresence>
          {decodedBundle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <FloatingPanel delay={0}>
                <div className="flex items-center gap-2 mb-4">
                  <ScanLine className="w-5 h-5 text-success" />
                  <h3 className="text-lg font-semibold text-foreground">Decoded Bundle (Simulated Scan Result)</h3>
                </div>
                
                <div className="space-y-4">
                  {decodedBundle.entry.map((entry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <StatusBadge 
                          status="mapped" 
                          label={entry.resource.resourceType} 
                        />
                        <span className="text-xs text-muted-foreground font-mono">
                          {entry.resource.id}
                        </span>
                      </div>
                      
                      <pre className="text-xs text-foreground overflow-x-auto">
                        {JSON.stringify(entry.resource, null, 2)}
                      </pre>
                    </motion.div>
                  ))}
                </div>
              </FloatingPanel>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!fhirBundle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
              <QrCode className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Select a condition above to generate a FHIR Bundle
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FHIRBundlePage;
