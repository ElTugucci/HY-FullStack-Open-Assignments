import { List, ListItem, ListSubheader } from "@mui/material";
import { Entry } from "../../types";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CircleIcon from '@mui/icons-material/Circle';
import { green, orange, red, yellow } from "@mui/material/colors";
interface HealthCheckEntryProps {
  entry: Entry,
  findDiagnosisName: (code: string) => string;
}

const HealthCheckEntryComponent = ({ entry, findDiagnosisName }: HealthCheckEntryProps) => {
  const getHealthRatingIcon = (rating: number) => {
    switch (rating) {
      case 0:
        return <CircleIcon sx={{ color: green[500] }} />;
      case 1:
        return <CircleIcon sx={{ color: yellow[500] }} />;
      case 2:
        return <CircleIcon sx={{ color: orange[500] }} />;
      case 3:
        return <CircleIcon sx={{ color: red[500] }} />;
    }
  };
  if (entry.type != 'HealthCheck') {
    return <div>Unknown entry type</div>;
  }

  return (
    <div key={entry.id}>
      <MonitorHeartIcon /> Healthcheck
      <List style={{ background: '#CCFFCC' }}>
        <ListItem>{entry.date}</ListItem>
        <ListItem>{entry.description}</ListItem>

        <ListItem>Seen by: {entry.specialist}</ListItem>
        <ListItem>{getHealthRatingIcon(entry.healthCheckRating)}</ListItem>
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

export default HealthCheckEntryComponent;
