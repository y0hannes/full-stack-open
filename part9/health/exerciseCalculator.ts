interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const enum Rating {
  Good = 3,
  NotTooBad = 2,
  Bad = 1,
}

const calculateRating = (average: number, target: number): Rating => {
  if (average < target / 2) return Rating.Bad;
  if (average < target) return Rating.NotTooBad;
  return Rating.Good;
};

const enum RatingDescription {
  Bad = 'You can do better!',
  NotTooBad = 'Not too bad but could be better!',
  Good = 'Good job!',
}

const getRatingDescription = (rating: Rating): string => {
  switch (rating) {
    case Rating.Bad:
      return RatingDescription.Bad;
    case Rating.NotTooBad:
      return RatingDescription.NotTooBad;
    case Rating.Good:
      return RatingDescription.Good;
    default:
      throw new Error('Invalid rating!');
  }
};

interface Values {
  dailyExerciseHours: number[];
  target: number;
}

const parseArguments = (args: string[]): Values => {
  const rowData = args.slice(2);
  const processedData: number[] = [];

  for (const data of rowData) {
    const num = Number(data);
    if (isNaN(num)) {
      throw new Error('Provided values must be numbers.');
    }
    processedData.push(num);
  }

  return {
    target: processedData[0],
    dailyExerciseHours: processedData.slice(1),
  };
};

export const calculateExercise = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hour) => hour > 0).length;
  const average = periodLength
    ? dailyExerciseHours.reduce((sum, hour) => sum + hour, 0) / periodLength
    : 0;
  const success = average >= target;
  const rating = calculateRating(average, target);
  const ratingDescription = getRatingDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const { dailyExerciseHours, target } = parseArguments(process.argv);
    console.log(calculateExercise(dailyExerciseHours, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error:', error.message);
    }
  }
}
