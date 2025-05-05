import express, { Response, Request, NextFunction } from 'express';
import patientService from '../services/patientService';
import { newPatientSchema, toNewEntry, toNewPatient } from '../utils';
const router = express.Router();
import { z } from 'zod';
import { Entry, NewEntry, NewPatient, Patient } from '../types';

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = res.send(patientService.getPatient(req.params.id));
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};


const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const newPatientEntry = toNewPatient(req.body);
  const addedPatient = patientService.addPatient(newPatientEntry);
  res.json(addedPatient);
});


router.post('/:id/entries', (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
  const newEntry = toNewEntry(req.body);
  const { id } = req.params;
  const addedEntry = patientService.addEntry(id, newEntry);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;
