import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patients from '../../services/patients';
import { Patient } from '../../types';
import axios from 'axios';
import DiagnosisDetail from './DiagnosisDetail';

const entryStyle = {
  border: 'solid black',
  margin: 5,
  padding: 10,
};

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const fetchedPatient = await patients.getById(id);
          setPatient(fetchedPatient);
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            if (e?.response?.data && typeof e?.response?.data === 'string') {
              const message = e.response.data.replace(
                'Something went wrong. Error: ',
                ''
              );
              console.error(message);
              // setError(message);
            } else {
              // setError("Unrecognized axios error");
            }
          } else {
            console.error('Unknown error', e);
            // setError("Unknown error");
          }
        }
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <p>Loading...</p>;
  console.log(patient.entries);

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      <h3>Entries</h3>
      {patient.entries.length === 0 ? (
        <p>No entries available.</p>
      ) : (
        patient.entries.map((entry) => (
          <div style={entryStyle}>
            <div key={entry.id}>
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
    </div>
  );
};

export default PatientDetail;
