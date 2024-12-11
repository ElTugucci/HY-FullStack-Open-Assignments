import { parseArguments } from "./utils/exerciseCalculatorArguments";
interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

type Rating = {
  rating: number,
  description: string
};

const calculateAverage = (hours: number[]): number => {
  return hours.reduce((a, b) => a + b, 0) / hours.length;
};

const calculateRating = (average: number, target: number): Rating => {
  if (average <= target - 0.5) {
    return { rating: 1, description: "not the best week, try to get closer to the target next time" };
  } else if (average > target - 0.5 && average < target + 0.5) {
    return { rating: 2, description: "not too bad, but could be better" };
  } else {
    return { rating: 3, description: "keep up the good work!" };
  }
};

export const calculate = (hours: number[], target: number): Result => {
  const average = calculateAverage(hours);
  const rating = calculateRating(average, target);
  return {
    periodLength: hours.length,
    trainingDays: hours.filter((day) => day > 0).length,
    target: target,
    average: average,
    success: (average <= target) ? false : true,
    rating: rating.rating,
    ratingDescription: rating.description
  };
};

try {
  const { hours, target } = parseArguments(process.argv);
  console.log(calculate(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
