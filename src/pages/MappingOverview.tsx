import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { FloatingPanel } from '@/components/FloatingCard';
import { StatusBadge, MappingTypeBadge } from '@/components/StatusBadge';
import { terminologyMappings, getCategories } from '@/data/terminologyMappings';

const MappingOverview = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const categories = getCategories();

  const filteredMappings = categoryFilter === 'all'
    ? terminologyMappings
    : terminologyMappings.filter(m => m.namaste.category === categoryFilter);

  const stats = {
    total: terminologyMappings.length,
    withBiomedical: terminologyMappings.filter(m => m.icd11.biomedicalCode).length,
    exact: terminologyMappings.filter(m => m.mappingType === 'exact').length,
    broader: terminologyMappings.filter(m => m.mappingType === 'broader').length,
  };

  return (
    <div className="min-h-screen bg-background mesh-background">
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          title="Mapping Overview" 
          subtitle="Complete view of all NAMASTE to ICD-11 terminology mappings"
        />

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Mappings', value: stats.total, color: 'text-foreground' },
            { label: 'With Biomedical', value: stats.withBiomedical, color: 'text-success' },
            { label: 'Exact Matches', value: stats.exact, color: 'text-primary' },
            { label: 'Broader Matches', value: stats.broader, color: 'text-warning' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="floating-card-static p-4 text-center"
            >
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter by category:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  categoryFilter === 'all'
                    ? 'bg-primary text-primary-foreground shadow-float'
                    : 'bg-card text-foreground hover:bg-muted shadow-card'
                }`}
              >
                All
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    categoryFilter === category
                      ? 'bg-primary text-primary-foreground shadow-float'
                      : 'bg-card text-foreground hover:bg-muted shadow-card'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <FloatingPanel delay={0.5}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">NAMASTE</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">ICD-11 TM2</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Biomedical</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredMappings.map((mapping, index) => (
                  <motion.tr
                    key={mapping.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.02 }}
                    className="border-b border-border/50 hover:bg-muted/30 transition-all duration-200 group"
                  >
                    <td className="py-4 px-4">
                      <div className="group-hover:translate-x-1 transition-transform duration-300">
                        <p className="font-medium text-foreground">{mapping.namaste.display}</p>
                        <p className="text-xs text-muted-foreground font-mono">{mapping.namaste.code}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-muted-foreground">{mapping.namaste.category}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-mono text-sm text-primary">{mapping.icd11.tm2Code}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {mapping.icd11.tm2Display}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {mapping.icd11.biomedicalCode ? (
                        <div>
                          <p className="font-mono text-sm text-success">{mapping.icd11.biomedicalCode}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                            {mapping.icd11.biomedicalDisplay}
                          </p>
                        </div>
                      ) : (
                        <StatusBadge status="unmapped" label="N/A" />
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <MappingTypeBadge type={mapping.mappingType} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </FloatingPanel>
      </div>
    </div>
  );
};

export default MappingOverview;
