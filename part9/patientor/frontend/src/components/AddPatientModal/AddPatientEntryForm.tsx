import {
  Button,
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { EntryType, HealthCheckRating, NewEntry } from '../../types';
import diagnoses from '../../services/diagnoses';

interface Props {
  onSubmit: (values: NewEntry) => void;
}

interface EntryTypeOptions {
  value: EntryType;
  label: string;
}

const EntryTypeOptions: EntryTypeOptions[] = Object.values(EntryType).map(
  (v) => ({
    value: v,
    label: v.toString(),
  })
);

const HealthCheckRatingOptions = Object.entries(HealthCheckRating)
  .filter(([, val]) => typeof val === 'number')
  .map(([key, val]) => ({
    value: val as number,
    label: key,
  }));

const AddPatientEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [entryType, setEntryType] = useState(EntryType.HealthCheck);

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [allDiagnosisCodes, setAllDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  useEffect(() => {
    const fetchDiagnosisCodes = async () => {
      try {
        const fetchedDiagnoses = await diagnoses.getAll();
        const onlyCodes = fetchedDiagnoses.map((diagnosis) => diagnosis.code);
        setAllDiagnosisCodes(onlyCodes);
        console.log('Fetched diagnoses:', fetchedDiagnoses);
      } catch (error) {
        console.error('Error fetching diagnoses:', error);
      }
    };
    fetchDiagnosisCodes();
  }, []);



  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const entry = Object.values(EntryType).find(
        (g) => g.toString() === value
      );
      if (entry) {
        setEntryType(entry);
      }
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent) => {
    setHealthCheckRating(Number(event.target.value) as HealthCheckRating);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    let newEntry: NewEntry;

    switch (entryType) {
      case EntryType.Hospital:
        newEntry = {
          type: 'Hospital',
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      case EntryType.OccupationalHealthcare:
        newEntry = {
          type: 'OccupationalHealthcare',
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        };
        break;
      case EntryType.HealthCheck:
        newEntry = {
          type: 'HealthCheck',
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating,
        };
        break;
      default:
        return;
    }

    onSubmit(newEntry);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Description'
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <p>
        Date
        <input
          type='date'
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </p>
      <TextField
        label='Specialist'
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />

      <InputLabel id='diagnosis-codes-label'>Diagnosis Codes</InputLabel>
      <Select
        labelId='diagnosis-codes-label'
        multiple
        value={diagnosisCodes}
        onChange={handleChange}
        input={<OutlinedInput label='Diagnosis Codes' />}
        renderValue={(selected) => (selected as string[]).join(', ')}
      >
        {allDiagnosisCodes.map((code) => (
          <MenuItem key={code} value={code}>
            <Checkbox checked={diagnosisCodes.indexOf(code) > -1} />
            <ListItemText primary={code} />
          </MenuItem>
        ))}
      </Select>

      <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
      <Select
        label='Entry Type'
        fullWidth
        value={entryType}
        onChange={onEntryTypeChange}
      >
        {EntryTypeOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {entryType === EntryType.Hospital && (
        <>
          <p>
            Discharge Date
            <input
              type='date'
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
          </p>
          <TextField
            label='Discharge Criteria'
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
        </>
      )}
      {entryType === EntryType.OccupationalHealthcare && (
        <>
          <TextField
            label='Employer Name'
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <p>
            Sick Leave Start Date
            <input
              type='date'
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
          </p>
          <p>
            Sick Leave End Date
            <input
              type='date'
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </p>
        </>
      )}
      {entryType === EntryType.HealthCheck && (
        <>
          <InputLabel style={{ marginTop: 20 }}>Health Check Rating</InputLabel>
          <Select
            fullWidth
            value={healthCheckRating.toString()}
            onChange={onHealthCheckRatingChange}
          >
            {HealthCheckRatingOptions.map((option) => (
              <MenuItem key={option.value} value={option.value.toString()}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
      <Button
        type='submit'
        variant='contained'
        color='primary'
        style={{ marginTop: 20 }}
      >
        Submit Entry
      </Button>
    </form>
  );
};

export default AddPatientEntryForm;
