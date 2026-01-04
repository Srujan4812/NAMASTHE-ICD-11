import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import Papa from 'papaparse';
import { PageHeader } from '@/components/PageHeader';
import { FloatingCard, FloatingPanel } from '@/components/FloatingCard';
import { StatusBadge } from '@/components/StatusBadge';
import { terminologyMappings } from '@/data/terminologyMappings';

interface CSVRow {
  id: string;
  code: string;
  display: string;
  category?: string;
  isMapped: boolean;
  mappedTo?: string;
}

const CSVUpload = () => {
  const [csvData, setCSVData] = useState<CSVRow[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const processCSV = useCallback((file: File) => {
    setFileName(file.name);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const processedData: CSVRow[] = results.data.map((row: any, index: number) => {
          const code = row.code || row.Code || row.CODE || '';
          const display = row.display || row.Display || row.name || row.Name || row.condition || '';
          const category = row.category || row.Category || '';
          
          // Check if this code exists in our mappings
          const mapping = terminologyMappings.find(
            m => m.namaste.code.toLowerCase() === code.toLowerCase() ||
                 m.namaste.display.toLowerCase() === display.toLowerCase()
          );
          
          return {
            id: `row-${index}`,
            code,
            display,
            category,
            isMapped: !!mapping,
            mappedTo: mapping ? `${mapping.icd11.tm2Code} - ${mapping.icd11.tm2Display}` : undefined
          };
        });
        
        setCSVData(processedData);
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
      }
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      processCSV(file);
    }
  }, [processCSV]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processCSV(file);
    }
  }, [processCSV]);

  const mappedCount = csvData.filter(row => row.isMapped).length;
  const unmappedCount = csvData.length - mappedCount;

  return (
    <div className="min-h-screen bg-background mesh-background">
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          title="CSV Mapping Input" 
          subtitle="Upload CSV files to review terminology mappings"
        />

        {/* Upload Area */}
        <FloatingCard delay={0.1} hover={false} className="max-w-2xl mx-auto mb-8 p-0 overflow-hidden">
          <motion.label
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center p-12 cursor-pointer transition-all duration-300 ${
              isDragging ? 'bg-primary/10' : 'bg-card hover:bg-muted/30'
            }`}
          >
            <motion.div
              animate={{ y: isDragging ? -5 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
                isDragging ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Upload className="w-8 h-8" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {isDragging ? 'Drop your CSV file' : 'Upload CSV File'}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop or click to browse
              </p>
              
              <p className="text-xs text-muted-foreground">
                Expected columns: code, display, category (optional)
              </p>
            </motion.div>
            
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
            />
          </motion.label>
        </FloatingCard>

        {/* Results */}
        <AnimatePresence>
          {csvData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                <FloatingCard delay={0.1} hover={false} className="p-4 text-center">
                  <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{csvData.length}</p>
                  <p className="text-sm text-muted-foreground">Total Rows</p>
                </FloatingCard>
                
                <FloatingCard delay={0.15} hover={false} className="p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-success mx-auto mb-2" />
                  <p className="text-2xl font-bold text-success">{mappedCount}</p>
                  <p className="text-sm text-muted-foreground">Mapped</p>
                </FloatingCard>
                
                <FloatingCard delay={0.2} hover={false} className="p-4 text-center">
                  <AlertCircle className="w-6 h-6 text-warning mx-auto mb-2" />
                  <p className="text-2xl font-bold text-warning">{unmappedCount}</p>
                  <p className="text-sm text-muted-foreground">Not Mapped</p>
                </FloatingCard>
              </div>

              {/* Data Table */}
              <FloatingPanel delay={0.25} className="overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {fileName}
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Code</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Display</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Mapped To</th>
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.map((row, index) => (
                        <motion.tr
                          key={row.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + index * 0.03 }}
                          className="border-b border-border/50 hover:bg-muted/30 transition-colors duration-200"
                        >
                          <td className="py-3 px-4 font-mono text-sm text-foreground">{row.code}</td>
                          <td className="py-3 px-4 text-foreground">{row.display}</td>
                          <td className="py-3 px-4 text-muted-foreground">{row.category || '-'}</td>
                          <td className="py-3 px-4">
                            <StatusBadge status={row.isMapped ? 'mapped' : 'unmapped'} />
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {row.mappedTo || '-'}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </FloatingPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CSVUpload;
