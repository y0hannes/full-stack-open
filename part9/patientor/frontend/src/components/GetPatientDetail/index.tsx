import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import patients from '../../services/patients';
import { Patient } from '../../types';
import axios from 'axios';

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
            if (e?.response?.data && typeof e?.response?.data === "string") {
              const message = e.response.data.replace('Something went wrong. Error: ', '');
              console.error(message);
              // setError(message);
            } else {
              // setError("Unrecognized axios error");
            }
          } else {
            console.error("Unknown error", e);
            // setError("Unknown error");
          }
        }
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p><strong>SSN:</strong> {patient.ssn}</p>
      <p><strong>Occupation:</strong> {patient.occupation}</p>
    </div>
  );
};

export default PatientDetail;
