import { NewPatientEntry, Gender } from './types';
import { z } from 'zod';

export const newPatientEntry = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPatientEntry.parse(object);
};