import { useState } from 'react';
import type { DiaryFormProps } from '../types';
import diaryServices from '../services/diaryServices';
import axios from 'axios';

const DiaryForm = ({ onAddDiary, setError }: DiaryFormProps) => {
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newDiary = { date, visibility, weather, comment };

    try {
      const addedDiary = await diaryServices.addDiary(newDiary);
      onAddDiary(addedDiary);
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
        else{
          setError("Error adding diary");
        }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Date:
        <input 
          type="text" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>
      <div>
        Visibility:
        <input 
          type="text" 
          value={visibility} 
          onChange={(e) => setVisibility(e.target.value)} 
        />
      </div>
      <div>
        Weather:
        <input 
          type="text" 
          value={weather} 
          onChange={(e) => setWeather(e.target.value)} 
        />
      </div>
      <div>
        Comment:
        <input 
          type="text" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default DiaryForm;
