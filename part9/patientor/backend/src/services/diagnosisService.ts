import diagnosesData from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getAll = () => {
  return diagnosesData;
};

const getByCode = (code: string | undefined): DiagnoseEntry | undefined => {
  return diagnosesData.find((data) => data.code === code);
};

export default { getAll, getByCode };
