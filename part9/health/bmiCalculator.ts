interface Args {
  height: number;
  weight: number;
}

const parseArgs = (args: string[]): Args => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Height and weight must be numbers.');
  }

  return { height, weight };
};

const enum BmiCategory {
  UnderweightSevereThinness = 'Underweight (severe thinness)',
  UnderweightModerateThinness = 'Underweight (moderate thinness)',
  UnderweightMildThinness = 'Underweight (mild thinness)',
  NormalHealthyWeight = 'Normal (healthy weight)',
  Overweight = 'Overweight',
  ObeseClassI = 'Obese Class I (Moderate)',
  ObeseClassII = 'Obese Class II (Severe)',
  ObeseClassIII = 'Obese Class III (Very severe)',
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 16) return BmiCategory.UnderweightSevereThinness;
  if (bmi < 17) return BmiCategory.UnderweightModerateThinness;
  if (bmi < 18.5) return BmiCategory.UnderweightMildThinness;
  if (bmi < 25) return BmiCategory.NormalHealthyWeight;
  if (bmi < 30) return BmiCategory.Overweight;
  if (bmi < 35) return BmiCategory.ObeseClassI;
  if (bmi < 40) return BmiCategory.ObeseClassII;
  return BmiCategory.ObeseClassIII;
};

try {
  const { height, weight } = parseArgs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error:', error.message);
  }
}
