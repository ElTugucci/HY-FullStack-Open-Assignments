interface TotalProps {
  totalExercises: number
}

const Total = (props: TotalProps): JSX.Element => (
  <div><h3>Total number of exercises: {props.totalExercises}</h3></div>
);

export default Total;
