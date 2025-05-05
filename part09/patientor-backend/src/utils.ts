import { NewPatient, HealthCheckRating, NewEntry } from "./types";
import { EntryType, Gender } from "./types";
import { z } from "zod";
export const newPatientSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  ssn: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

export const toNewEntry = (object: unknown): NewEntry => {
  const newEntryBase = newBaseEntrySchema.parse(object);
  switch (newEntryBase.type) {
    case EntryType.HealthCheck: {
      const healthCheckEntry = newHealthcheckEntrySchema.parse(object);
      return { ...newEntryBase, ...healthCheckEntry };
    }
    case EntryType.OccupationalHealthcare:
      {
        const occupationalHealthcareEntry = newOccupationalHealthcareSchema.parse(object);
        return { ...newEntryBase, ...occupationalHealthcareEntry };
      }
    case EntryType.Hospital:
      {
        const hospitalEntry = newHospitalSchema.parse(object);
        return { ...newEntryBase, ...hospitalEntry };
      };
    default:
      throw new Error(`Unknown entry type: `);
  }
};

const DischargeSchema = z.object({
  date: z.string().optional(),
  criteria: z.string(),
});

const SickLeaveSchema = z.object({
  startDate: z.string().date(),
  endDate: z.string().date()
});

export const newBaseEntrySchema = z.object({
  date: z.string().date(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.string().array().optional(),
  type: z.nativeEnum(EntryType),
});

export const newHealthcheckEntrySchema = z.object({
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});


export const newOccupationalHealthcareSchema = z.object({
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});

export const newHospitalSchema = z.object({
  discharge: DischargeSchema,
});