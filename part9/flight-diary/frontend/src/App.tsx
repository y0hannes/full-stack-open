import { useEffect, useState } from 'react';
import type { Diary } from './types';
import diaryServices from './services/diaryServices';
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    diaryServices.getAll().then(setDiaries);
  }, []);

  const addDiaryToList = (newDiary: Diary) => {
    setDiaries((prev) => [...prev, newDiary]);
  };

  return (
    <div>
      <Notification error={error} />
      <DiaryForm onAddDiary={addDiaryToList} setError={setError} />
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
