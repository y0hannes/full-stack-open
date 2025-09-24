import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getAll();
  res.json(patients);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntity = toNewPatientEntry(req.body);
    const addedEntity = patientService.addPatient(newPatientEntity);
    res.json(addedEntity);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
export default router;
