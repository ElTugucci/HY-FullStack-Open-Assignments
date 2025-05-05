import { CoursePart } from "../types";
import Part from "./Part";

interface CourseProps {
  courseParts: CoursePart[];
}

const Content = (props: CourseProps): JSX.Element => {
  return (
    <div>
      {props.courseParts.map((course) => (
        <Part key={course.name} part={course} />
      ))}
    </div>
  );
};

export default Content;
