import { List, ListItem, ListSubheader } from "@mui/material";
import { Entry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface HospitalEntryProps {
  entry: Entry,
  findDiagnosisName: (code: string) => string;
}

const HospitalEntryComponent = ({ entry, findDiagnosisName }: HospitalEntryProps) => {

  return (
    <div key={entry.id}>
      <LocalHospitalIcon /> Hospital
      <List style={{ background: '#CCE5FF' }}>

        <ListItem>{entry.date}</ListItem>
        <ListItem>Specialist: {entry.specialist}</ListItem>
        <ListItem>{entry.description}</ListItem>
        {entry.diagnosisCodes && (
          <>
            <ListSubheader component="div" id="nested-list-subheader">
              Codes:
            </ListSubheader>
            <List>
              {entry.diagnosisCodes?.map((c: string) => (<ListItem key={c}>{c} : {findDiagnosisName(c)}</ListItem>))}
            </List>
          </>
        )
        }
      </List>
    </div>
  );

};

export default HospitalEntryComponent;
