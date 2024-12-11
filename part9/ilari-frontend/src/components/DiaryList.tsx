import { Diary } from "../types";
import { v4 as uuid } from "uuid";

interface DiariesProps {
  diaries: Diary[];
}

const Diaries = (props: DiariesProps): JSX.Element => {
  return (
    <>
      {" "}
      <h2>Diary Entries</h2>
      {props.diaries.map((diary: Diary) => (
        <div key={uuid()}>
          <h3>{diary.date}</h3>
          weather: {diary.weather}
          <br /> visibility: {diary.visibility}
          <br /> {diary.comment ? diary.comment : null}
        </div>
      ))}
    </>
  );
};

export default Diaries;
