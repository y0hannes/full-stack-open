export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NonSsnPatient = Omit<Patient, 'ssn' | 'entries'>;

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<
  OccupationalHealthcareEntry,
  'id'
>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type NewEntry =
  | NewHospitalEntry
  | NewOccupationalHealthcareEntry
  | NewHealthCheckEntry;

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum EntryType {
  HealthCheck = 'health check',
  OccupationalHealthcare = 'occupational health care',
  Hospital = 'hospital',
}

export interface RawEntryFormValues {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  entryType: EntryType;
  dischargeDate: string;
  dischargeCriteria: string;
  employerName: string;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;
  healthCheckRating: HealthCheckRating;
}

