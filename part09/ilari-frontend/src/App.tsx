import NewDiary from "./components/NewDiary";
import Diaries from "./components/DiaryList";
import { Diary } from "./types";
import { getDiaryList } from "./diaryService";
import { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 10000);
  };

  useEffect(() => {
    getDiaryList().then(data => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <ErrorMessage errorMessage={errorMessage} />
      <NewDiary setDiaries={setDiaries} notify={notify} />
      <Diaries diaries={diaries} />
    </div>
  );
}

export default App;
