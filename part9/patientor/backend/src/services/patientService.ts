import patientData from '../../data/patients';
import {
  Entry,
  NewEntry,
  NewPatientEntry,
  NonSsnPatient,
  Patient,
} from '../types';
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
    entries: [],
  };
  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry | null => {
  const patient = getById(id);
  if (patient) {
    const entryToAdd = {
      id: uuid(),
      ...entry,
    };
    patient.entries.push(entryToAdd);
    return entryToAdd;
  } else {
    return null;
  }
};

export default { getAll, getById, addPatient, addEntry };
