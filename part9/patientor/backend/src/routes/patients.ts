import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { newPatientEntry } from '../utils';
import { z } from 'zod';
import { Entry, NewPatientEntry, Patient, NewEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getAll();
  res.json(patients);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientEntry.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get('/:id', (req, res) => {
  const patient = patientService.getById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ Error: 'patient not found' });
  }
});

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntity = patientService.addPatient(req.body);
    res.json(addedEntity);
  }
);

router.post(
  '/:id/entries',
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<Entry | { error: string }>
  ) => {
    const id = req.params.id;
    const newPatientEntry = req.body;
    const addedEntry = patientService.addEntry(id, newPatientEntry);

    if (!addedEntry) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    return res.json(addedEntry);
  }
);

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorHandler);

export default router;
