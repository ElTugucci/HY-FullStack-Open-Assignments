const Course = ({ course }) => {
    return (
      <>
        <h2>{course.name}</h2>
        <ul>
          {course.parts.map(part => (
            <li key={part.id}>
              {part.name}: {part.exercises}
            </li>
          ))}
        </ul>
      </>
    );
  }
  
  export default Course;