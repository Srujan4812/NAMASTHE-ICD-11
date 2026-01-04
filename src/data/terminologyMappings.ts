export interface TerminologyMapping {
  id: string;
  namaste: {
    code: string;
    display: string;
    category: string;
  };
  icd11: {
    tm2Code: string;
    tm2Display: string;
    biomedicalCode?: string;
    biomedicalDisplay?: string;
  };
  mappingType: 'exact' | 'broader' | 'narrower' | 'related';
}

export const terminologyMappings: TerminologyMapping[] = [
  {
    id: '1',
    namaste: { code: 'NAM-001', display: 'Essential Hypertension', category: 'Cardiovascular' },
    icd11: { tm2Code: 'BA00', tm2Display: 'Essential hypertension', biomedicalCode: 'XN5LH', biomedicalDisplay: 'Essential hypertension' },
    mappingType: 'exact'
  },
  {
    id: '2',
    namaste: { code: 'NAM-002', display: 'Type 2 Diabetes Mellitus', category: 'Endocrine' },
    icd11: { tm2Code: '5A11', tm2Display: 'Type 2 diabetes mellitus', biomedicalCode: 'XN2P6', biomedicalDisplay: 'Diabetes mellitus type 2' },
    mappingType: 'exact'
  },
  {
    id: '3',
    namaste: { code: 'NAM-003', display: 'Acute Bronchitis', category: 'Respiratory' },
    icd11: { tm2Code: 'CA20', tm2Display: 'Acute bronchitis', biomedicalCode: 'XN8K2', biomedicalDisplay: 'Bronchitis, acute' },
    mappingType: 'exact'
  },
  {
    id: '4',
    namaste: { code: 'NAM-004', display: 'Chronic Kidney Disease Stage 3', category: 'Renal' },
    icd11: { tm2Code: 'GB61.2', tm2Display: 'Chronic kidney disease, stage 3' },
    mappingType: 'exact'
  },
  {
    id: '5',
    namaste: { code: 'NAM-005', display: 'Major Depressive Disorder', category: 'Mental Health' },
    icd11: { tm2Code: '6A70', tm2Display: 'Single episode depressive disorder', biomedicalCode: 'XN4R7', biomedicalDisplay: 'Depressive disorder, major' },
    mappingType: 'broader'
  },
  {
    id: '6',
    namaste: { code: 'NAM-006', display: 'Osteoarthritis of Knee', category: 'Musculoskeletal' },
    icd11: { tm2Code: 'FA02.0', tm2Display: 'Osteoarthritis of knee', biomedicalCode: 'XN9M3', biomedicalDisplay: 'Knee osteoarthritis' },
    mappingType: 'exact'
  },
  {
    id: '7',
    namaste: { code: 'NAM-007', display: 'Iron Deficiency Anemia', category: 'Hematologic' },
    icd11: { tm2Code: '3A00', tm2Display: 'Iron deficiency anaemia', biomedicalCode: 'XN1T8', biomedicalDisplay: 'Anemia, iron deficiency' },
    mappingType: 'exact'
  },
  {
    id: '8',
    namaste: { code: 'NAM-008', display: 'Atopic Dermatitis', category: 'Dermatologic' },
    icd11: { tm2Code: 'EA80', tm2Display: 'Atopic dermatitis' },
    mappingType: 'exact'
  },
  {
    id: '9',
    namaste: { code: 'NAM-009', display: 'Migraine without Aura', category: 'Neurologic' },
    icd11: { tm2Code: '8A80.1', tm2Display: 'Migraine without aura', biomedicalCode: 'XN6V2', biomedicalDisplay: 'Common migraine' },
    mappingType: 'exact'
  },
  {
    id: '10',
    namaste: { code: 'NAM-010', display: 'Gastroesophageal Reflux Disease', category: 'Gastrointestinal' },
    icd11: { tm2Code: 'DA22', tm2Display: 'Gastro-oesophageal reflux disease', biomedicalCode: 'XN3W5', biomedicalDisplay: 'GERD' },
    mappingType: 'exact'
  },
  {
    id: '11',
    namaste: { code: 'NAM-011', display: 'Allergic Rhinitis', category: 'Respiratory' },
    icd11: { tm2Code: 'CA08', tm2Display: 'Allergic rhinitis', biomedicalCode: 'XN7K9', biomedicalDisplay: 'Hay fever' },
    mappingType: 'broader'
  },
  {
    id: '12',
    namaste: { code: 'NAM-012', display: 'Hypothyroidism', category: 'Endocrine' },
    icd11: { tm2Code: '5A00', tm2Display: 'Hypothyroidism' },
    mappingType: 'broader'
  },
  {
    id: '13',
    namaste: { code: 'NAM-013', display: 'Urinary Tract Infection', category: 'Urologic' },
    icd11: { tm2Code: 'GC08', tm2Display: 'Urinary tract infection', biomedicalCode: 'XN2M6', biomedicalDisplay: 'UTI' },
    mappingType: 'exact'
  },
  {
    id: '14',
    namaste: { code: 'NAM-014', display: 'Generalized Anxiety Disorder', category: 'Mental Health' },
    icd11: { tm2Code: '6B00', tm2Display: 'Generalised anxiety disorder', biomedicalCode: 'XN5Q3', biomedicalDisplay: 'GAD' },
    mappingType: 'exact'
  },
  {
    id: '15',
    namaste: { code: 'NAM-015', display: 'Chronic Obstructive Pulmonary Disease', category: 'Respiratory' },
    icd11: { tm2Code: 'CA22', tm2Display: 'Chronic obstructive pulmonary disease', biomedicalCode: 'XN8P4', biomedicalDisplay: 'COPD' },
    mappingType: 'exact'
  },
  {
    id: '16',
    namaste: { code: 'NAM-016', display: 'Benign Prostatic Hyperplasia', category: 'Urologic' },
    icd11: { tm2Code: 'GA90', tm2Display: 'Benign prostatic hyperplasia' },
    mappingType: 'exact'
  },
  {
    id: '17',
    namaste: { code: 'NAM-017', display: 'Congestive Heart Failure', category: 'Cardiovascular' },
    icd11: { tm2Code: 'BD10', tm2Display: 'Heart failure', biomedicalCode: 'XN4S8', biomedicalDisplay: 'CHF' },
    mappingType: 'broader'
  },
  {
    id: '18',
    namaste: { code: 'NAM-018', display: 'Lumbar Disc Herniation', category: 'Musculoskeletal' },
    icd11: { tm2Code: 'FA82.0', tm2Display: 'Lumbar disc disorders with radiculopathy' },
    mappingType: 'related'
  },
  {
    id: '19',
    namaste: { code: 'NAM-019', display: 'Peptic Ulcer Disease', category: 'Gastrointestinal' },
    icd11: { tm2Code: 'DA60', tm2Display: 'Peptic ulcer disease', biomedicalCode: 'XN9R7', biomedicalDisplay: 'PUD' },
    mappingType: 'exact'
  },
  {
    id: '20',
    namaste: { code: 'NAM-020', display: 'Acute Sinusitis', category: 'Respiratory' },
    icd11: { tm2Code: 'CA00', tm2Display: 'Acute sinusitis', biomedicalCode: 'XN1Y5', biomedicalDisplay: 'Sinusitis, acute' },
    mappingType: 'exact'
  }
];

export const getCategories = (): string[] => {
  const categories = new Set(terminologyMappings.map(m => m.namaste.category));
  return Array.from(categories).sort();
};

export const searchMappings = (query: string): TerminologyMapping[] => {
  const lowerQuery = query.toLowerCase();
  return terminologyMappings.filter(m =>
    m.namaste.code.toLowerCase().includes(lowerQuery) ||
    m.namaste.display.toLowerCase().includes(lowerQuery) ||
    m.icd11.tm2Code.toLowerCase().includes(lowerQuery) ||
    m.icd11.tm2Display.toLowerCase().includes(lowerQuery) ||
    m.namaste.category.toLowerCase().includes(lowerQuery)
  );
};

export const getMappingById = (id: string): TerminologyMapping | undefined => {
  return terminologyMappings.find(m => m.id === id);
};
