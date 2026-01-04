import { TerminologyMapping } from '@/data/terminologyMappings';

export interface FHIRBundle {
  resourceType: 'Bundle';
  id: string;
  type: 'collection';
  timestamp: string;
  entry: FHIRBundleEntry[];
}

interface FHIRBundleEntry {
  resource: FHIRResource;
}

type FHIRResource = FHIRPatient | FHIREncounter | FHIRCondition;

interface FHIRPatient {
  resourceType: 'Patient';
  id: string;
  identifier: { system: string; value: string }[];
  name: { use: string; family: string; given: string[] }[];
  gender: string;
  birthDate: string;
}

interface FHIREncounter {
  resourceType: 'Encounter';
  id: string;
  status: string;
  class: { system: string; code: string; display: string };
  subject: { reference: string };
  period: { start: string; end: string };
}

interface FHIRCondition {
  resourceType: 'Condition';
  id: string;
  clinicalStatus: { coding: { system: string; code: string }[] };
  verificationStatus: { coding: { system: string; code: string }[] };
  code: { coding: { system: string; code: string; display: string }[] };
  subject: { reference: string };
  encounter: { reference: string };
  recordedDate: string;
}

const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const syntheticPatients = [
  { family: 'Kumar', given: ['Raj'], gender: 'male', birthDate: '1985-03-15' },
  { family: 'Sharma', given: ['Priya'], gender: 'female', birthDate: '1992-07-22' },
  { family: 'Patel', given: ['Amit'], gender: 'male', birthDate: '1978-11-08' },
  { family: 'Singh', given: ['Meera'], gender: 'female', birthDate: '1988-01-30' },
  { family: 'Reddy', given: ['Vikram'], gender: 'male', birthDate: '1995-05-14' },
];

export const generateFHIRBundle = (mapping: TerminologyMapping): FHIRBundle => {
  const bundleId = generateUUID();
  const patientId = generateUUID();
  const encounterId = generateUUID();
  const conditionId = generateUUID();
  
  const patient = syntheticPatients[Math.floor(Math.random() * syntheticPatients.length)];
  const timestamp = new Date().toISOString();
  const encounterStart = new Date(Date.now() - 86400000).toISOString();
  const encounterEnd = timestamp;

  const conditionCodings: { system: string; code: string; display: string }[] = [
    {
      system: 'http://namaste.health/terminology',
      code: mapping.namaste.code,
      display: mapping.namaste.display
    },
    {
      system: 'http://id.who.int/icd/release/11/mms',
      code: mapping.icd11.tm2Code,
      display: mapping.icd11.tm2Display
    }
  ];

  if (mapping.icd11.biomedicalCode) {
    conditionCodings.push({
      system: 'http://id.who.int/icd/release/11/biomedical',
      code: mapping.icd11.biomedicalCode,
      display: mapping.icd11.biomedicalDisplay || ''
    });
  }

  return {
    resourceType: 'Bundle',
    id: bundleId,
    type: 'collection',
    timestamp,
    entry: [
      {
        resource: {
          resourceType: 'Patient',
          id: patientId,
          identifier: [
            {
              system: 'http://namaste.health/patient-id',
              value: `PAT-${Math.floor(Math.random() * 100000)}`
            }
          ],
          name: [
            {
              use: 'official',
              family: patient.family,
              given: patient.given
            }
          ],
          gender: patient.gender,
          birthDate: patient.birthDate
        }
      },
      {
        resource: {
          resourceType: 'Encounter',
          id: encounterId,
          status: 'finished',
          class: {
            system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
            code: 'AMB',
            display: 'ambulatory'
          },
          subject: {
            reference: `Patient/${patientId}`
          },
          period: {
            start: encounterStart,
            end: encounterEnd
          }
        }
      },
      {
        resource: {
          resourceType: 'Condition',
          id: conditionId,
          clinicalStatus: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                code: 'active'
              }
            ]
          },
          verificationStatus: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
                code: 'confirmed'
              }
            ]
          },
          code: {
            coding: conditionCodings
          },
          subject: {
            reference: `Patient/${patientId}`
          },
          encounter: {
            reference: `Encounter/${encounterId}`
          },
          recordedDate: timestamp
        }
      }
    ]
  };
};
