export interface NewDiaryEntry {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export interface Diary {
  id: string;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type DiaryFormProps = {
  onAddDiary: (diary: Diary) => void;
  setError: (error: string | null) => void;
};

export type NotificationProps = {
  error: string | null;
};
