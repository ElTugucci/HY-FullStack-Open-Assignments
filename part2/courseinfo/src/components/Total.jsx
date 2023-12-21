const Total = ({ courses }) => {
    const total = courses.reduce((s, course) =>
      s + course.parts.reduce((p, part) => p + part.exercises, 0), 0);
  
    return (
      <>
        <h3>Total of {total} exercises</h3>
      </>
    );
  }
  
  export default Total;