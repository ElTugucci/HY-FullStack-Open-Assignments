import { parseArguments } from "./utils/BmiCalculatorArguments";
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
require.main === module;
export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters: number = height / 100;
  const bmi: number = weight / (heightInMeters * heightInMeters);

  if (bmi < 16) {
    return "Underweight (severe thinness)";
  } else if (bmi >= 16 && bmi < 17) {
    return "Underweight (moderate thinness)";
  } else if (bmi >= 17 && bmi < 18.5) {
    return "Underweight (mild thinness)";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal range";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight (pre-obese)";
  } else if (bmi >= 30 && bmi < 35) {
    return "Obese (Class 1)";
  } else if (bmi >= 35 && bmi < 40) {
    return "Obese (Class 2)";
  } else {
    return "Obese (Class 3)";
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

