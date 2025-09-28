import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Diagnoses } from '../types';

const getAll = async () => {
  const response = await axios.get<Diagnoses[]>(`${apiBaseUrl}/diagnoses`);
  return response.data;
};

const getByCode = async (code: string) => {
  const response = await axios.get<Diagnoses>(
    `${apiBaseUrl}/diagnoses/${code}`
  );
  return response.data;
};

export default { getAll, getByCode };
