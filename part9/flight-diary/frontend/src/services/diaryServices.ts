import axios from 'axios';
import type { Diary, NewDiaryEntry } from '../types';

const baseUrl = '/api/diaries';

const getAll = async () => {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
};

const addDiary = async (object: NewDiaryEntry) => {
  const response = await axios.post<Diary>(baseUrl, object);
  return response.data;
};

export default { getAll, addDiary };
