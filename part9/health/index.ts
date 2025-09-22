import express from 'express';
import { calculateBmi } from './bmiCalculator.js';
import { calculateExercise } from './exerciseCalculator.js';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as {
    daily_exercises: number[];
    target: number;
  };

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((exercise) => isNaN(exercise)) ||
    isNaN(target)
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const result = calculateExercise(daily_exercises, target);
  return res.json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
