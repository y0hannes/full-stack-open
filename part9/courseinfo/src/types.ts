export interface HeaderProps {
  title: string;
}

type content = {
  name: string;
  exerciseCount: number;
};

export interface ContentProps {
  courseParts: content[];
}

export interface TotalProps {
  totalExercises: number;
}
