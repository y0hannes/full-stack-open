import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('', (_req, res) => {
  const diagnoses = diagnosisService.getAll();
  res.json(diagnoses);
});

router.get('/:code', (req, res) => {
  const code = req.params.code;
  const diagnosis = diagnosisService.getByCode(code);
  if (diagnosis) {
    res.json(diagnosis);
  } else {
    res.status(404).send({ Error: 'diagnosis not found' });
  }
});

export default router;
