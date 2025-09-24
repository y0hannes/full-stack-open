import { useState } from 'react';
import type { DiaryFormProps } from '../types';
import diaryServices from '../services/diaryServices';
import axios from 'axios';
import RadioButton from './RadioButton';

const DiaryForm = ({ onAddDiary, setError }: DiaryFormProps) => {
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const visibilityOptions = ['great', 'good', 'ok', 'poor'];
  const weatherOptions = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];

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
          setError('');
        }, 5000);
      } else {
        setError('Error adding diary');
      }
    }
  };

  const changeVisibility = (value: string) => {
    setVisibility(value);
  };

  const changeWeather = (value: string) => {
    setWeather(value);
  };

  return (
    <div>
      <h2>Add new entry </h2>
      <form onSubmit={handleSubmit}>
        <div>
          Date:
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          Visibility:
          {visibilityOptions.map((option) => (
            <RadioButton
              name={'visibility'}
              button={option}
              currentValue={visibility}
              onChange={changeVisibility}
            />
          ))}
        </div>
        <div>
          Weather:
          {weatherOptions.map((option) => (
            <RadioButton
              name={'weather'}
              button={option}
              currentValue={weather}
              onChange={changeWeather}
            />
          ))}
        </div>
        <div>
          Comment:
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
