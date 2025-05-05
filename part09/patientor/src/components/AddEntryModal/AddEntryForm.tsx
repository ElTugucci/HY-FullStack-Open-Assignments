import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, Input, ListItem, List } from '@mui/material';
import { Diagnosis, EntryFormValues, HealthCheckRating } from "../../types.ts";
import { SyntheticEvent, useState } from 'react';
interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[]
}

const entryTypeValues = ["Hospital", "OccupationalHealthcare", "HealthCheck"];

const healthCheckRatingOptions: HealthCheckRatingValues[] = Object.values(HealthCheckRating)
  .filter(value => typeof value === "string")
  .map(value => ({
    value: HealthCheckRating[value as keyof typeof HealthCheckRating],
    label: value
  }));

interface HealthCheckRatingValues {
  value: HealthCheckRating;
  label: string;
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [type, setType] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [diagnosisCode, setDiagnosisCode] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);

  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStart, setSickLeaveStart] = useState<string>('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>('');

  const onEntryType = (event: SelectChangeEvent<string>) => {
    event?.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const type = Object.values(entryTypeValues).find(t => t.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = Number(event.target.value); // Convert string back to number
    if (value in HealthCheckRating) {
      setHealthCheckRating(value as HealthCheckRating);
    }
  };

  const addCodes = (code: string) => {
    setDiagnosisCodes(diagnosisCodes.concat(code));
    console.log(diagnosisCode);

    setDiagnosisCode('');
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type,
      specialist,
      description,
      healthCheckRating,
      date,
      diagnosisCodes,

      employerName,
      sickLeave: {
        startDate: sickLeaveStart,
        endDate: sickLeaveEnd,
      },
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria
      }
    } as EntryFormValues);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <List>
          <InputLabel id="entry-type-label">Entry Type</InputLabel>
          <ListItem>
            <Select
              label="Entry Type"
              fullWidth
              value={type}
              onChange={onEntryType}
            >
              {entryTypeValues.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </ListItem>

          <ListItem>
            <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
          </ListItem>

          <ListItem>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </ListItem>

          <ListItem>
            <label>
              Date
              <br />
              <Input
                value={date}
                type="date"
                onChange={({ target }) => setDate(target.value)}
              />
            </label>
          </ListItem>

          <InputLabel id="diagnostic-codes-label">Codes</InputLabel>
          <ListItem>

            <Select
              label="Diagnostic codes"
              fullWidth
              value={diagnosisCode}
              onChange={({ target }) => setDiagnosisCode(target.value)}
            >
              {diagnoses.map(option => (
                <MenuItem key={option.code} value={option.code}>
                  {option.code}
                </MenuItem>
              ))}
            </Select>
            <button onClick={() => addCodes(diagnosisCode)} type="button">
              Add Code
            </button>
          </ListItem>

          <ListItem>
            <div>{diagnosisCodes.join(' ')}</div>
          </ListItem>

          {type === 'Hospital' && (
            <ListItem>
              <div>
                <label>
                  Discharge Date
                  <br />
                  <Input
                    value={dischargeDate}
                    type="date"
                    onChange={({ target }) => setDischargeDate(target.value)}
                  />
                </label>
                <TextField
                  label="Discharge Criteria"
                  fullWidth
                  value={dischargeCriteria}
                  onChange={({ target }) => setDischargeCriteria(target.value)}
                />
              </div>
            </ListItem>
          )}

          {type === 'HealthCheck' && (
            <ListItem>
              <Select
                label="HealthCheck Rating"
                fullWidth
                value={healthCheckRating.toString()} // Cast enum to string
                onChange={onHealthCheckRatingChange}
              >
                {healthCheckRatingOptions.map(option => (
                  <MenuItem key={option.label} value={option.value.toString()}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </ListItem>
          )}

          {type === 'OccupationalHealthcare' && (
            <ListItem>
              <TextField
                label="Employer's Name"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
              <label>
                Sick Leave Start
                <br />
                <Input
                  value={sickLeaveStart}
                  type="date"
                  onChange={({ target }) => setSickLeaveStart(target.value)}
                />
              </label>
              <label>
                Sick Leave End
                <br />
                <Input
                  value={sickLeaveEnd}
                  type="date"
                  onChange={({ target }) => setSickLeaveEnd(target.value)}
                />
              </label>
            </ListItem>
          )}

        </List>
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
