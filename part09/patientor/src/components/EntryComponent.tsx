import { Entry, Diagnosis } from "../types";
import HealthCheckEntryComponent from "./EntryTypeComponents/HealtcheckEntryComponent";
import HospitalEntryComponent from "./EntryTypeComponents/HospitalEntryComponent";
import OccupationalHealthCareEntryComponent from "./EntryTypeComponents/OccupationalHealthCareEntryComponent";

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[]
}

const EntryComponent = ({ entry, diagnoses }: EntryProps): JSX.Element => {
  const findDiagnosisName = (code: string) => {
    const diagnosis = diagnoses?.find((d) => d.code === code);
    if (diagnosis) {
      return diagnosis.name;
    } else {
      return "Diagnosis name not found.";
    }
  };
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent entry={entry} findDiagnosisName={findDiagnosisName} />;
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry} findDiagnosisName={findDiagnosisName} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareEntryComponent entry={entry} findDiagnosisName={findDiagnosisName} />;
    default:
      return assertNever(entry as never);
  }
};
export default EntryComponent;
