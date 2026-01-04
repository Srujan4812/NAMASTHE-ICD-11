import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { FloatingPanel } from '@/components/FloatingCard';
import { StatusBadge, MappingTypeBadge } from '@/components/StatusBadge';
import { terminologyMappings, searchMappings, TerminologyMapping } from '@/data/terminologyMappings';

const TerminologySearch = () => {
  const [query, setQuery] = useState('');
  const [selectedMapping, setSelectedMapping] = useState<TerminologyMapping | null>(null);

  const filteredMappings = useMemo(() => {
    if (!query.trim()) return terminologyMappings;
    return searchMappings(query);
  }, [query]);

  const handleSelect = (mapping: TerminologyMapping) => {
    setSelectedMapping(mapping);
  };

  return (
    <div className="min-h-screen bg-background mesh-background">
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          title="Terminology Search" 
          subtitle="Search and explore NAMASTE to ICD-11 mappings"
        />

        {/* Floating Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <SearchIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by code, condition name, or category..."
              className="search-input-float pl-14"
            />
          </div>
        </motion.div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Search Results Panel */}
          <FloatingPanel delay={0.2} className="min-h-[400px]">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Search Results
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({filteredMappings.length} items)
              </span>
            </h3>
            
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              <AnimatePresence mode="popLayout">
                {filteredMappings.map((mapping, index) => (
                  <motion.button
                    key={mapping.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    onClick={() => handleSelect(mapping)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      selectedMapping?.id === mapping.id
                        ? 'bg-primary/10 border-2 border-primary/30'
                        : 'bg-muted/30 hover:bg-muted/60 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-foreground">{mapping.namaste.display}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {mapping.namaste.code} • {mapping.namaste.category}
                        </p>
                      </div>
                      <StatusBadge 
                        status={mapping.icd11.biomedicalCode ? 'mapped' : 'partial'} 
                      />
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </FloatingPanel>

          {/* Detail Panels */}
          <div className="space-y-6">
            {/* NAMASTE Panel */}
            <FloatingPanel delay={0.3}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">NAMASTE Terminology</h3>
                {selectedMapping && (
                  <MappingTypeBadge type={selectedMapping.mappingType} />
                )}
              </div>
              
              <AnimatePresence mode="wait">
                {selectedMapping ? (
                  <motion.div
                    key={selectedMapping.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">Code</p>
                      <p className="font-mono text-foreground">{selectedMapping.namaste.code}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">Condition</p>
                      <p className="font-semibold text-foreground text-lg">{selectedMapping.namaste.display}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="text-foreground">{selectedMapping.namaste.category}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-muted-foreground text-center py-8"
                  >
                    Select a term to view details
                  </motion.p>
                )}
              </AnimatePresence>
            </FloatingPanel>

            {/* ICD-11 Panel */}
            <FloatingPanel delay={0.4}>
              <h3 className="text-lg font-semibold text-foreground mb-4">ICD-11 Mapping</h3>
              
              <AnimatePresence mode="wait">
                {selectedMapping ? (
                  <motion.div
                    key={selectedMapping.id + '-icd'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-3"
                  >
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-sm text-muted-foreground">TM2 Code</p>
                      <p className="font-mono text-primary font-semibold">{selectedMapping.icd11.tm2Code}</p>
                      <p className="text-foreground mt-1">{selectedMapping.icd11.tm2Display}</p>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${
                      selectedMapping.icd11.biomedicalCode 
                        ? 'bg-success/5 border border-success/10' 
                        : 'bg-muted/30'
                    }`}>
                      <p className="text-sm text-muted-foreground">Biomedical Code</p>
                      {selectedMapping.icd11.biomedicalCode ? (
                        <>
                          <p className="font-mono text-success font-semibold">
                            {selectedMapping.icd11.biomedicalCode}
                          </p>
                          <p className="text-foreground mt-1">{selectedMapping.icd11.biomedicalDisplay}</p>
                        </>
                      ) : (
                        <p className="text-muted-foreground italic">
                          No mapped biomedical code available
                        </p>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-muted-foreground text-center py-8"
                  >
                    Select a term to view ICD-11 mapping
                  </motion.p>
                )}
              </AnimatePresence>
            </FloatingPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminologySearch;
