import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculate } from './excerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  console.log(req.query);

  try {
    const heightParam = Number(height);
    const weightParam = Number(weight);
    if (isNaN(heightParam) || isNaN(weightParam)) {
      throw new Error('Invalid or missing parameters');
    }
    const bmi = calculateBmi(heightParam, weightParam);
    const response =
    {
      height: heightParam,
      weight: weightParam,
      bmi: bmi
    };
    res.send(response);
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});
interface ExerciseRequest {
  daily_exercises: number[];
  target: number;
}
app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseRequest;
  res.send(calculate(daily_exercises, target));
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
