import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { newPatientEntry } from '../utils';
import { z } from 'zod';
import { NewPatientEntry, Patient } from '../types';

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

router.post(
  '/',
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<Patient>
  ) => {
    const addedEntity = patientService.addPatient(req.body);
    res.json(addedEntity);
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
