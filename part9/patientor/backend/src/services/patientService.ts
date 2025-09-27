import patientData from '../../data/patients';
import { NewPatientEntry, NonSsnPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getAll = (): NonSsnPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getById = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const addPatient = (newPatientEntry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...newPatientEntry,
    entries: []
  };
  patientData.push(newPatient);
  return newPatient;
};

export default { getAll, getById, addPatient };
