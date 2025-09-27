import { useEffect, useState } from 'react';
import { DiagnoseEntry } from '../../types';
import diagnosesService from '../../services/diagnoses';
import axios from 'axios';

interface Props {
  code: string;
}

const DiagnosisDetail = ({ code }: Props) => {
  const [diagnosis, setDiagnosis] = useState<DiagnoseEntry | null>(null);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      if (code) {
        try {
          const fetchedDiagnosis = await diagnosesService.getByCode(code);
          setDiagnosis(fetchedDiagnosis);
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

    fetchDiagnosis();
  }, [code]);

  if (!diagnosis) return <p>Loading diagnosis...</p>;

  return (
    <div>
      <p>{code}</p>
      <p>{diagnosis.name}</p>
    </div>
  );
};

export default DiagnosisDetail;
