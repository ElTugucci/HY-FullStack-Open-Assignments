import { useEffect, useState } from "react";
import { Patient, Diagnosis, EntryFormValues } from "../../types";
import { useParams } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import { Female, Male, QuestionMark } from "@mui/icons-material";
import EntryComponent from '../EntryComponent';
import { Button } from "@mui/material";
import AddEntryModal from "../AddEntryModal";
import patientService from "../../services/patients";
import axios from "axios";

interface Props {
  patients: Patient[],
  diagnoses: Diagnosis[]
}

const PatientInfo = ({ patients, diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const foundPatient = patients.find(patient => patient.id === id);
    setPatient(foundPatient);
  }, [id, patients]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const getGenderIcon = (gender: string): JSX.Element => {
    switch (gender) {
      case "male":
        return <Male></Male>;
      case "female":
        return <Female></Female>;
      case "other":
        return <Diversity2Icon></Diversity2Icon>;
      default:
        return <QuestionMark></QuestionMark>;
    }
  };
  const submitNewEntry = async (values: EntryFormValues) => {

    try {
      if (id && patient) {
        const entry = await patientService.addEntry(values, id);
        if (!entry.type || !entry.specialist || !entry.description || !entry.date) {
          setError("Please fill in all required fields");
          return;
        }
        if (patient) {
          setPatient({
            ...patient,
            entries: [...patient.entries, { ...entry, id: "wewe" }]
          });
        }
        setModalOpen(false);
      }
    }

    catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        setError(error.response?.data.error[0].message);
      } else {
        setError("Unrecognized axios error");
      }
    }


    console.log('New Entry');
  };

  if (patient) {
    return (
      <div>
        <List>
          <ListItem><h2>{patient.name}</h2>{getGenderIcon(patient.gender)} </ListItem>
          <ListItem>Occupation: {patient.occupation} </ListItem>
          <ListItem>SSN: {patient.ssn} </ListItem>
          {(patient.entries.length > 0) && (<>
            <h2>Entries: </h2>{patient.entries.map((entry) => <div key={entry.id}> <EntryComponent entry={entry} diagnoses={diagnoses} /></div>)}
          </>)}
        </List >

        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          diagnoses={diagnoses}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Entry
        </Button>
      </div >
    );
  }
  else {
    return <div><h1>Patient not found</h1></div>;
  }
};

export default PatientInfo;
