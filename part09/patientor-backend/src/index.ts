import express from 'express';
import patientRouter from './routes/patients';
import diagnosisRouter from './routes/diagnoses';

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
