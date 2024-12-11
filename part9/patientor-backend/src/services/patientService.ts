import patientsData from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient, Entry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';
const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients.map((patient) => ({
    ...patient
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const getNoSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    occupation,
    gender,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newId = uuid();
  const newPatient = {
    id: newId,
    entries: [],
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }

  const newId = uuid();
  const newEntry = {
    id: newId,
    ...entry
  } as Entry;

  patient.entries.push(newEntry);
  console.log(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatient,
  getNoSensitivePatients,
  addPatient,
  addEntry
};
