import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  switch (part.kind) {
    case "basic":
      return (
        <div key={part.name}>
          <h3>{part.name}: {part.exerciseCount} </h3>
          <i>description: {part.description}</i>
        </div>
      );
    case "group":
      return (
        <div key={part.name}>
          <h3>{part.name}: {part.exerciseCount}</h3>
          group project count: {part.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div key={part.name}>
          <h3>{part.name}: {part.exerciseCount}</h3>
          <i> description: {part.description}</i>
          <p> background material: {part.backgroundMaterial}
          </p>
        </div>
      );
    case "special":
      return (
        <div key={part.name}>
          <h3>
            {part.name}: {part.exerciseCount}
          </h3>
          <i>description: {part.description}</i>
          <p>Requirements:</p>
          <ul>
            {part.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
