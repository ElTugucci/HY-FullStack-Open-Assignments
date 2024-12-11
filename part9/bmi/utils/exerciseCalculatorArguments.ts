
type CalculatorValues = {
  target: number,
  hours: number[],
};

export const parseArguments = (args: string[]): CalculatorValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 17) throw new Error(`Too many arguments. Let's keep it for two weeks max`);

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      target: Number(args[2]),
      hours: args.slice(3).map(h => Number(h)), // Parses `args[3]` and beyond as a number array
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};


