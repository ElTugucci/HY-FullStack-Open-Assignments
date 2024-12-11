import React, { useState } from "react";
import { createDiary } from "../diaryService";
import { Diary, NewDiaryType } from "../types";
import { AxiosError } from "axios";

interface NewDiaryProps {
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
  notify: (message: string) => void;
}

const NewDiary = ({ setDiaries, notify }: NewDiaryProps) => {
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("great");
  const [weather, setWeather] = useState("sunny");

  const weatherValues = ["sunny", "cloudy", "rainy", "windy", "stormy"];
  const visibilityValues = ["great", "good", "ok", "poor"];

  const handleWeather = (w: string) => {
    setWeather(w);
    console.log(w);
  };

  const handleVisibility = (v: string) => {
    setVisibility(v);
    console.log(v);
  };

  const newEntryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd: NewDiaryType = {
      weather: weather,
      date: date,
      visibility: visibility,
      comment: comment,
    };

    try {
      await createDiary(entryToAdd);
      console.log(entryToAdd);
      setDiaries((prevDiaries) =>
        prevDiaries.concat({ ...entryToAdd, id: prevDiaries.length + 1 }),
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.error ||
          "An error occurred while creating the diary entry.";
        notify("Error: " + errorMessage[0].message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
    setWeather("sunny");
    setVisibility("great");
    setComment("");
    setDate("");
  };

  return (
    <div>
      <h2>New Diary</h2>
      <form onSubmit={newEntryCreation}>
        visibility: <br />
        {visibilityValues.map((v) => (
          <div key={v}>
            <input
              type="radio"
              value={visibility}
              onChange={() => handleVisibility(v)}
              checked={visibility === v}
            />
            <label>{v}</label>
          </div>
        ))}
        <br />
        weather: <br />
        {weatherValues.map((w) => (
          <div key={w}>
            <input
              type="radio"
              value={weather}
              onChange={() => {
                handleWeather(w);
              }}
              checked={weather === w}
            />
            <label>{w}</label>
          </div>
        ))}
        <br />
        date: <br />
        <input
          key="date"
          type="date"
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
        <br />
        comment: <br />
        <input
          key="comment"
          type="text"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <br />
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default NewDiary;
