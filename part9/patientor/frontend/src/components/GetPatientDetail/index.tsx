import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientsService from '../../services/patients';
import { Patient, NewEntry } from '../../types';
import axios from 'axios';
import DiagnosisDetail from './DiagnosisDetail';
import AddNewEntry from './AddNewEntry';
import { Alert } from '@mui/material';

const entryStyle = {
  border: 'solid black',
  margin: 5,
  padding: 10,
};

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const fetchedPatient = await patientsService.getById(id);
          setPatient(fetchedPatient);
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            if (e?.response?.data && typeof e?.response?.data === 'string') {
              const message = e.response.data.replace(
                'Something went wrong. Error: ',
                ''
              );
              console.error(message);
              setError(message);
            } else {
              setError("Unrecognized axios error");
            }
          } else {
            console.error('Unknown error', e);
            setError("Unknown error");
          }
        }
      }
    };

    fetchPatient();
  }, [id]);

  const onNewEntryAdd = async (values: NewEntry) => {
    if (id) {
      try {
        const newEntry = await patientsService.addPatientEntry(id, values);
        if (patient) {
          setPatient({
            ...patient,
            entries: patient.entries.concat(newEntry),
          });
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === 'string') {
            const message = e.response.data.replace(
              'Something went wrong. Error: ',
              ''
            );
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error('Unknown error', e);
          setError("Unknown error");
        }
      }
    }
  };

  if (!patient) return <p>Loading...</p>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      {error && <Alert severity="error">{error}</Alert>}

      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries available.</p>
      ) : (
        patient.entries.map((entry) => (
          <div style={entryStyle} key={entry.id}>
            <div>
              <p>
                {entry.date} {entry.description}
              </p>
              {entry.diagnosisCodes?.map((code: string) => (
                <DiagnosisDetail key={code} code={code} />
              ))}
              <p>diagnose by {entry.specialist}</p>
            </div>
          </div>
        ))
      )}
      <AddNewEntry onSubmit={onNewEntryAdd} />
    </div>
  );
};

export default PatientDetail;
