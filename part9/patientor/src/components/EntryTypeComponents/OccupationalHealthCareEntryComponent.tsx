import { List, ListItem, ListSubheader } from "@mui/material";
import { Entry } from "../../types";

import WorkIcon from '@mui/icons-material/Work';
interface OccupationalHealthCareEntryProps {
  entry: Entry,
  findDiagnosisName: (code: string) => string;
}

const OccupationalHealthCareEntryComponent = ({ entry, findDiagnosisName }: OccupationalHealthCareEntryProps) => {
  if (entry.type != 'OccupationalHealthcare') {
    return <div>Unknown entry type</div>;
  }

  return (
    <div key={entry.id}>
      <WorkIcon /> Occupational healthcare
      <List style={{ background: '#FFF0FF' }}>
        <ListItem>{entry.date}</ListItem>
        <ListItem>Employer: {entry.employerName}</ListItem>
        <ListItem>Seen by: {entry.specialist}</ListItem>
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

export default OccupationalHealthCareEntryComponent;
