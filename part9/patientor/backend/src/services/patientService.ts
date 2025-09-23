import patientData from '../../date/patients';
import { NonSsnPatient } from '../types';

const getAll = (): NonSsnPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getAll };
