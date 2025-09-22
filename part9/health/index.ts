import express from 'express';
import { calculateBmi } from './bmiCalculator.js';

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res
      .status(400)
      .send('Both height and weight must be valid numbers.');
  }
  const bmi = calculateBmi(height, weight);
  res.send(`Bmi: ${bmi}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
